import NetInfo from "@react-native-community/netinfo";


export default class Internet {
    constructer() {
        this.isConnected = false;
        this.subscribeNet = null;
    };


    netInfoState = (state) => {
        debugger
        console.log("unSubscribeConnection Connection type", state.type);
        console.log("unSubscribeConnection Is connected?", state.isConnected);
        this.isConnected = state.isConnected;
    };

    subscribe = async function () {
        this.subscribeNet = NetInfo.addEventListener(this.netInfoState);
        return this.subscribeNet();
    };

    unsubscribe = async function () {
        NetInfo.removeEventListener(this.netInfoState);
        this.subscribeNet = null
        return this.subscribeNet;
    };
}