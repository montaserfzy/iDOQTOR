import {I18nManager} from 'react-native';
import String from '../providers/localization';
import DefaultPreference from 'react-native-default-preference';

export const LANG_TYPE = {
    EN: 'en',
    AR: 'ar'
};

export const setAppLanguage = appLang => ({
    type: 'SET_APP_LANGUAGE',
    appLang
});

export const updateAppLanguage = lang => async dispatch => {
    await DefaultPreference.set('app_lang', lang).then(async function () {
        I18nManager.forceRTL(lang == 'ar');
        String.setLanguage(lang);
        window.lang = lang;
        await dispatch(setAppLanguage(lang));
    });
};

export const getAppLanguage =() => async dispatch => {
    await DefaultPreference.get('app_lang').then(async function (lang) {
        if (!lang) {
            /***
             *  If no language saved yet
             *  Set the app lang to null
             * ***/

            String.setLanguage('en');
            window.lang = 'en';
            I18nManager.forceRTL(false);
            await dispatch(setAppLanguage('en'));
            return;
        }

        String.setLanguage(lang);
        I18nManager.forceRTL(lang == 'ar');
        window.lang = lang;
        await dispatch(setAppLanguage(lang));
    });
};




