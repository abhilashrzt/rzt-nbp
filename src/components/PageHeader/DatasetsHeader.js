/**
 * Created by vinojv on 14/11/16.
 */
import * as React from "react";
import CSSModules from "react-css-modules";
import styles from "./PageHeader.css";
import logoPath from "./../../images/logo.png";
import {Link} from "react-router";
import DownloadFile from './../../components/DownloadFile/DownloadFile';
import {connect} from 'react-redux';
import {actionSagaDownloadCustomers} from './../../pages/Analyse/Analyse.actions';
import DownloadSegmentsPopup from '../DownloadCustomers/DownloadCustomers'

@CSSModules(styles, {allowMultiple: true})
class PageHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            showDownload: false
        }
    }
    render() {
        let {route, downloadStatus, prepareForDownload} = this.props;

        return (
            <header styleName='header'>
                <a styleName='header__logo' className="fleft">
                    <img src={logoPath} alt="logo"/>
                </a>
                {route.page == 'datasets' && <h2 styleName='header__title' className="fleft">
                    <span className="text-bold">NEXT BEST PRODUCT - BFSI</span>
                </h2>}

                { (route.page == 'segments' || route.page == 'customers') && <h2 styleName='header__title' className="fleft text-bold">
                    <Link className="back-button flaticon-arrows"
                          to={`${route.page == 'customers' ? `/datasets/${this.props.params.datasetId}/segments` : '/datasets'}`}/>
                    BACK
                    TO {(route.page == 'customers') ? 'SEGMENTS' : 'DATASETS'}
                </h2>}

                { (route.page == 'segments') && <DownloadFile
                                                            downloadStatus={downloadStatus}
                                                            prepareForDownload={()=>{
                                                                this.setState({showDownload: true})
                                                                 {/*preapareForDownload(Number(this.props.params.datasetId))*/}
                                                            }
                                                             }/>}
                {(route.page == 'segments') && this.state.showDownload && <DownloadSegmentsPopup
                    close={()=>{ this.setState({showDownload: false})}}
                    dataset_id={this.props.params.datasetId}
                    segments={this.props.segments}/>}

            </header>
        );
    }
}

const mapToProps = (state) => {
    return ({
        downloadStatus: state.global.download,
        segments: _.get(state, _.toPath("analyse.segments"), [])
    })
}, dispatcher = (dispatch) => ({
    preapareForDownload: (id) => {
        dispatch(actionSagaDownloadCustomers({ dataset_id: id }));
    }
});

export default connect(mapToProps, dispatcher)(PageHeader);