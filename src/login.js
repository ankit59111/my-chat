import React, {Component} from "react";
import loginBottomIcon from "./loginBottomIcon/loginBottomIcon.png"
import LoginForm from "./loginForm";
import SignUpForm from "./signupForm";

export default class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLabel: this.props.type ? this.props.type : "login"
        }
    }

    componentDidMount() {
        if (this.state.currentLabel == "login") {
            document.getElementById("loginBottomIcon").style.display = "block";
            document.getElementById("signUpBottomIcon").style.display = "none";
            document.getElementById("signUp").style.color = "rgba(33, 42, 57, 0.5)";
            document.getElementById("login").style.color = "black";
            this.setState({
                currentLabel: "login"
            })
        } else {
            document.getElementById("loginBottomIcon").style.display = "none";
            document.getElementById("signUpBottomIcon").style.display = "block";
            document.getElementById("login").style.color = "rgba(33, 42, 57, 0.5)";
            document.getElementById("signUp").style.color = "black";
            this.setState({
                currentLabel: "signUp"
            })
        }
    }

    handleLabelClick(id) {
        if (id == "login") {
            document.getElementById("loginBottomIcon").style.display = "block";
            document.getElementById("signUpBottomIcon").style.display = "none";
            document.getElementById("signUp").style.color = "rgba(33, 42, 57, 0.5)";
            document.getElementById("login").style.color = "black";
            this.setState({
                currentLabel: "login"
            })
        } else if (id == "signUp") {
            document.getElementById("loginBottomIcon").style.display = "none";
            document.getElementById("signUpBottomIcon").style.display = "block";
            document.getElementById("login").style.color = "rgba(33, 42, 57, 0.5)";
            document.getElementById("signUp").style.color = "black";
            this.setState({
                currentLabel: "signUp"
            })
        }
    }

    render() {
        const style = {
            "boxShadow": "0 4px 10px 0 rgba(33, 42, 57, 0.5)",
            "backgroundColor": "#ffffff",
            "width": "349px",
            "height": this.state.currentLabel == "login" ? "349px" : "fit-content",
            "position": "absolute",
            "borderRadius": "7px"
        }
        const style1 = {
            "color": "black",
            "float": "left",
            "padding": "10px 10px 0px 13px",
            "fontSize": "18px"
        };
        const style2 = {
            "color": "rgba(33, 42, 57, 0.5)",
            "float": "left",
            "padding": "10px 10px 0px 13px",
            "fontSize": "18px"
        };
        return (
            <div style={style}>
                <div style={{"float": "left", "width": "100%", "cursor": "pointer"}}>
                    <div style={style1} id={"login"} onClick={this.handleLabelClick.bind(this, "login")}>
                        Login <p style={{"marginTop": "0px","height":"20px"}} id={"loginBottomIcon"}><img src={loginBottomIcon} alt={"login"}/>
                    </p>
                    </div>
                    <div style={style2} id={"signUp"} onClick={this.handleLabelClick.bind(this, "signUp")}>
                        Sign up<p style={{"marginTop": "0px", "display": "none","height":"20px"}} id={"signUpBottomIcon"}>
                        <img src={loginBottomIcon} alt={"login button"}/>
                    </p>
                    </div>
                </div>
                {this.state.currentLabel === "login" ? <LoginForm {...this.props}/> : <SignUpForm {...this.props}/>}
            </div>
        )
    }
}