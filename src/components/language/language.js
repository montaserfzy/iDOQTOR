import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Picker, Text, View, TouchableOpacity, ActionSheetIOS} from 'react-native';
import styles from './language.style';

class Language extends Component {
    constructor(props) {
        super(props)
        this.state = {
            language:'en'
        }
        this.onOutSideClick = this.onOutSideClick.bind(this);
    }


    onOutSideClick = ()=>{
        this.props.onClose();
    };

    onSubmitClick = ()=>{
        this.props.onSubmit();
    };
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.outsideView} onPress={this.onOutSideClick}>
                    <View style={styles.pickerView}>
                        <Text style={styles.title}> What is your gender?</Text>
                        <Picker
                            selectedValue={this.state.genderValue}
                            style={styles.pickerBox}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({genderValue: itemValue})
                            }>
                            <Picker.Item value="ar" label="العربية"/>
                            <Picker.Item value="en" label="English"/>
                        </Picker>
                        <TouchableOpacity style={styles.submit} onPress={()=>this.onSubmitClick}>
                            <Text style={styles.submitText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
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
export default connect(mapStateToProps, mapDispatchToProps)(Language);