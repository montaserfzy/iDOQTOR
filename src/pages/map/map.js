import React from 'react';
import {AppState, Text, View} from 'react-native';
import {connect} from 'react-redux';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import FireBase from '../../providers/firebase';
import {mapStyle} from '../../providers/variables';
import {getAppLanguage} from '../../actions/appConfig';
import String from '../../providers/localization';
import GPSProvider from '../../providers/gpsProvider';
import NetInfo from "@react-native-community/netinfo";
// import ActionCableProvider from 'react-actioncable-provider';
import {ActionCable as ActionCableComponent} from 'react-actioncable-provider';
import {
    AddressBar,
    InProgress,
    InRate,
    InReport,
    Loader,
    MapActions,
    MapTarget,
    MapTargetTimer,
    Order,
    Schedule,
    ScheduleMessage,
    THeader
} from "../../components/index";
import {
    setMapMovePosition,
    updateOnRegionChange,
    updateUserCurrentPosition,
    updateUserTargetPosition
} from '../../actions/mapConfig';
import {getPositionDetails} from '../../actions/location';
import {doUpdatePatientInfo} from '../../actions/user';

import styles from './map.style';
import colors from "../../config/colors";
import {OrderTypes} from "../../actions/order";
import EndPoints from "../../providers/endPoints";
import ActionCable from 'react-native-actioncable';


const markerImg = require('../../assets/icons/marker.png');

// let sokeeet = this.ActionCable;
// console.log('************* this.ActionCable', sokeeet.WebSocket(EndPoints.SOCKET_URL))

class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isMapBusy: true,
            userPosition: {},
            mapPadding: {
                top: 0,
                right: 0,
                bottom: 100,
                left: 0,
            },
            enableGPSBusy: false
        };

        this.isGPSEnabled = true;

        this.FCM = new FireBase();
        this.GPS = new GPSProvider();
        this.patientActionCable =null
        // this.AppSocket = new SocketIo().connect();


        this.onMapReady = this.onMapReady.bind(this);
        this.mapPadding = this.mapPadding.bind(this);
        this.setViewLanguage = this.setViewLanguage.bind(this);
        this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
        this.onReceiveMessages = this.onReceiveMessages.bind(this);
        this.setAppNotification = this.setAppNotification.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.handleAppConnectionChange = this.handleAppConnectionChange.bind(this);
        this.connectToSocket = this.connectToSocket.bind(this);
        this.setViewLanguage();

    }

    componentWillMount() {
        // let soketPath = `${EndPoints.SOCKET_URL}/patient-channel?auth_token=${window.user_auth_token}`;

    }

    componentDidMount() {
        NetInfo.addEventListener('change', this.handleAppConnectionChange);
        // console.log('NetInfo.isConnected =>', NetInfo.isConnected)
        this.connectToSocket();
        setTimeout(function () {
            this.setAppNotification();
            AppState.addEventListener('change', this.handleAppStateChange);
        }.bind(this), 200);
    }

    componentWillUnmount() {
        this.onTokenRefreshListener();
        this.onNotificationsListener();
        AppState.removeEventListener('change', this.handleAppStateChange);
        NetInfo.removeEventListener('change', this.handleAppConnectionChange);
        // this.subscriptionActionCable &&
        // this.context.cable.subscriptions.remove(this.subscription)
    }

    componentWillReceiveProps(newProps) {

        if (newProps.mapConfig.isMoving) {
            let {mapNewPosition} = newProps.mapConfig;
            this.props.dispatch(setMapMovePosition(false, null));
            setTimeout(function () {
                this.mapView.setCamera({
                    center: mapNewPosition,
                    zoom: 16
                });
            }.bind(this), 500);
        }
    }

    handleAppStateChange = async (nextAppState) => {
        if (nextAppState == 'active') {
            if (this.state.enableGPSBusy) {
                await this.setState({enableGPSBusy: false});
                this.onMapReady();
            }
        }

        if (nextAppState == 'background') {
        }

        if (nextAppState == 'inactive') {
        }
    };

    handleAppConnectionChange = (data) => {
        console.log(data);
        debugger
    };

    connectToSocket(){
        let socketPath = ActionCable.createWebSocketURL(`${EndPoints.SOCKET_URL}?auth_token=${window.user_auth_token}`);
        this.cable = ActionCable.createConsumer(socketPath);
        ActionCable.startDebugging();
        this.patientActionCable = this.cable.subscriptions.create({
                channel: 'PatientChannel'
            },
            {
                connected: function (data) {
                    console.log(' --- patientActionCable connected', data);
                },
                received: async function (data) {
                    console.log(' --- patientActionCable received', data);

                    // if nearest doctors
                    // if (data?.nearest_doctor) {
                    //     console.log('this.props.soketApi.received', data.nearest_doctor)
                    //     await this.props.dispatch(setDoctorsNearByOnMap([data.nearest_doctor]));
                    //     console.log('after received data ', this.props.mapConfig.doctorsNearBy)
                    //
                    //
                    //     // to confirm its drawn in the map
                    //     setTimeout(function () {
                    //         this.props.soketApi.confirm_nearest_doctor({
                    //
                    //             doctor: this.props.mapConfig.doctorsNearBy[0],
                    //             patient: this.props.mapConfig.userTargetPosition
                    //         });
                    //     }.bind(this), 3000);
                    //     return
                    // }
                }.bind(this),
                create: function (chatContent) {
                    this.perform('receive', {
                        content: chatContent
                    });
                },
                confirm: function (content) {
                    this.perform('confirm', {
                        content
                    });
                },
                confirm_nearest_doctor: function (content) {
                    this.perform('confirm_nearest_doctor', {
                        content
                    });
                },
                add: function (chatContent) {
                    this.perform('create', {
                        content: chatContent
                    });
                },
                cancel: function () {
                    this.perform('cancel');
                },

            });

        this.patientActionCable.create({
            data: "Monty How are you"
        });
        console.log(this.patientActionCable)
        // console.log('monitor => ', this.cable.getConfig('PatientChannel'));
        //https://medium.com/@danielnmai/implement-a-chat-widget-with-rails-action-cable-and-react-js-428773e87986
    };

    setAppNotification = async () => {
        await this.FCM.setFCMPermission();
        let push_notification_token = await this.FCM.setFCMToken();
        push_notification_token &&
        this.props.dispatch(doUpdatePatientInfo({push_notification_token}));

        this.onTokenRefreshListener = await this.FCM.refreshFCMToken();
        this.onNotificationsListener = await this.FCM.onNotifications(this.onReceiveMessages);
    };

    onReceiveMessages = async (message) => {
        debugger
        console.log(message)
    };

    setViewLanguage = async () => {
        await this.props.dispatch(getAppLanguage());
        await String.setLanguage(this.props.appReducer.appLang);
        // MapRoute.drawerPosition = 'right'
        this.forceUpdate();
    };
    onMapReady = async mapData => {
        let onSuccess = async result => {
            let userPosition = {
                latitude: result.coords.latitude,
                longitude: result.coords.longitude
            };
            this.setState({userPosition, isMapBusy: false});
            this.mapView.setCamera({
                center: userPosition,
                zoom: 16
            });

            this.isGPSEnabled = true;
            await this.props.dispatch(updateUserCurrentPosition(userPosition));
        };

        let onFail = async error => {
            console.warn(error);
            await setTimeout(() => {
            }, 500);
            if (this.state.enableGPSBusy)
                return;

            await this.setState({enableGPSBusy: true});
            this.isGPSEnabled = false;

            if (error.code != 1)
                return;

            this.GPS.onGPSError();
        };


        await this.GPS.onGetCurrentPosition(onSuccess, onFail);
        setTimeout(function () {
            this.GPS.onGetWatchPosition(onSuccess, onFail);
        }.bind(this), 1000);
    };

    mapPadding = () => {
        let mapPaddingBottom = 150;
        let mapPaddingTop = 50;

        return {
            bottom: mapPaddingBottom,
            top: mapPaddingTop
        };
    };

    onRegionChange = async () => {
        await this.props.dispatch(updateOnRegionChange(true));
    };

    onRegionChangeComplete = async (position) => {
        if (this.state.isMapBusy)
            return;

        await this.props.dispatch(updateOnRegionChange(false));
        await this.props.dispatch(updateUserTargetPosition(position));
        // await this.props.updatePositionDetails(newPosition);
        await this.props.dispatch(getPositionDetails(position));
    };
    onReceived = (data) => {
        console.log('************  onReceived data ', data);
    }

    onConnected = (data) => {
        console.log('************  onConnected data', data);
    }

    onInitialized = (data) => {
        console.log('************  onInitialized data', data);
    }

    render() {

        let enableMapZoom = true;
        {
            /**
             *
             * Disable Map Zoom in the 3 cases :
             *      => IN_SUBMITTED | IN_LOCATION_CONFIRMED | IN_REQUEST_SCHEDULED
             * **/
        }
        if (
            this.props.orderReducer.orderStatus == OrderTypes.IN_SUBMITTED ||
            this.props.orderReducer.orderStatus == OrderTypes.IN_LOCATION_CONFIRMED ||
            this.props.orderReducer.orderStatus == OrderTypes.IN_REQUEST_SCHEDULED
        ) {
            enableMapZoom = false;
        }
        return (

            <View style={styles.mapContainer}>
                {
                    /***
                     * Map View
                     * **/
                }
                {
                    false &&
                    <ActionCableComponent channel={{channel: 'patient-channel'}}
                                          onReceived={this.onReceived}
                                          onConnected={this.onConnected}
                                          onInitialized={this.onInitialized}
                    />
                }


                <MapView
                    provider={PROVIDER_GOOGLE}
                    ref={ref => this.mapView = ref}
                    onMapReady={this.onMapReady}
                    mapType={this.props.mapConfig.mapType}
                    style={styles.mapView}
                    customMapStyle={mapStyle}
                    showsUserLocation={true}
                    userLocationAnnotationTitle={'true'}
                    showsMyLocationButton={false}
                    followsUserLocation={true}
                    showsPointsOfInterest={true}
                    cacheEnabled={true}
                    loadingEnabled={true}
                    setIndoorEnabled={true}
                    showsTraffic={this.props.mapConfig.isMapTraffic}
                    loadingBackgroundColor={colors.sliver}
                    loadingIndicatorColor={colors.gray}
                    zoomEnabled={enableMapZoom}
                    scrollEnabled={enableMapZoom}
                    mapPadding={this.mapPadding()}
                    onRegionChange={this.onRegionChange}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                >
                    {
                        /**
                         * Showing the Scheduling date time in user Target Position requested to doctor
                         * **/
                        (
                            (
                                this.props.orderReducer.orderScheduleDate != null &&
                                (
                                    this.props.orderReducer.orderStatus == OrderTypes.IN_LOCATION_CONFIRMED ||
                                    this.props.orderReducer.orderStatus == OrderTypes.IN_LOCATION_SKIPPED
                                )
                            ) &&
                            <MapView.Marker
                                coordinate={this.props.mapConfig.userPosition}
                                style={{zIndex: 55, position: "relative"}}
                                tracksViewChanges={this.state.tracksViewChanges}>
                                <View style={styles.markerTimerContainer}>
                                    <View style={styles.targetPointView}>
                                        <View style={styles.targetPoint}>
                                            <Text style={styles.day}>today</Text>
                                            <Text style={styles.time}>2:20 am</Text>
                                        </View>
                                    </View>
                                    <View style={styles.targetArrow}/>
                                </View>
                            </MapView.Marker>
                        )
                    }


                    {
                        /**
                         * Showing the doctors near by
                         * **/
                        (
                            this.props.mapConfig.doctorsNearBy &&
                            this.props.mapConfig.doctorsNearBy.map((doctor, index) => (
                                <MapView.Marker key={index} coordinate={doctor}
                                                tracksViewChanges={true}
                                                image={markerImg}>
                                </MapView.Marker>
                            ))
                        )
                    }

                </MapView>

                {
                    (
                        this.props.mapConfig.isLoading &&
                        <Loader {...this.props} />
                    )
                }
                {
                    (
                        !this.props.orderReducer.orderStatus ||
                        this.props.orderReducer.orderStatus === OrderTypes.IN_PROGRESS ||
                        this.props.orderReducer.orderStatus === OrderTypes.IN_RATING
                    ) &&
                    <THeader type={'MAP_HEADER'} {...this.props} soketApi={this.patientActionCable}/>
                }

                {
                    this.props.orderReducer.orderStatus &&
                    <THeader type={'ON_REQUEST_HEADER'} title={String.headers.location} {...this.props}
                             soketApi={this.patientActionCable}/>
                }

                {
                    <AddressBar {...this.props} />
                }


                {
                    /***
                     * MapTarget Button
                     * **/
                }
                <MapTarget {...this.props} />

                {
                    /***
                     * MapTargetTimer Button
                     * **/
                    (
                        (
                            this.props.orderReducer.orderStatus === OrderTypes.IN_REQUEST
                        ) &&
                        <MapTargetTimer {...this.props} />
                    )

                }

                {
                    /***
                     * Map Actions
                     * **/
                    !this.state.isMapBusy &&
                    <MapActions {...this.props} mapView={this.mapView}/>
                }

                {
                    /***
                     * Order Button
                     * **/
                }
                {
                    this.patientActionCable &&
                    <Order {...this.props} soketApi={this.patientActionCable}/>


                }

                {
                    /**
                     * InRate
                     * **/
                    (

                        this.props.orderReducer.orderStatus === OrderTypes.IN_RATING &&
                        <InRate {...this.props}/>
                    )

                }

                {
                    /**
                     * InReporting Issue
                     * **/
                    (

                        this.props.orderReducer.orderStatus === OrderTypes.IN_REPORTING &&
                        <InReport {...this.props}/>
                    )

                }

                {
                    /**
                     * InProgress
                     * **/
                    (
                        this.props.orderReducer.orderStatus === OrderTypes.IN_PROGRESS &&
                        <InProgress {...this.props}/>
                    )

                }

                {
                    /**
                     * Schedule Order
                     * **/
                    (

                        this.props.orderReducer.isScheduleModalVisible &&
                        <Schedule {...this.props}/>
                    )

                }

                {
                    /**
                     * Schedule Order
                     * **/
                    (

                        this.props.orderReducer.isScheduledDateSubmitted &&
                        <ScheduleMessage {...this.props}/>
                    )

                }
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch
    }
};

const mapStateToProps = ({userReducer, orderReducer, mapConfig, locationReducer, appReducer}) => {
    return {
        userReducer,
        orderReducer,
        mapConfig,
        locationReducer,
        appReducer
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
{

}