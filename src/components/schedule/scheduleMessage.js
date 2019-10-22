import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './schedule.style';
import {connect} from "react-redux";
import {
    OrderTypes,
    updateOrderStatus,
    updateScheduleDataSubmitted,
    updateScheduleModalVisibility
} from '../../actions/order';
import String from '../../providers/localization';


class ScheduleMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onConfirm = this.onConfirm.bind(this);
    }

    onConfirm = async () => {
        await this.props.updateScheduleDataSubmitted(false);
        await this.props.updateOrderStatus(OrderTypes.NO_STATE);

    };

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.datePickerOut, styles.datePickerOutMessage]}/>
                <View style={[styles.datePickerContainer, styles.datePickerContainerMessage]}>
                    <View style={styles.dateMessageView}>
                        <Text style={[styles.dateMessageTitle, {
                            writingDirection: window.lang == 'ar' ? 'rtl' : 'ltr',
                        }]}
                              numberOfLines={3}>
                            {String.schedule_date_title('today', '02:45AM')}
                        </Text>
                        <Text style={styles.dateNoteText}>{String.schedule_notes}</Text>
                    </View>
                    <TouchableOpacity style={styles.datePickerBtn} onPress={this.onConfirm}>
                        <Text style={styles.datePickerBtnText}>{String.got_it}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
        updateScheduleModalVisibility: (isDatePicketVisible) => dispatch(updateScheduleModalVisibility(isDatePicketVisible)),
        updateScheduleDataSubmitted: (isScheduledDateSubmitted) => dispatch(updateScheduleDataSubmitted(isScheduledDateSubmitted)),
        updateOrderStatus: (orderType) => dispatch(updateOrderStatus(orderType)),
    }
};

const mapStateToProps = ({userReducer, orderReducer, mapConfig}) => {
    return {
        userReducer,
        orderReducer,
        mapConfig
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleMessage);