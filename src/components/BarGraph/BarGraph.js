import * as React from "react";
import classNames from 'classnames';
import styles from './BarGraph.css';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    CartesianAxis,
    ResponsiveContainer,
    Legend
} from 'recharts';
import './../../containers/TransactionChart/TransactionCharts.css';


const CustomTooltip = ({ payload }) => {
    let data = payload[0] && payload[0].payload;
    return <div className={styles.customTooltip}>
        {_.map(data, (value, key) => <p key={key}>
            <span className={styles.tooltipKey}>{key}</span>
            : <span
            className={styles.tooltipValue}>{ `${Number(value)}${key.toLowerCase() == 'propensity' ? '%' : ''}` }</span>
        </p>)}
    </div>;
};

const CustomAxisLabel = ({ axisType, x, y, ix, iy, width, height, text }) => {
    const isVert = axisType === 'yAxis';
    const rot = isVert ? -90 : 0;
    const trans = isVert ? '(0,-8)' : '(0,3)';
    const cx = isVert ? -height / 2 : ix + x + (width / 2);
    const cy = isVert ? iy + y + (height / 2) - 39 : iy + y + (height / 2) + 10;
    return (
        <text x={cx || 0} y={cy || 0} transform={`rotate(${rot}) translate${trans}`} textAnchor="middle">
            {text}
        </text>
    );
};

const CustomizedLegend = ({ legendList }) => (
    <ul className={classNames(styles.legend, "fright")}>
        {legendList && legendList.map((legend, index) => <li key={`legend-${index}`} className="clearfix"><span
            className={classNames(styles.legendIcon, "fleft")}
            style={{ background: legend.iconColor }}></span><span
            className={classNames(styles.legendText, "fleft")}>{legend.text}</span>
        </li>)}
    </ul>
);

const BarGraph = ({ data }) => (
    <BarChart {...data.graph}>
        <defs>
            {data.dataKeyList.map((item, index) => <linearGradient key={`gradient-${index}`} id={`grad-${index}`} x1="0"
                                                                   y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={item.barGradient[0]}/>
                <stop offset="100%" stopColor={item.barGradient[1]}/>
            </linearGradient>)}
        </defs>
        <Legend content={<CustomizedLegend legendList={data.legend}/>} wrapperStyle={data.legendStyle}/>
        <XAxis { ...data.xAxis }
               label={<CustomAxisLabel {...data.xAxisLabel}/>}/>
        <YAxis {...data.yAxis}
               label={<CustomAxisLabel {...data.yAxisLabel}/>}/>
        <CartesianGrid {...data.cartesian}/>
        <Tooltip content={<CustomTooltip />}/>
        { data.dataKeyList && data.dataKeyList.map((item, index) => <Bar fill={`url(#grad-${index})`}
                                                                         key={`bar-${index}`} {...item}/>) }
    </BarChart>
);

export default BarGraph;