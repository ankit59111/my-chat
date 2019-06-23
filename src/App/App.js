import React, {Component} from 'react';
import path10 from '../images/path-10.svg';
import path3 from '../images/path-3.png';
import './App.css';
import LoginComponent from "./login";
import firebase from "../firebase-configure/configure";
import styled from "styled-components";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: "login"
        }
    }

    static getDerivedStateFromProps(props) {
        let that = this;
        window.jQuery( document ).ready(function() {
            console.log( "testing.." );
            firebase.auth().onAuthStateChanged(user=>{
                if(user){
                    props.history.push('/home');
                }
            });

        });
    }

    render() {
        const RegistrationBody = styled.div`position:relative;width:100%;height:100vh`;
        const ImageCard = styled.div`position:absolute;height:355px;top:20%;left:20%;width:384px;border:1px solid black;
        background: sandybrown;`;

        return (
            <div className="App">
                <RegistrationBody>
                    <ImageCard></ImageCard>
                    <LoginComponent {...this.props} type={this.state.type}/>
                </RegistrationBody>
            </div>
        );
    }
}

export default App;
