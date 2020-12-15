/**
 * Created by vinojv on 14/11/16.
 */
import * as React from "react";
import {Link} from "react-router-dom";
import CSSModules from "react-css-modules";
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import CustomerList from "./../CustomerList/CustomerList";
import styles from "./PageHeader.css";
import logoPath from "./../../images/logo.png";
import classNames from 'classnames';

import { actionSagaLoadCustomer} from '../../pages/Feedback/Feedback.actions';

import {ActionCreators as UndoActionCreators} from 'redux-undo'

const CustomerHeaderComp = ({loadPage, gotoPage, datasetId, toggleList, currentCustomerId, totalCustomers,
    pagesize,
    loadCustomerData, loadCustomersData, id = 0, handleNavigate = () => (0)}) => (
    <div className="text-align-center" styleName="customer-wrapper">

        <div className={styles.title} title={`CUSTOMER ${id}`}>
            <span className={styles.titleText}>CUSTOMER <span className={classNames('text-bold',styles.titleNum)}>{id}</span></span>
        </div>
    </div>
)

const CustomerHeader = CSSModules(CustomerHeaderComp, styles, {allowMultiple: true});


class PageHeaderCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerListToggle: false
        }
    }
    render() {
        let {customerListToggle} = this.state;
        let {customerListData, customerListMeta, loadCustomersData, loadCustomerData, currentCustomerId, totalCustomers} = this.props;
        let pagesize = 50;
        return (
            <div>
                <header styleName='header'>
                    <a styleName='header__logo' className="fleft">
                        <img src={logoPath} alt="logo"/>
                    </a>

                    <CustomerHeader
                        id={this.props.params.customerId}
                        gotoPage={this.props.goBackTo}
                        datasetId={this.props.params.datasetId}
                    />
                    <h2 styleName='header__title' className="fleft text-bold">
                        <Link to={this.props.location.query.segmentId? `/datasets/${this.props.params.datasetId}/customers?segmentId=${this.props.location.query.segmentId}&segmentName=${this.props.location.query.segmentName}&page=1`: `/datasets/${this.props.params.datasetId}/segments`}
                              className="back-button flaticon-arrows"/>
                        {`BACK TO ${this.props.location.query.segmentId? "CUSTOMERS": "SEGMENTS"} LIST`}
                    </h2>
                </header>

            </div>
        );
    }
}
const mapToProps = (state)=> ({ }), dispatcher = (dispatch)=>({
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo()),
    discardChanges: (data, resetChanges) => {
        // dispatch(actionSagaLoadSegments(data));
        resetChanges(0, 0);
    },
    saveSegments: (payload, resetChanges)=> {
        // dispatch(actionUpdateSegmentsSaga(payload));
        resetChanges(1, 0);
    },
    loadCustomersData: (data) => {
        // dispatch(actionSagaLoadCustomers(data));
    },
    loadCustomerData: (data) => {
        dispatch(actionSagaLoadCustomer(data));
    },
    goBackTo: (uri)=> {
        dispatch(push(uri))
    }
});

export default connect(mapToProps, dispatcher)(CSSModules(PageHeaderCustomer, styles, {allowMultiple: true}));
