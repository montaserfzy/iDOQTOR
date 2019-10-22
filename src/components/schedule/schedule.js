import React from 'react';
import {Alert, DatePickerIOS, TimePickerAndroid, Platform, DatePickerAndroid, Text, TouchableOpacity, View} from 'react-native';
import styles from './schedule.style';
import {connect} from "react-redux";
import {OrderTypes, updateOrderStatus, updateScheduleModalVisibility, updateScheduleOrder} from '../../actions/order';
import String from '../../providers/localization';


class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            isDatePicketVisible: false,
            updatedDate:null
        };

        this.onScheduleEventCLick = this.onScheduleEventCLick.bind(this);
        this.onPressOutOfCalendar = this.onPressOutOfCalendar.bind(this);
        this.onConfirmScheduleClicked = this.onConfirmScheduleClicked.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onAndroidDatePicker = this.onAndroidDatePicker.bind(this);
        this.onAndroidTimePicker = this.onAndroidTimePicker.bind(this);
    }

    componentDidMount(){
    }

    onAndroidDatePicker = async () =>{
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                // date: new Date(2020, 4, 25),
                minDate: this.state.date,
                mode:'spinner'
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
            }
        } catch ({code, message}) {
            debugger
            console.warn('Cannot open date picker', message);
        }
    };

    onAndroidTimePicker = async () =>{
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: 14,
                minute: 0,
                is24Hour: false, // Will display '2 PM'
                mode:'spinner'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
            }
        } catch ({code, message}) {
            debugger
            console.warn('Cannot open date picker', message);
        }
    };

    onScheduleEventCLick = () => {
        this.setState({isDatePicketVisible: true})
    };

    onPressOutOfCalendar = async () => {
        /**
         * Close modal and reset schedule date
         * **/
        await this.props.updateScheduleModalVisibility(false);
        await this.props.updateScheduleOrder(null);
        return
    };

    onConfirmScheduleClicked = async () => {
        /**
         * Setting the selected date and time
         * Close the schedule date modal
         * Set time out to avoid select animation on clicked confirm
         * **/
        await setTimeout(()=>{}, 500);
        if(this.state.updatedDate == null){
            return Alert.alert('Message', 'Please select date time')
        }

        await this.props.updateScheduleOrder(this.state.updatedDate);
        await this.props.updateScheduleModalVisibility(false);

        console.log('orderScheduleData => ', this.props.orderReducer.orderScheduleData)
        return
    };

    onDateChange = (updatedDate) =>{
        this.setState({updatedDate})
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.datePickerOut} onPress={this.onPressOutOfCalendar}/>
                <View style={styles.datePickerContainer}>
                    <View style={styles.datePickerView} preventDefault={true}>
                        <Text style={styles.datePickerTitle}>
                            {
                                String.confirm_schedule_title
                            }
                        </Text>
                        {
                            Platform.OS == 'ios' &&
                            <DatePickerIOS
                                ref={ref => this.datePicker = ref}
                                style={styles.datePickerBox}
                                initialDate={this.state.date}
                                minimumDate={this.state.date}
                                onDateChange={this.onDateChange}
                            />
                        }
                        {
                            Platform.OS == 'android' &&
                            <View>
                                <TouchableOpacity style={styles.datePickerBtn} onPress={this.onAndroidDatePicker}>
                                    <Text style={styles.datePickerBtnText}>Set Date</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.datePickerBtn} onPress={this.onAndroidTimePicker}>
                                    <Text style={styles.datePickerBtnText}>Set Time</Text>
                                </TouchableOpacity>
                            </View>

                        }
                        {
                            <TouchableOpacity style={styles.datePickerBtn}
                                              onPress={this.onConfirmScheduleClicked}
                            >
                                <Text style={styles.datePickerBtnText}>
                                    {
                                        String.confirm_schedule
                                    } </Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
        updateScheduleModalVisibility: (isDatePicketVisible) => dispatch(updateScheduleModalVisibility(isDatePicketVisible)),
        updateScheduleOrder: (scheduleOrderData) => dispatch(updateScheduleOrder(scheduleOrderData)),
        updateOrderStatus: (orderStatus) => dispatch(updateOrderStatus(orderStatus)),
    }
};

const mapStateToProps = ({userReducer, orderReducer, mapConfig}) => {
    return {
        userReducer,
        orderReducer,
        mapConfig
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);