import * as React from 'react';
import TransitionGroup from 'react-addons-transition-group';
import {dateformatter} from '../../utils/formatter';
import CSSModules from 'react-css-modules';
import Button from './../../components/Button/Button';
import Dataset from './../../components/Dataset/Dataset';
import SegmentedBody from './SegmentedBody';
import styles from './DatasetList.css';
import DatasetChart from './../../containers/DatasetChart/DatasetChart';
import DatasetBarGraph from './../../containers/DatasetBarGraph/DatasetBarGraph';

const moment = require('moment');

const getDurationEntities = (duration) => {
    let time = Number(duration);
    var minutes = Math.floor(time % 3600 / 60)
    var hours = Math.floor(time / 3600);
    var seconds = Math.floor(duration % 3600 % 60);
    return {hours, minutes, seconds};
}

const getDurationFromSeconds = (duration) => {
    if (!duration) return '--';
    let {hours, minutes, seconds} = getDurationEntities(duration);

    return `${_.padStart(hours, 2, "0")}:${_.padStart(minutes, 2, "0")}:${_.padStart(seconds.toFixed(0), 2, "0")}`
}
const geteEtaFromSeconds = (duration) => {
    if (!duration) return '--';
    let {hours, minutes, seconds} = getDurationEntities(duration);
    return `${_.padStart(hours, 2, "0")}h ${_.padStart(minutes, 2, "0")}m ${seconds ? _.padStart(seconds.toFixed(0), 2, "0") : ''}`;
}

const nFormatter = function (num = 0, digits) {
    var si = [
        {value: 1E18, symbol: "E"},
        {value: 1E15, symbol: "P"},
        {value: 1E12, symbol: "T"},
        {value: 1E9, symbol: "G"},
        {value: 1E6, symbol: "M"},
        {value: 1E3, symbol: "K"}
    ], rx = /\.0+$|(\.[0-9]*[1-9])0+$/, i;
    for (i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
        }
    }
    return (num || 0).toFixed(digits).replace(rx, "$1");
}

const DatasetBodyComp = ({gotoSegment, id, type, fields, changeAction}) => {
    let charts = fields.charts;
    if (charts) {
        var giniChart = charts.find(chart => chart.name == 'GINI CHART');
        var rankingChart = charts.find(chart => chart.name == 'RANKING CHART');
    }
    fields = fields.meta;
    var completed_at = `${fields.completed_at ? moment(fields.completed_at).format("DD MMM YYYY, hh:mm a") : ''}`;
    var duration = getDurationFromSeconds(fields.duration);
    var eta = geteEtaFromSeconds(fields.eta);
    return (
        <div styleName="wrapper">
            {fields.msg_id == 'UPLOADED' && <ul>
                <li styleName="status-list__item grid-1">
                    <h4 styleName="body__title">
                        Please wait while data is in queue for processing.
                        <br />
                    </h4>
                </li>
            </ul>}
            { <h4 styleName="body__title">{fields.message}</h4>}
            { (fields.msg_id == 'PROCESSING_ERROR') && <ul styleName="status-list">
                <li styleName="status-list__item grid-4 button-grp">
                    <Button className={{local: 'status-list__action-button'}}
                            text={'RERUN'}
                            onClick={() => {
                                changeAction({type: "rerun", dataset_id: id})
                            }}/>
                </li>
            </ul>
            }
            { (fields.msg_id == 'PREPARE') && <ul styleName="status-list">
                <li styleName="status-list__item grid-4 button-grp">
                    <Button className={{local: 'status-list__action-button'}}
                            text={fields.msg_id}
                            onClick={() => {
                                changeAction({type: (fields.msg_id || '').toLowerCase(), dataset_id: id})
                            }}/>
                </li>
            </ul>
            }
            { (fields.msg_id == 'SEGMENT' || fields.msg_id == 'PREPARED') && <ul styleName="status-list">
                <li styleName="status-list__item grid-4 button-grp">
                    <Button className={{local: 'status-list__action-button'}}
                            text={'SEGMENT'}
                            onClick={() => {
                                changeAction({type: ('SEGMENT').toLowerCase(), dataset_id: id})
                            }}/>
                </li>
            </ul>
            }
            { false && fields.msg_id == 'PREPARING' &&
            <div styleName="status-wrapper">
                <ul styleName="status-list">
                    <li styleName="status-list__item grid-1" className="vert-center">
                        <div styleName="status-list__text status-ready">
                            <div styleName="in-col-1">
                                <div styleName="status-list__text__sub-title" style={{minHeight: '50px'}}>{fields.message}</div>
                            </div>

                        </div>
                        <div styleName="status-list__secondary-text" style={{marginTop: '15px'}}>
                            <div className="disp-block">Duration: {duration || '--'} | ETA: {eta || '--'}</div>
                        </div>
                    </li>
                </ul>
            </div>
            }
            { (fields.msg_id == 'PREPARING' || fields.msg_id == 'SEGMENTING' || fields.msg_id == 'TRAINING' || fields.msg_id == 'DEPLOYING') &&
            <div styleName="status-wrapper">
                <ul styleName="status-list">
                    <li styleName="status-list__item grid-4 progress">
                        <div styleName="status-list__text status-ready">
                            <span styleName="status-list__text__title">{fields.progress || 0}%</span>
                            <div styleName="in-col-2">
                                <div styleName="status-list__text__sub-title">
                                    IN PROGRESS
                                    <br/>
                                    <div styleName="status-list__secondary-text">
                                        Duration: {duration || '--'} <br/> ETA: {eta || '--'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>

                    {/*fields.msg_id !== 'DEPLOYING' && <li styleName="status-list__item action-col grid-4 button-grp">
                     <Button className={{local: 'status-list__action-button'}}
                     onClick={()=> {
                     changeAction({type: 'abort', id: id})
                     }}>
                     <span>ABORT</span>
                     </Button>
                     </li>*/}

                </ul>
            </div>
            }
            { (fields.msg_id == 'SEGMENTED' || fields.msg_id == 'DEPLOYED_TO_PRODUCTION') &&
            <SegmentedBody fields={fields} completedAt={completed_at} duration={duration} eta={eta} charts={charts}
                           giniChart={giniChart} rankingChart={rankingChart} gotoSegment={gotoSegment}
                           changeAction={changeAction} type={type} id={id}/> }

            { (fields.msg_id == 'TRAINED' || fields.msg_id == 'SEGMENT_MODIFIED') && <ul styleName="status-list">
                <li styleName="status-list__item grid-4">
                    <div
                        styleName={`status-list__text ${fields.msg_id == 'SEGMENTS-MODIFIED' ? 'status-error' : 'status-ready'}`}>
                        <span styleName="status-list__text__title">{nFormatter(fields.segments, 1) || 0}</span>
                        <span styleName="status-list__text__sub-title">SEGMENTS <br/>DERIVED</span>
                    </div>
                    <h5 styleName="status-list__secondary-text">
                        Completed at: {completed_at || '--'} <br />
                        Duration: {duration || '--'}</h5>
                </li>
                {!!fields.gini && <li styleName="status-list__item grid-4">
                    <div
                        styleName={`status-list__text ${fields.msg_id == 'SEGMENTS-MODIFIED' ? 'status-error' : 'status-ready'}`}>
                        <span styleName="status-list__text__title">{fields.gini}</span>
                        <span styleName="status-list__text__sub-title">GINI SCORE</span>
                    </div>
                </li>}
                { !!fields.error && <li styleName="status-list__item grid-4">
                    <div
                        styleName={`status-list__text ${fields.msg_id == 'SEGMENTS-MODIFIED' ? 'status-error' : 'status-ready'}`}>
                        <span styleName="status-list__text__title">{fields.error}</span>
                        <span styleName="status-list__text__sub-title">% ERROR</span>
                    </div>
                </li>}
                <li styleName="status-list__item action-col grid-4 button-grp three-button-list">
                    <Button className={{local: 'status-list__action-button'}}
                            onClick={() => {
                                gotoSegment(`/datasets/${id}/segments`)
                            }}>
                        <span>VIEW SEGMENTS</span>
                    </Button>
                    <Button className={{local: 'status-list__action-button'}}
                            text="RETRAIN"
                            onClick={() => {
                                changeAction({type: 'train', dataset_id: id})
                            }}/>
                    <Button className={{local: 'status-list__action-button'}}
                            text="DEPLOY TO PRODUCTION"
                            onClick={() => {
                                changeAction({type: 'deploy_to_production', dataset_id: id})
                            }}/>
                </li>
            </ul>}
            { charts && <div styleName="graph-wrapper">
                <div styleName="graph" className="clearfix">
                    { giniChart && giniChart.value.length > 0 && <div styleName="graph-container">
                        <DatasetChart data={giniChart}/>
                    </div> }
                    { rankingChart && rankingChart.value.length > 0 && <div styleName={`graph-container bar`}>
                        <DatasetBarGraph data={rankingChart}/>
                    </div> }
                </div>
            </div> }
        </div>)
}

const DatasetBody = CSSModules(DatasetBodyComp, styles, {allowMultiple: true});

class DatasetList extends React.Component {
    static propTypes = {records: React.PropTypes.array};
    static defaultProps = {records: []}

    constructor(props) {
        super(props);
    }

    getHeadFields = (record) => ([
        {title: "FILENAME", value: record.fileName},
        {title: "SIZE", value: record.sizeInMB ? record.sizeInMB.toFixed(2) + ' MB' : ''},
        {title: "UPLOADED ON", value: dateformatter(record.uploaded_on)},
        {title: "STATUS", value: record.status.state}
    ]);

    render() {
        let {records, gotoSegment, changeAction, deleteAction, togglePopup} = this.props;
        return (
            <TransitionGroup>
                <Dataset records={ records }
                         togglePopup={togglePopup}
                         gotoSegment={ gotoSegment }
                         changeAction={ changeAction }
                         deleteAction={ deleteAction }
                         getHeadFields={ this.getHeadFields }
                         bodyContent={ DatasetBody }
                         getFieldColor={ () => ({}) }
                         page={ "dataset" }/>

            </TransitionGroup>
        );
    }
}



export default DatasetList;