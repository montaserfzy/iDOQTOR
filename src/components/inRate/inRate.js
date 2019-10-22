import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'native-base';
import {OrderTypes, updateOrderStatus} from '../../actions/order';
import {AirbnbRating} from 'react-native-ratings';


import styles from './inRate.style';
import colors from "../../config/colors";
import moment from 'moment';
const doctor = require('../../assets/images/doctor.jpg');

class InRate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rateValue: 0
        };
        this.onFinishRating = this.onFinishRating.bind(this);
        this.onSubmitRating = this.onSubmitRating.bind(this);
    }

    onFinishRating = (rate) => {
        this.setState({rateValue: rate})
    };

    onSubmitRating = async () => {
        if (this.state.rateValue < 4) {
            return await this.props.updateOrderStatus(OrderTypes.IN_REPORTING);
        }
        return await this.props.updateOrderStatus(OrderTypes.NO_STATE);
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.detailsImageView}>
                        <Image source={{uri:this.props.mapConfig.doctorInfo?.image}} style={styles.detailsImage}/>
                    </View>
                    <View style={styles.dateTimeView}>
                        <Text style={styles.dateTimeText}>
                            {moment(new Date()).format('LLL') }
                        </Text>
                    </View>
                    <View style={styles.detailsView}>
                        <Text style={styles.doctorExperiences}>How was last doctor services{`\n`}{this.props.mapConfig.doctorInfo?.full_name}
                            ?</Text>
                    </View>
                    <View style={styles.ratingView}>
                        <AirbnbRating
                            fractions={0}
                            showRating={false}
                            defaultRating={this.state.rateValue}
                            ratingCount={5}
                            imageSize={40}
                            ratingBackgroundColor={colors.white}
                            onFinishRating={this.onFinishRating}
                        />
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.iconView}>
                            <Icon name={'money-bill'} type={'FontAwesome5'} style={styles.icon}/>
                        </View>
                        <View style={styles.totalView}>
                            <Text style={styles.totalText}>15 JOD</Text>
                        </View>
                    </View>

                </View>
                {
                    (
                        this.state.rateValue != 0 &&
                        <TouchableOpacity style={styles.rateSubmitBtn} onPress={this.onSubmitRating}>
                            <Text style={styles.rateSubmitText}>Submit</Text>
                        </TouchableOpacity>
                    )
                }
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
export default connect(mapStateToProps, mapDispatchToProps)(InRate);