import * as React from 'react';
import CSSModules from 'react-css-modules';

import Button from './../../components/Button/Button';


import AnalyseSegments from '../AnalyseSegments/AnalyseSegments';
import AnalyseBarGraph from './../../containers/AnalyseBarGraph/AnalyseBarGraph';
import styles from './TransactionListDetails.css';

const match_key_with_name = (key)=>({name})=>name == key

const findGraph = (arr = [], fn)=>{
    let item = arr.find(fn)
    return (item && item.values)? item.values: [];
}

const nFormatter = function (num, digits) {
    var si = [
        { value: 1E18, symbol: "E" },
        { value: 1E15, symbol: "P" },
        { value: 1E12, symbol: "T" },
        { value: 1E9,  symbol: "G" },
        { value: 1E6,  symbol: "M" },
        { value: 1E3,  symbol: "K" }
    ], rx = /\.0+$|(\.[0-9]*[1-9])0+$/, i;
    for (i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
        }
    }
    return num.toFixed(digits).replace(rx, "$1");
}

const toMillion = number => number / 1000000 + ' M';

@CSSModules(styles, {allowMultiple: true})
class TransactionListDetails extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        let {fields, id, datasetId, gotoSegment, changeAction, records, showChildren, parent, locationQuery} = this.props;
        // let overall_chart = findGraph(fields.graph, match_key_with_name("overall_chart"));
        let lifecycle_chart = findGraph(fields.graphs, match_key_with_name("lifecycle_chart"));
        let event_propensity_chart = findGraph(fields.graphs, match_key_with_name("event_propensity"));
        let segment_propensity_chart = findGraph(fields.graphs, match_key_with_name("segment_chart"));
        return (
            <div styleName="analyse" className="clearfix">
                <div styleName="analyse-main">
                    <div styleName="col-1">

                        <div className="clearfix" styleName="seconday-graph-wrapper">
                            {/*<div styleName="secondary-graph">*/}
                                {/*<span styleName="analyse-col__title">HAS LI</span>*/}
                                {/*<div styleName="analyse-col__graph-container">*/}
                                    {/*<div styleName="analyse-col__graph-container__bg"></div>*/}
                                    {/*<BarGraph width={250} height={170} colorData={ ["#73767C", "#C2C3C6"] }*/}
                                              {/*data={segment_propensity_chart}*/}
                                              {/*gradientId={"secondary"}/>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            <div styleName="secondary-graph">
                                <AnalyseBarGraph data={event_propensity_chart}/>
                            </div>
                            <div styleName="secondary-graph">
                                <span styleName="analyse-col__title">QUARTILES</span>
                                <div styleName="analyse-col__graph-container">
                                    <div styleName='quad-container'>
                                        {fields.quartiles && fields.quartiles.map((avg, index)=><div key = {`Q${index + 1}`} styleName="quantile">
                                            <span styleName="quantile_title">{`Q${index + 1}`}</span>
                                            <span styleName="quantile_value">{avg}%</span>
                                        </div>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div styleName="col-2">
                        {/*<span styleName="analyse-col__title">INSIGHTS</span>*/}
                        {/*<ul className="list-style-dot" styleName="insights-list">*/}
                            {/*<li>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Lorem</li>*/}
                            {/*<li>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Lorem ipsum</li>*/}
                            {/*<li>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Lorem ipsum </li>*/}
                            {/*<li>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Lorem</li>*/}
                        {/*</ul>*/}
                        <div>
                            <div styleName="actionsTextWrapper">
                                <span styleName="actionsText1">{nFormatter(fields.customers, 1)}</span>
                                <span styleName="actionsText2">CUSTOMERS</span>
                            </div>
                            <Button className={{local: 'status-list__action-button'}}
                                    text="VIEW CUSTOMER DETAILS"
                                    onClick={()=> {
                                        gotoSegment(`/datasets/${datasetId}/customers?segmentId=${id}&segmentName=${fields.name}`)
                                        {/*changeAction({type: 'train', id: id})*/}
                                    }}/>
                        </div>

                    </div>
                </div>
                { parent && records && <div className={styles.innerDataset}>
                    <AnalyseSegments records={ records }
                                     gotoSegment={ gotoSegment }
                                     parent={ false }
                                     locationQuery={locationQuery}
                                     showChildren={showChildren}
                                     innerDataset={ true }/>
                </div> }
            </div>
        )
    }
}

export default TransactionListDetails;