import React, {Component} from 'react';
import {Container, Content, Text, View} from "native-base";
import {FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Expand from 'react-native-simple-expand';

import {getAppLanguage} from '../../actions/appConfig';
import {getVisites} from '../../actions/order';
import styles from './orders.style';
import {THeader} from "../../components/";
import String from '../../providers/localization';

let PAGE = {
    HISTORY: 'history',
    SCHEDULED: 'scheduled',

};

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    componentWillMount() {
        this.setState({open: false})
    }

    render() {
        console.log(this.props);
        return (
            <View style={styles.itemView}>
                <TouchableOpacity style={styles.listItem} onPress={() => this.setState({open: !this.state.open})}>
                    <View style={styles.iHeader}>
                        <Text style={styles.iDate}>{this.props.item.dateTime}</Text>
                        <Text style={styles.iTotal}>{this.props.item.total}</Text>
                    </View>
                    <View style={styles.iBody}>
                        <Text style={styles.iAddress}>{this.props.item.address}</Text>
                    </View>
                </TouchableOpacity>
                <Expand style={styles.expandContainer} value={this.state.open}>
                    <View style={styles.expandView}>
                        <Text style={styles.expandText}>Test Title :</Text>
                        <Text style={styles.expandText}>Test Title :</Text>
                        <Text style={styles.expandText}>Test Title :</Text>
                        <Text style={styles.expandText}>Test Title :</Text>
                    </View>
                </Expand>
            </View>
        )
    }
}

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: PAGE.HISTORY,
            lang: '',
            history: [
                {
                    id: 1,
                    dateTime: 'Saturday, 11:29 PM',
                    total: 'JOD 15',
                    address: 'Airport Street, Amman, Jordan'

                },
                {
                    id: 2,
                    dateTime: 'Saturday, 11:29 PM',
                    total: 'JOD 15',
                    address: 'Airport Street, Amman, Jordan'

                }
            ],
            scheduled: [
                {
                    id: 1,
                    dateTime: 'Tomorrow, 11:29 PM',
                    total: '',
                    address: 'Airport Street, Amman, Jordan'

                }
            ],
            activeItem: [],

        };

        this.switchPage = this.switchPage.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
        this.getVisits = this.getVisits.bind(this);
    };

    componentDidMount() {
        this.setState({activeItem: this.state.history});
        this.setLanguage();
        this.getVisits();
    };

    setLanguage = async () => {
        await this.props.getAppLanguage();
        // await String.setLanguage(this.props.appReducer.appLang);
        // this.forceUpdate();
        this.setState({lang: this.props.appReducer.appLang});
    };

    getVisits = async () => {
        await this.props.dispatch(getVisites());
        debugger
        console.log('orderReducer', this.props.orderReducer.visits)
        this.setState({
            history: this.props.orderReducer.visits
        })
    };

    switchPage = (Page) => {

        let activeItem = this.state.history;
        if (Page === 'scheduled')
            activeItem = this.state.scheduled;

        this.setState({activeTab: Page, activeItem});
    };

    render() {
        if (this.props.appReducer.appLang != this.state.lang)
            this.setLanguage.call();

        let {activeTab} = this.state;
        return (
            <Container>
                <THeader {...this.props} title={String.headers.your_orders}/>
                <Content bounces={true}>
                    <View style={styles.content}>
                        <View style={styles.tabsBtnView}>
                            <TouchableOpacity
                                onPress={() => this.switchPage(PAGE.SCHEDULED)}
                                style={[styles.tabBtn, activeTab == PAGE.SCHEDULED ? styles.active : {}]}>
                                <Text
                                    style={[styles.tabText, activeTab == PAGE.SCHEDULED ? styles.activeTabText : {}]}>
                                    {String.order_schedule_btn}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.switchPage(PAGE.HISTORY)}
                                style={[styles.tabBtn, activeTab == PAGE.HISTORY ? styles.active : {}]}>
                                <Text
                                    style={[styles.tabText, activeTab == PAGE.HISTORY ? styles.activeTabText : {}]}>
                                    {String.order_history_btn}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.tabsView}>
                            <View style={styles.historyView}>
                                <View style={styles.historyView}>
                                    <FlatList
                                        ref={(ref) => this.flatList = ref}
                                        keyExtractor={(item, index) => index}
                                        data={this.state.activeItem}
                                        renderItem={({item}) => <Item item={item}/>}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }

}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
        getAppLanguage: () => dispatch(getAppLanguage)
    }
};
const mapStateToProps = ({userReducer, mapConfig, appReducer, orderReducer}) => {
    return {
        userReducer,
        mapConfig,
        appReducer,
        orderReducer
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);


