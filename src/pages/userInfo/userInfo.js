import React from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Container, Content} from "native-base";
import styles from './userInfo.style';
import {connect} from 'react-redux';
import colors from "../../config/colors";
import {THeader} from '../../components/index';
import String from '../../providers/localization';
import {doLoginRequest, doUpdatePatientInfo, setUserLogin} from "../../actions/user";
import {commandPageRoute} from "../../helper/user";
import Loader from "../../components/loader/loader";

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name: '',
            email: '',
            email_reg: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
            isEmailValid: false,
            isFullNameValid: false,
            loader: false
        }
    }

    componentDidMount() {
        this.fullName.focus();
    }

    componentWillUnmount() {
    }

    onFullNameInputChange = (full_name) => {
        let isFullNameValid = false;
        if (full_name.length != 0) {
            isFullNameValid = true
        }
        return this.setState({isFullNameValid, full_name});
    };

    onEmailInputChange = (email) => {
        let isEmailValid = false;
        email = email.replace(/\s/g, '').trim();
        if (this.state.email_reg.test(email))
            isEmailValid = true;

        return this.setState({isEmailValid, email});
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
        await this.props.dispatch(doUpdatePatientInfo({
            email: this.state.email,
            full_name: this.state.full_name
        }));

        /**
         * If the request failing for some reason do th following
         * */
        if (!this.props.userReducer.isRequestSuccess) {
            this.setState({loader: false});
            return Alert.alert('Message!', this.props.userReducer.error);
        }

        /**
         * Prepare command value to correct page name and route to it
         * */
        this.props.navigation.navigate(commandPageRoute(this.props.userReducer.session?.command));
        return this.setState({loader:false});
    };

    render() {
        let {isEmailValid, isFullNameValid} = this.state;
        return (
            <Container style={styles.container}>
                <THeader type={'BACK_HEADER'} {...this.props} noBack={true}/>
                {
                    this.state.loader &&
                    <Loader {...this.props} />
                }
                <Content style={styles.content} bounces={false}>

                    <View style={styles.formContent}>
                        <Text style={styles.descriptionText} numberOfLines={4}>
                            {String.title.enter_full_name_email}
                        </Text>
                        <View style={styles.inputGroup}>
                            <TextInput
                                returnKeyType={'next'}
                                keyboardType={'default'}
                                keyboardAppearance={'light'}
                                textContentType={'name'}
                                placeholderTextColor={colors.gray}
                                ref={(ref) => this.fullName = ref}
                                placeholder={String.placeholders.enter_your_full_name}
                                style={[styles.input, String.style.input_number]}
                                onChangeText={this.onFullNameInputChange}
                                onSubmitEditing={() => this.email.focus()}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextInput
                                returnKeyType={'done'}
                                keyboardAppearance={'light'}
                                textContentType={'emailAddress'}
                                keyboardType={'email-address'}
                                ref={(ref) => this.email = ref}
                                placeholderTextColor={colors.gray}
                                placeholder={String.placeholders.enter_your_email}
                                style={[styles.input, String.style.input_number]}
                                onChangeText={this.onEmailInputChange}
                                onSubmitEditing={() => this.onSubmit()}
                            />
                        </View>
                    </View>
                    <View style={styles.descriptionView}>
                        <TouchableOpacity
                            disabled={!isFullNameValid || !isEmailValid}
                            style={[styles.nextIconBtn, (!isFullNameValid || !isEmailValid) ? styles.disabled : {}]}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);