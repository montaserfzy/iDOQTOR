import axios from "axios";
import EndPoints from "./endPoints";

export const getAuthToken = () => {
    /**
     * To get the user auth_token automatically
     * **/
    return (dispatch, getState) => {
        const state = getState();
        return state.userReducer.session.auth_token || null
    }
};

const requestSuccess =  config => {
    config.headers.common['Authorization'] = window.user_auth_token || null;
    return config;
};

const requestFail = error => {
    debugger;
    console.log('error on the requestFail ', error);
    return Promise.reject(error);
};

const responseSuccess = response => {
    return {...response.data, status:response.status, statusText:response.statusText};
};

const responseFail = error => {
    debugger
    console.log('error on the responseFail ', error);
    return Promise.reject(error);
};


axios.defaults.baseURL = EndPoints.BASE_URL();

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(requestSuccess, requestFail);
axios.interceptors.response.use(responseSuccess, responseFail);


const Request = axios;
export default Request;

///https://github.com/axios/axios