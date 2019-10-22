import React from "react";
import Nav from "./Navigation";

import {Dimensions, I18nManager} from "react-native";
import {createAppContainer, createDrawerNavigator, createStackNavigator} from "react-navigation";
import {
    Email,
    Facebook,
    Help,
    Location,
    Main,
    Map,
    Notifications,
    Orders,
    Phone,
    SaveLocation,
    Settings,
    SignOut,
    Splash,
    UpdatePassword,
    UserInfo,
    Username,
    Verification
} from '../pages/index';
import colors from "../config/colors";

const {width, height} = Dimensions.get('window');

let drawerWidth = 290;


const ModalRoute = createStackNavigator(
    {
        Map: {
            screen: Map,
            mode:'card',
            transitionConfig: () => ({
                transitionSpec: {
                    duration: 0,  // Set the animation duration time as 0 !!
                },
            })
        },
        Location: {screen: Location, mode: 'modal', lazy: true},
        SaveLocation: {screen: SaveLocation, mode: 'modal', lazy: true},
        Orders: {screen: Orders, mode: 'modal', lazy: true},
        Notifications: {screen: Notifications, mode: 'modal', lazy: true},
        Settings: {screen: Settings, mode: 'modal', lazy: true},
        Help: {screen: Help, mode: 'modal', lazy: true},
    },
    {
        navigationOptions: {
            gesturesEnabled: false
        },
        lazy: true,
        mode: 'modal',
        headerMode: 'none',
    }
);



const MapRoute = createDrawerNavigator(
    {

        ModalRoute: {screen: ModalRoute, mode: 'modal', lazy: true},


    },
    {
        //https://reactnavigation.org/docs/en/1.x/tab-navigator.html
        contentComponent: Nav,
        drawerWidth: drawerWidth,
        animationEnabled: false,
        swipeEnabled: true,
        showLabel: false,
        mode: 'card',
        drawerType: 'front',
        drawerPosition: I18nManager.isRTL ? 'right' : 'left',
        overlayColor: colors.darkRGBA,
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false
        },
        lazy: true,
        transitionConfig: () => ({
            transitionSpec: {
                duration: 0,  // Set the animation duration time as 0 !!
            },
        }),
    }
);

/**
 *
 * Stack Without Modal View
 * **/
const StackRoute = createStackNavigator({
        // Splash: {screen: Splash, title:'splash Screen'},
        Map: MapRoute,
        Phone: {screen: Phone},
        Username: {screen: Username},
        Email: {screen: Email},
        UpdatePassword: {screen: UpdatePassword}
    }, {
        animationEnabled: false,
        swipeEnabled: false,
        showLabel: false,
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false
        }
    }
);

const RegisterRouteScreenOptions = {
    navigationOptions: {
        gesturesEnabled: false
    },
    mode: 'card',
    headerMode: 'none',
    lazy: true,
};
const RegisterRoute = createStackNavigator(
    {
        Main: {screen: Main, title: 'Main', ...RegisterRouteScreenOptions},
        Phone: {screen: Phone, mode: 'modal', ...RegisterRouteScreenOptions},
        UserInfo: {screen: UserInfo, ...RegisterRouteScreenOptions},
        Verification: {screen: Verification, ...RegisterRouteScreenOptions},
        Facebook: {screen: Facebook, ...RegisterRouteScreenOptions},

    }, {
        headerMode: 'none',
        navigationOptions: null,
        mode: 'card',
    }
);


const Routes = createStackNavigator({
    Splash: {screen: Splash, ...RegisterRouteScreenOptions},
    RegisterRoute: {screen: RegisterRoute, ...RegisterRouteScreenOptions},
    DrawerRoute: {screen: StackRoute, ...RegisterRouteScreenOptions},
    SignOut: {screen: SignOut, ...RegisterRouteScreenOptions},
}, {

    // initialRouteName: 'DrawerRoute'  ,
    initialRouteName: 'Splash',
    ...RegisterRouteScreenOptions
});


export default createAppContainer(Routes);


//https://reactnavigation.org/