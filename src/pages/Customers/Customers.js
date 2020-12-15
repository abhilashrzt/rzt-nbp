import * as React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import _ from 'lodash';

import CSSModules from "react-css-modules";
import styles from "./Customers.css";
import DropDown from "./../../components/DropDown/DropDown";
import CustomerList from "./../../containers/CustomerList/CustomerList";
import Pagination from "./../../components/Pagination/Pagination";
import classNames from "classnames";
import {actionSagaLoadCustomersList, actionSagaLoadCondensedSegmentsList} from "./Customers.actions.js";

const dropdownOptions = [
    { id: 1, name: 'CUSTOMER ID' },
    // { id: 2, name: 'AFFLUENCE'} ,
    // { id: 3, name: 'PROFILE'},
    // { id: 4, name: 'LIFECYCLE_PROPENSITY'},
    { id: 5, name: 'EVENT'}];

const maps = {
    'AVG AGE' : 'age',
    'CUSTOMER ID': 'id',
    'AFFLUENCE' : 'affluence',
    'PROFILE' : 'segment_propensity',
    // 'LIFECYCLE_PROPENSITY' : 'lifecycle_propensity',
    // 'OVERALL PROPENSITY' : 'overall_propensity',
    'EVENT' : 'event_propensity'
};
const revmaps = _.reduce(maps, (acc, value, key)=>({
    ...acc,
    [value]: key
}), { })


class Customers extends React.Component {

    constructor(props, ags) {
        super(props, ags);
        this.state = {
            sortBy: 'name',
            sortOrder: 'Ascending'
        }
    }

    render() {


        {/*<DropDownTreeList options={segmentsList}*/}
        {/*onClick={(segment) => {*/}
        {/*gotoSegment(`/datasets/${this.props.params.datasetId}/customers?segmentId=${segment.id}&segmentName=${segment.name}&pageno=1`)*/}
        {/*}}*/}
        {/*globalClass={'fright margin-l-15'}*/}
        {/*OptionsTitle={'SEGMENT'}*/}
        {/*selectedOptionId={segmentId}/>*/}

        let {customer, gotoSegment, loadCustomers, segmentsList} = this.props;
        let {segmentId, segmentName, sortby} = this.props.location.query;
        let selected =  revmaps[(sortby||'').replace('-','')];
        let selectedOption = selected && dropdownOptions.find( item => item.name == selected ).id;
        return (
            <div styleName='wrapper'>
                <div styleName="header" className="clearfix">
                    <div styleName="header__title">
                        <h3 className="fleft">CUSTOMERS</h3>
                    </div>
                    {segmentsList && (segmentsList.length > 0) &&  <DropDown
                        placeholder = { "SORT BY" }
                        options={segmentsList}
                        displayValue={'name'}
                        uKey={'id'}
                        onClick={ ( { id, name } ) => {
                            gotoSegment(`/datasets/${this.props.params.datasetId}/customers?segmentId=${id}&segmentName=${name}&pageno=1`)
                        } }
                        wrapperClass={classNames(styles.segmentDropdown)}
                        globalClass={'fright'}
                        headStyle={"fright"}
                        selectedOption={segmentId} />
                    }
                    <DropDown options={dropdownOptions}
                              placeholder = { "SORT BY" }
                              key={sortby}
                              displayValue={"name"}
                              uKey={"id"}
                              onClick={ ( { name } ) => {

                                  let url = `/datasets/${this.props.params.datasetId}/customers?`;
                                  if (segmentId) url = `${url}&segmentId=${segmentId}`
                                  if (segmentName) url = `${url}&segmentName=${segmentName}`
                                  url = `${url}&sortby=${maps[name]}`;

                                  gotoSegment(url);
                              } }
                              selectedOption ={ selectedOption }
                              wrapperClass={classNames(styles.segmentDropdown)}
                              globalClass={'fright'}
                              sortable= { true }
                              toggleSort = { () =>{

                                  let url = `/datasets/${this.props.params.datasetId}/customers?`;
                                  if (segmentId) url = `${url}&segmentId=${segmentId}`
                                  if (segmentName) url = `${url}&segmentName=${segmentName}`

                                  if (sortby) {
                                      if (sortby.includes('-'))
                                          url = `${url}&sortby=${sortby.replace('-','')}`
                                      else
                                          url = `${url}&sortby=-${sortby}`

                                  };

                                  gotoSegment(url);

                              }}
                              headStyle={"fright"}
                    />

                </div>
                <div styleName="customerList-wrapper">
                    <div styleName="customerList">
                        { customer && customer.data && <CustomerList
                            sortBy={this.state.sortBy}
                            sortOrder={this.state.sortOrder}
                            onClick={({id})=>{
                                gotoSegment(`/datasets/${this.props.params.datasetId}/customers/${id}?segmentId=${this.props.location.query.segmentId}&segmentName=${this.props.location.query.segmentName}`)
                            }}
                            records={customer.data}
                            gotoSegment={gotoSegment.bind(this)}
                            page={'customers'}/> }
                    </div>
                </div>
                <div styleName="pagination">
                    {customer && <Pagination group_id={customer.segmentid || null}
                                             totalCount={customer.meta && customer.meta.count}
                                             pageNo={customer.meta && customer.meta.pageno || 1}
                                             pagesize={100}
                                             loadPageData={(data)=>{
                                                let url = `/datasets/${this.props.params.datasetId}/customers?`

                                                if (this.props.location.query.segmentId) url = `${url}segmentId=${this.props.location.query.segmentId}`
                                                if (this.props.location.query.segmentName) url = `${url}&segmentName=${this.props.location.query.segmentName}`
                                                if (this.props.location.query.sortby) url = `${url}&sortby=${this.props.location.query.sortby}`

                                                 url = `${url}&pageno=${data.pageno||1}`
                                                 gotoSegment(url);
                                             }}
                                             page={'customers'}/>}
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return ({
        customer: state.customers.customer,
        segmentsList: state.customers.segmentsList
    })
}, dispatcher = (dispatch) => ({
    loadCustomers: (data) => {
        dispatch(actionSagaLoadCustomersList(data))
    },
    loadCondensedSegments: (data) => {
        dispatch(actionSagaLoadCondensedSegmentsList(data))
    },
    gotoSegment: (path) => {
        dispatch(push(path))
    }
});


export default connect(mapToProps, dispatcher)(Customers);
