import React from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Container, Content} from "native-base";
import styles from './saveLocation.style';
import {connect} from 'react-redux';
import colors from "../../config/colors";
import {THeader} from '../../components/index';
import String from '../../providers/localization';
import {doSaveLocation, getSavedLocations} from "../../actions/location";

import Loader from "../../components/loader/loader";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import {mapStyle} from "../../providers/variables";
import {setMapMovePosition} from "../../actions/mapConfig";

class SaveLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            details: '',
            loader: false,
            isTitle: false
        }
        this.onTitleInputChange = this.onTitleInputChange.bind(this);
        this.onDetailsInputChange = this.onDetailsInputChange.bind(this);
        this.onMapReady = this.onMapReady.bind(this);
    }

    componentDidMount() {
        this.title.focus();
        console.log('openSaveLocation', this.props.mapConfig.userTargetPosition)
    }

    componentWillUnmount() {
    }

    onTitleInputChange = (title) => {
        let isTitle = false;
        if (title.length != 0)
            isTitle = true;

        return this.setState({isTitle, title});
    };

    onDetailsInputChange = (details) => {
        return this.setState({details});
    };

    onSubmit = async () => {
        /**
         * On Submit do the following
         * */
        this.setState({loader: true});

        /**
         * Request to updated the user information
         * like - Email and Full Name
         * *** use await to stop waiting to request return
         * */

        let position  = {
            latitude: this.props.mapConfig.userTargetPosition.latitude,
            longitude: this.props.mapConfig.userTargetPosition.longitude,
        };

        await this.props.dispatch(doSaveLocation({
            favorite: {
                ...position,
                name: this.state.title,
                description: this.state.details,
            }
        }));

        /**
         * If the request failing for some reason do th following
         * */

        if (!this.props.locationReducer.isSuccess) {
            this.setState({loader: false});
            return Alert.alert('Message!', this.props.locationReducer.error);
        }

        this.setState({title: '', details: '', loader: false});
        await this.props.dispatch(getSavedLocations());
        await this.props.dispatch(setMapMovePosition(true, position));
        return this.props.navigation.navigate('Map');
    };

    onMapReady = () => {
        this.saveLocationMapView.setCamera({
            center: this.props.mapConfig.userTargetPosition,
            zoom: 18
        });

    };

    render() {
        let {title, isTitle} = this.state;
        return (
            <Container style={styles.container}>
                <THeader type={'BACK_HEADER'} title={'Save Location'} {...this.props}/>
                {
                    this.state.loader &&
                    <Loader {...this.props} />
                }
                <Content style={styles.content} bounces={false}>

                    <View style={styles.formContent}>
                        <Text style={styles.descriptionText} numberOfLines={4}>
                            Enter the address details
                        </Text>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            ref={ref => this.saveLocationMapView = ref}
                            onMapReady={this.onMapReady}
                            style={styles.mapView}
                            customMapStyle={mapStyle}
                            loadingEnabled={true}
                            setIndoorEnabled={true}
                            loadingBackgroundColor={colors.sliver}
                            loadingIndicatorColor={colors.gray}
                            zoomEnabled={false}
                            scrollEnabled={false}
                            region={this.props.mapConfig.userTargetPosition}
                        >
                            {
                                this.props.mapConfig.userTargetPosition &&
                                <MapView.Marker
                                    coordinate={{
                                        latitude: parseFloat(this.props.mapConfig.userTargetPosition.latitude),
                                        longitude: parseFloat(this.props.mapConfig.userTargetPosition.longitude)
                                    }}
                                    color={colors.red}
                                />
                            }

                        </MapView>
                        <View style={styles.inputGroup}>
                            <TextInput
                                returnKeyType={'next'}
                                keyboardType={'default'}
                                keyboardAppearance={'light'}
                                textContentType={'addressCityAndState'}
                                defaultValue={this.state.title}
                                placeholderTextColor={colors.gray}
                                ref={(ref) => this.title = ref}
                                placeholder={'Enter address title'}
                                style={[styles.input, String.style.input_number]}
                                onChangeText={this.onTitleInputChange}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextInput
                                returnKeyType={'done'}
                                keyboardAppearance={'light'}
                                textContentType={'addressCityAndState'}
                                defaultValue={this.state.details}
                                keyboardType={'default'}
                                ref={(ref) => this.details = ref}
                                placeholderTextColor={colors.gray}
                                placeholder={'Enter address details'}
                                style={[styles.input, String.style.input_number]}
                                onChangeText={this.onDetailsInputChange}
                            />
                        </View>
                    </View>
                    <View style={styles.descriptionView}>
                        <TouchableOpacity
                            disabled={!isTitle}
                            style={[styles.nextIconBtn, (!isTitle) ? styles.disabled : {}]}
                            onPress={this.onSubmit}>
                            <Text style={styles.nextBtnText}>
                                {String.buttons.submit}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
    }
};

const mapStateToProps = ({userReducer, appReducer, locationReducer, mapConfig}) => {
    return {
        userReducer,
        appReducer,
        locationReducer,
        mapConfig
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveLocation);