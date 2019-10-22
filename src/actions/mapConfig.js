import {ACTIONS} from '../types/mapTypes';

export const MapType = {
    standard: 'standard',
    satellite: 'satellite'
};

export const setMapType = mapType => ({
    type: ACTIONS.SET_MAP_TYPE,
    mapType
});
export const setMapTraffic = isMapTraffic => ({
    type: ACTIONS.SET_MAP_TRAFFIC,
    isMapTraffic
});

export const setOnRegionChange = isRegionChange => ({
    type: ACTIONS.SET_REGION_CHANGE,
    isRegionChange
});

export const setLoader = isLoading => ({
    type: ACTIONS.SET_LOADER,
    isLoading
});

export const setUserCurrentPosition = userPosition => ({
    type: ACTIONS.SET_USER_CURRENT_POSITION,
    userPosition
});

export const setUserTargetPosition = userTargetPosition => ({
    type: ACTIONS.SET_USER_TARGET_POSITION,
    userTargetPosition
});


export const setMapMovePosition = (isMoving, mapNewPosition) => ({
    type: ACTIONS.SET_MAP_NEW_TARGET_POSITION,
    isMoving,
    mapNewPosition
});

export const setDoctorsNearByOnMap = doctorsNearBy => ({
    type: ACTIONS.SET_DOCTORS_NEAR_BY_ON_MAP,
    doctorsNearBy
});


export const setDoctorInformation = doctorInfo => ({
    type: ACTIONS.SET_DOCTOR_INFO,
    doctorInfo
});


export const updateMapType = (mapType = MapType.standard) => dispatch => {
    dispatch(setMapType(mapType));
};

export const updateMapTraffic = (isMapTraffic) => dispatch => {
    dispatch(setMapTraffic(isMapTraffic));
};

export const updateOnRegionChange = (isRegionChange) => dispatch => {
    dispatch(setOnRegionChange(isRegionChange));
};

export const updateLoading = (isLoading) => dispatch => {
    dispatch(setLoader(isLoading));
};

export const updateUserCurrentPosition = (userPosition) => dispatch => {
    dispatch(setUserCurrentPosition(userPosition));
};

export const updateUserTargetPosition = (userTargetPosition) => dispatch => {
    dispatch(setUserTargetPosition(userTargetPosition));
};
