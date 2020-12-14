import React, { Component } from "react";
import CSSModules from "react-css-modules";
import LineGraph from "./../../components/LineGraph/LineGraph";

import "./../TransactionChart/TransactionCharts.css";
import styles from "./DatasetChart.css";


const moment = require('moment');

const mmmmm_yyyy = (date) => moment(date).format("MMMM YYYY");

class DatasetChart extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.records !== nextProps.records)
            this.props.setFilters({
                min: 0,
                max: nextProps.records.length - 1
            })
    }

    getLineChartData = (data) => ({
        cartesian: {
            stroke: "#dddddd",
            vertical: false
        },
        graph: {
            width: 600,
            height: 220,
            data: data.value.reduce((acc, {x, train, test, validate}, i, all) => {
                let prev = {};
                if (i > 0) {
                    prev = acc[i - 1]
                }
                return acc.concat([{
                    x,
                    train: train != null ? train : prev.train,
                    test: test != null ? test : prev.test,
                    validate: validate != null ? validate : prev.validate
                }])
            }, [])
        },
        xAxisLabel: {text: data.xLabel, ix: 0, iy: 10, width: 600, height: 200, axisType: "xAxis"},
        yAxisLabel: {text: data.yLabel, ix: 0, iy: -60, width: 600, height: 200, axisType: "yAxis"},
        xAxis: {
            dataKey: "x",
            axisLine: false,
            tickLine: false,
            type: 'number'
        },
        yAxis: {
            axisLine: false,
            tickLine: false
        },
        legend: [
            {text: 'Test', iconColor: "#f5938e"},
            {text: 'Train', iconColor: "#69da97"},
            {text: 'Validate', iconColor: "#6eacf4"}
        ],

        dataKeyList: [
            {
                name: "Test",
                dataKey: "test",
                stroke: "#f5938e",
            }, {
                name: "Train",
                dataKey: "train",
                stroke: "#69da97"
            }, {
                name: "Validate",
                dataKey: "validate",
                stroke: "#6eacf4"
            }
        ],
        customTooltip: true,
        legendStyle: {
            position: "absolute",
            height: "auto",
            top: "-20px",
            right: "0",
            width: "100%"
        }
    });

    render() {
        let {data} = this.props;
        let isRecordsEmpty = data.length < 1;

        return (
            <div className={styles.chartSection}>
                <div className={styles.chartHeader}>
                    <h4 className={styles.subSectionHeadtxt}>{data.name}</h4>
                </div>
                <div styleName="graph-container__bg"></div>
                <div className={styles.chartContent}>
                    {
                        !isRecordsEmpty &&
                        <LineGraph type="dataset"
                                   lineData={this.getLineChartData(data)}
                                   needsDot={false}
                                   chartType="monotone"
                                   responsive={false}/>
                    }
                </div>
            </div>
        );
    }
}


DatasetChart.defaultProps = {
    data: []
}

DatasetChart.propTypes = {
    data: React.PropTypes.any
}

export default CSSModules(DatasetChart, styles, {allowMultiple: true});
