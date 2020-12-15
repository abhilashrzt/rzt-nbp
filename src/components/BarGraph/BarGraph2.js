import * as React from "react";
import CSSModules from 'react-css-modules';
import _ from 'underscore';

import styles from './BarGraph.css';
import classNames from 'classnames';
import {nFormatter} from './../../utils';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, CartesianAxis, Legend, ResponsiveContainer} from 'recharts';

const CustomTooltip = ({payload}) => {
    let data = payload[0] && payload[0].payload;
    return <div className={styles.customTooltip}>
        {_.map(data, (value, key) => <p key={key}>
            <span className={styles.tooltipKey}>{key}</span>
            : <span
            className={styles.tooltipValue}>{ `${Number(value)}${key.toLowerCase() == 'propensity' ? '%' : ''}` }</span>
        </p>)}
    </div>
}

const CustomAxisLabel = ({axisType, x, y, width, height, text}) => {
    const isVert = axisType === 'yAxis';
    const rot = isVert ? -90 : 0;
    const trans = isVert ? '(0,-8)' : '(0,3)';
    const cx = isVert ? -height / 2 : x + (width / 2);
    const cy = isVert ? y : y + (height / 2) + 14;
    return (
        <text x={cx} y={cy} transform={`rotate(${rot}) translate${trans}`} textAnchor="middle">
            {text}
        </text>
    );
};

const CustomizedLegend = ({legendList}) => (
    <ul className={classNames(styles.legend, "fright")}>
        {legendList && legendList.map((legend, index) => <li key={`legend-${index}`} className="clearfix"><span
            className={classNames(styles.legendIcon, "fleft")}
            style={{background: legend.iconColor}}></span><span
            className={classNames(styles.legendText, "fleft")}>{legend.text}</span>
        </li>)}
    </ul>
)

const data = [
    {name: 0.1, pv: 10, amt: 2400},
    {name: 0.2, pv: 20, amt: 2210},
    {name: 0.3, pv: 20, amt: 2290},
    {name: 0.4, pv: 40, amt: 2000},
    {name: 0.5, pv: 10, amt: 2181},
    {name: 0.6, pv: 40, amt: 2500},
    {name: 0.7, pv: 50, amt: 2100},
    {name: 0.8, pv: 30, amt: 2100},
    {name: 0.9, pv: 10, amt: 2100},
    {name: 1.0, pv: 40, amt: 2100},
];
// linear-gradient(180deg, #59E9C2 0%, #C5F7EA 100%)


const BarGraph2 = ({width, height, data, dataKeyList, legend, legendStyle}) => (
    <ResponsiveContainer>
    <BarChart data={data}>
        <defs>
            {dataKeyList.map( (item, index) => <linearGradient key={`bar-${index}`} id={`bar-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={item.color[0]}/>
                <stop offset="100%" stopColor={item.color[1]}/>
            </linearGradient>)}
        </defs>
        <Legend content={<CustomizedLegend legendList={legend}/>} wrapperStyle={legendStyle}/>
        <XAxis dataKey="x" tickLine={false} axisLine={false}/>
        <YAxis tickLine={false} axisLine={false}/>
        <CartesianGrid vertical={false} fill="white" stroke="#eaeaea"/>
        {/*<Tooltip />*/}
        {dataKeyList.map((item, index) => <Bar key={`bar-${index}`} dataKey={ item.name } fill={`url(#bar-${index})`}
                                               barGap={40}/>) }
    </BarChart>
    </ResponsiveContainer>

);

export default BarGraph2;
