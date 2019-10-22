import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateOrderStatus} from '../../actions/order';
import {Text, View} from 'react-native';


import styles from './mapTargetTimer.style';

class MapTargetTimer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[
                styles.container,
                this.props.mapConfig.isRegionChange ? styles.targetInProgress : {}
            ]} pointerEvents={'none'}>
                <View style={styles.targetPointView}>
                    <View style={styles.targetPoint}>
                        <Text style={styles.number}>22</Text>
                        <Text style={styles.text}>mint</Text>
                    </View>
                </View>
                <View style={styles.targetArrow} />
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
export default connect(mapStateToProps, mapDispatchToProps)(MapTargetTimer);