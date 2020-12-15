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
                Promise.all([import('./pages/Datasets/Datasets'), import('./pages/Datasets/Datasets.sagas'), import('./pages/Datasets/Datasets.reducers'), import('./components/PageHeader')]).then(([
                  DatasetsComp, sagas, reducers, PageHeader
                  ]) => {
                        const Dataset = DatasetsComp.default;
                        const DatasetSagas = sagas.default;
                        const DatasetReducer = reducers.default;
                        const Header = PageHeader.pageHeader;
console.log('her eyo');

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
                Promise.all([import('./pages/Analyse/Analyse'), import('./pages/Analyse/Analyse.sagas'), import('./pages/Analyse/Analyse.reducers'), import('./components/PageHeader')]).then(([
                  AnalyseComp, sagas, reducers, PageHeader
                  ]) => {
                        const Analyse = AnalyseComp.default;
                        const AnalyseSagas = sagas.default;
                        const AnalyseReducer = reducers.default;
                        const Header = PageHeader.pageHeader;

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
                Promise.all([import('./pages/Customers/Customers'), import('./pages/Customers/Customers.sagas'), import('./pages/Customers/Customers.reducers')])
                  .then(([CustomersComp,saga,reducer, PageHeader]) => {
                        const Customers = CustomersComp.default;
                        const CustomersSagas = saga.default;
                        const CustomersReducer = reducer.default;
                        const Header = PageHeader.pageHeader;

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
                    });
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
                Promise.all([import('./pages/Feedback/Feedback'), import('./pages/Feedback/Feedback.sagas'), import('./pages/Feedback/Feedback.reducers')])
                  .then(([FeedbackComp, saga,reducer,PageHeader]) => {
                        const Customer = FeedbackComp.default;
                        const CustomerSagas = saga.default;
                        const CustomerReducer = reducer.default;
                        const Header = PageHeader.pageHeaderCustomer;

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
