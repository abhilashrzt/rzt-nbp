import React, {Component} from 'react';
import LineGraph from './../../components/LineGraph/LineGraph';
import ChartFilters from './../../components/ChartFilters/ChartFilters';
import classNames from 'classnames';
import styles from './TransactionChartContainer.css';
import CSSModules from 'react-css-modules';

import './TransactionCharts.css';


const moment = require('moment');

const mmmmm_yyyy = (date) => moment(date).format("MMMM YYYY");
import {formatINR, shortenINR} from './../../utils';

class LineChartContainer extends Component {
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

    getLineChartData = () => ({
        cartesian: {
            stroke: "#dddddd",
            vertical: false
        },
        graph: {
            data: this.props.records.map(d => ({
                ...d,
                time: moment(d.time).format('MMM \'YY')
            }))
        },
        xAxis: {
            dataKey: "time",
            tickLine: true
        },
        yAxis: {
            axisLine: false,
            tickLine: false,
            tickFormatter: shortenINR
        },
        tooltip: {
            formatter: formatINR
        },
        legend: [
            {text: 'Total Monthly Credit Transactions', iconColor: "#25bf33"},
            {text: 'Max Monthly Credit Transactions', iconColor: "#95fa6e"},
            {text: 'Total Monthly Debit Transactions', iconColor: "#f02e2e"},
            {text: 'Monthly Daily Average Balance', iconColor: "#daa520"}
        ],
        legendStyle: {
            position: "absolute",
            height: "auto",
            top: "-29px",
            right: "0",
            width: "100%"
        },
        dataKeyList: [
            {
                name: "Total Credit",
                dataKey: "t_credit",
                stroke: "#25bf33",
            }, {
                name: "Max Credit",
                dataKey: "max_credit",
                stroke: "#95fa6e"
            }, {
                name: "Total Debit",
                dataKey: "t_debit",
                stroke: "#f02e2e"
            }, {
                name: "MDAB",
                dataKey: "mdab",
                stroke: "#daa520"
            }
        ]

    })

    render() {
        let {id, records, txnFilters, setFilters} = this.props;
        let {min, max} = txnFilters;
        let isRecordsEmpty = records.length < 1;
        return (
            <div className={classNames(styles.chartSection, "clearfix")}>
                <div className={classNames(styles.chartSectionHeader, 'clearfix')}>
                    <h2 className={classNames(styles.subSectionHeadtxt, 'fleft')}>CUSTOMER TRANSACTION HISTORY</h2>
                    {!isRecordsEmpty &&
                    <span className={classNames(styles.subSectionText, "fright")}>
                        { `${records[0].month} - ${records[records.length - 1].month}`}
                        </span>
                    }
                </div>

                <div className={styles.subsectionContent}>
                    <div className={classNames(styles.area, "clearall")} ref={(c) => {
                        this.chartArea = c;
                    }}>
                        {
                            !isRecordsEmpty &&
                            <ChartFilters segments={records.length} setFilters={setFilters} customerId={id}>
                                { !isRecordsEmpty &&
                                <LineGraph responsive="true" lineData={this.getLineChartData()} chartType="linear"/>}
                            </ChartFilters>

                        }
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}


LineChartContainer.defaultProps = {
    min: 0,
    max: 0,
    id: 0,
    records: []
}

LineChartContainer.propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    id: React.PropTypes.number,
    records: React.PropTypes.array
}

export default CSSModules(LineChartContainer, styles, {allowMultiple: true});
