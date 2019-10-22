import React from 'react';
import {DeviceEventEmitter} from 'react-native';
import {connect} from "react-redux";

import {getAppLanguage} from '../../actions/appConfig';
import Loader from "../../components/loader/loader";
import QuickActions from "react-native-quick-actions";
import {getUserSession, removeUserSession} from "../../actions/user";
import {commandPageRoute} from "../../helper/user";

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.moveToMainPage = this.moveToMainPage.bind(this);
        this.getSavedUserInfo = this.getSavedUserInfo.bind(this);
    }

    async componentDidMount() {

        let sign_out = this.props.navigation.state.param?.sign_out || null;
        if (sign_out)
            await this.props.dispatch(removeUserSession());

        // this.moveToMainPage();
        DeviceEventEmitter.addListener("quickActionShortcut", data => {
            // console.log(data.title);
            // console.log(data.type);
            // console.log(data.userInfo);
            // Alert.alert('Message', '3d touch ')
        });
        QuickActions.setShortcutItems([
            // {
            //     type: "Share", // Required
            //     title: "Share iDOQTOR", // Optional, if empty, `type` will be used instead
            //     subtitle: "Share via",
            //     icon: "Share", // Icons instructions below
            //     userInfo: {
            //         // url: "app://appImages" // Provide any custom data like deep linking URL
            //     }
            // },
            // {
            //     type: "Task", // Required
            //     title: "Request Doctor", // Optional, if empty, `type` will be used instead
            //     subtitle: "Request Doctor to your location",
            //     icon: "Task", // Icons instructions below
            // }
        ]);

        function doSomethingWithTheAction(data) {
            // console.log(data.title);
            // console.log(data.type);
            // console.log(data.userInfo);
            // Alert.alert('Message', '3d touch ' + JSON.stringify(data))
        }

        QuickActions.popInitialAction()
            .then(doSomethingWithTheAction)
            .catch(console.error);


        this.getSavedUserInfo();
    }

    getSavedUserInfo = async () => {
        await this.props.dispatch(getUserSession());
        setTimeout(function () {
            if (this.props.userReducer.session)
                return this.props.navigation.navigate(commandPageRoute(this.props.userReducer.session?.command));
            // return to main page
            return this.props.navigation.navigate('RegisterRoute');
        }.bind(this), 100);
    };
    moveToMainPage = async () => {
        await this.props.getAppLanguage();
        // setTimeout(function(){}.bind(this), this.props.navigation.navigate('Map'),1000);
    };

    render() {
        return (
            <Loader/>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
        getAppLanguage: () => dispatch(getAppLanguage()),

    }
};

const mapStateToProps = ({userReducer}) => {
    return {
        userReducer
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);