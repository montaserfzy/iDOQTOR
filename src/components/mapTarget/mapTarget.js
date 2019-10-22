import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateOrderStatus} from '../../actions/order';
import {View} from 'react-native';


import styles from './mapTarget.style';

class MapTarget extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                pointerEvents={'none'}
                style={[
                styles.targetPoint,
                this.props.mapConfig.isRegionChange?styles.targetInProgress:{}
            ]} />
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
export default connect(mapStateToProps, mapDispatchToProps)(MapTarget);