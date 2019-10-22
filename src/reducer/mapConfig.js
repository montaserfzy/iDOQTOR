import {MapType} from '../actions/mapConfig';
import {ACTIONS} from '../types/mapTypes';

const initState = {
    mapType: MapType.standard,
    isMapTraffic: false,
    isRegionChange: false,
    isLoading: false,
    userPosition: null,
    userTargetPosition: null,
    isMoving: false,
    mapNewPosition: null,
    doctorsNearBy: [],
    doctorInfo: null
};

const MapConfig = (state = initState, action) => {
    switch (action.type) {
        case ACTIONS.SET_MAP_TYPE:
            return {...state, mapType: action.mapType};
        case ACTIONS.SET_MAP_TRAFFIC:
            return {...state, isMapTraffic: action.isMapTraffic};
        case ACTIONS.SET_REGION_CHANGE:
            return {...state, isRegionChange: action.isRegionChange};
        case ACTIONS.SET_LOADER:
            return {...state, isLoading: action.isLoading};
        case ACTIONS.SET_USER_CURRENT_POSITION:
            return {...state, userPosition: action.userPosition};
        case ACTIONS.SET_USER_TARGET_POSITION:
            return {...state, userTargetPosition: action.userTargetPosition};
        case ACTIONS.SET_MAP_NEW_TARGET_POSITION:
            return {...state, mapNewPosition: action.mapNewPosition, isMoving: action.isMoving};
        case ACTIONS.SET_DOCTORS_NEAR_BY_ON_MAP:
            return {...state, doctorsNearBy: action.doctorsNearBy};

        case ACTIONS.SET_DOCTOR_INFO:
            return {...state, doctorInfo: action.doctorInfo};
        default:
            return state;
    }
};

export default MapConfig;