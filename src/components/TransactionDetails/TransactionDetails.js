import React from "react";
import CSSModules from "react-css-modules";
import classNames from "classnames";
import styles from "./TransactionDetails.css";
import TransactionChart from "../../containers/TransactionChart/TransactionChart";
import TransactionTable from "./../../components/TransactionTable/TransactionTable";
import EventTable from "./../../components/EventTable/EventTable";
import moment from 'moment';

class TransactionDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ui: {
                transactions: true,
                events: false
            },
            txnFilters: {
                min: 0,
                max: 0
            }
        };
        this.setFilters = this.setFilters.bind(this);
    }

    setFilters({min, max}) {
        // this.props.dispatch({type: ACTION_SET_TXN_FILTERS, filters: { min, max }});
        this.setState({
            txnFilters: {
                min: min,
                max: max
            }
        })
    }

    toggleTables = () => {
        this.setState({
            ui: {
                transactions: !this.state.ui.transactions,
                events: !this.state.ui.events
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        // if(this.props.records !== nextProps.records)
        this.setFilters({
            min: 0,
            max: nextProps.transactionChart.length - 1
        });
    }


    render() {
        let {ui, txnFilters} = this.state;
        let {transactionRecords, eventRecords, transactionChart} = this.props;
        const timeSegments = (transactionChart || []).map(d => moment(d.time).set('date', '1').valueOf());
        const minFilter = txnFilters.min;
        const maxFilter= txnFilters.max;

        const records = transactionRecords.filter(d => {
          const min = Math.floor(minFilter);
          let beginning = timeSegments[min];
          if (minFilter > min && min > 0){
            beginning = moment(timeSegments[min]).add(1, 'days')
          }
          let ending = moment(new Date(timeSegments[maxFilter])).add(1, 'months').subtract(1, 'days').valueOf();
          if(!beginning && !ending) return true;
          return (+new moment(d.date, 'DD-MM-YYYY') >= beginning && +new moment(d.date, 'DD-MM-YYYY') <= ending);
        })

        return (
            <div className={styles.rightSection}>
                <TransactionChart records={transactionChart} txnFilters={txnFilters} setFilters={this.setFilters}>
                    <div className="text-align-center">
                        <ul className={classNames(styles.chartList, 'clearfix')}>
                            <li
                                className={ui.transactions && styles.active}
                                onClick={() => {
                                    if (!ui.transactions) this.toggleTables()
                                }}
                            >
                                Transactions
                                <span
                                    className="font-weight-l"> ({records && records.length})</span>
                            </li>
                        </ul>
                    </div>
                </TransactionChart>
                <div className={styles.chartListWrapper}>

                </div>

                <div styleName="customer-tables">
                    { ui.transactions && <TransactionTable
                        records={records}
                        minFilter={txnFilters.min}
                        maxFilter={txnFilters.max}
                        timeSegments={timeSegments}
                    />}

                    { ui.events && <EventTable
                        records={eventRecords}
                        minFilter={txnFilters.min}
                        maxFilter={txnFilters.max}
                        timeSegments={transactionChart && transactionChart.map(d => moment(d.time).set('date', '1').valueOf())}
                    />}


                </div>

            </div>
        )
    }
}


export default (CSSModules(TransactionDetails, styles, {allowMultiple: true}));