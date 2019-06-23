import React,{Component} from "react";
import firebase from "../firebase-configure/configure";
import "./loginForm.css";
import styled from "styled-components";

export default class LoginForm extends Component{


    handleLogin(){
        let that = this;
       let email = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        console.log({email,password})


        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user.user.metadata.lastSignInTime);
                user.user.getIdToken(false)
                    .then((data)=>{
                        document.cookie = `rca_token = ${data}`
                    }).catch((err)=>console.log(err));

                that.props.history.push('/home');
            })
            .catch((error) => {
                console.log({ error: error });
            });
    }

    render() {
        const LoginForm = styled("div")``;
        return (
            <div className="loginFormDiv">
                <input className="inputField" type="text" name={"username"} placeholder={"email"} id={"username"} />
                <input className="inputField" type="password" name={"password"} placeholder={"Password"} id={"password"}/>
                <div style={{"float": "left", "fontSize": "12px"}}>
                    <input type={"checkbox"} name={"remember"}/>
                    <span style={{"paddingLeft": "5px"}}>Remember Me</span>
                    <span className="forgotPassword">Forgot Password ?</span>
                </div>
                <div style={{"float": "left", "width": "100%"}}>
                    <button className="loginSubmitButton"  onClick={this.handleLogin.bind(this)}>Log in
                    </button>
                </div>
            </div>
        )
    }
}
