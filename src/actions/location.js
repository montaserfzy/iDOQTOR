import Geocode from "react-geocode";
import {mapApiKey} from '../providers/variables';
import Request from "../providers/request";
import EndPoints from "../providers/endPoints";
import {ACTIONS} from '../types/locationTypes';

Geocode.setApiKey(mapApiKey);
// Enable or disable logs. Its optional.
Geocode.enableDebug();

export const setPositionDetails = positionDetails => ({
    type: ACTIONS.SET_POSITION_DETAILS,
    positionDetails
});

export const error = (message = null) => ({
    type: ACTIONS.SET_ERROR,
    error: message || 'Something went wrong!'
});

export const isSuccess = bool => ({
    type: ACTIONS.SET_IS_SUCCESS,
    isSuccess: bool
});


export const setSavedLocationList = savedLocations => ({
    type: ACTIONS.SET_SAVED_LOCATIONS,
    savedLocations
});


export const setSearchList = searchList => ({
    type: ACTIONS.SET_SEARCH_LIST,
    searchList
});

export const setSearchAddressPosition = searchAddressPosition => ({
    type: ACTIONS.SET_SEARCH_ADDRESS_POSITION,
    searchAddressPosition
});


export const updatePositionDetails = (position) => dispatch => {
    Geocode.fromLatLng(position.latitude, position.longitude).then(
        async response => {
            const address = {
                name: response.results[0].formatted_address,
                vicinity: response.results[1].formatted_address,
                geometry: response.results[0].geometry
            };
            console.log('1- updatePositionDetails => ', response.results);
            await dispatch(setPositionDetails(address))
        },
        error => {
            console.error(error);
        }
    );
};

export const getPositionDetails = (position) => async dispatch => {

    dispatch(isSuccess(false));

    let path = `${EndPoints.GET_LOCATION({
        lat: position.latitude,
        lng: position.longitude
    })}`;

    return await Request.get(path).then(async (response) => {
        let {location_data} = response.patient;

        dispatch(isSuccess(false));

        await dispatch(setPositionDetails({
            name: location_data.formatted_address,
            vicinity: location_data.formatted_address,
            geometry: location_data.geometry,
            isFavorite: response.patient.favorite,
            id: response.patient.id
        }));

        // console.log('getPositionDetails, ', response)
    }).catch(async (fail) => {
        await dispatch(error(fail?.message));
        console.log('error on getPositionDetails, ', fail);
    })
};

export const doSaveLocation = (addressDetails) => async dispatch => {

    dispatch(isSuccess(false));
    let path = `${EndPoints.FAVORITES}`;
    return await Request.post(path, addressDetails).then(async (response) => {
        if (response.status !== 200) {
            return await dispatch(error(response?.message));
        }
        dispatch(isSuccess(true));
    }).catch(async (fail) => {
        await dispatch(error(fail?.message));
        console.log('error on doSaveLocation, ', fail);
    })
};

export const getSavedLocations = () => async dispatch => {

    dispatch(isSuccess(false));
    return await Request.get(`${EndPoints.FAVORITES}`).then(async (response) => {
        if (response.status !== 200) {
            return await dispatch(error(response?.message));
        }
        dispatch(isSuccess(true));
        dispatch(setSavedLocationList(response?.favorites));

    }).catch(async (fail) => {
        await dispatch(error(fail?.message));
        console.log('error on getSavedLocations, ', fail);
    })
};
export const deleteSavedLocation = (id) => async dispatch => {

    dispatch(isSuccess(false));
    return await Request.delete(`${EndPoints.FAVORITES}/${id}`).then(async (response) => {
        if (response.status !== 200) {
            return await dispatch(error(response?.message));
        }
        dispatch(isSuccess(true));

    }).catch(async (fail) => {
        await dispatch(error(fail?.message));
        console.log('error on deleteSavedLocation, ', fail);
    })
};

export const getSearchLocations = (query, data) => async dispatch => {
    dispatch(isSuccess(false));
    return await Request.get(`${EndPoints.SEARCH(query, data)}`).then(async (response) => {
        if (response.status !== 200) {
            return await dispatch(error(response?.message));
        }
        dispatch(isSuccess(true));
        console.log('setSearchList', response?.addresses)
        dispatch(setSearchList(response?.addresses));

    }).catch(async (fail) => {
        await dispatch(error(fail?.message));
        console.log('error on getSavedLocations, ', fail);
    })
};

export const getPositionDetailsByName = (addressName) => async dispatch => {

    dispatch(isSuccess(false));
    return await Request.get(`${EndPoints.GET_LOCATION_BY_NAME(addressName)}`).then(async (response) => {
        let {latitude, longitude} = response.patient;

        dispatch(isSuccess(false));

        await dispatch(setSearchAddressPosition({
            latitude,
            longitude
        }));

    }).catch(async (fail) => {
        await dispatch(error(fail?.message));
        console.log('error on getPositionDetailsByName, ', fail);
    })
};


