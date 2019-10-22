import React from 'react';
import {Image, TouchableOpacity, View, I18nManager} from 'react-native';
import String from '../../providers/localization';
import styles from './mapActions.style';
import {connect} from 'react-redux';
import {updateMapType, updateMapTraffic, MapType, updateLoading} from '../../actions/mapConfig';
import GPSProvider from "../../providers/gpsProvider";

const located = require('../../assets/icons/located.png');
const semaphore = require('../../assets/icons/semaphore.png');
const semaphoreO = require('../../assets/icons/semaphore-o.png');
const earth = require('../../assets/icons/earth.png');
const earthO = require('../../assets/icons/earth-o.png');


let mapPaddingBottomAction = 190;

class MapActions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isMapTraffic: false,
            mapType: 'standard',
            earthImg: earth,
            semaphoreImg: semaphore
        };
        this.GPS = new GPSProvider();

        this.setMapCenter = this.setMapCenter.bind(this);
        this.setMapTraffic = this.setMapTraffic.bind(this);
        this.setMapSatellite = this.setMapSatellite.bind(this);
    }

    componentDidMount(){

    }
    setMapCenter = async () => {
        let onSuccess = async result => {
            this.props.mapView.setCamera({
                center: {
                    latitude: result.coords.latitude,
                    longitude: result.coords.longitude
                },
                zoom:17
            });
        };
        let onFail = async error => {
            console.log('error => ', error)
        };
        await this.GPS.onGetCurrentPosition(onSuccess, onFail);
    };

    setMapTraffic = async () => {
        let image = semaphore;
        if(!this.props.mapConfig.isMapTraffic){
            image = semaphoreO;
        }
        await this.props.updateMapTraffic(!this.props.mapConfig.isMapTraffic);
        this.setState({isMapTraffic: this.props.mapConfig.isMapTraffic,semaphoreImg:image});
    };

    setMapSatellite = async () => {

        let type = MapType.standard;
        let image = earth;
        if (!this.props.mapConfig.mapType || this.props.mapConfig.mapType === MapType.standard){
            type = MapType.satellite;
            image = earthO;
        }


        this.props.mapView.mapType = type;
        await this.props.updateMapType(type);
        this.setState({mapType: type, earthImg:image});
    };

    render() {
        return (
            <View style={[styles.mapActionsView, {bottom: mapPaddingBottomAction}, I18nManager.isRTL? styles.mapActionsViewAr:{}]}>
                <TouchableOpacity style={styles.locatedBtn} onPress={this.setMapCenter}>
                    <Image source={located} style={styles.locatedIcon}/>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.earthBtn} onPress={()=>this.setMapSatellite()}>
                    <Image source={this.state.earthImg} style={styles.earthIcon}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.semaphoreBtn} onPress={()=>this.setMapTraffic()}>
                    <Image source={this.state.semaphoreImg} style={styles.semaphoreIcon}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
        updateMapType: (mapType)=>dispatch(updateMapType(mapType)),
        updateMapTraffic: (isMapTraffic)=>dispatch(updateMapTraffic(isMapTraffic)),
        updateLoading: (isLoading)=>dispatch(updateLoading(isLoading))
    }
};

const mapStateToProps = ({userReducer, orderReducer, mapConfig}) => {
    return {
        userReducer,
        orderReducer,
        mapConfig
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapActions);