import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SafeAreaView, Text, TouchableOpacity, View, Image, Alert, I18nManager} from 'react-native';
import {Icon} from 'native-base';
import {OrderTypes, updateOrderStatus} from '../../actions/order';

import String from '../../providers/localization'
import {backHeader, mapHeader, onRequest} from './header.style';
import LinearGradient from "react-native-linear-gradient";
import {DrawerActions} from 'react-navigation';
import colors from "../../config/colors";
import {deleteSavedLocation} from "../../actions/location";


let leftArrow = require('../../assets/icons/left-arrow.png');
let menu = require('../../assets/icons/menu.png');

class BACK_HEADER extends Component {

    onBackClick = () => {
       this.props.navigation.goBack();
    };

    render() {
        return (
            <SafeAreaView style={backHeader.container}>
                <TouchableOpacity style={backHeader.backBtn} onPress={() => {
                    !this.props.noBack && this.onBackClick()
                }}>
                    {
                        !this.props.noBack &&
                        <Image source={leftArrow} style={[
                            backHeader.backIcon,
                            I18nManager.isRTL?backHeader.backBtnAr:{}
                        ]}/>
                    }
                </TouchableOpacity>
                {
                    this.props.title &&
                    <View style={backHeader.titleView}>
                        <Text style={backHeader.titleText}>{this.props.title}</Text>
                    </View>

                }
            </SafeAreaView>
        )
    }
}

class ON_REQUEST_ORDER_HEADER extends Component {

    onBackClicked = async () => {

        if (
            this.props.orderReducer.orderStatus === OrderTypes.IN_REQUEST
        ) {
            return await this.props.updateOrderStatus(OrderTypes.NO_STATE)
        }


        if (
            this.props.orderReducer.orderStatus === OrderTypes.IN_LOCATION_CONFIRMED ||
            this.props.orderReducer.orderStatus === OrderTypes.IN_LOCATION_SKIPPED
        ) {
            return await this.props.updateOrderStatus(OrderTypes.IN_REQUEST)
        }

    };

    onCancelClicked = async () => {
        Alert.alert(
            'Confirm Cancel',
            'Are you sure?',
            [
                {
                    text: 'Yes', onPress: async () => {
                        await this.props.updateOrderStatus(OrderTypes.NO_STATE);
                        await this.props.updateOrderStatus(OrderTypes.IN_REPORTING);
                        this.props.soketApi.cancel()
                    }
                },
                {
                    text: 'No', onPress: () => {

                    }
                },
            ],
            {cancelable: true},
        );
    };

    render() {
        return (
            <LinearGradient
                colors={[colors.sliver, 'rgba(219,219,219,0.9)', 'rgba(219,219,219,0.9)', 'rgba(219,219,219,0.8)', 'rgba(219,219,219,0.4)', 'rgba(219,219,219,0.1)']}
                style={onRequest.linearGradientView}>
                <SafeAreaView style={onRequest.container}>
                    <View style={onRequest.btnView}>
                        {
                            (
                                this.props.orderReducer.orderStatus === OrderTypes.IN_REQUEST ||
                                this.props.orderReducer.orderStatus === OrderTypes.IN_LOCATION_CONFIRMED ||
                                this.props.orderReducer.orderStatus === OrderTypes.IN_LOCATION_SKIPPED

                            ) &&
                            <TouchableOpacity style={onRequest.backBtn} onPress={() => this.onBackClicked()}>
                                <Image source={leftArrow} style={[
                                    onRequest.backIcon,
                                    I18nManager.isRTL?backHeader.backBtnAr:{}
                                ]}/>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={onRequest.btnView}>
                        {
                            (
                                this.props.orderReducer.orderStatus === OrderTypes.IN_LOCATION_CONFIRMED ||
                                this.props.orderReducer.orderStatus === OrderTypes.IN_LOCATION_SKIPPED ||
                                this.props.orderReducer.orderStatus === OrderTypes.IN_SUBMITTED
                            ) &&
                            <TouchableOpacity style={onRequest.cancelBtn} onPress={() => this.onCancelClicked()}>
                                <Text numberOfLines={1} style={onRequest.cancelBtnText}>
                                    {String.cancel_request}
                                    </Text>
                            </TouchableOpacity>
                        }
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
    }
}

class MAP_HEADER extends Component {

    onNavClick = () => {
        // debugger
        this.props.navigation.dispatch(DrawerActions.openDrawer());
        // this.props.navigation.openDrawer()
    };

    render() {
        return (
            <LinearGradient
                colors={[colors.sliver, 'rgba(219,219,219,0.9)', 'rgba(219,219,219,0.8)', 'rgba(219,219,219,0.4)', 'rgba(219,219,219,0.2)', 'rgba(219,219,219,0.1)']}
                style={mapHeader.linearGradientView}>
                <SafeAreaView style={mapHeader.container}>
                    <TouchableOpacity style={mapHeader.navBtn} onPress={() => this.onNavClick()}>
                        <Image source={menu} style={mapHeader.navIcon}/>
                    </TouchableOpacity>
                </SafeAreaView>
            </LinearGradient>
        )
    }
}

class THeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {type} = this.props;
        switch (type) {
            case 'MAP_HEADER':
                return <MAP_HEADER {...this.props} />;
            case 'ON_REQUEST_HEADER':
                return <ON_REQUEST_ORDER_HEADER {...this.props} />;
            case 'BACK_HEADER':
            default :
                return <BACK_HEADER {...this.props} />;
        }
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
export default connect(mapStateToProps, mapDispatchToProps)(THeader);