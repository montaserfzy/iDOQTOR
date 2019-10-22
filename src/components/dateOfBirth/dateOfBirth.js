import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DatePickerIOS, Text, View, TouchableOpacity, Alert} from 'react-native';
import styles from './dateOfBirth.style';
import String from "../../providers/localization";

class DateOfBirth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        }
        this.onOutSideClick = this.onOutSideClick.bind(this);
    }


    onOutSideClick = ()=>{
        this.props.onClose();
    };

    onSubmitClick = ()=>{
        this.props.onSubmit(this.state.date);
    };
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.outsideView} onPress={this.onOutSideClick}></TouchableOpacity>
                <View style={styles.pickerView}>
                    <Text style={styles.title}> {String.title.what_is_your_date_birth}</Text>
                    <DatePickerIOS
                        mode={'date'}
                        style={styles.pickerBox}
                        date={this.state.date}
                        onDateChange={(currentDate)=>{
                            this.setState({date:currentDate})
                        }}
                    />
                    <TouchableOpacity style={styles.submit} onPress={this.onSubmitClick}>
                        <Text style={styles.submitText}>{String.buttons.submit}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
    }
};
const mapStateToProps = ({userReducer, orderReducer, mapConfig}) => {
    return {
        userReducer,
        orderReducer,
        mapConfig

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(DateOfBirth);