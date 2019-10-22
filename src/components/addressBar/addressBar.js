import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setOrderClickedEvent} from '../../actions/order';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import styles from './addressBar.style';

const heartO = require('../../assets/icons/heart-o.png');
const heart = require('../../assets/icons/heart.png');

class AddressBar extends Component {
    constructor(props) {
        super(props);
        this.openLocation = this.openLocation.bind(this);
        this.openSaveLocation = this.openSaveLocation.bind(this);
    }

    openLocation = () => {
        this.props.navigation.navigate('Location', {}, new Date().getTime())
    };

    openSaveLocation = () => {
        if (this.props.locationReducer.positionDetails?.isFavorite)
            return
        console.log('openSaveLocation', this.props.mapConfig.userTargetPosition)
        this.props.navigation.push('SaveLocation');
        this.props.navigation.navigate('SaveLocation');
    };

    render() {
        // console.log('isFavorite', this.props.locationReducer.positionDetails)
        return (
            <View style={styles.container}>
                <View style={styles.addressBarView}>
                    <View style={styles.addressBarPointerView}>
                        <View style={styles.addressBarPointerTarget}></View>
                    </View>

                    <TouchableOpacity style={styles.addressView} onPress={this.openLocation}>
                        <Text style={styles.addressTitle} numberOfLines={1}>
                            {
                                this.props.locationReducer.positionDetails &&
                                this.props.locationReducer.positionDetails.name
                            }
                            {
                                !this.props.locationReducer.positionDetails &&
                                'Loading'
                            }
                        </Text>
                        <Text style={styles.addressSubTitle} numberOfLines={1}>
                            {
                                this.props.locationReducer.positionDetails &&
                                this.props.locationReducer.positionDetails.vicinity
                            }
                            {
                                !this.props.locationReducer.positionDetails &&
                                'Loading'
                            }
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.addressFavoriteView} onPress={this.openSaveLocation}>
                        {
                            !this.props.locationReducer.positionDetails?.isFavorite &&
                            <Image source={heartO} style={styles.addressFavoriteIcon}></Image>
                        }
                        {
                            this.props.locationReducer.positionDetails?.isFavorite &&
                            <Image source={heart} style={styles.addressFavoriteIcon}></Image>
                        }

                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
        setOrderClickedEvent: (orderType) => dispatch(setOrderClickedEvent(orderType))
    }
};
const mapStateToProps = ({userReducer, orderReducer, mapConfig, locationReducer}) => {
    return {
        userReducer,
        orderReducer,
        mapConfig,
        locationReducer

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AddressBar);