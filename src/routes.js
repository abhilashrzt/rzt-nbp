import {getHooks} from "./utils";
import {
    actionSagaLoadDatasets,
    actionLeaveDatasetsPage,
    actionSagaDatasetListener,
    actionUpdateDatasets,
    actionUpdateDatasetProgress,
    actionSagaUnsubscribeDatasetListener
} from "./pages/Datasets/Datasets.actions";
import {actionSagaLoadCustomer, actionLeaveFeedbackPage} from "./pages/Feedback/Feedback.actions";
import {actionSagaLoadSegmentsList, actionLeaveAnalysePage} from "./pages/Analyse/Analyse.actions";
import {
    actionSagaLoadCustomersList,
    actionSagaLoadCondensedSegmentsList,
    actionLeaveCustomersPage
} from "./pages/Customers/Customers.actions";
import {URL_SUBSCRIBE_DATASETS, URL_DATASETS_PROGRESS} from "./pages/Datasets/Datasets.constants";
import {actionHideNotificationBar} from "./pages/Global/Global.actions";

export default function createRoutes(store) {
    const {injectReducer, injectSagas} = getHooks(store);

    return [
        {
            path: "datasets",
            page: "datasets",
            getComponent(location, cb) {
                require.ensure(['./pages/Datasets/Datasets', './pages/Datasets/Datasets.sagas', './pages/Datasets/Datasets.reducers'],
                    require => {
                        const Dataset = require('./pages/Datasets/Datasets').default;
                        const DatasetSagas = require('./pages/Datasets/Datasets.sagas').default;
                        const DatasetReducer = require('./pages/Datasets/Datasets.reducers').default;
                        const Header = require('./components/PageHeader').pageHeader;

                        injectReducer('DatasetReducer', DatasetReducer);
                        injectSagas(DatasetSagas);
                        store.dispatch(actionSagaLoadDatasets());
                        store.dispatch(actionHideNotificationBar());

                        // SUBSCRIBE
                        store.dispatch(actionSagaDatasetListener({
                            cb : ( data ) => {
                                try {
                                    console.log("Listener", data)
                                    if (data && data.body)
                                        store.dispatch(actionUpdateDatasets(JSON.parse(data.body)))
                                } catch(e){
                                    console.log(e)
                                }
                             },
                            url: URL_SUBSCRIBE_DATASETS }));

                        store.dispatch(actionSagaDatasetListener( {
                            cb : ( data ) => {
                                try {
                                    console.log("Listener", data)
                                    if (data && data.body)
                                        store.dispatch(actionUpdateDatasetProgress(JSON.parse(data.body)))
                                } catch(e){
                                    console.log(e)
                                }
                             },
                            url: URL_DATASETS_PROGRESS }));

                        cb(null, {
                            header: Header,
                            main: Dataset
                        });
                    }
                );
            },
            onChange: () => {
                store.dispatch(actionSagaUnsubscribeDatasetListener());
                store.dispatch(actionLeaveDatasetsPage());
            },
            onLeave: () => {
                store.dispatch(actionSagaUnsubscribeDatasetListener());
                store.dispatch(actionLeaveDatasetsPage());
            }
        },
        {
        /*/datasets/:id/analyse?level=1&pageno=2*/
            path: "datasets/:datasetId/segments",
            page: "segments",
            getComponent(nextLocation, cb) {
                require.ensure(['./pages/Analyse/Analyse', './pages/Analyse/Analyse.sagas', './pages/Analyse/Analyse.reducers'],
                    require => {
                        const Analyse = require('./pages/Analyse/Analyse').default;
                        const AnalyseSagas = require('./pages/Analyse/Analyse.sagas').default;
                        const AnalyseReducer = require('./pages/Analyse/Analyse.reducers').default;
                        const Header = require('./components/PageHeader').pageHeader;

                        injectReducer('analyse', AnalyseReducer);
                        injectSagas(AnalyseSagas);
                        store.dispatch(actionSagaLoadSegmentsList({
                            dataset_id: Number(nextLocation.params.datasetId),
                            level: Number(nextLocation.params.segmenttLevel || 0),
                            pageno: Number(nextLocation.location.query.pageno||1),
                            sortby: nextLocation.location.query.sortby
                        }));
                        store.dispatch(actionHideNotificationBar());

                        cb(null, {
                            header: Header,
                            main: Analyse
                        });
                    }
                );
            },
            onChange: () => {
                store.dispatch(actionLeaveAnalysePage());
            },
            onLeave: () => {
                store.dispatch(actionLeaveAnalysePage());
            }
        },
        {
        /*/datasets/:id/customers?segmentId=1&segmentName=SEGMENTNAME&pageno=2*/
            path: "/datasets/:datasetId/customers",
            page: "customers",
            getComponent(nextLocation, cb) {
                require.ensure(['./pages/Customers/Customers', './pages/Customers/Customers.sagas', './pages/Customers/Customers.reducers'],
                    require => {
                        const Customers = require('./pages/Customers/Customers').default;
                        const CustomersSagas = require('./pages/Customers/Customers.sagas').default;
                        const CustomersReducer = require('./pages/Customers/Customers.reducers').default;
                        const Header = require('./components/PageHeader').pageHeader;

                        injectReducer('customers', CustomersReducer);
                        injectSagas(CustomersSagas);

                        store.dispatch(actionSagaLoadCustomersList({
                            pagesize: 100,
                            pageno: Number(nextLocation.location.query.pageno||1),
                            dataset_id: Number(nextLocation.params.datasetId),
                            sortby: nextLocation.location.query.sortby,
                            segment_id: Number(nextLocation.location.query.segmentId)
                        }));

                        store.dispatch(actionSagaLoadCondensedSegmentsList({dataset_id: Number(nextLocation.params.datasetId)}));

                        cb(null, {
                            header: Header,
                            main: Customers
                        });
                    }
                );
            },
            onChange: () => {
                store.dispatch(actionLeaveCustomersPage());
            },
            onLeave: () => {
                store.dispatch(actionLeaveCustomersPage());
            }
        },
        {
        // /datasets/:id/feedback?customerId
            path: "/datasets/:datasetId/customers/:customerId",
            getComponent(nextLocation, cb) {
                require.ensure(['./pages/Feedback/Feedback', './pages/Feedback/Feedback.sagas', './pages/Feedback/Feedback.reducers'],
                    require => {
                        const Customer = require('./pages/Feedback/Feedback').default;
                        const CustomerSagas = require('./pages/Feedback/Feedback.sagas.js').default;
                        const CustomerReducer = require('./pages/Feedback/Feedback.reducers.js').default;
                        const Header = require('./components/PageHeader').pageHeaderCustomer;

                        injectReducer('customers', CustomerReducer);
                        injectSagas(CustomerSagas);

                        store.dispatch(actionSagaLoadCustomer({
                            dataset_id: Number(nextLocation.params.datasetId),
                            id: Number(nextLocation.params.customerId)
                        }));
                        store.dispatch(actionHideNotificationBar());
                        cb(null, {
                            header: Header,
                            main: Customer
                        });
                    }
                );
            },
            onChange: () => {
                store.dispatch(actionLeaveFeedbackPage());
            },
            onLeave: () => {
                store.dispatch(actionLeaveFeedbackPage());
            }
        }
    ]

}