import * as React from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import _ from 'lodash';

import TransitionGroup from 'react-addons-transition-group';
import styles from './../../components/Dataset/Dataset.css';
import DatasetHead from './../../components/Dataset/DatasetHead';
import * as d3 from 'd3';
import {nFormatter} from '../../utils';

const getFieldColor = ( record ) => {
    let length = 10;
    let color = d3.scaleLinear().domain([0,length/2, length])
        .range([d3.rgb("#d12f2f"), d3.rgb('#FFC107'), d3.rgb('#21e1ad')])
        .interpolate(d3.interpolateHcl);
    let range = {
        HIGH: 100,
        LOW: 0,
        MEDIUM: 50
    }
    let colors = {
        'AFFLUENCE' : record.affluent && color(record.affluent/ length),
        'EVENT' : record.event_propensity && color(record.event_propensity * 100/ length) ,
        'PROFILE' : color((range[(record.segment_propensity || '').toUpperCase()] || 0) / length),
        // 'LIFECYCLE' : record.lifecycle_propensity && record.lifecycle_propensity * 100 < 0 ? "#d12f2f" : '#21e1ad',
        // 'OVERALL' : record.overall_propensity && color(record.overall_propensity * 100/ length)
    }
    return colors;
}

export default class CustomerList extends React.Component {
    constructor(props) {
        super(props);
    }

    getHeadFields = (record) => {
        return [
            { title: "CUSTOMER ID", styles: {flex: "0 0 180px"}, value: record.id },
            { title: "AGE", styles: {}, value: record.age != null? record.age : '--'},
            { title: "AFFLUENCE", styles: {}, value: record.affluence && record.affluence !==null ? (Math.round(record.affluence)) : '--'},
            { title: "PROFILE", tooltip: record.hasLI? 'Has Insurance': "Doesn't have a insurance", iconClass: record.hasLI ? 'flaticon-checked': 'flaticon-cancel', styles: {}, value: record.segment_propensity && record.segment_propensity !== null ? (record.segment_propensity): '--'},
            // { title: "LIFECYCLE", styles: {}, value: record.lifecycle_propensity && record.lifecycle_propensity !== null ? (record.lifecycle_propensity* 100).toFixed(2) + ' %' : '--'},
            { title: "EVENT", styles: {}, value: record.event_propensity && record.event_propensity !== null ? nFormatter(record.event_propensity * 100, 2) + ' %' : '--'},
            // { title: "OVERALL", styles: {flex: "0 0 150px"}, value: record.overall_propensity && record.overall_propensity !== null ? (record.overall_propensity* 100).toFixed(2) + ' %' : '--'}
        ];
    };

    render() {

        let {records, sortBy, sortOrder, page} = this.props;
        records = sortOrder == 'Ascending' ? _.sortBy(records, sortBy || 'name') :  _.sortBy(records, sortBy || 'name').reverse();

        return (
            <TransitionGroup>
                <ul styleName="list propensity-list" ref="list">
                    {
                        records.map((record, i) => (
                            <li styleName="list__item"
                                key={`index${i}listItem${record.dataset_id}`}
                                onClick={()=>{this.props.onClick(record)}}
                                className={classnames({[styles.expanded]: (record.toggle)})}>
                                <DatasetHead fields={this.getHeadFields(record)}
                                             id={record.dataset_id}
                                             page={page}
                                             togglePopup={this.props.togglePopup}
                                             getFieldColor={ getFieldColor(record) }
                                />
                            </li>
                        ))
                    }
                </ul>
            </TransitionGroup>
        );

    }
}
