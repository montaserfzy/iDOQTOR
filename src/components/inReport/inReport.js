import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {CheckBox} from 'native-base';
import {OrderTypes, updateOrderStatus} from '../../actions/order';


import styles from './inReport.style';
import colors from "../../config/colors";


class InReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportValue: 0,
            list: [
                {
                    id: 1,
                    label: 'Unprofessional Behavior',
                    selected: false
                },
                {
                    id: 2,
                    label: 'Poor Personal hygiene',
                    selected: false
                }, {
                    id: 3,
                    label: 'Doctor Arrived Late',
                    selected: false
                },
                {
                    id: 4,
                    label: 'Doctor Never Arrived',
                    selected: false
                },
            ]
        };

        this.onSubmitIssue = this.onSubmitIssue.bind(this);
        this.setIssue = this.setIssue.bind(this);
    }


    onSubmitIssue = async () => {
        return await this.props.updateOrderStatus(OrderTypes.NO_STATE);
    };
    setIssue = (id) => {
        let itemList = this.state.list;
        itemList = itemList.map(item => {
            item.selected = false;
            if (id == item.id)
                item.selected = true;

            return item;
        });
        this.setState({list: itemList, reportValue: id})
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}> Report Issue</Text>
                    <View style={styles.separatedView}/>
                    <ScrollView automaticallyAdjustContentInsets={false}>


                        {
                            this.state.list.map((item, index) => {
                                return (
                                    <TouchableOpacity style={styles.listItem}
                                                      onPress={() => this.setIssue(item.id)}>
                                        <CheckBox checked={item.selected} color={colors.primary}
                                                  style={styles.checkbox}
                                                  pointerEvents={'none'}
                                        />
                                        <Text style={styles.itemText}>{item.label}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </ScrollView>
                </View>
                {
                    (
                        this.state.reportValue != 0 &&
                        <TouchableOpacity style={styles.rateSubmitBtn} onPress={this.onSubmitIssue}>
                            <Text style={styles.rateSubmitText}>Submit</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
        updateOrderStatus: (orderType) => dispatch(updateOrderStatus(orderType))
    }
};
const mapStateToProps = ({userReducer, orderReducer, mapConfig}) => {
    return {
        userReducer,
        orderReducer,
        mapConfig

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(InReport);