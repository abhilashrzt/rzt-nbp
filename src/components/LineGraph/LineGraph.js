import React, { Component } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import styles from './LineGraph.css';
import classNames from 'classnames';
import _ from 'lodash';

const CustomizedLegend = ({ legendList }) => (
    <ul className={classNames(styles.legend, "fright")}>
        {legendList && legendList.map((legend, index) => <li key={`legend-${index}`} className="clearfix"><span
            className={classNames(styles.legendIcon, "fleft")}
            style={{ background: legend.iconColor }}></span><span
            className={classNames(styles.legendText, "fleft")}>{legend.text}</span>
        </li>)}
    </ul>
);


const CustomTooltip = ({ payload }) => {
    let data = payload[0] && payload[0].payload;
    return <div className={styles.customTooltip}>
        {_.map(data, (value, key) => <p key={key}>
            <span className={styles.tooltipKey}>{key}</span>
            : <span
            className={styles.tooltipValue}>{ value ? value : 0 }</span>
        </p>)}
    </div>;
};
const CustomAxisLabel = ({ axisType, ix, iy, text, x, y, width, height }) => {
    const isVert = axisType === 'yAxis';
    const rot = isVert ? -90 : 0;
    const trans = isVert ? '(0,-8)' : '(0,3)';
    const cx = isVert ? ix + x - height / 2 : ix + x + (width / 2);
    const cy = isVert ? iy + y + (height / 2) : iy + y + (height / 2) + 10;

    return (
        <text x={cx || 0} y={cy || 0} transform={`rotate(${rot}) translate${trans}`} textAnchor="middle">
            {text}
        </text>
    );
};

class LineGraph extends Component {
    shouldComponentUpdate (nextProps) {
        return this.props.data !== nextProps.data;
    }

    render () {
        let { chartType, lineData, type, needsDot, responsive } = this.props;

        let Graph = <LineChart margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
                               className="ax-chart_line" {...lineData.graph}>
            <Legend content={<CustomizedLegend legendList={lineData.legend}/>} wrapperStyle={lineData.legendStyle}/>
            {
                lineData.dataKeyList.map((line, index) => <Line key={index}
                                                                type={chartType}
                                                                dot={needsDot == undefined ? true : needsDot}
                                                                animationDuration={1000}
                                                                name={line.name}
                                                                dataKey={line.dataKey}
                                                                stroke={line.stroke}/>)
            }
            <CartesianGrid {...lineData.cartesian}/>
            <XAxis {...lineData.xAxis} label={<CustomAxisLabel {...lineData.xAxisLabel}/>}/>
            <YAxis {...lineData.yAxis} label={<CustomAxisLabel {...lineData.yAxisLabel}/>}/>
            { lineData.customTooltip ? <Tooltip content={<CustomTooltip />}/> : <Tooltip {...lineData.tooltip}/>}
        </LineChart>;

        return (
            <div className={styles.lineWrapper}>
                { responsive ? <ResponsiveContainer>{Graph}</ResponsiveContainer> : Graph }
            </div>
        );
    }
}

LineGraph.defaultProps = {
    data: []
};

LineGraph.propTypes = {
    data: React.PropTypes.array
};

export default LineGraph;
