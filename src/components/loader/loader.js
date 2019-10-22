import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import styles from './loader.style';
import {connect} from 'react-redux';
import colors from "../../config/colors";

class Loader extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {}
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loaderView}>
                    <ActivityIndicator style={styles.loader} color={colors.secondary} size={'large'}></ActivityIndicator>
                    <Text style={styles.loadingText}>Loading ...</Text>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
    }
};

const mapStateToProps = ({userReducer, orderReducer, mapConfig}) => {
    return {
        userReducer,
        orderReducer,
        mapConfig
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);