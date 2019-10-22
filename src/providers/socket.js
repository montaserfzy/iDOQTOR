// import io from 'socket.io-client/dist/socket.io';
// import io from 'socket.io-client/socket.io';
// var io = require('socket.io-client');
// var io =
// import SocketIOClient from 'socket.io-client';
import EndPoints from "./endPoints";
window.navigator.userAgent = "react-native";

export default class SocketIo {

    constructor() {
        this.socket = null;
        this.isConnect = false;
        this.channelName = '';

        this.connectionConfig = {
            jsonp: true,
            reconnection: true,
            reconnectionDelay: 100,
            reconnectionAttempts: 100000,
            transports: ['websocket'], // you need to explicitly tell it to use websockets
        };
    };

    connect(eventId) {
        this.socket = require('socket.io-client')(`${EndPoints.SOCKET_URL}?monty=123&auth_token=${window.user_auth_token}`);
        // let socketPath = `${EndPoints.SOCKET_URL}${this.channelName}/${eventId}`;
        // let socketPath = `${EndPoints.SOCKET_URL}?monty=123&auth_token=${window.user_auth_token}`;
        // let socketPath = `${EndPoints.SOCKET_URL}`;
        // this.socket = io(socketPath, this.connectionConfig) || {};
        // this.socket = io
        this.isConnect = true;
        return this;
    };

    onConnected = (onConnected) => {
        this.socket.on('connect', onConnected);
    };

    onSend = (message) => {
        this.socket.emit(this.channelName, {...message});
    };

    onReceived = (onMessage) => {
        this.socket.on(this.channelName, onMessage);
    };

    onDisconnected = (onDisconnectedSocket) => {
        return this.socket.on('disconnect', (data) => {
            this.isConnect = false;
            this.socket = null;
            onDisconnectedSocket(data);
        });
    };

    closeSocket = ()=>{
        this.socket.close()
    }
}
//https://github.com/socketio/socket.io-client/blob/master/docs/API.md