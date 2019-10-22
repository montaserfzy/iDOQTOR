import React from 'react';
import {Alert, DeviceEventEmitter, View} from 'react-native';
import {connect} from "react-redux";
import FacebookAuth from '../../providers/facebook';
import {getAppLanguage} from '../../actions/appConfig';
import Loader from "../../components/loader/loader";
import {doLoginRequest, setUserLogin} from "../../actions/user";
import {LOGIN_TYPES} from '../../types/userTypes'
import {commandPageRoute, isFacebookUser} from "../../helper/user";
class Facebook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.facebook = new Facebook();
    }

    componentDidMount(){
        this.setState({loading:true});

        const onFacebookLoginSuccess = async (fbData)=>{
            /**
             * On Submit do the following
             * */
            this.setState({loader:true});

            /**
             * Request to retrive all user info
             * like - phone_number and country_code
             * *** use await to stop to waiting request return
             * */
            await this.props.dispatch(doLoginRequest({
                login_type:LOGIN_TYPES.FACEBOOK,
                full_name: fbData.name,
                email: fbData.email,
                facebook_id:fbData.id,
                facebook_auth_token: fbData.token,
                facebook_image_url: fbData.photo
            }));

            /**
             * If the request failing for some reason do th following
             * */
            if(!this.props.userReducer.isRequestSuccess){
                this.setState({loader:false});
                return Alert.alert('Message!', this.props.userReducer.error);
            }


            /**
             * Prepare command value to correct page name and route to it
             * */
            return this.props.navigation.navigate(commandPageRoute(this.props.userReducer.session?.command),{no_back:true});






        };
        const onFail = function(fbDataError){
            this.setState({loading:false});
            this.props.navigation.navigate('Main');
            // return Alert.alert('Message', 'Something went wrong');
        };
        new FacebookAuth().login(onFacebookLoginSuccess, onFail.bind(this));
    }


    render() {
        return (
           <View>
               <Loader />
           </View>
        )
    }
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
        getAppLanguage: () => dispatch(getAppLanguage()),
        doLoginRequest: (userData) => dispatch(doLoginRequest(userData)),
        setUserLogin: (userData) => dispatch(setUserLogin(userData)),
    }
};

const mapStateToProps = ({userReducer}) => {
    return {
        userReducer
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Facebook);