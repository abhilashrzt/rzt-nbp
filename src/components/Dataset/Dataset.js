import * as React from "react";
import CSSModules from 'react-css-modules';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import styles from './Dataset.css';
import classnames from 'classnames';
import {dateformatter} from '../../utils/formatter';
import Button from './../../components/Button/Button'
import TransitionGroup from 'react-addons-transition-group';
import {TweenMax} from 'gsap';
import {actionDeleteDatasets} from './../../pages/Datasets/Datasets.actions';
const moment = require('moment');
import DatasetHead from './DatasetHead';

import {actionTogglePopup} from './../../pages/Global/Global.actions';
let toggleListbodyAnimation;

@CSSModules(styles, {allowMultiple: true})
class DatasetBody extends React.Component {

    componentWillEnter(callback) {
        const el = ReactDOM.findDOMNode(this);
        let childElement = el.childNodes;
        toggleListbodyAnimation = new TimelineMax();

        toggleListbodyAnimation
            .from(
                el,
                0.25,
                {
                    height: 0,
                    ease: Power3.ease
                }
            )
            .from(
                childElement,
                0.15,
                {
                    scale: 0.85,
                    autoAlpha: 0,
                    ease: Power3.easeIn,
                    onComplete: callback
                },
                0.2
            )
    }

    componentWillLeave(callback) {
        const el = ReactDOM.findDOMNode(this);
        let childElement = el.childNodes;
        toggleListbodyAnimation = new TimelineMax();

        toggleListbodyAnimation
            .to(
                childElement,
                0.15,
                {
                    scale: 0.7,
                    autoAlpha: 0,
                    ease: Power3.easeOut
                }
            )
            .to(
                el,
                0.25,
                {
                    height: 0,
                    ease: Power3.easeOut,
                    onComplete: callback
                },
            )
    }

    render() {
        let {fields, id, type, datasetId, gotoSegment, changeAction, bodyContent, page, parent, records, locationQuery} = this.props;
        const BodyContent = bodyContent;
        let isChartsPresent = fields.charts && fields.charts.some( chart => chart.value.length > 0);
        return <div styleName="body"
                    style={ page == "analyse" ? {height: 'auto'} : isChartsPresent ? {height: '450px'} : {height: '200px'} }>
            { fields && <BodyContent gotoSegment={ gotoSegment }
                                     locationQuery={ locationQuery }
                                     id={ id }
                                     type={ type }
                                     fields={ fields }
                                     datasetId={datasetId}
                                     changeAction={ changeAction }
                                     parent={ parent }
                                     records={ records }/> }
        </div>
    }
}
;

@CSSModules(styles, {allowMultiple: true})
class Dataset extends React.Component {
    static propTypes = {records: React.PropTypes.array};
    static defaultProps = {records: []};

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        let {
            datasetId, records, gotoSegment, changeAction, deleteAction, page,
            bodyContent, deletable, parent, locationQuery, propensityList, getFieldColor, getHeadFields
        } = this.props;

        console.log('Rendering Dataset...');
        return <ul styleName={`list ${ propensityList ? 'propensity-list' : '' }`}
                   style={ parent ? {} : {width: '100%'} } ref="list">
            {
                records.map((record, i) => (
                    <li styleName="list__item"
                        key={`index${i}listItem${record.dataset_id}`}
                        onClick={this.props.onClick}
                    >
                        <DatasetHead fields={ getHeadFields && getHeadFields(record) }
                                     level={ record.level }
                                     name={ record.name }
                                     id={ record.id || record.dataset_id }
                                     datasetId={datasetId}
                                     type={record.type}
                                     locationQuery={locationQuery}
                                     deleteAction={ deleteAction }
                                     togglePopup={ this.props.togglePopup }
                                     deletable={ deletable }
                                     page={ page }
                                     parent={ parent }
                                     getFieldColor={getFieldColor(record)}
                                     gotoSegment={ gotoSegment }
                                     onClick={() => {
                                         record.toggle = !record.toggle;
                                         this.setState({toggle: true});
                                     }}
                        />
                        <TransitionGroup component="div">
                            {  page != 'customers' && record.toggle &&
                            <DatasetBody gotoSegment={gotoSegment}
                                         id={ record.dataset_id || record.id }
                                         datasetId={datasetId}
                                         fields={ page == "analyse" ? record : {
                                                 meta: record.status.meta,
                                                 charts: record.charts
                                             } }
                                         changeAction={ changeAction }
                                         bodyContent={ bodyContent }
                                         type={record.type}
                                         locationQuery={ locationQuery }
                                         page={ page }
                                         parent={ parent }
                                         records={ record.segment }/> }
                        </TransitionGroup>
                    </li>
                ))
            }
        </ul>
    }
}
;

const dispatcher = (dispatch) => ({
    togglePopup: (data) => {
        dispatch(actionTogglePopup(data));
    },
});

export default Dataset;