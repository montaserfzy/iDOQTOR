import React from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Container, Content, Icon} from "native-base";
import styles from './email.style';
import {connect} from 'react-redux';
import colors from "../../config/colors";
import {THeader} from '../../components/index';
import String from "../../providers/localization";
import {doUpdatePatientInfo} from "../../actions/user";
import Loader from "../../components/loader/loader";
class Email extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            disableSubmit: true,
            email_reg: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
            loader:false
        }
    }

    componentWillMount() {

        if(this.props.userReducer.session.email)
           this.setState({email:this.props.userReducer.session.email, disableSubmit:false});
    }
    componentDidMount() {
        this.firstName.focus();
    }

    componentWillUnmount() {
    }


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
            email: this.state.email
        }));

        /**
         * If the request failing for some reason do th following
         * */
        if (!this.props.userReducer.isRequestSuccess) {
            this.setState({loader: false});
            return Alert.alert('Message!', this.props.userReducer.error);
        }
        this.setState({loader: false});
        this.props.navigation.goBack();
    };

    onEmailChangeText = (email) => {
        let disableSubmit = true;
        email = email.replace(/\s/g, '').trim();
        if (this.state.email_reg.test(email))
            disableSubmit = false;

        return this.setState({email, disableSubmit});
    };



    render() {
        return (
            <Container style={styles.container}>
                <THeader type={'BACK_HEADER'} {...this.props}/>
                {this.state.loader && <Loader {...this.props} />}
                <Content style={styles.content} bounces={false}>

                    <View style={styles.formContent}>
                        <Text style={styles.title}>{String.placeholders.enter_your_email}</Text>
                        <Text style={styles.descriptionText}>{String.subtitle.your_email_visible}</Text>


                        <View style={styles.inputGroup}>
                            <TextInput
                                ref={(ref) => this.firstName = ref}
                                keyboardType={'email-address'}
                                defaultValue={this.state.email}
                                placeholder={String.placeholders.enter_your_email}
                                returnKeyType={'next'}
                                style={styles.input}
                                placeholderTextColor={colors.gray}
                                autofocus={true}
                                keyboardAppearance={'light'}
                                onChangeText={this.onEmailChangeText}
                            />
                        </View>
                    </View>



                    <View style={styles.descriptionView}>
                        <TouchableOpacity
                            disabled={this.state.disableSubmit}
                            style={[
                                styles.nextIconBtn,
                                this.state.disableSubmit?styles.disabled:{}
                            ]}
                            onPress={this.onSubmit}>
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
        dispatch
    }
};

const mapStateToProps = ({userReducer}) => {
    return {
        userReducer
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Email);