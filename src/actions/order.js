import EndPoints from "../providers/endPoints";
import Request from "../providers/request";

export const OrderTypes = {
    NO_STATE: null,
    IN_REQUEST: 'IN_REQUEST',
    IN_REQUEST_SCHEDULED: 'IN_REQUEST_SCHEDULED',
    IN_LOCATION_CONFIRMED: 'IN_LOCATION_CONFIRMED',
    IN_LOCATION_SKIPPED: 'IN_LOCATION_SKIPPED',
    IN_SUBMITTED: 'IN_SUBMITTED',
    IN_SCHEDULED: 'IN_SCHEDULED',
    IN_CANCELED: 'IN_CANCELED',
    IN_PROGRESS: 'IN_PROGRESS',
    IN_RATING: 'IN_RATING',
    IN_REPORTING: 'IN_REPORTING'
};

export const setOrderStatus = orderStatus => ({
    type: 'SET_ORDER_STATUS',
    orderStatus
});
export const setOrderPosition = orderPosition => ({
    type: 'SET_USER_ORDER_POSITION',
    orderPosition
});

export const setScheduleModalVisibility = isScheduleModalVisible => ({
    type: 'SET_SCHEDULE_MODAL_VISIBILITY',
    isScheduleModalVisible
});

export const setScheduleOrderData = orderScheduleDate => ({
    type: 'SET_SCHEDULE_ORDER_DATA',
    orderScheduleDate
});


export const setScheduleDataSubmitted = isScheduledDateSubmitted => ({
    type: 'SET_SCHEDULE_DATA_SUBMITTED',
    isScheduledDateSubmitted
});

export const setVisits = visits => ({
    type: 'SET_PATIENT_VISITS',
    visits
});

export const setisitDetails = visitDetails => ({
    type: 'SET_PATIENT_VISIT_DETAILS',
    visitDetails
});


export const setDiagnosesList = diagnoses => ({
    type: 'SET_DIAGNOSES_list',
    diagnoses
});


/**
 * Above Actions
 * -------------------
 * Below Functions
 * */


export const updateOrderStatus = (orderStatus) => dispatch => {
    dispatch(setOrderStatus(orderStatus));
};

export const updateOrderUserPosition = (orderPosition) => dispatch => {
    dispatch(setOrderPosition(orderPosition));
};

export const updateScheduleModalVisibility = (isScheduleModalVisible) => dispatch => {
    dispatch(setScheduleModalVisibility(isScheduleModalVisible));
};

export const updateScheduleOrder = (orderScheduleDate) => async dispatch => {

    if(!orderScheduleDate){
        /**
         * If Un Set Schedule Order or Canceled
         * **/
        await dispatch(setOrderStatus(OrderTypes.NO_STATE));
        await dispatch(setScheduleOrderData(null));
        return;
    }

    await dispatch(setOrderStatus(OrderTypes.IN_REQUEST));
    await dispatch(setScheduleOrderData(orderScheduleDate));
};

export const getVisites = () => async dispatch => {


    return Request.get(`${EndPoints.VISITS}`).then(function(result){
        debugger
        dispatch(setVisits(result.patient.visits));
        console.log(result);
    }).catch(function(error){
        debugger
        console.log(error);
    });
};


export const getVisiteDetails = (visitId) => async dispatch => {


   return Request.get(`${EndPoints.VISITS}/${visitId}`).then(function(result){
        debugger
        dispatch(setVisits(result.patient.visits));
        console.log(result);
    }).catch(function(error){
        debugger
        console.log(error);
    });
};

export const getDiagnosesList = () => async dispatch => {


   return Request.get(`${EndPoints.DIAGNOSES}`).then(function(result){
        debugger
        dispatch(setDiagnosesList(result.patient.visits));
        console.log(result);
    }).catch(function(error){
        debugger
        console.log(error);
    });
};


export const updateScheduleDataSubmitted = (isScheduledDateSubmitted) => dispatch => {
    dispatch(setScheduleDataSubmitted(isScheduledDateSubmitted));
};
