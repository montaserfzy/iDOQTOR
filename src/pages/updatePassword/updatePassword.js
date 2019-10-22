import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Container, Content, Icon} from "native-base";
import styles from './updatePassword.style';
import {connect} from 'react-redux';
import colors from "../../config/colors";
import {THeader} from '../../components/index';

class UpdatePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
        }
    }

    componentDidMount() {
        this.firstName.focus();
    }

    componentWillUnmount() {
    }


    onSubmit = () => {
    };


    render() {
        return (
            <Container style={styles.container}>
                <THeader type={'BACK_HEADER'} {...this.props}/>
                <Content style={styles.content} bounces={false}>

                    <View style={styles.formContent}>
                        <Text style={styles.title}>Change your password</Text>

                        <View style={styles.inputGroup}>
                            <TextInput
                                ref={(ref) => this.firstName = ref}
                                keyboardType={'default'}
                                placeholder={'Enter current password'}
                                returnKeyType={'next'}
                                style={styles.input}
                                placeholderTextColor={colors.gray}
                                autofocus={true}
                                keyboardAppearance={'light'}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextInput
                                ref={(ref) => this.firstName = ref}
                                keyboardType={'default'}
                                placeholder={'Enter new password'}
                                returnKeyType={'next'}
                                style={styles.input}
                                placeholderTextColor={colors.gray}
                                autofocus={true}
                                keyboardAppearance={'light'}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextInput
                                ref={(ref) => this.firstName = ref}
                                keyboardType={'default'}
                                placeholder={'Re-type new password'}
                                returnKeyType={'next'}
                                style={styles.input}
                                placeholderTextColor={colors.gray}
                                autofocus={true}
                                keyboardAppearance={'light'}
                            />
                        </View>
                    </View>



                    <View style={styles.descriptionView}>
                        <TouchableOpacity
                            style={[styles.nextIconBtn, styles.disabled]}
                            onPress={this.onSubmit}>
                            <Text style={styles.nextBtnText}>Submit</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);