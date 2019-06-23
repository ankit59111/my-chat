import React, {Component} from "react";
import firebase from "../firebase-configure/configure";
import loginBottomIcon from "../images/loginBottomIcon/loginBottomIcon.png"
import LoginForm from "../login/loginForm";
import SignUpForm from "../Registration/signupForm";
import {switchLoginRegistration} from "../common/loginRegisterSwitch";
import styled from "styled-components";

export default class  LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLabel: this.props.type ? this.props.type : "login"
        }
    }

    componentDidMount() {
        if (this.state.currentLabel === "login") {
            //switchLoginRegistration("login");
        } else {
            //switchLoginRegistration("register");
        }
    }

    handleLabelClick(id) {
        if (id == "login") {
            //switchLoginRegistration("login");
            this.setState({
                currentLabel: "login"
            })
        } else {
            //switchLoginRegistration("register");
            this.setState({
                currentLabel: "signUp"
            })
        }
    }

    render() {
        const RegistrationForm = styled.div`position:absolute;width:30%;left:50%;top:20%;height:355px;border:1px solid black;`;
        const RegistrationHeading = styled("p")`display:block;font-size:25px;font-weight:400;margin:0;
        padding:7px;background: linear-gradient(102deg, mediumseagreen,#ffffff);`;
        const LoginHeading = styled(RegistrationHeading)`color:blue;font-size:11px;font-weight:200;cursor:pointer;background:white`;
        return (
            <RegistrationForm>
                <RegistrationHeading onClick={() => this.handleLabelClick("signUp")}>
                    Sign up
                </RegistrationHeading>
                {this.state.currentLabel === "login" ? <LoginForm {...this.props}/> : <SignUpForm {...this.props}/>}
                <LoginHeading onClick={() => this.handleLabelClick("login")}>
                    Already have an account? <span>sign in</span>
                </LoginHeading>
            </RegistrationForm>
        )
    }
}