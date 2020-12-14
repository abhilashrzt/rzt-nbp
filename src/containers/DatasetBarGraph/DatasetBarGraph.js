import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import styles from './DatasetBarGraph.css';
import BarGraph from './../../components/BarGraph/BarGraph';
import {nFormatter} from './../../utils';

class DatasetBarGraph extends Component {

    getGraphData = (data) => ({
        graph : {
            width : 600,
            height: 220,
            data : data.value,
            barGap:0
        },
        xAxisLabel: {text: data.xLabel, ix: 0, iy: 10, width: 600, height: 200, axisType: "xAxis"},
        yAxisLabel: {text: data.yLabel, ix: 0, iy: -10, width: 600, height: 200, axisType: "yAxis"},
        xAxis:{
            style: { margin: '10px 0 0 0' },
            dataKey:"x",
            tickLine:false,
            axisLine:false
        },
        yAxis:{
            style:{fontSize: '10px'},
            tickLine:false,
            axisLine:false,
            tickFormatter: nFormatter
        },
        cartesian:{
            vertical:false,
            fill:"white",
            stroke:"#eaeaea"
        },
        legendStyle: {
            position: "absolute",
            height: "auto",
            top: "-20px",
            right: "0",
            width: "100%"
        },
        dataKeyList:[{dataKey: 'test', barGradient: ['#FF8D8D', '#FBCCD0']},
            {dataKey: 'train', barGradient: ['#33D770', '#B2F0C9']},
            {dataKey: 'validate', barGradient: ['#4D9CFF', '#BBD9FF']}],
        legend: [
            {text: 'Test', iconColor: "#f5938e"},
            {text: 'Train', iconColor: "#69da97"},
            {text: 'Validate', iconColor: "#6eacf4"}
        ]
    });

    render() {
        let {data} = this.props;
        return (
            <div styleName="container">
                <span styleName="title">{data.name}</span>
                <div styleName="graph-container">
                    <div styleName="graph-container__bg"></div>
                    <BarGraph data={this.getGraphData(data)}/>
                </div>
            </div>

        );
    }
}

export default CSSModules(DatasetBarGraph, styles, {allowMultiple: true});
