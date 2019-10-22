import type {RemoteMessage} from 'react-native-firebase';
import firebase from 'react-native-firebase';


export default class FireBase {
    constructor() {
        this.fcmToken;
        this.isFCMEnabled;
    }

    setFCMPermission = async () => {
        this.isFCMEnabled = await firebase.messaging().hasPermission();
        if (!this.isFCMEnabled) {
            /**
             * If FCM Not Enabled - request enable permission;
             * **/
            let setPermission = await firebase.messaging().requestPermission();
            console.log('now the FCM Enabled', setPermission);
            this.isFCMEnabled = setPermission;
        }
        return this.isFCMEnabled;
    };

    setFCMToken = async () => {
        this.fcmToken = await firebase.messaging().getToken();
        await this.saveFCMToken();
        return this.fcmToken;
    };

    refreshFCMToken = async () => {
        return firebase.messaging().onTokenRefresh(async fcmToken => {
            this.fcmToken = fcmToken;
            await this.saveFCMToken();
        });
    };

    saveFCMToken = async () => {
        // console.log('updated token value = > ', this.fcmToken);
    };

    onNotifications = async (onReceiveMessages) => {
        return firebase.messaging().onMessage((message: RemoteMessage) => {
            onReceiveMessages(message);
            console.log('firebase - messaging => ', message);
        });
    };

}

////https://medium.com/@anum.amin/react-native-integrating-push-notifications-using-fcm-349fff071591