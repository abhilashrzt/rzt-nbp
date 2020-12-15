import * as React from "react";
import _ from 'lodash';

import {connect} from "react-redux";
import CSSModules from "react-css-modules";
import styles from "./Feedback.css";
import classNames from "classnames";
import SecondaryList from "../../components/SecondaryList/SecondaryList";
import TransactionDetails from "../../components/TransactionDetails/TransactionDetails";
import SalesPitchList from "../../components/SalesPitchList/SalesPitchList";
import ListContainer from "../../containers/ListContainer/ListContainer";
import ScoreList from "../../components/ScoreList/ScoreList";
import {actionLoadTransactionsSaga, actionBothLoadTransactions} from "./Feedback.actions";
import * as d3 from "d3";

const length = 10;

const color = d3.scaleLinear()
    .domain([0, length / 2, length])
    .range([d3.rgb("#d12f2f"), d3.rgb('#FFC107'), d3.rgb('#21e1ad')])
    .interpolate(d3.interpolateHcl);

class Customers extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visibility: {
                profile: false,
                salesPitch: false,
            }
        }
    }



    togglePanel(panel) {
        let newVisibility = this.state.visibility;
        newVisibility[panel] = !newVisibility[panel];
        this.setState({visibility: newVisibility});
    }
    getFieldColor(value, label) {
        if (label.toUpperCase() == "LIFECYCLE") {
            return value<0? d3.rgb("#d12f2f"): d3.rgb('#21e1ad')
        }
        return color(value / length)
    }

    getPropensities = propensities => propensities.map( prop => ({ ...prop, value : (prop.value * 100).toFixed(2)}));

    render() {
        let {customersProfile, salesPitch, propensities} = this.props;
        return (
            <div styleName="customers__wrapper" className="clearfix">

                <div styleName={`customers__col1-wrapper ${ !this.state.visibility.profile ? 'hide' : ''}`}
                     className="fleft">
                    <div className={styles.customers__col1}>
                        { customersProfile.map((data, index) => (
                            <SecondaryList listData={data} key={index}/>
                        ))}
                    </div>
                    <button styleName="collapseButton expandButtonRight"
                            onClick={() => this.togglePanel('profile')}
                            data-tooltip="CUSTOMER PROFILES"
                            className={"tooltip"}>
                        <span styleName="arrowLeft"/>
                    </button>
                </div>

                <div styleName="customers__col2" className="fleft">
                    <TransactionDetails transactionRecords={this.props.transactionHistory}
                                        eventRecords={this.props.events}
                                        transactionChart={this.props.transactionChart}/>
                </div>

                <div styleName={`customers__col3-wrapper ${ !this.state.visibility.salesPitch ? 'hide' : ''}`}
                     className="fleft">
                    <div className={styles.customers__col3}>
                        {salesPitch && <div className={styles.actionableInsightsList}>

                            <header className={styles.actionableInsightsList__header}>
                                <span
                                    className={styles.actionableInsightsList__header__title}>ACTIONABLE INSIGHTS</span>
                            </header>
                            <section className={styles.actionableInsightsList__section}>
                                {salesPitch.li_policies && salesPitch.li_policies.length > 0 &&
                                    <SalesPitchList title={'PREMISE & PITCH'} list={salesPitch.li_policies}/>}
                                {salesPitch.reasons_to_buy && salesPitch.reasons_to_buy.length > 0 &&
                                    <SalesPitchList title={'REASONS TO BUY'} list={salesPitch.reasons_to_buy}/>}
                                {salesPitch.reasons_not_to_buy && salesPitch.reasons_not_to_buy.length > 0 &&
                                    <SalesPitchList title={'REASONS NOT TO BUY'} list={salesPitch.reasons_not_to_buy}/>}

                            </section>

                        </div>
                        }
                        { propensities && <ListContainer
                                listTitle={"PROPENSITY"}
                                listData={this.getPropensities(propensities)}
                                globalClass={"flexShrinkZero"}
                                getFieldColor={this.getFieldColor}
                                list={ScoreList}/>
                            }
                    </div>

                    <button styleName="collapseButton expandButtonLeft"
                            onClick={() => this.togglePanel('salesPitch')} data-tooltip="SALES-PITCH"
                            className={classNames("tooltip", "onleft")}>
                        <span styleName="arrowRight"/>
                    </button>

                </div>
            </div>);
    }
}

const mapToProps = (state) => {
    /*TODO: divide the customers data so that they can be easily passed to the components*/
    return ({
        transactionHistory: _.get(state.customers, _.toPath('currentCustomer.transaction_history'), []),
        events: _.get(state.customers, _.toPath('currentCustomer.event'), []),
        customersProfile: _.get(state.customers, _.toPath('currentCustomer.profile'), []),
        salesPitch: _.get(state.customers, _.toPath('currentCustomer.sales_pitch'), {}),
        propensities: _.get(state.customers, _.toPath('currentCustomer.scores'), []),
        transactionChart: _.get(state.customers, _.toPath('currentCustomer.transaction_chart'), []) || [],
        loader: _.get(state.customers, _.toPath('loader'), false)
    })
}, dispatcher = (dispatch) => ({
    /* dispatch event to change the customer */
    // loadCustomer:(action) =>{
    //   dispatch({
    //     type : ACTION_LOAD_CUSTOMER_SAGA,
    //     action : action
    //   })
    // }
});


const customers = CSSModules(Customers, styles, {allowMultiple: true});

export default connect(mapToProps, dispatcher)(customers);
