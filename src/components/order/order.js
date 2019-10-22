import React from 'react';
import {ActivityIndicator, Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './order.style';
import orderString from './order.lang';
import {connect} from "react-redux";
import {
    OrderTypes,
    updateOrderStatus,
    updateOrderUserPosition,
    updateScheduleDataSubmitted,
    updateScheduleModalVisibility,
    updateScheduleOrder
} from '../../actions/order';
import {setDoctorInformation, setDoctorsNearByOnMap} from '../../actions/mapConfig';
import {getAppLanguage} from '../../actions/appConfig';
import colors from "../../config/colors";

import {InProgress} from '../index';

const calendar = require('../../assets/icons/calendar.png');

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            lang: 'en'
        };

        this.onScheduleEventCLick = this.onScheduleEventCLick.bind(this);
        this.setOrderLanguage = this.setOrderLanguage.bind(this);
        this.onConfirmOrderClicked = this.onConfirmOrderClicked.bind(this);
        this.onLocationConfirmClicked = this.onLocationConfirmClicked.bind(this);
        this.onLocationSkipClicked = this.onLocationSkipClicked.bind(this);
        this.onSubmittedOrder = this.onSubmittedOrder.bind(this);
        this.onSubmittedScheduleDate = this.onSubmittedScheduleDate.bind(this);
    }

    componentWillMount() {
        this.setOrderLanguage.call();
    }

    componentWillUpdate() {
        // this.setOrderLanguage.call();
    }

    setOrderLanguage = async () => {
        await this.props.getAppLanguage();
        await orderString.setLanguage(this.props.appReducer.appLang || 'en');
        this.forceUpdate();
        this.setState({lang: this.props.appReducer.appLang})
    };

    onScheduleEventCLick = () => {
        this.props.updateScheduleModalVisibility(true)
    };

    onConfirmOrderClicked = async () => {

        //Confirm will be take alocation and then send to BE

        this.onLocationConfirmClicked();
        Alert.alert(
            'Confirming Request',
            'Are you sure?',
            [
                {
                    text: 'Yes', onPress: async () => {
                        await this.props.updateOrderStatus(OrderTypes.IN_SUBMITTED);

                        this.props.soketApi.create({
                            ...this.props.mapConfig.userTargetPosition
                        });
                        // await this.onSubmittedScheduleDate();
                        this.props.soketApi.received = async (data) => {
                            // if doctors first time
                            if (data?.doctors) {
                                await this.props.dispatch(setDoctorsNearByOnMap(data.doctors));

                                // to confirm its drawn in the map
                                setTimeout(function () {

                                    // if user canceled the request
                                    if (this.props.orderReducer.orderStatus != OrderTypes.IN_SUBMITTED)
                                        return;

                                    this.props.soketApi.confirm({
                                        action: true,
                                        ...this.props.mapConfig.userTargetPosition
                                    });
                                }.bind(this), 2000);
                                return
                            }

                            // if nearest doctors
                            if (data?.nearest_doctor) {
                                await this.props.dispatch(setDoctorsNearByOnMap([data.nearest_doctor]));

                                // to confirm its drawn in the map
                                setTimeout(function () {

                                    // if user canceled the request
                                    if (this.props.orderReducer.orderStatus != OrderTypes.IN_SUBMITTED)
                                        return;

                                    this.props.soketApi.confirm_nearest_doctor({
                                        doctor: this.props.mapConfig.doctorsNearBy[0],
                                        patient: this.props.mapConfig.userTargetPosition
                                    });
                                }.bind(this), 2000);
                                return
                            }

                            // if doctor approved
                            if (data?.doctor) {
                                debugger

                                // if user canceled the request
                                if (this.props.orderReducer.orderStatus != OrderTypes.IN_SUBMITTED)
                                    return;

                                debugger
                                await this.props.dispatch(setDoctorInformation(data.doctor));
                                await this.props.updateOrderStatus(OrderTypes.IN_PROGRESS);
                                await this.props.dispatch(setDoctorsNearByOnMap([{
                                    latitude: data.doctor.latitude,
                                    longitude: data.doctor.longitude,
                                }]));

                                console.log('approved', data.location);
                            }

                            if (data?.arrived) {
                                debugger

                                Alert.alert('Doctor Arrived', 'Please check doctor arrived!')
                                console.log('approved', data.location);
                            }

                            if (data?.end_visit) {
                                // end visit
                                await this.props.updateOrderStatus(OrderTypes.IN_RATING);
                                await this.props.dispatch(setDoctorInformation(null));
                                await this.props.dispatch(setDoctorsNearByOnMap([]));
                                console.log('approved', data.location);
                            }


                        }

                    }
                },
                {
                    text: 'No', onPress: async () => {
                        await this.props.updateOrderStatus(OrderTypes.NO_STATE)
                    }
                },
            ],
            {cancelable: true},
        );
        //await this.props.updateOrderStatus(OrderTypes.IN_REQUEST);
        //console.log('isOrderClicked = ', this.props.orderReducer);

    };

    onLocationConfirmClicked = async () => {
        await this.props.updateOrderStatus(OrderTypes.IN_LOCATION_CONFIRMED);
        console.log('isOrderClicked = ', this.props.orderReducer);
        await this.props.updateOrderUserPosition(this.props.mapConfig.userTargetPosition);
        console.log('order position is  = ', this.props.orderReducer.orderPosition);
    };

    onLocationSkipClicked = async () => {
        await this.props.updateOrderStatus(OrderTypes.IN_LOCATION_SKIPPED);
        console.log('isOrderClicked = ', this.props.orderReducer);
        await this.props.updateOrderUserPosition(this.props.mapConfig.userPosition);
        console.log('order position is  = ', this.props.orderReducer.orderPosition);

    };
    onSubmittedOrder = async () => {
        await this.props.updateOrderStatus(OrderTypes.IN_SUBMITTED);
        setTimeout(async function () {
            await this.props.updateOrderStatus(OrderTypes.IN_PROGRESS);
        }.bind(this), 5000);
        console.log('isOrderClicked = ', this.props.orderReducer);
    };

    onSubmittedScheduleDate = async () => {
        await this.props.updateScheduleDataSubmitted(true);
        await this.props.updateScheduleOrder(null);
    };

    render() {
        return (
            <View style={styles.container}>

                {
                    /**
                     * Right Side
                     * **/
                }

                {
                    /**
                     * IS Order Not Clicked show 'Confirm Order Doctor' Button
                     * **/
                    (
                        !this.props.orderReducer.orderStatus &&
                        <TouchableOpacity style={styles.orderBtn} onPress={this.onConfirmOrderClicked}>
                            <Text style={styles.orderText}>
                                {orderString.order_text}
                            </Text>
                        </TouchableOpacity>
                    )
                }

                {
                    /**
                     * IS Order Status IN_REQUEST show 'Set order location'
                     * **/
                    (
                        this.props.orderReducer.orderStatus == OrderTypes.IN_REQUEST &&
                        <TouchableOpacity style={[styles.orderBtn, styles.locationConfirmBtn]}
                                          onPress={this.onLocationConfirmClicked}>
                            <Text style={styles.orderText}>
                                {
                                    orderString.set_order_location
                                }
                            </Text>
                        </TouchableOpacity>
                    )
                }

                {
                    /**
                     * IS Order Status IN_LOCATION_CONFIRMED || IN_LOCATION_SKIPPED and Not Scheduled show 'Set order location'
                     * **/
                    (
                        (
                            (
                                false &&
                                this.props.orderReducer.orderStatus == OrderTypes.IN_LOCATION_CONFIRMED ||
                                this.props.orderReducer.orderStatus == OrderTypes.IN_LOCATION_SKIPPED
                            ) && !this.props.orderReducer.orderScheduleDate

                        ) &&
                        <TouchableOpacity style={[styles.orderBtn, styles.submitOrder]} onPress={this.onSubmittedOrder}>
                            <Text style={styles.orderText}>
                                {orderString.submit_label}
                            </Text>
                        </TouchableOpacity>
                    )
                }

                {
                    /**
                     * IS Order Status IN_REQUEST show 'Set order location'
                     * **/
                    (
                        (
                            (
                                false &&
                                this.props.orderReducer.orderStatus == OrderTypes.IN_LOCATION_CONFIRMED ||
                                this.props.orderReducer.orderStatus == OrderTypes.IN_LOCATION_SKIPPED
                            ) && this.props.orderReducer.orderScheduleDate
                        ) &&
                        <TouchableOpacity style={[styles.orderBtn, styles.submitOrder]}
                                          onPress={this.onSubmittedScheduleDate}>
                            <Text style={styles.orderText}>
                                {orderString.submit_schedule_label}
                            </Text>
                        </TouchableOpacity>
                    )
                }


                {
                    /**
                     * Left Side
                     * **/
                }


                {

                    /**
                     * IS Order Status Null Show 'Schedule button'
                     * **/
                    (
                        !this.props.orderReducer.orderStatus &&
                        <TouchableOpacity style={styles.calendarBtn} onPress={this.onScheduleEventCLick}>
                            <Image source={calendar} style={styles.calendarIcon}></Image>
                        </TouchableOpacity>
                    )
                }

                {

                    /**
                     * IS Order Status IN_REQUEST show 'Skip Button'
                     * **/
                    (
                        this.props.orderReducer.orderStatus == OrderTypes.IN_REQUEST &&
                        <TouchableOpacity style={[styles.calendarBtn, styles.locationSkipBtn]}
                                          onPress={this.onLocationSkipClicked}>
                            <Text style={styles.locationSkipBtnText}>
                                {orderString.skip_label}
                            </Text>
                        </TouchableOpacity>
                    )
                }


                {
                    /**
                     * InProgress
                     * **/
                    (

                        this.props.orderReducer.orderStatus === OrderTypes.IN_PROGRESS && false &&
                        <View style={styles.inStatusView}>
                            <InProgress {...this.props}/>
                        </View>
                    )

                }

                {
                    (
                        this.props.orderReducer.orderStatus == OrderTypes.IN_SUBMITTED
                        && (
                            <View style={styles.findingView}>
                                <ActivityIndicator size="large" color={colors.secondary} style={styles.findingLoader}/>
                                <Text style={styles.findingText} numberOfLines={1}>
                                    {orderString.finding_doctors}
                                </Text>
                            </View>
                        )
                    )
                }

            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
        updateOrderStatus: (isClicked) => dispatch(updateOrderStatus(isClicked)),
        getAppLanguage: () => dispatch(getAppLanguage()),
        updateScheduleOrder: (orderScheduleDate) => dispatch(updateScheduleOrder(orderScheduleDate)),
        updateOrderUserPosition: (position) => dispatch(updateOrderUserPosition(position)),
        updateScheduleModalVisibility: (isScheduleModalVisible) => dispatch(updateScheduleModalVisibility(isScheduleModalVisible)),
        updateScheduleDataSubmitted: (isScheduledDateSubmitted) => dispatch(updateScheduleDataSubmitted(isScheduledDateSubmitted)),
    }
};

const mapStateToProps = ({userReducer, orderReducer, mapConfig, appReducer}) => {
    return {
        userReducer,
        orderReducer,
        mapConfig,
        appReducer
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);