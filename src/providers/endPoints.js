const EndPoints = {
    SOCKET_URL: `ws://134.209.16.186/cable`,
    DOMAIN: 'http://134.209.16.186',
    // PORT:`:3000/`,
    PORT: `/`,
    API: 'api/',
    APIv: 'v1/',
    API_POINT: 'patients',
    BASE_URL: function () {
        return `${this.DOMAIN}${this.PORT}${this.API}${this.APIv}${this.API_POINT}`
    },
    PATH: function (controller) {
        return `${this.BASE_URL}/${controller}`
    },
    PROFILES: '/profiles',
    LOCATION: '/locations',
    VERIFY_PHONE_NUMBER: '/verify_phone_number',
    UPDATE_PATIENT_INFO: '/update_patient_info',
    LOGIN: `/login`,
    DESTROY_ALL_USERS: '/destroy_all',
    FAVORITES: '/favorites',
    DIAGNOSES :'/diagnoses',
    SEARCH: function (query, data) {
        return `${EndPoints.LOCATION}/search?key_word=${query}&latitude=${data.latitude}&longitude=${data.longitude}`;
    },
    GET_LOCATION: function (data) {
        return `${EndPoints.LOCATION}/get_location?latitude=${data.lat}&longitude=${data.lng}`;
    },
    GET_LOCATION_BY_NAME: function (name) {
        return `${EndPoints.LOCATION}/get_location?name=${name};`
    },
    VISITS: 'visits'
};


export default EndPoints;