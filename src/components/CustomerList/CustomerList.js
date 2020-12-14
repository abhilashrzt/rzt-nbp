import * as React from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import styles from './CustomerList.css';
import Pagination from './Pagination';
import Table from './../Table/Table';


const TickMark = ({done}) => {
    return (
        <span className={classNames(styles.evaluationStatus, 'flaticon-check', done ? styles.true : styles.false)}/>)
};
/*TODO: move pagination component to another file*/

const CustomerList = ({
    totalCustomers, currentCustomerId, records, pagination, loadCustomersData, pagesize, evaluated = true, onClick = () => (0), isVisible,
    dataset_id,
    onOverlayClick, onPaginationClick = () => (0)
}) => {
    let columns = [
        // { key: 'evaluated', title: 'Evaluated', width: '75px' },
        {key: 'id', title: 'Customer', width: '100px'},
        {key: 'Customer Current Age', title: 'Age', width: '60px'},
        {key: 'Location', title: 'Location', width: 'auto'},
        {key: 'Segment', title: 'Segment', width: 'auto'},
        // {key: 'numberOfAccs', title: '#Accounts', width: '100px'},
        // { key: 'propensity', title: 'Propensity', width: '120px' }
    ];

console.log("pagination", dataset_id)
    return (
        <div className={classNames(isVisible ? styles.dropdownVisible : '', styles.dropdown)}>
            <div className={styles.listOverlay} onClick={onOverlayClick}></div>
            <div className={styles.list}>
                <Table
                    records={records}
                    columns={columns}
                    id={'id'}
                    onClick={onClick}
                    className="headerList"
                    isVisible={true}
                />
                <Pagination currentCustomerId={currentCustomerId}
                            totalCustomers={totalCustomers}
                            dataset_id={dataset_id}
                            data={pagination}
                            pagesize={pagesize}
                            loadCustomersData={loadCustomersData}
                            onclick={onPaginationClick}/>
            </div>
        </div>
    )
};

export default CSSModules(CustomerList, styles, {allowMultiple: true});