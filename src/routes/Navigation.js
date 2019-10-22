import React, {Component} from "react";
import {Image, TouchableOpacity, View} from "react-native";
import {Container, Content, Text} from "native-base";
import styles from './navigation.style';
import {connect} from "react-redux";
import String from '../providers/localization';
import {getAppLanguage} from '../actions/appConfig'


let avatar = require('../assets/icons/avatar.png');
let history = require('../assets/icons/history.png');
let settings = require('../assets/icons/settings.png');
let notifications = require('../assets/icons/notifications.png');
let helps = require('../assets/icons/helps.png');
let medical = require('../assets/icons/medical-tool.png');

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        };

        this.doNavigate = this.doNavigate.bind(this);
        this.doSignOut = this.doSignOut.bind(this);
        this.setViewLanguage = this.setViewLanguage.bind(this);
        this.getImage = this.getImage.bind(this);
    }

    componentWillMount() {}

    componentDidMount(){
        // this.setViewLanguage()
    }

    doSignOut = async () => {};

    setViewLanguage = async () => {
        await this.props.getAppLanguage();
        // await String.setLanguage(window.lang || 'en');
        this.forceUpdate();
    };

    doNavigate = async (data) => {
        this.props.navigation.toggleDrawer();
        setTimeout(() => {
            this.props.navigation.navigate(data);
        }, 10)
    };

    getImage = ()=>{
        if(this.props.userReducer.session?.facebook_image_url){
            return {uri:this.props.userReducer.session?.facebook_image_url}
        }
        return avatar
    }



    render() {

        return (
            <Container style={styles.container}>
                <Content bounces={true}>
                    <View style={styles.navView}>
                        <Image source={this.getImage()} style={styles.image}></Image>
                        <Text style={styles.username}>{this.props.userReducer.session.full_name}</Text>
                        <View style={styles.sep}></View>

                        <TouchableOpacity style={styles.item} onPress={() => this.doNavigate('Orders')}>
                            <Image source={history} style={styles.icon}></Image>
                            <Text style={styles.title}>{String.navigation.your_orders}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item} onPress={() => this.doNavigate('Notifications')}>
                            <Image source={notifications} style={styles.icon}></Image>
                            <Text style={styles.title}>{String.navigation.notifications}</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.item} onPress={() => this.doNavigate('Help')}>
                            <Image source={helps} style={styles.icon}></Image>
                            <Text style={styles.title}>{String.navigation.help}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item} onPress={() => this.doNavigate('Settings')}>
                            <Image source={settings} style={styles.icon}></Image>
                            <Text style={styles.title}>{String.navigation.settings}</Text>
                        </TouchableOpacity>

                    </View>
                </Content>
                <View style={styles.footerView}>
                    <TouchableOpacity style={styles.footerBtn}>
                        {/*<Image source={medical} style={styles.medicalToolIcon}/>*/}
                        <Text style={styles.footer}>
                            {/*{String.navigation.become_doctor}*/}
                        </Text>
                    </TouchableOpacity>
                </View>

            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch: dispatch,
        getAppLanguage: () => dispatch(getAppLanguage()),
    }
};
const mapStateToProps = ({userLang, userReducer, appReducer}) => {
    return {
        userReducer,
        userLang,
        appReducer
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Nav);