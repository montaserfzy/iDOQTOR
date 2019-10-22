import {Alert, Linking, Platform} from "react-native";
import String from "./localization";
import {locationOptions} from "./variables";

export default class GPSProvider {
    constructor(){

    }
    enableDeviceGPS = (error) => {
        if (Platform.OS == 'ios') {
            Linking.canOpenURL('app-settings:')
                .then(supported => {
                    if (!supported) {
                        Alert.alert('Message!', 'Can\'t handle settings url');
                    } else {
                        Linking.openURL('app-settings:');
                    }
                }).catch(err => Alert.alert('Message!', 'Something went wrong, PLease enable GPS from setting page > location and services'));
        }
    };
    onGPSError = (error)=>{
        Alert.alert(
            String.alert.gpsDisabled,
            String.alert.enableGPS, [
                {
                    text: 'Ok', onPress: () => {
                        this.enableDeviceGPS(error)
                    }
                },
                {
                    text: 'Cancel', onPress: () => {
                    }
                }
            ],
            {cancelable: true},
        );
    };
    onGetCurrentPosition = async (onSuccess, onFail) =>{
        await navigator.geolocation.getCurrentPosition(onSuccess, onFail, locationOptions);
    };

    onGetWatchPosition = async (onSuccess, onFail) =>{
        await navigator.geolocation.watchPosition(onSuccess, onFail, locationOptions);
    };
}
