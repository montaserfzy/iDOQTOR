import React, {Component} from "react";
import {Alert, I18nManager, TouchableOpacity} from "react-native";
import ActionSheet from 'react-native-action-sheet';
import {Body, Container, Content, Icon, Left, ListItem, Right, Separator, Text, View} from "native-base";
import {connect} from "react-redux";
import RNRestart from 'react-native-restart';
import DeviceInfo from 'react-native-device-info';
import styles from './settings.style';
import {DateOfBirth, Gender, THeader} from "../../components/";
import { StackActions, NavigationActions } from 'react-navigation';

import {getAppLanguage, LANG_TYPE, updateAppLanguage} from '../../actions/appConfig';
import {doUpdatePatientInfo, removeUserSession} from '../../actions/user';
import String from "../../providers/localization";
import Loader from "../../components/loader/loader";


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isGenderModalVisible: false,
            isBirthDateVisible: false,
            genderValue: 'MALE',
            loader:false
        };


        this.openPage = this.openPage.bind(this);
        this.getGenderLabel = this.getGenderLabel.bind(this);
        this.openGenderModal = this.openGenderModal.bind(this);
        this.onSubmitGender = this.onSubmitGender.bind(this);
        this.onCloseGender = this.onCloseGender.bind(this);
        this.openLanguage = this.openLanguage.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
    }

    openPage = (page) => {
        this.props.navigation.navigate(page);
    };

    getGenderLabel = (gender) => {
        if (!gender)
            return String.not_set;

        if (gender.toLowerCase() == 'male')
            return String.male;

        if (gender.toLowerCase() == 'female')
            return String.female;

    };

    signOut = async () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'SignOut' })],
        });
        this.props.navigation.dispatch(resetAction);
    };


    /**
     * Open Language Action Sheet
     * **/

    openLanguage = () => {
        let BUTTONS = ['العربية', 'English', 'Cancel'];

        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: 2,
            },
            async (buttonIndex) => {
                if (buttonIndex == 0 && this.props.appReducer.appLang != LANG_TYPE.AR) {

                    await this.props.updateAppLanguage(LANG_TYPE.AR);
                    Alert.alert(
                        'Message',
                        'Change language require to restart app',
                        [
                            {
                                text: 'Ok', onPress: () => {
                                    RNRestart.Restart();
                                }
                            },
                            {
                                text: 'Cancel', onPress: () => {
                                }
                            },
                        ],
                        {cancelable: true},
                    );

                }
                if (buttonIndex == 1 && this.props.appReducer.appLang != LANG_TYPE.EN) {
                    await this.props.updateAppLanguage(LANG_TYPE.EN);

                    Alert.alert('Message', 'Change language require to restart app',
                        [
                            {
                                text: 'Ok', onPress: () => {
                                    RNRestart.Restart()
                                }
                            },
                            {
                                text: 'Cancel', onPress: () => {
                                }
                            },
                        ],
                        {cancelable: true},
                    );

                }
            });
    };


    /**
     * Birth Of Date Modal Actions
     * **/

    openBirthDateModal = () => {
        this.setState({isBirthDateVisible: true});
    };

    onCloseBirthDat = () => {
        this.setState({isBirthDateVisible: false});
    };
    onSubmitBirthDate = async (selectedBirthDate ) => {

        /**
         * On Submit do the following
         * */
        this.setState({loader: true});

        /**
         * Request to updated the user information
         * like - gender
         * *** use await to stop waiting to request return
         * */
        debugger
        await this.props.dispatch(doUpdatePatientInfo({
            birth_date: selectedBirthDate
        }));

        /**
         * If the request failing for some reason do th following
         * */
        this.setState({isBirthDateVisible: false});

        if (!this.props.userReducer.isRequestSuccess) {
            this.setState({loader: false});
            return Alert.alert('Message!', this.props.userReducer.error);
        }

        this.setState({loader: false});
    };
    /**
     * Gender Modal Actions
     * **/
    openGenderModal = () => {
        this.setState({isGenderModalVisible: true});
    };
    onCloseGender = () => {
        this.setState({isGenderModalVisible: false});
    };
    onSubmitGender = async (selectedGenderValue = 'MAIL') => {
        /**
         * On Submit do the following
         * */
        this.setState({loader: true});

        /**
         * Request to updated the user information
         * like - gender
         * *** use await to stop waiting to request return
         * */
        debugger
        await this.props.dispatch(doUpdatePatientInfo({
            gender: selectedGenderValue.toLowerCase()
        }));

        /**
         * If the request failing for some reason do th following
         * */
        this.setState({isGenderModalVisible: false});

        if (!this.props.userReducer.isRequestSuccess) {
            this.setState({loader: false});
            return Alert.alert('Message!', this.props.userReducer.error);
        }
        this.setState({loader: false});
    };

    render() {
        let forwardIcon = I18nManager.isRTL ? "arrow-back" : "arrow-forward";
        return (
            <Container style={styles.container}>
                {this.state.loader && <Loader {...this.props} />}
                {
                    this.state.isGenderModalVisible &&
                    <Gender {...this.props} onClose={this.onCloseGender} onSubmit={this.onSubmitGender}/>
                }
                {
                    this.state.isBirthDateVisible &&
                    <DateOfBirth {...this.props} onClose={this.onCloseBirthDat} onSubmit={this.onSubmitBirthDate}/>
                }
                <THeader {...this.props} title={String.headers.settings}/>
                <Content bounces={true} style={styles.content}>
                    <Separator bordered style={styles.listSeparator}>
                        <Text style={styles.listTitle}></Text>
                    </Separator>

                    <View style={styles.listView}>
                        <ListItem style={styles.listItem} noIndent icon onPress={() => this.openPage("Username")}>
                            <Left><Icon name="user-circle" type={'FontAwesome5'} style={styles.icon}/></Left>
                            <Body><Text style={styles.itemText}>{this.props.userReducer.session.full_name}</Text></Body>
                            <Right><Icon active name={forwardIcon}/></Right>
                        </ListItem>

                        <ListItem style={styles.listItem} noIndent icon onPress={() => this.openPage("Phone")}>
                            <Left><Icon name="phone" type={'FontAwesome5'} style={styles.icon}/></Left>
                            <Body><Text style={styles.itemText}>
                                {this.props.userReducer.session.country_code} {this.props.userReducer.session.phone_number}
                            </Text></Body>
                            <Right><Icon active name={forwardIcon}/></Right>
                        </ListItem>

                        <ListItem style={styles.listItem} noIndent icon onPress={() => this.openPage("Email")}>
                            <Left><Icon name="envelope" type={'FontAwesome5'} style={styles.icon}/></Left>
                            <Body><Text style={styles.itemText}>
                                {this.props.userReducer.session.email}
                            </Text></Body>
                            <Right><Icon active name={forwardIcon}/></Right>
                        </ListItem>

                        {
                            false &&
                            <ListItem style={styles.listItem} noIndent icon onPress={() => this.openPage("UpdatePassword")}>
                                <Left><Icon name="lock" type={'FontAwesome5'} style={styles.icon}/></Left>
                                <Body><Text style={styles.itemText}>{String.changePasswordLabel}</Text></Body>
                                <Right><Icon active name={forwardIcon}/></Right>
                            </ListItem>
                        }

                        <ListItem style={styles.listItem} noIndent icon onPress={this.openGenderModal}>
                            <Left><Icon name="user" type={'FontAwesome5'} style={styles.icon}/></Left>
                            <Body><Text style={styles.itemText}>{String.genderLabel}</Text></Body>
                            <Right><Text
                                style={styles.selectedText}>{this.getGenderLabel(this.props.userReducer.session.gender)}</Text>
                                <Icon active name={forwardIcon}/>
                            </Right>
                        </ListItem>

                        <ListItem style={styles.listItem} noIndent icon noBorder onPress={this.openBirthDateModal}>
                            <Left><Icon name="calendar" type={'FontAwesome5'} style={styles.icon}/></Left>
                            <Body><Text style={styles.itemText}>{String.birthOfDateLabel}</Text></Body>
                            <Right><Text style={styles.selectedText}>
                                {new Date(this.props.userReducer.session?.birth_date).toLocaleDateString()}
                            </Text><Icon active name={forwardIcon}/></Right>
                        </ListItem>
                    </View>
                    <Separator bordered style={styles.listSeparator}>
                        <Text style={styles.listTitle}></Text>
                    </Separator>
                    <View style={styles.listView}>
                        <ListItem style={styles.listItem} noIndent icon noBorder onPress={this.openLanguage}>
                            <Left><Icon name="globe-asia" type={'FontAwesome5'} style={styles.icon}/></Left>
                            <Body><Text style={styles.itemText}>{String.language}</Text></Body>
                            <Right>
                                <Text style={styles.selectedText}>{String.current_lang.toUpperCase()}</Text>
                                <Icon active name={forwardIcon}/>
                            </Right>
                        </ListItem>
                    </View>
                    <Separator bordered style={styles.listSeparator}>
                        <Text style={styles.listTitle}></Text>
                    </Separator>
                    <View style={styles.listView}>
                        <ListItem style={styles.listItem} noIndent icon noBorder onPress={this.signOut}>
                            <Left><Icon name="sign-out-alt" type={'FontAwesome5'} style={styles.icon}/></Left>
                            <Body><Text style={styles.itemText}>{String.signOutLabel}</Text></Body>
                        </ListItem>
                    </View>
                </Content>

                {

                    <View style={styles.listFooter}>
                        <TouchableOpacity style={styles.termsBtn}>
                            <Text style={styles.termsText}>Terms and conditions</Text>
                        </TouchableOpacity>
                        <Text style={styles.appVersion}>{DeviceInfo.getApplicationName()} app version
                            2019 {DeviceInfo.getVersion()} ({DeviceInfo.getBuildNumber()})</Text>
                    </View>
                }

            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch: dispatch,
        updateAppLanguage: (lang) => dispatch(updateAppLanguage(lang)),
        getAppLanguage: () => dispatch(getAppLanguage())
    }
};
const mapStateToProps = ({userReducer, appReducer}) => {
    return {
        userReducer,
        appReducer
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);