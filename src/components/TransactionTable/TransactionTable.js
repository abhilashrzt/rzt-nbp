import React from 'react';
import Table from '../Table/Table';

// import uniq from 'lodash/fp/uniq';
import { formatINR } from './../../utils';

const moment = require('moment');

const TransactionTable = ({records, minFilter, maxFilter, timeSegments, isVisible = true}) => {
  let columns = [
    { key: 'date', title: 'Date', width: '95px' },
    { key: 'mode', title: 'Mode', width: '90px' },
    { key: 'type', title: 'Type', width: '65px' },
    // { key: 'event_type', title: 'Event', width: '70px' },
    { key: 'summary', title: 'Txn Particulars', width: 'auto' },
    { key: 'amount', title: 'Amount', width: '110px', style: { textAlign: 'right' } }
  ];
    let filteredRecords = records
//    .filter(d => {
//        const min = Math.floor(minFilter);
//        let beginning = timeSegments[min];
//        if (minFilter > min && min > 0){
//          beginning = moment(timeSegments[min]).add(1, 'days')
//        }
//        let ending = moment(new Date(timeSegments[maxFilter])).add(1, 'months').subtract(1, 'days').valueOf();
//        if(!beginning && !ending) return true;
//        return (+new moment(d.date, 'DD-MM-YYYY') >= beginning && +new moment(d.date, 'DD-MM-YYYY') <= ending);
//    })
    .map(d => ({
      ...d,
      amount: formatINR(d.amount || 0)
    }));

  return (
    <Table
      records={filteredRecords}
      columns={columns}
      id={'id'}
      isVisible={isVisible}
      showMoreButton={true}
    />
  );
};

TransactionTable.defaultProps = {
  records : [],
  minFilter: 0,
  maxFilter: 0,
  timeSegments: [],
  isVisible: false
};

TransactionTable.propTypes = {
  records : React.PropTypes.array,
  minFilter: React.PropTypes.number,
  maxFilter: React.PropTypes.number,
  timeSegments: React.PropTypes.array,
  isVisible: React.PropTypes.bool
};

export default TransactionTable;
