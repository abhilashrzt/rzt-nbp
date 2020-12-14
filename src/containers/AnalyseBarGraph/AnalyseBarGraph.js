import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './AnalyseBarGraph.css';
import BarGraph from './../../components/BarGraph/BarGraph';
import { nFormatter } from './../../utils';

class AnalyseBarGraph extends Component {

    getGraphData = (data) => ({
        graph: {
            width: 635,
            height: 170,
            data: data
        },
        xAxis: {
            style: { margin: '10px 0 0 0' },
            dataKey: "propensity",
            tickLine: false,
            axisLine: false
        },
        yAxis: {
            style: { fontSize: '10px' },
            tickLine: false,
            axisLine: false,
            width: 35,
            tickFormatter: nFormatter
        },
        xAxisLabel: {
            text: 'PROPENSITY',
            axisType: "xAxis",
            ix: 0,
            iy: 10,
            width: 635,
            height: 170
        },
        yAxisLabel: {
            text: 'NO OF CUSTOMERS',
            axisType: "yAxis",
            ix: 0,
            iy: -10,
            width: 635,
            height: 170
        },
        cartesian: {
            vertical: false,
            fill: "white",
            stroke: "#eaeaea"
        },
        dataKeyList: [{ dataKey: "customers", barGap: 40, barSize: data.barSize, barGradient: ["#73767C", "#C2C3C6"] }]
    });

    render () {
        let { data } = this.props;
        return (
            <div styleName="container">
                <span styleName="title">EVENT PROPENSITY</span>
                <div styleName="graph-container">
                    <div styleName="graph-container__bg"></div>
                    <BarGraph data={this.getGraphData(data)}/>
                </div>
            </div>
        );
    }
}

export default CSSModules(AnalyseBarGraph, styles, { allowMultiple: true });
