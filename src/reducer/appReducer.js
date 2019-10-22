
import {LANG_TYPE} from '../actions/appConfig';

const initState = {
    appLang: LANG_TYPE.EN
};

const AppReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_APP_LANGUAGE':
            return {...state, appLang: action.appLang};
        default:
            return state;
    }
};

export default AppReducer;