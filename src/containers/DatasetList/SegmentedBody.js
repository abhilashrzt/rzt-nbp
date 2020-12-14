import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './DatasetList.css';
import Button from './../../components/Button/Button';
import {nFormatter} from './../../utils';

// const nFormatter = function (num = 0, digits) {
//     var si = [
//         {value: 1E18, symbol: "E"},
//         {value: 1E15, symbol: "P"},
//         {value: 1E12, symbol: "T"},
//         {value: 1E9, symbol: "G"},
//         {value: 1E6, symbol: "M"},
//         {value: 1E3, symbol: "K"}
//     ], rx = /\.0+$|(\.[0-9]*[1-9])0+$/, i;
//     for (i = 0; i < si.length; i++) {
//         if (num >= si[i].value) {
//             return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
//         }
//     }
//     return (num || 0).toFixed(digits).replace(rx, "$1");
// }

const SegmentedBody = ({fields, completedAt, duration, eta, charts, giniChart, rankingChart, type, gotoSegment, changeAction, id}) => (

    <div styleName="status-wrapper">
        <ul styleName="status-list">
            <li styleName="status-list__item grid">
                <div styleName="status-list__text status-ready">
                    <span styleName="status-list__text__title">{nFormatter(fields.segments, 1) || '0'}</span>
                    <span styleName="status-list__text__sub-title">SEGMENTS<br/>DERIVED</span>
                </div>
            </li>
            <li styleName="status-list__item grid">
                <div
                    styleName={`status-list__text ${fields.msg_id == 'SEGMENTS-MODIFIED' ? 'status-error' : 'status-ready'}`}>
                    <span styleName="status-list__text__title">{fields.gini_score || '--'}</span>
                    <span styleName="status-list__text__sub-title">GINI<br/>SCORE</span>
                </div>
            </li>
            <li styleName="status-list__item grid">
                <div styleName="status-list__secondary-text">
                    <div className="status-list__secondary-text__wrapper">
                        <span styleName="status-list__secondary-text__title">Completed at </span>
                        <span styleName="status-list__secondary-text__value">{ completedAt || '--'}</span>
                        <span styleName="status-list__secondary-text__title">Duration</span>
                        <span styleName="status-list__secondary-text__value">{duration || '--' }</span></div>
                </div>
            </li>
            <li styleName="status-list__item action-col grid button-grp">
                <Button className={{local: 'status-list__action-button'}}
                        onClick={() => {
                            gotoSegment(`/datasets/${id}/segments`)
                        }}>
                    <span>VIEW SEGMENTS</span>
                </Button>
                {(type || '').toUpperCase() == "TRAIN" && fields.msg_id.toUpperCase() !== 'DEPLOYED_TO_PRODUCTION' &&
                <Button className={{local: 'status-list__action-button'}}
                        text="DEPLOY TO PRODUCTION"
                        onClick={() => {
                            changeAction({type: 'deploy', dataset_id: id})
                        }}/>}
                {(type || '').toUpperCase() == "FEED" &&
                <Button className={{local: 'status-list__action-button'}}
                        text="RERUN MODEL"
                        onClick={() => {
                            changeAction({type: 'rerun', dataset_id: id})
                        }}/>}
            </li>
        </ul>
    </div>
)

export default CSSModules(SegmentedBody, styles, {allowMultiple: true});