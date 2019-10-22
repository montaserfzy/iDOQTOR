import React from 'react';
import {
    Animated,
    I18nManager,
    Image,
    NativeModules,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {Container, Content} from "native-base";
import styles from './main.style';
import PhoneInput from 'react-native-phone-input'
import LinearGradient from 'react-native-linear-gradient';
import {getAppLanguage, updateAppLanguage} from "../../actions/appConfig";
import String from '../../providers/localization';
import {connect} from "react-redux";
import {LOGIN_TYPES} from '../../types/userTypes';
import {doLoginRequest, getUserSession, setUserLogin, destroyAllUsers} from "../../actions/user";
import Loader from "../../components/loader/loader";
import {commandPageRoute} from "../../helper/user";

const logoString = require('../../assets/logos/logo-string.png');

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sloganText: '',
            loading: true
        };

        this.setSlogan = this.setSlogan.bind(this);
        this.loginToPhone = this.loginToPhone.bind(this);
        this.loginToFacebook = this.loginToFacebook.bind(this);
        this.getSavedUserInfo = this.getSavedUserInfo.bind(this);
    }

    componentWillMount() {
        this.getSavedUserInfo()
        this.props.getAppLanguage();
    }

    componentWillUnmount() {
        clearInterval(this.sloginTimer);
    }

    componentDidMount() {
        this.setState({
            pickerData: this.phone.getPickerData()
        });
        setTimeout(async function () {
            await this.getAppSetting();
            await this.setSlogan();
        }.bind(this), 500);


    };

    getSavedUserInfo = async () => {
        this.setState({loading: false});

        // return this.props.dispatch(destroyAllUsers());

        console.log('Before ', this.props.userReducer.session);
        await this.props.dispatch(getUserSession());
        console.log('After ', this.props.userReducer.session);
        if (this.props.userReducer.session) {
            return this.props.navigation.navigate(commandPageRoute(this.props.userReducer.session?.command));
        }
    };
    loginToPhone = async () => {
        let login = {
            login_type: LOGIN_TYPES.PHONE
        };
        await this.props.setUserLogin(login);
        this.props.navigation.navigate('Phone');
    };

    loginToFacebook = async () => {
        return this.props.navigation.navigate('Facebook');
    };

    getAppSetting = () => {

        //console.log(NativeModules.SettingsManager.settings)

        let locale;
        let localeArray;
        let userSettingLang;
        let countryCode = null;

        if (Platform.OS == 'ios') {
            locale = NativeModules.SettingsManager.settings.AppleLocale;
            countryCode = NativeModules.SettingsManager.settings.kGMSMapsUserClientLegalCountry?.toLowerCase();
        }
        else
            locale = I18nManager.localeIdentifier;

        localeArray = locale.split('_');
        userSettingLang = localeArray[0] == 'ar' ? 'ar' : 'en';

        // check n the third party language variable if it is set or not
        // if not use the user setting app language

        // this.props.updateAppLanguage(userSettingLang);

        this.phone.selectCountry(countryCode || localeArray[1]?.toLowerCase());
    };

    setSlogan() {
        let index = 1;
        this.sloganArray = [
            {text: String.text_loop.school},
            {text: String.text_loop.university},
            {text: String.text_loop.work},
            {text: String.text_loop.restaurant},
            {text: String.text_loop.mall},
            {text: String.text_loop.park},
            {text: String.text_loop.hotel},
            {text: String.text_loop.home},
        ];
        this.setState({sloganText: this.sloganArray[0].text});
        this.sloginTimer = setInterval(() => {
            if (index >= this.sloganArray.length) {
                this.setState({sloganText: `${this.sloganArray[index - 1].text}.`});
                return clearInterval(this.sloginTimer);
            }
            this.setState({sloganText: this.sloganArray[index].text});
            index++;
        }, 1200);

    };

    render() {

        return (
            <Container style={styles.container}>
                {/*<ImageBackground source={abc} style={styles.background}>*/}
                {
                    this.state.loading &&
                    <Loader {...this.props}/>
                }
                <Content style={styles.content}>
                    <View style={styles.logoView}>
                        <View style={styles.logoStringView}>
                            <Image source={logoString} style={styles.logoString}/>

                            <Text style={styles.slogan}>
                                {`${String.text_loop.on_call} ${this.state.sloganText}`.toUpperCase()} </Text>
                        </View>
                    </View>
                </Content>
                <LinearGradient
                    colors={['rgba(255,255,255,0.001)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,0.9)', '#FFF']}
                    style={styles.linearGradient}>
                    <View style={styles.phoneContent}>
                        <View>
                            {/*<Text style={styles.inputGroupTitle}> {String.title.request_your_doctor}</Text>*/}
                            <TouchableOpacity
                                style={[styles.inputGroup, String.style.input_phone]}
                                onPress={this.loginToPhone}>
                                <PhoneInput ref={(ref) => this.phone = ref}
                                            style={[styles.countryInput, String.style.input_phone]}
                                            textStyle={[styles.countryText, String.style.input_number]}
                                            flagStyle={[styles.countryFlag, String.style.input_number]}
                                            disabled={true}
                                            pointerEvents={'none'}
                                />
                                <TextInput value={String.placeholders.enter_your_number}
                                           style={[styles.phoneInput]}
                                           editable={false}
                                           pointerEvents={'none'}
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={[
                                    styles.linkView]}
                                onPress={this.loginToFacebook}>

                                <Text style={styles.link}>{`${String.or} `}
                                    <Text style={styles.linkBold}>
                                        {String.connect_to_facebook}
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
                {/*</ImageBackground>*/}
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch: dispatch,
        updateAppLanguage: (lang) => dispatch(updateAppLanguage(lang)),
        getAppLanguage: () => dispatch(getAppLanguage()),
        setUserLogin: (login) => dispatch(setUserLogin(login)),
        doLoginRequest: (userData) => dispatch(doLoginRequest(userData)),
    }
};
const mapStateToProps = ({userReducer, appReducer}) => {
    return {
        userReducer,
        appReducer
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);

//https://www.npmjs.com/package/react-native-app-walkthrough