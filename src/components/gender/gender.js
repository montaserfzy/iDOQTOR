import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Picker, Text, View, TouchableOpacity, Alert} from 'react-native';
import styles from './gender.style';
import String from "../../providers/localization";

class Gender extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genderValue:'MALE'
        };
        this.onOutSideClick = this.onOutSideClick.bind(this);
    }


    onOutSideClick = ()=>{
        this.props.onClose();
    };

    onSubmitClick = ()=>{
        this.props.onSubmit(this.state.genderValue);
    };
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.outsideView} onPress={this.onOutSideClick}></TouchableOpacity>
                <View style={styles.pickerView}>
                    <Text style={styles.title}> {String.title.what_is_your_gender}</Text>
                    <Picker
                        selectedValue={this.state.genderValue}
                        style={styles.pickerBox}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({genderValue: itemValue})
                        }>
                        <Picker.Item value="MALE" label={String.male} />
                        <Picker.Item value="FEMALE" label={String.female} />
                    </Picker>
                    <TouchableOpacity style={styles.submit} onPress={()=>this.onSubmitClick()}>
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
export default connect(mapStateToProps, mapDispatchToProps)(Gender);