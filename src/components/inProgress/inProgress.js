import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'native-base';
import {OrderTypes, updateOrderStatus} from '../../actions/order';
import Share from 'react-native-share';

import styles from './inProgress.style';

const doctor = require('../../assets/images/doctor.jpg');

class InProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rateValue: 0
        };
        this.onShareDetails = this.onShareDetails.bind(this);
        this.onContactDoctor = this.onContactDoctor.bind(this);
        this.onCloseVisit = this.onCloseVisit.bind(this);
    }

    onShareDetails = async () => {
        const shareOptions = {
            title: 'Share Doctor Details via',
            subject: 'Doctor Details',
            message: `Dr ${this.props.mapConfig.doctorInfo.name} in the way check link for more information `,
            url: `${this.props.mapConfig.doctorInfo.details_link}`,
        };
        await Share.open(shareOptions);
    };

    onContactDoctor = async () => {
        await Linking.openURL(`tel:+962797590040`);
    };
    onCloseVisit = async () => {
        //await this.props.updateOrderStatus(OrderTypes.IN_RATING);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.detailsView}>
                    <View style={styles.detailsImageView}>
                        <Image source={{uri: this.props.mapConfig.doctorInfo.image}} style={styles.detailsImage}/>
                    </View>
                    <View style={styles.doctorInfoView}>
                        <Text style={styles.doctorName} onPress={this.onCloseVisit}>
                            {this.props.mapConfig.doctorInfo?.full_name}
                            <Text style={styles.rate}> {this.props.mapConfig.doctorInfo?.rate}
                                <Icon type={'FontAwesome5'} name={'star'} style={styles.rateIcon}/>
                            </Text>
                        </Text>
                        <Text style={styles.doctorId}>{this.props.mapConfig.doctorInfo.doctor_member_ship_id}</Text>
                    </View>
                </View>
                <View style={styles.contactInfoView}>
                    <TouchableOpacity style={styles.contactBtn} onPress={this.onContactDoctor}>
                        <Icon name={'phone'} type={'FontAwesome5'} style={styles.contactIcon}/>
                        <Text style={styles.contactBtnText}>CONTACT DOCTOR</Text>
                    </TouchableOpacity>
                    <View style={styles.separatedView}/>
                    <TouchableOpacity style={styles.shareBtn} onPress={this.onShareDetails}>
                        <Icon name={'share'} type={'FontAwesome5'} style={styles.contactIcon}/>
                        <Text style={styles.shareBtnText}>SHARE DETAILS</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
        updateOrderStatus: (orderType) => dispatch(updateOrderStatus(orderType))
    }
};
const mapStateToProps = ({userReducer, orderReducer, mapConfig}) => {
    return {
        userReducer,
        orderReducer,
        mapConfig

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(InProgress);