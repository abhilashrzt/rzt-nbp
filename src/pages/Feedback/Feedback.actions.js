import {
    LOAD_CUSTOMERS_PROFILE_DATA,
    LOAD_CUSTOMERS_PROFILE_DATA_SAGA,
    ACTION_LOAD_CUSTOMERS_SAGA,
    ACTION_LEAVE_CUSTOMERS_PAGE,
    ACTION_LOAD_CUSTOMERS,
    ACTION_LOAD_CUSTOMER_SAGA,
    ACTION_LOAD_CUSTOMER,
    ACTION_HIDE_LOADER,
    ACTION_LEAVE_FEEDBACK_PAGE
} from './Feedback.constants';

// export const loadCustomerProfileData = (data) => ({
//     type: LOAD_CUSTOMERS_PROFILE_DATA,
//     payload: data
// });


export const loadCustomerProfileDataSaga = (data) => ({
    type: LOAD_CUSTOMERS_PROFILE_DATA_SAGA,
    payload: data
});

// export const actionSagaLoadCustomers = (data) => ({
//     type: ACTION_LOAD_CUSTOMERS_SAGA,
//     payload: data || '-1'
// });

// export const actionLoadCustomers = (data) => ({
//     type: ACTION_LOAD_CUSTOMERS,
//     payload: data
// });

export const actionSagaLoadCustomer = (data) => ({
    type: ACTION_LOAD_CUSTOMER_SAGA,
    payload: data
});

export const actionLoadCustomer = (data) => ({
    type: ACTION_LOAD_CUSTOMER,
    payload: data
});

export const actionLeaveFeedbackPage = () => ({
    type: ACTION_LEAVE_FEEDBACK_PAGE
});