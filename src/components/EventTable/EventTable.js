import React from 'react';
import Table from '../Table/Table';
// import Pill from '../Pill';

window.React = React;

const moment = require('moment');

const EventTable = ({records, timeSegments, minFilter, maxFilter, isVisible}) => {
  /* The commented code below is temporary; DO NOT delete them */
  let beginning = timeSegments[minFilter];
  let ending = moment(timeSegments[maxFilter - 1]).add(1, 'months').subtract(1, 'days').valueOf();
  let filteredRecords = records
    // .filter(d => {
    //   console.log(d.date);
    //     return (+new Date(d.date) >= beginning && +new Date(d.date) <= ending);
    // })
    // .map(record => ({
    //   ...record,
    //   date: recor
    //   // event_type: <Pill color='#a8a8ff' />
    // }));

  let columns = [
    // { key: 'event_type', title: '', width: '90px' },
    { key: 'date', title: 'Date', width: '95px' },
    { key: 'event', title: 'Event', width: 'auto' }
  ];

  return (
    <Table
      records={filteredRecords}
      columns={columns}
      id={'id'}
      className="mainTable"
      isVisible={isVisible}
      showMoreButton={true}
    />
  );
};

EventTable.defaultProps = {
  records:[],
  timeSegments: [],
  minFilter: 0,
  maxFilter: 0,
  isVisible: false
}

EventTable.propTypes = {
  records:React.PropTypes.array,
  timeSegments: React.PropTypes.array,
  minFilter: React.PropTypes.number,
  maxFilter: React.PropTypes.number,
  isVisible: React.PropTypes.bool
}

export default EventTable;
