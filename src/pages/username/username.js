import React from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Container, Content, Icon} from "native-base";
import styles from './username.style';
import {connect} from 'react-redux';
import colors from "../../config/colors";
import {THeader} from '../../components/index';
import String from "../../providers/localization";
import {doUpdatePatientInfo} from "../../actions/user";
import Loader from "../../components/loader/loader";

class Username extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name:'',
            disableSubmit: true,
            loader:false
        };

        this.onUserNameChangeText = this.onUserNameChangeText.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        if(this.props.userReducer.session){
            this.setState({
                full_name:this.props.userReducer.session.full_name,
                disableSubmit: false
            })
        }
    }

    componentDidMount() {
        this.firstName.focus();
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
            full_name: this.state.full_name
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

    onUserNameChangeText = (full_name) => {
        let disableSubmit = true;
        if (full_name.length != 0)
            disableSubmit = false;

        return this.setState({full_name, disableSubmit});
    };


    render() {
        return (
            <Container style={styles.container}>
                <THeader type={'BACK_HEADER'} {...this.props}/>
                {this.state.loader && <Loader {...this.props} />}
                <Content style={styles.content} bounces={false}>

                    <View style={styles.formContent}>
                        <Text style={styles.title}>{String.title.enter_full_name}</Text>
                        <Text style={styles.descriptionText}>
                            {String.subtitle.your_name_visible}
                        </Text>


                        <View style={styles.inputGroup}>
                            <TextInput
                                ref={(ref) => this.firstName = ref}
                                keyboardType={'default'}
                                defaultValue={this.state.full_name}
                                placeholder={String.placeholders.enter_your_full_name}
                                returnKeyType={'next'}
                                style={styles.input}
                                placeholderTextColor={colors.gray}
                                autofocus={true}
                                keyboardAppearance={'light'}
                                onChangeText={this.onUserNameChangeText}
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

export default connect(mapStateToProps, mapDispatchToProps)(Username);