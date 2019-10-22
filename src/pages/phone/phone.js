import React from 'react';
import {Alert, NativeModules, Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Container, Content} from "native-base";
import styles from './phone.style';
import {connect} from 'react-redux';
import PhoneInput from "react-native-phone-input";
import colors from "../../config/colors";
import {doLoginRequest, setUserLogin} from '../../actions/user';
import {commandPageRoute, isFacebookUser} from '../../helper/user';

import {THeader} from '../../components/index'
import String from '../../providers/localization';
import Loader from "../../components/loader/loader";

const a = require('../../assets/images/a.jpg');
const b = require('../../assets/images/b.png');

class Phone extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phone_number: '',
            country_code: '',
            phoneREXP: /^[7]\d{8}$/,
            disableSubmit: true,
            loader: false
        };
        this.getAppSetting = this.getAppSetting.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onPhoneNumberChangeText = this.onPhoneNumberChangeText.bind(this);
    }

    componentWillMount() {

        if (this.props.userReducer.session)
            this.setState({
                phone_number: this.props.userReducer.session.phone_number,
                country_code: this.props.userReducer.session.country_code,
                disableSubmit: false
            })
    }

    componentDidMount() {
        this.getAppSetting();
        this.inputPhone.focus();
    }

    getAppSetting = () => {
        let locale;
        let localeArray;
        let countryCode = null;

        if (Platform.OS == 'ios') {
            locale = NativeModules.SettingsManager.settings.AppleLocale;
            countryCode = NativeModules.SettingsManager.settings.kGMSMapsUserClientLegalCountry?.toLowerCase();
        } else
            locale = NativeModules.I18nManager.localeIdentifier;

        localeArray = locale.split('_');
        this.country_code.selectCountry(countryCode || localeArray[1]?.toLowerCase());
    };

    onPhoneNumberChangeText = (phone_number) => {
        let disableSubmit = true;
        let {phoneREXP} = this.state;
        /***
         * Validate Phone Number
         ***/
        phone_number = phone_number.replace(/^0+/, '').replace(/\s/g, '');
        if (phoneREXP.test(phone_number))
            disableSubmit = false;

        this.setState({phone_number, disableSubmit});
    };

    onSubmit = async () => {
        /**
         * On Submit do the following
         * */
        this.setState({loader: true});

        /**
         * Request to retrive all user info
         * like - phone_number and country_code
         * *** use await to stop to waiting request return
         * */
        await this.props.dispatch(doLoginRequest({
            phone_number: this.state.phone_number,
            country_code: this.country_code.getValue()
        }));

        /**
         * If the request failing for some reason do th following
         * */
        if (!this.props.userReducer.isRequestSuccess) {
            this.setState({loader: false});
            return Alert.alert('Message!', this.props.userReducer.error);
        }

        // debugger
        // if(isFacebookUser(this.props.userReducer.session)){
        //     this.props.navigation.navigate('Facebook');
        //     return this.setState({loader: false});
        // }
        /**
         * Prepare command value to correct page name and route to it
         * */

        this.props.navigation.navigate(commandPageRoute(this.props.userReducer.session?.command));

        return this.setState({loader: false});
    };


    render() {
        return (
            <Container style={styles.container}>
                <THeader type={'BACK_HEADER'} {...this.props}/>
                {
                    this.state.loader &&
                    <Loader {...this.props} />
                }
                <Content style={styles.content} bounces={false}>

                    <View style={styles.phoneContent}>
                        <Text style={styles.title}>
                            {String.title.enter_your_phone}
                        </Text>
                        <Text style={styles.descriptionText}>
                            {String.will_sent_a_code_note}
                        </Text>
                        <View style={[styles.inputGroup, String.style.input_phone]}>
                            <PhoneInput ref={(ref) => this.country_code = ref}
                                        style={[styles.countryInput, String.style.input_phone]}
                                        textStyle={[styles.countryText]}
                                        flagStyle={[styles.countryFlag]}/>
                            <TextInput
                                ref={(ref) => this.inputPhone = ref}
                                value={this.state.phone_number}
                                keyboardType={'phone-pad'}
                                placeholder={'791234567'}
                                returnKeyType={'next'}
                                style={[styles.phoneInput]}
                                placeholderTextColor={colors.gray}
                                autofocus={true}
                                keyboardAppearance={'light'}
                                textContentType={'telephoneNumber'}
                                autoCompleteType={'tel'}
                                importantForAutofill={'auto'}
                                onChangeText={this.onPhoneNumberChangeText}
                            />
                        </View>
                    </View>
                    <View style={styles.descriptionView}>
                        <TouchableOpacity
                            onPress={this.onSubmit}
                            style={[styles.nextIconBtn, this.state.disableSubmit ? styles.disabled : {}]}
                            disabled={this.state.disableSubmit}>
                            <Text style={styles.nextBtnText}>{String.buttons.submit}</Text>
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
        setUserLogin: (login) => dispatch(setUserLogin(login)),
    }
};

const mapStateToProps = ({userReducer, appReducer}) => {
    return {
        userReducer,
        appReducer
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Phone);