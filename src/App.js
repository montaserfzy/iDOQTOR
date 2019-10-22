import React, {Component} from 'react';
import {applyMiddleware, compose, createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {doUpdatePatientInfo} from './actions/user';
import {createReactNavigationReduxMiddleware,} from 'react-navigation-redux-helpers';


import Reducer from './reducer/index';
import Routes from './routes/index';

import ActionCable from 'react-native-actioncable';
import EndPoints from "./providers/endPoints";

// const cable = ActionCable.createConsumer(`${EndPoints.SOCKET_URL}?auth_token${window.user_auth_token}`);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const navMiddleware = createReactNavigationReduxMiddleware(
    state => state.nav,
);

const store = createStore(
    Reducer,
    composeEnhancers(applyMiddleware(thunk, navMiddleware))
);


// const AppRoutesWithRedux = reduxifyNavigator(Routes, "root");
// const AppRoutesWithRedux = createAppContainer(Routes);
const mapStateToProps = (state) => ({
    state: state.nav,
});
const AppRoutes = connect(mapStateToProps)(Routes);


class App extends Component<Props> {

    constructor(props) {
        super(props);
        // this.cable = null;
        this.getUserInfo = this.getUserInfo.bind(this);
    }

    componentWillMount() {

        this.getUserInfo()
    }

    getUserInfo = async () => {
        store.dispatch(doUpdatePatientInfo())
        // debugger
        // this.cable = ActionCable.createConsumer(`${EndPoints.SOCKET_URL}?auth_token=${window.user_auth_token}`);

    }

    render() {
        return (
            <Provider store={store}>
                <AppRoutes/>
            </Provider>
        );
    }
}


export default App;

console.disableYellowBox = true;

//                <ActionCableProvider cable={this.cable}>
