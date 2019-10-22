import {ACTIONS} from '../types/locationTypes';

const initState = {
    positionDetails: null,
    error: null,
    isSuccess: false,
    savedLocations:[],
    searchList:[],
    searchAddressPosition:null
};

const LocationReducer = (state = initState, action) => {
    switch (action.type) {
        case ACTIONS.SET_POSITION_DETAILS:
            return {...state, positionDetails: action.positionDetails};
        case ACTIONS.SET_ERROR:
            return {...state, error: action.error};
        case ACTIONS.SET_IS_SUCCESS:
            return {...state, isSuccess: action.isSuccess};
        case ACTIONS.SET_SAVED_LOCATIONS:
            return {...state, savedLocations: action.savedLocations};
        case ACTIONS.SET_SEARCH_LIST:
            return {...state, searchList: action.searchList};
        case ACTIONS.SET_SEARCH_ADDRESS_POSITION:
            return {...state, searchAddressPosition: action.searchAddressPosition};
        default:
            return state;
    }
};

export default LocationReducer;