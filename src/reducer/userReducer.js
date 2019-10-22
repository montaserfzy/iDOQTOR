import {ACTIONS} from "../types/userTypes";

const login = {
    phone_number: '',
    country_code: '',
    email: '',
    full_name: '',
    phone_verified: '',
    login_type: '',
    facebook_id: '',
    facebook_auth_token: '',
    facebook_image_url: ''
};

const initState = {
    session: null,
    login: login,
    success: null,
    error: null,
    registrationData:null,
    isRequestSuccess:false
};

const UserReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SUCCESS':
            return {...state, success: action.success};
        case ACTIONS.IS_REQUEST_SUCCESS:
            return {...state, isRequestSuccess: action.isRequestSuccess};
        case 'ERROR':
            return {...state, error: action.error};
        case 'SET_USER_LOGIN':
            return {...state, login: action.login};
        case 'SET_USER_SESSION':
            return {...state, session: action.session};
        case 'SET_USER_REGISTRATION_SESSION':
            return {...state, registrationData: action.registrationData};

        default:
            return state;
    }
};

export default UserReducer;