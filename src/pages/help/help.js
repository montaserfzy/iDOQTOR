import React, {Component} from "react";
import {Body, Container, Content, Icon, ListItem, Right, Separator, Text, View} from "native-base";
import {I18nManager} from "react-native";
import {connect} from "react-redux";
import String from '../../providers/localization';
import styles from './help.style';
import {THeader} from "../../components/";


class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        let forwardIcon = I18nManager.isRTL?"arrow-back": "arrow-forward";
        return (
            <Container style={styles.container}>
                <THeader {...this.props} title={String.headers.help}/>
                <Content bounces={true}>

                    <Separator bordered style={styles.listSeparator}>
                        <Text style={styles.listTitle}>{String.quick_help_label}</Text>
                    </Separator>


                    <View style={styles.listView}>
                        <ListItem style={styles.listItem} noIndent>
                            <Body><Text style={styles.itemText}>What are iDOCTOR rates?</Text></Body>
                            <Right><Icon active name={forwardIcon} /></Right>
                        </ListItem>
                        <ListItem style={styles.listItem} noIndent>
                            <Body><Text style={styles.itemText}>Why am I being charged a cancellation fee?</Text></Body>
                            <Right><Icon active name={forwardIcon} /></Right>
                        </ListItem>
                    </View>

                    <Separator bordered style={styles.listSeparator}>
                        <Text style={styles.listTitle}>{String.more_help_topic}</Text>
                    </Separator>

                    <View style={styles.listView} >
                        <ListItem style={styles.listItem} noIndent>
                            <Body><Text style={styles.itemText}>Your payments and receipts</Text></Body>
                            <Right><Icon active name={forwardIcon} /></Right>
                        </ListItem>

                        <ListItem style={styles.listItem} noIndent>
                            <Body><Text style={styles.itemText}>Safety & Security</Text></Body>
                            <Right><Icon active name={forwardIcon} /></Right>
                        </ListItem>

                        <ListItem style={styles.listItem} noIndent>
                            <Body><Text style={styles.itemText}>Your orders</Text></Body>
                            <Right><Icon active name={forwardIcon} /></Right>
                        </ListItem>

                        <ListItem style={styles.listItem} noIndent>
                            <Body><Text style={styles.itemText}>Your guide to iDOCTOR</Text></Body>
                            <Right><Icon active name={forwardIcon} /></Right>
                        </ListItem>
                    </View>

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
export default connect(mapStateToProps, mapDispatchToProps)(Help);