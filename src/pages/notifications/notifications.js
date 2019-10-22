import React, {Component} from "react";
import {Image, TouchableOpacity, View, FlatList} from "react-native";
import {Card, CardItem, Container, Content, Text} from "native-base";
import {connect} from "react-redux";

import styles from './notifications.style';
import {THeader} from "../../components/";
import String from '../../providers/localization';

class Item extends Component {
    render() {
        console.log(this.props)
        return (
            <View style={styles.itemView}>
                <Card style={styles.iCard}>
                    <CardItem cardBody>
                        <Image source={{uri:this.props.item.image}} style={styles.iImage}/>
                    </CardItem>
                    <View style={styles.iHeader}>
                        <Text style={styles.iTitle} numberOfLines={1}>{this.props.item.title}</Text>
                        <Text style={styles.iDate}>{this.props.item.dateTime}</Text>
                    </View>
                    <View style={styles.iBody}>
                        <Text style={styles.iDescription} numberOfLines={2}>{this.props.item.description}</Text>
                    </View>
                    <View style={styles.iFooter}>
                        <TouchableOpacity style={styles.iReadMoreBtn}>
                             <Text style={styles.iReadMoreText}> Read more</Text>
                        </TouchableOpacity>
                    </View>
                </Card>
            </View>
        )
    }
}


class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list :[
                {
                    id: 1,
                    title: 'Use iDOCTOR APP 1',
                    dateTime: '5 days',
                    description: 'Use Promo code before 20-4 for 1.5 JD to got Use Promo code before 20-4 for 1.5 JD to got Use Promo code before 20-4 for 1.5 JD to got',
                    image:'http://p0.ipstatp.com/large/005b74a5d4d900915fb4'

                },
                {
                    id: 2,
                    title: 'Use iDOCTOR APP 2',
                    dateTime: '5 days',
                    description: 'Use Promo code before 20-4 for 1.5 JD to got benefits Use Promo code before 20-4 for 1.5 JD to got Use Promo code before 20-4 for 1.5 JD to got',
                    image:'http://p0.ipstatp.com/large/005b74a5d4d900915fb4'
                }
            ],
        };
    }

    componentDidMount() {}

    render() {
        return (
            <Container style={styles.container}>
                <THeader {...this.props} title={String.headers.notifications}/>
                <Content bounces={true}>
                    <FlatList
                        ref={(ref)=> this.flatList = ref}
                        keyExtractor={(item, index) => index}
                        data={this.state.list}
                        renderItem={({item}) => <Item item={item} />}
                    />
                </Content>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch: dispatch
    }
};
const mapStateToProps = ({userReducer}) => {
    return {
        userReducer
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);