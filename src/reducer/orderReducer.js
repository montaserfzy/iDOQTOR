const initState = {
    orderStatus: null,
    orderPosition: null,
    isScheduleModalVisible: false,
    orderScheduleDate: null,
    isScheduledDateSubmitted: false,
    visits: null,
    visitDetails: null,
    diagnoses: null
};

const OrderReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_ORDER_STATUS':
            return {...state, orderStatus: action.orderStatus};
        case 'SET_USER_ORDER_POSITION':
            return {...state, orderPosition: action.orderPosition};
        case 'SET_SCHEDULE_MODAL_VISIBILITY':
            return {...state, isScheduleModalVisible: action.isScheduleModalVisible};
        case 'SET_SCHEDULE_ORDER_DATA':
            return {...state, orderScheduleDate: action.orderScheduleDate};
        case 'SET_SCHEDULE_DATA_SUBMITTED':
            return {...state, isScheduledDateSubmitted: action.isScheduledDateSubmitted};


        case 'SET_PATIENT_VISITS':
            return {...state, visits: action.visits};
        case 'SET_PATIENT_VISIT_DETAILS':
            return {...state, visitDetails: action.visitDetails};


        case 'SET_DIAGNOSES_list':
            return {...state, diagnoses: action.diagnoses};

        default:
            return state;
    }
};

export default OrderReducer;