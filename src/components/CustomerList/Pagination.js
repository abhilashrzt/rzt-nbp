import * as React from 'react';
import _ from 'underscore';

import classNames from 'classnames';
import styles from './CustomerList.css';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // currentPage: this.props.currentCustomerId ? Math.ceil(this.props.currentCustomerId/4) : (this.props.data.pageno || 1)
        }
    }

    componentWillReceiveProps (nextProps){
        if(this.props.currentCustomerId !== nextProps.currentCustomerId || this.props.data.pageno !== nextProps.data.pageno) {
            this.setState({currentPage: _.get(nextProps, ["data", "pageno"], Math.ceil((nextProps.currentCustomerId || 1)/nextProps.pagesize))});
        }
    }

    render() {
        let {data, loadCustomersData, dataset_id, pagesize} = this.props;
        let {currentPage} = this.state;
        let totalRecords = data.count,
            totalPages = Math.ceil(totalRecords / pagesize),
            totalIndexButtons = totalPages,
            totalVisibleButtons = totalIndexButtons,
            buttonIndex = 0,
            buttonLimit = 9,
            indexButtons = [];

        let self = this;
        if (totalIndexButtons > buttonLimit) {
            totalVisibleButtons = buttonLimit;

            if (currentPage > (buttonLimit/2)) {
                buttonIndex = currentPage - Math.ceil((buttonLimit/2));
                totalVisibleButtons = buttonIndex + buttonLimit;

            }
            if(currentPage > (buttonLimit/2) && currentPage >= (totalPages - (buttonLimit/2))) {
                buttonIndex = totalPages - buttonLimit;
                totalVisibleButtons = totalPages;
            }

        }
        for (let i = buttonIndex; i < totalVisibleButtons; i++) {
            indexButtons.push(<li key={i + 1} className={(currentPage === i + 1) ? styles.active : ''}
                                  onClick={() => {
                                      loadCustomersData({dataset_id, pageno: (i + 1), pagesize})
                                      self.setState({currentPage:  i + 1});
                                  }}>{i + 1}</li>);
        }

        return <div className={styles.wrapper}>
            <div className={styles.paginationWrap}>
            <span className={classNames(styles.prev, "fleft")}
                  onClick={() => {
                      ((currentPage > 1 ) ? this.setState({currentPage: currentPage -= 1}) : this.setState({currentPage: 1}));
                      loadCustomersData({dataset_id, pageno: ((currentPage > 1 ) ? currentPage : 1), pagesize})
                  }}/>
                <ul className={classNames(styles.pageination, 'fleft')}>
                    {indexButtons}
                </ul>
                <span className={classNames(styles.next, "fleft")}
                      onClick={() => {
                          ((currentPage < totalIndexButtons ) ? this.setState({currentPage: currentPage += 1}) : this.setState({currentPage: totalIndexButtons}));
                          loadCustomersData({dataset_id, pageno: ((currentPage < totalIndexButtons ) ? currentPage : totalIndexButtons), pagesize})
                      }}/>
            </div>
        </div>
    }
}
