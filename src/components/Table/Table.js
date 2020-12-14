import React from 'react';
import classNames from 'classnames';
import styles from './Table.css';
import noop from 'lodash/fp/noop';

const get = (key, items) => items.map(item => item[key]);

const TableColGroup = ({colWidths}) => (
  <colgroup>
    {
      colWidths.map((width, i) => (<col style={{width}} key={i}></col>))
    }
  </colgroup>
);

const TableHeader = ({headers, colWidths}) => (
  <div className={styles.head}>
    <table>
      <TableColGroup colWidths={colWidths} />
      <tbody>
      <tr>
        {
          headers.map((header, i) => (<th key={i}>{header}</th>))
        }
      </tr>
      </tbody>
    </table>
  </div>
);

class TableRow extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.text !== nextProps.text;
  }

  render(){

    let {title, styles, text,colName} = this.props;
    return <td title={title} style={styles}>
      <span>{text}</span>
    </td>
  }
}

const TableBody = ({records, colWidths, columns, inlineStyles, id, onClick}) => (
  <div className={styles.body}>
    <table>
      <TableColGroup colWidths={colWidths} />
      <tbody>
      {
        records.map((record, i) => (
          <tr key={i} onClick={() => { onClick(record) }}>
            {
              columns.map((col, j) => (
                <TableRow key={i +"__"+j} colName={col} title={record[col]} styles={inlineStyles[j]} text={record[col]}/>
              ))
            }
          </tr>
        ))
      }
      </tbody>
    </table>
  </div>
);

const Table = ({records, columns, id, onClick, className, isVisible }) => {
  return <div
    className={classNames(styles.table,
      (className === 'headerList') ? styles.headerList : '',
      styles.noWordBreak,
      isVisible ? 'disp-block' : 'disp-none') }>
    <TableHeader headers={get('title', columns)} colWidths={get('width', columns)}/>
    <TableBody
      records={records}
      colWidths={get('width', columns)}
      columns={get('key', columns)}
      inlineStyles={get('style', columns)}
      onClick={onClick}
      id={id}
    />
  </div>
};


Table.defaultProps = {
  records: [],
  columns: [],
  id: '',
  onClick: noop,
  className: '',
  isVisible: false,
  showMoreButton:false
};

Table.propTypes = {
  records: React.PropTypes.array,
  columns: React.PropTypes.array.isRequired,
  id: React.PropTypes.string,
  onClick: React.PropTypes.func,
  className: React.PropTypes.string,
  isVisible: React.PropTypes.bool,
  showMoreButton: React.PropTypes.bool
};

TableBody.defaultProps = {
  records: [],
  colWidths: [],
  columns: [],
  inlineStyles: [],
  id: '',
  onClick: noop
};

TableBody.propTypes = {
  records: React.PropTypes.array,
  colWidths: React.PropTypes.array,
  columns: React.PropTypes.array,
  inlineStyles: React.PropTypes.array,
  id: React.PropTypes.string,
  onClick: React.PropTypes.func
};

TableRow.defaultProps = {
  title: '',
  styles: {},
  text: ''
};

TableRow.propTypes = {
  title: React.PropTypes.any,
  styles: React.PropTypes.object,
  text: React.PropTypes.any
}

TableHeader.defaultProps = {
  headers: [],
  colWidths:[]
};

TableHeader.propTypes = {
  headers: React.PropTypes.array,
  colWidths: React.PropTypes.array
};

TableColGroup.defaultProps = {
  colWidths: []
};

TableColGroup.propTypes = {
  colWidths: React.PropTypes.array
};


export { TableColGroup, TableHeader, TableBody, Table };
export default Table;
