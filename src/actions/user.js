import Request from '../providers/request';
import {Platform} from "react-native";
import DeviceInfo from "react-native-device-info";
import EndPoints from "../providers/endPoints";
import DefaultPreference from "react-native-default-preference";

import {ACTIONS} from '../types/userTypes';

export const setUserLogin = login => ({
    type: 'SET_USER_LOGIN',
    login: login
});

export const success = message => ({
    type: 'SUCCESS',
    success: message
});

export const isRequestSuccess = isSuccess => ({
    type: ACTIONS.IS_REQUEST_SUCCESS,
    isRequestSuccess: isSuccess
});


export const error = message => ({
    type: 'ERROR',
    error: message || 'Something went wrong!'
});

export const setUserSession = session => ({
    type: 'SET_USER_SESSION',
    session
});

export const setUserRegistrationData = registrationData => ({
    type: 'SET_USER_REGISTRATION_SESSION',
    registrationData
});


export const getUserInfo = () => {
    return (dispatch, getState) => {
        let state = getState();
        return state.userReducer.login;
    }
};

export const doLoginRequest = (userData) => async dispatch => {
    debugger
    let options = {
        patient: {
            platform: Platform.OS,
            device_id: DeviceInfo.getUniqueID(),
            ...userData
        }
    };

    dispatch(isRequestSuccess(false));

    return await Request.post(EndPoints.LOGIN, options).then(async (data) => {
        console.log(data);
        await dispatch(saveUserSession(data?.patient));
        await dispatch(isRequestSuccess(true));
    }).catch(async (fail) => {
        await dispatch(error(fail?.message));
        console.log('error on doLoginRequest, ', fail);
    })
};

export const doSignOutRequest = () => async dispatch => {
    dispatch(isRequestSuccess(false));
    return await Request.delete(EndPoints.LOGIN)
        .then(async () => {
            await dispatch(isRequestSuccess(true));
            await dispatch(removeUserSession(true));
        }).catch(async (fail) => {
            await dispatch(error(fail?.message));
            console.log('error on doLoginOutRequest, ', fail);
        })
};


export const doVerifyPhoneNumber = (code) => async dispatch => {

    let options = {code};
    dispatch(isRequestSuccess(false));

    return await Request.post(`${EndPoints.PROFILES}${EndPoints.VERIFY_PHONE_NUMBER}`, options).then(async (data) => {

        if (data?.error)
            return await dispatch(error(data?.error));

        await dispatch(saveUserSession(data?.patient));
        await dispatch(isRequestSuccess(true));

    }).catch(async (fail) => {
        console.log('error on doVerifyPhoneNumber, ', fail);

        if (fail.status = 401)
            return await dispatch(error('Wrong code number'));

        await dispatch(error(fail?.message));
    });
};

export const doUpdatePatientInfo = (userData) => async dispatch => {

    if(!userData)
        return;

    let options = {
        patient: {
            ...userData
        }
    };
    dispatch(isRequestSuccess(false));
    // console.log('send data , ', options.patient);
    return await Request.put(`${EndPoints.PROFILES}${EndPoints.UPDATE_PATIENT_INFO}`, options).then(async (data) => {
        await dispatch(saveUserSession(data?.patient));
        await dispatch(isRequestSuccess(true));
        // console.log('session data , ', data?.patient);
    }).catch(async (fail) => {
        await dispatch(error(fail));
        console.log('error on doUpdatePatientInfo, ', fail);
    })
};


export const destroyAllUsers = () => async dispatch => {
    return await Request.delete(`${EndPoints.PROFILES}${EndPoints.DESTROY_ALL_USERS}`, {}).then(() => {
        console.log('destroy all user data - done');
        dispatch(removeUserSession());
    });
};


/**
 * SAVE/ GET/ REMOVE user from app preferences
 * */
export const saveUserSession = (userData) => async dispatch => {
    await dispatch(setUserSession(userData));
    window.user_auth_token = userData?.auth_token;
    await DefaultPreference.set('user_session', JSON.stringify(userData));
};
export const getUserSession = () => async dispatch => {
    await DefaultPreference.get('user_session').then(async function (user_session) {
        let userData = user_session ? JSON.parse(user_session) : null;
        window.user_auth_token = userData?.auth_token;
        await dispatch(setUserSession(userData));
    }).catch(function (fail) {
        console.log('error on getUserSession, ', fail)
    });
};
export const removeUserSession = () => async dispatch => {
    await dispatch(setUserSession(null));
    await DefaultPreference.clear('user_session');
    window.user_auth_token = null;
};
