import {AccessToken, GraphRequest, GraphRequestManager, LoginManager} from 'react-native-fbsdk';

import {Alert, Platform} from 'react-native';

export default class FacebookAuth {
    constructor() {
    }

    async login(onFacebookLoginSuccess, onFail) {
        // native_only config will fail in the case that the user has
        // not installed in his device the Facebook app. In this case we
        // need to go for webview.

        const native_param = Platform.OS == 'ios' ? 'browser' : 'native_with_fallback';

        await LoginManager.logOut();
        // LoginManager.setLoginBehavior(native_param);
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(async function (data) {
            const accessData = await AccessToken.getCurrentAccessToken();
            // Create a graph request asking for user information
            const infoRequest = new GraphRequest('/me', {
                accessToken: accessData.accessToken,
                parameters: {
                    fields: {
                        string: 'id,name, email, picture.type(large)'
                    }
                }
            }, function (errorData, successData) {
                if (errorData)
                    return onFail(errorData);

                /**
                 * Facebook image if exist to check if the url set and not null
                 * **/
                let {url} = successData.picture.data;

                successData = {
                    ...successData,
                    photo: url,
                    token: accessData.accessToken,
                };
                return onFacebookLoginSuccess(successData);
            });

            new GraphRequestManager().addRequest(infoRequest).start();
        }).catch(onFail);

    }

    logout() {

    }

}