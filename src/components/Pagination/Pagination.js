import * as React from 'react';
import classNames from 'classnames';
import styles from './Pagination.css';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: !this.props.currentCustomerId ? this.props.pageNo : 1
        }
    }

    componentWillReceiveProps (nextProps){
        if(this.props.currentCustomerId !== nextProps.currentCustomerId || this.props.pageNo !== nextProps.pageNo) {
            this.setState({currentPage: _.get(nextProps, ["pageNo"], Math.ceil((nextProps.currentCustomerId || 1)/nextProps.pagesize))});
        }
    }

    render() {
        let {totalCount, loadPageData, group_id, pagesize, page} = this.props;
        let {currentPage} = this.state;
        let totalRecords = totalCount,
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

        !totalVisibleButtons ? totalVisibleButtons = 1 : '';

        for (let i = buttonIndex; i < totalVisibleButtons; i++) {
            indexButtons.push(<li key={i + 1} className={(Number(currentPage||0) === i + 1) ? styles.active : ''}
                                  onClick={() => {

                                      page == 'customers' ?
                                      loadPageData({segmentid: group_id, pageno: (i + 1), pagesize}) :
                                      loadPageData({group_id, pageno: (i + 1), pagesize});

                                      self.setState({currentPage:  i + 1});
                                  }}>{i + 1}</li>);
        }

        return <div className={styles.wrapper}>
            <div className={styles.paginationWrap}>
            <span className={classNames(styles.prev, styles.jump, "fleft")}
                  onClick={() => {
                      this.setState({ currentPage: 0 })
                      loadPageData({
                          [page == 'customers' ? 'segmentid': 'group_id']: group_id,
                          pageno: 1,
                          pagesize
                      });
                  }}/>
            <span className={classNames(styles.prev, "fleft")}
                  onClick={() => {
                      ((currentPage > 1 ) ? this.setState({currentPage: currentPage -= 1}) : this.setState({currentPage: 1}));

                      page == 'customers' ?
                      loadPageData({segmentid: group_id, pageno: ((currentPage > 1 ) ? currentPage : 1), pagesize}) :
                      loadPageData({group_id, pageno: ((currentPage > 1 ) ? currentPage : 1), pagesize});
                  }}/>
            <ul className={classNames(styles.pageination, 'fleft')}>
                {indexButtons}
            </ul>
            <span className={classNames(styles.next, "fleft")}
                  onClick={() => {
                      ((currentPage < totalIndexButtons ) ? this.setState({currentPage: currentPage += 1}) : this.setState({currentPage: totalIndexButtons}));

                      page == 'customers' ?
                      loadPageData({segmentid: group_id, pageno: ((currentPage < totalIndexButtons ) ? currentPage : totalIndexButtons), pagesize}) :
                      loadPageData({group_id, pageno: ((currentPage < totalIndexButtons ) ? currentPage : totalIndexButtons), pagesize});
                  }}/>
            <span className={classNames(styles.next, styles.jump, "fleft")}
                  onClick={() => {
                      this.setState({ currentPage: totalIndexButtons });
                      loadPageData({
                          [page == 'customers' ? 'segmentid': 'group_id']: group_id,
                          pageno: totalIndexButtons,
                          pagesize
                      });
                  }}/>
            </div>
        </div>
    }
}