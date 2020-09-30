import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { provider } from './index';
import { setUser } from './authActions';

function Login(props) {
    const signIn = () => {
        props.firebase.auth().signInWithPopup(provider)
        .then((res) => props.setUser(res.user))
        .catch(err => console.log(err))
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://lh3.googleusercontent.com/S11TfkKTNdlyf0ck5SMmJV4tSPe_QjtYMYmUsZdk-0OEXCjm-p5P8HlaWEpNRdjNzSkmFbU=s85" alt="image"/>
                <div className="login__text">
                    <h1>Sign In To Whatsapp</h1>
                </div>
                <Button onClick={signIn} type="submit">
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default compose(firebaseConnect(),
    connect((state,props) =>({
        auth:state.firebase.auth
    }),{ setUser })
)(Login);
