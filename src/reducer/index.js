import {combineReducers} from 'redux';
import UserReducer from './userReducer';
import OrderReducer from './orderReducer';
import MapConfig from './mapConfig';
import LocationReducer from './locationReducer';
import AppReducer from './appReducer';


export default combineReducers({
    userReducer: UserReducer,
    orderReducer: OrderReducer,
    mapConfig: MapConfig,
    locationReducer: LocationReducer,
    appReducer: AppReducer
});