import * as React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './Analyse.css';
import DropDown from './../../components/DropDown/DropDown';
import AnalyseSegment from './../../containers/AnalyseSegments/AnalyseSegments';
import Pagination from './../../components/Pagination/Pagination';

import classNames from 'classnames';

import { actionSagaLoadSegmentsList } from './Analyse.actions.js';
import { SEGMENTS_LEVELS } from './Analyse.constants.js';

const levels = SEGMENTS_LEVELS;

const dropdownOptions = [{ id: 1, name: 'AVG AGE' },
    { id: 2, name: 'AFFLUENCE'} ,
    { id: 3, name: 'PROFILE'},
    // { id: 4, name: 'LIFECYCLE_PROPENSITY'},
    { id: 5, name: 'EVENT'}];

const maps = {
    'AVG AGE' : 'age',
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


@CSSModules(styles, {allowMultiple: true})
class Analyse extends React.Component {

    constructor(props, ags) {
        super(props, ags);
        this.state= {
            showDownload: false
        }
    }

    render() {
        let { segments, gotoSegment } = this.props;
        let { datasetId } = this.props.params;
        let { segmentLevel, segmentId, segmentName, sortby, pageno } = this.props.location.query;
        let selected =  revmaps[(sortby||'').replace('-','')];
        let selectedOption = selected && dropdownOptions.find( item => item.name == selected ).id;
        return (
            <div styleName='wrapper'>
                <div styleName="header">
                    <div className={"clearfix"}>
                        <div styleName="header__title" className="fleft">
                            <h3>SEGMENTS</h3>
                            {segmentId && segmentName && <ul styleName="filter">
                                <li><span>{levels[segmentLevel - 1]}: <span styleName="highlight">{segmentName}</span></span>
                                    <span className="flaticon-close" styleName="close-filter-ico"
                                        onClick={()=>gotoSegment(`/datasets/${datasetId}/analyse?segmentLevel=${segmentLevel || 0}`)}/>
                                </li>
                            </ul> }
                        </div>

                        <DropDown options={dropdownOptions}
                                  placeholder = { "SORT BY" }
                                  key={sortby}
                                  displayValue={"name"}
                                  uKey={"id"}
                                  onClick={ ( { name } ) => {

                                      let url = `/datasets/${datasetId}/segments?`;

                                      url = `${url}segmentLevel=${(segmentLevel) || 0}`;
                                      if (segmentId) url = `${url}&segmentId=${segmentId}`
                                      if (segmentName) url = `${url}&segmentName=${segmentName}`
                                      url = `${url}&sortby=${maps[name]}`
                                      {/*url = `${url}&pageno=${pageno || 1}`*/}

                                      gotoSegment(url);
                                  } }
                                  selectedOption ={ selectedOption }
                                  wrapperClass={classNames(styles.depthDropdown)}
                                  globalClass={'fright'}
                                  sortable= { true }
                                  toggleSort = { () =>{

                                      let url = `/datasets/${datasetId}/segments?`;

                                      url = `${url}segmentLevel=${segmentLevel || 0}`;
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
                </div>
                <div styleName="analyse-wrapper">
                    <div styleName="analyse">
                        <AnalyseSegment
                            datasetId = {datasetId}
                            records={segments}
                            locationQuery={this.props.location.query}
                            gotoSegment={gotoSegment.bind(this)}
                            isAnalyzePage={true}
                            parent = { true }
                        />
                    </div>
                </div>
                {false && <div styleName="pagination">
                    {segments && <Pagination group_id={''}
                                             totalCount={this.props.count}
                                             pageNo={pageno||1}
                                             pagesize={50}
                                             loadPageData={({ pageno })=>{
                                                 let url = '/segments?';

                                                 url = `${url}segmentLevel=${Number(segmentLevel||0)}`;
                                                 if (segmentId) url = `${url}&segmentId=${id}`
                                                 if (segmentName) url = `${url}&segmentName=${name}`

                                                 if (sortby) {
                                                     url = `${url}&sortby=${sortby}`
                                                 };
                                                 {/*url = `${url}&pageno=${pageno||1}`*/}

                                                 gotoSegment(url);
                                             }
                                             }
                                             page={'analyse'}/>}
                </div>}
            </div>
        );
    }
    
    
}

const mapToProps = (state)=> {
    return ({
        segments: state.analyse.segments
    })
}, dispatcher = (dispatch)=>({
    gotoSegment: (path)=> {
        dispatch(push(path))
    }
});


export default connect(mapToProps, dispatcher)(Analyse);