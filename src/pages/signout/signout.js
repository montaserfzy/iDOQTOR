import React from 'react';
import {connect} from "react-redux";
import Loader from "../../components/loader/loader";
import {doSignOutRequest} from "../../actions/user";

class SignOut extends React.Component {
    constructor(props) {
        super(props);
        this.signOutApp = this.signOutApp.bind(this);
    }

    componentWillMount() {
      this.signOutApp()
    }

    signOutApp = async () => {
        await this.props.dispatch(doSignOutRequest());
        return setTimeout(function(){
            this.props.navigation.navigate('RegisterRoute');
        }.bind(this), 500);
    };


    render() {
        return (
            <Loader/>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
    }
};

const mapStateToProps = ({userReducer}) => {
    return {
        userReducer
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);