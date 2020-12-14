import * as React from 'react';
import CSSModules from 'react-css-modules';
import TransitionGroup from 'react-addons-transition-group';
import Dataset from './../../components/Dataset/Dataset';
import TransactionListDetails from './../TransactionListDetails/TransactionListDetails';
import * as d3 from 'd3';
import {nFormatter} from '../../utils';
// const headTitle = ['SEGMENT ID', 'SEGMENT NAME', 'AVG AGE', 'AFFLUENCE', 'SEGMENTS', 'EVENT', 'LIFECYCLE', 'OVERALL'];

const getFieldColor = ( record ) => {
    let length = 10;
    let color = d3.scaleLinear().domain([0,length/2, length])
        .range([d3.rgb("#ff6b6b"), d3.rgb('#fcb54d'), d3.rgb('#72cc71')])
        .interpolate(d3.interpolateHcl);
    // .range([d3.rgb("#d12f2f"), d3.rgb('#FFC107'), d3.rgb('#21e1ad')])
    let range = {
        HIGH: 100,
        LOW: 0,
        MEDIUM: 50
    }
    let colors = {
        'AFFLUENCE' : color(record.affluence / length),
        'PROFILE' : color((range[(record.segment_propensity|| '').toUpperCase()] || 0) / length),
        'EVENT' : color((record.event_propensity * 100) / length),
        // 'LIFECYCLE' : (record.lifecycle_propensity * 100) < 0 ? "#d12f2f" : '#21e1ad' ,
        // 'OVERALL' : color((record.overall_propensity * 100) / length),
    }
    return colors;
}

const getHeadFields =  ( record ) => {
    return [
        { title: "SEGMENT ID", iconClass: '', styles: { width: "auto" }, value: record.id },
        { title: "SEGMENT NAME", iconClass: '', styles: { width: "200px" }, value: record && record.name !== null ? (record.name) : '--' },
        { title: "AVG AGE", iconClass: '', styles: { width: "auto" }, value: record && record.age !== null ? (Math.round(record.age)) : '--' },
        { title: "AFFLUENCE", iconClass: '', styles: { width: "auto" }, value: record && record.affluence !== null ? (Math.round(record.affluence)) : '--' },
        { title: "PROFILE", iconClass : '' , styles: { width: "120px" }, value: record && record.segment_propensity !== null ? (record.segment_propensity) : '--' },
        // { title: "LIFECYCLE", iconClass:'', styles: { width: "120px" }, value: record && record.lifecycle_propensity !== null ? (`${(record.lifecycle_propensity * 100).toFixed(2)} %`) : '--' },
        { title: "EVENT", iconClass: '', styles: { width: "120px" }, value: record && record.event_propensity !== null ? (`${nFormatter(record.event_propensity * 100, 2)} %`) : '--' },
        // { title: "OVERALL", styles: { width: "95px" }, value: record && record.overall_propensity !== null ? (`${(record.overall_propensity * 100).toFixed(2)} %`) : '--' },
    ]
}

export default class AnalyseSegments extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {records, gotoSegment, parent, datasetId, locationQuery } = this.props;
        return (
            <TransitionGroup>
                <Dataset
                    records={ records }
                    datasetId={datasetId}
                    page={ "analyse" }
                    locationQuery={locationQuery}
                    gotoSegment={ gotoSegment }
                    getHeadFields={ getHeadFields }
                    bodyContent={ TransactionListDetails }
                    deletable={ false }
                    parent = { parent }
                    getFieldColor={ getFieldColor }
                    propensityList = { true }
                />
            </TransitionGroup>
        );

    }
}


