import * as React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './Datasets.css';

import DatasetList from '../../containers/DatasetList/DatasetList';
import {actionTogglePopup} from './../../pages/Global/Global.actions';

import {actionDeleteDatasets, actionDeleteDatasetsSaga, actionChangeDatasetAction } from './Datasets.actions';

@CSSModules(styles, {allowMultiple: true})
class Datasets extends React.Component {
    constructor(props, ags) {
        super(props, ags);
    }

    render() {

        let {datasets, gotoSegment, changeAction, deleteAction,togglePopup} = this.props;
        return (
            <div styleName='wrapper'>
                <div styleName="header">
                    <h3 styleName="header__title">DATASETS</h3>
                </div>
                <div styleName="dataset-wrapper">
                        <div styleName="datasets">
                            <DatasetList records={datasets}
                                     togglePopup={togglePopup}
                                     gotoSegment={gotoSegment.bind(this)}
                                     changeAction={changeAction.bind(this)}
                                     deleteAction={deleteAction.bind(this)}/>
                        </div>
                </div>
            </div>
        );
    }
}

const mapToProps = (state)=> {
    return ({
        datasets: state.datasets
    })
}, dispatcher = (dispatch)=>({
    togglePopup: (data) => {
        dispatch(actionTogglePopup(data));
    },
    gotoSegment: (path)=> {
        dispatch(push(path))
    },
    changeAction: (action) => {
        dispatch(actionChangeDatasetAction(action))
    },
    deleteAction: (action) => {
        dispatch(actionDeleteDatasets(action));
        dispatch(actionDeleteDatasetsSaga(action))
    }
});


export default connect(mapToProps, dispatcher)(Datasets);
