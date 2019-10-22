import React from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Container, Content} from "native-base";
import styles from './verification.style';
import {connect} from 'react-redux';
import colors from "../../config/colors";
import String from '../../providers/localization';
import {THeader} from '../../components/index';
import {doLoginRequest, doVerifyPhoneNumber} from "../../actions/user";
import {commandPageRoute} from "../../helper/user";
import Loader from "../../components/loader/loader";

class Verification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            no_back: false,
            phoneCode: '',
            codeExpired: false,
            expiredAt: '0.15',
            disableSubmit: true
        };
        this.expiredAtTimer = 0;
        this.timer = 15;

        this.onSubmit = this.onSubmit.bind(this);
        this.resendCode = this.resendCode.bind(this);
        this.onCodeNumberChangeText = this.onCodeNumberChangeText.bind(this);
        this.prepareResendTimer = this.prepareResendTimer.bind(this);
    }

    componentDidMount() {
        this.inputCode.focus();
        let {no_back} = this.props.navigation.state?.params || false;
        this.setState({no_back});
        this.prepareResendTimer();
    }

    componentWillUnmount() {
        this.expiredAtTimer &&
        clearInterval(this.expiredAtTimer);
    }

    onSubmit = async () => {
        /**
         * On Submit do the following
         * */

        this.setState({loader: true});

        /**
         * Request the user verification code
         * */
        await this.props.dispatch(doVerifyPhoneNumber(this.state.phoneCode));

        /**
         * If the request failing for some reason do th following
         * */
        if (!this.props.userReducer.isRequestSuccess) {
            this.setState({loader: false});
            return Alert.alert('Message!', this.props.userReducer.error);
        }

        this.expiredAtTimer &&
        clearInterval(this.expiredAtTimer);

        /**
         * Prepare command value to correct page name and route to it
         * */
        this.props.navigation.navigate(commandPageRoute(this.props.userReducer.session?.command));
        return this.setState({loader: false});
    };

    onCodeNumberChangeText = (phoneCode) => {
        let disableSubmit = true;
        if (phoneCode.length == 4) {
            disableSubmit = false;
            return this.setState({phoneCode, disableSubmit});
        }
    };

    resendCode = async () => {
        await this.props.dispatch(doLoginRequest({
            ...this.props.userReducer.session
        }));

        this.expiredAtTimer = 0;
        this.timer = 15;

        this.setState({
            codeExpired:false,
            expiredAt: '0.15',
            disableSubmit: true
        });

        this.prepareResendTimer();
    };

    prepareResendTimer = () => {
        let formatSeconds = time => {
            let m = Math.floor(time / 60);
            let s = time - m * 60;

            let ss = s < 9 ? `0${s}` : s;

            return `${m}:${ss}`
        };

        this.expiredAtTimer = setInterval(async function () {
            --this.timer;
            if (this.timer <= 0) {
                this.setState({codeExpired: true});
                return clearInterval(this.expiredAtTimer);
            }

            this.setState({
                expiredAt: formatSeconds(this.timer)
            })
        }.bind(this), 1000);
    }

    render() {
        return (
            <Container style={styles.container}>
                <THeader type={'BACK_HEADER'} {...this.props} noBack={this.state.no_back || true}/>
                {
                    this.state.loader &&
                    <Loader {...this.props} />
                }
                <Content style={styles.content} bounces={false}>

                    <View style={styles.phoneContent}>
                        <Text style={styles.title}>
                            {`${String.title.enter_the_verify_code} ${this.props.userReducer.login.country_code}${this.props.userReducer.login.phone}`}
                        </Text>
                        <View style={styles.inputGroup}>
                            <TextInput
                                ref={(ref) => this.inputCode = ref}
                                maxLength={4}
                                autofocus={true}
                                returnKeyType={'next'}
                                placeholder={'1234'}
                                style={styles.inputCode}
                                keyboardType={'phone-pad'}
                                keyboardAppearance={'light'}
                                importantForAutofill={'auto'}
                                textContentType={'oneTimeCode'}
                                placeholderTextColor={colors.gray}
                                onChangeText={this.onCodeNumberChangeText}
                            />
                        </View>
                    </View>
                    <View style={styles.descriptionView}>
                        <View style={styles.linkView}>
                            {
                                !this.state.codeExpired &&
                                <Text style={styles.resendAt}>{String.resend_code} {this.state.expiredAt}</Text>
                            }
                            {
                                this.state.codeExpired &&
                                <TouchableOpacity onPress={()=>this.resendCode()}>
                                    <Text style={styles.link}>{String.not_received_code}</Text>
                                </TouchableOpacity>
                            }


                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Phone')}>
                                <Text style={styles.link}>{String.edit_phone_number}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.descriptionView}>
                        <TouchableOpacity onPress={this.onSubmit}
                                          disabled={this.state.disableSubmit}
                                          style={[styles.nextIconBtn, this.state.disableSubmit ? styles.disabled : {}]}>
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
    }
};

const mapStateToProps = ({userReducer, appReducer}) => {
    return {
        userReducer,
        appReducer
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Verification);