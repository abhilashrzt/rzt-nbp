import * as React from 'react';
import CSSModules from "react-css-modules";
import ProgressBar from './../../components/ProgressBar/ProgressBar';
import classNames from 'classnames';
import styles from './DownloadFile.css';

const DownloadFile = ({downloadStatus, prepareForDownload}) => (
    <div styleName={classNames('download-wrapper', downloadStatus && downloadStatus.visible ? 'show-progress' : '')}
         className={classNames('fright', 'clearfix')}>

        {false && <button styleName={`download-button ${ downloadStatus.visible ? 'progressActive' : ''} `}
                          className="fleft"
                          onClick={() => {
                              prepareForDownload();
                          }} disabled={downloadStatus.visible ? true : false}>
            <span styleName="download-button__icon"/>
            <span styleName="download-button__progress-icon"></span>
        </button>
        }
        <button styleName="downloadIcon" className="flaticon-download" onClick={()=>prepareForDownload()}/>
        {downloadStatus && downloadStatus.visible && <div styleName="download-status" className="fleft">
            <span styleName="download-status__title">Preparing...</span>
            <ProgressBar value={downloadStatus && downloadStatus.progress} thumbColor={'#d12f2f'}/>
        </div>}

    </div>
);

export default CSSModules(DownloadFile, styles, {allowMultiple: true});