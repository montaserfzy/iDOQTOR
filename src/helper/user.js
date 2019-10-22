import {LOGIN_COMMANDS, LOGIN_TYPES} from '../types/userTypes';

export const commandPageRoute = function (command) {
    console.log('command name = ', command);
    switch (command) {
        case LOGIN_COMMANDS.USER_INFO :
            return 'UserInfo';
        case LOGIN_COMMANDS.PHONE_VERIFICATION:
            return 'Verification';
        case LOGIN_COMMANDS.MAIN_PAGE:
            return 'Map';
        case LOGIN_COMMANDS.FACEBOOK:
            return 'Facebook';
        case LOGIN_COMMANDS.PHONE:
            return 'Phone';
        case LOGIN_COMMANDS.REGISTRATION_PAGE:
        default:
            return 'Main';
    }
};

export const isFacebookUser = function (object) {
    return object.login_type == LOGIN_TYPES.FACEBOOK
};