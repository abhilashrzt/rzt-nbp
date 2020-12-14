import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import styles from './LineGraph.css';

const moment = require('moment');

const TransactionsBarChart = ({data}) => (
  <div className={styles.barWrapper}>
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{ top: 20, right: 5, bottom: 0, left: 0 }}
        barCategoryGap="20%"
        barGap={0}
        className="ax-chart_bar"
      >
       <Bar dataKey="n_credit" name="#Credit transactions" animationDuration={1000} fill="#25bf33" />
       <Bar dataKey="n_debit" name="#Debit transactions" animationDuration={1000} fill="#f02e2e" />
       <XAxis dataKey="time" tickCount={0} tickLine={false} tickFormatter={() => ''} />
       <YAxis tickCount={3} tickLine={false} />
       <Tooltip labelFormatter={(t) => moment(t).format("MMM 'YY")} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

TransactionsBarChart.defaultProps = {
  data: []
}

TransactionsBarChart.propTypes = {
  data: React.PropTypes.array
}

export default TransactionsBarChart;