import React,{Component} from "react";

export default class SignUpForm extends Component{

    handleRegister(){
        let that = this;
        let email = document.getElementById("email").value;
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("password").value;
        let mobileNumber = document.getElementById("mobilenumber").value;

        fetch("http://localhost:7000/register",{
            method:"post",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body:JSON.stringify({email,password,username,confirmPassword,mobileNumber})
        }).then((res)=>res.json())
            .then((res)=>{
                console.log(res)
                that.props.history.push("/home")
            })
    }


    render() {
        const style1 = {
            "float": "left",
            "border": "none",
            "borderBottom": "2px solid rgba(0, 94, 194, 0.25)",
            "width": "300px",
            "outline": "none",
            "fontSize": "16px",
            "fontWeight": "normal",
            "opacity": "0.5",
            "paddingBottom": "8px",
            "marginBottom": "30px"

        }
        return (
            <div style={{"display": "block", "float": "left", "marginLeft": "13px", "marginTop": "30px"}}>
                <input type={"text"} name={"fullName"} placeholder={"Full Name"} id={"fullname"} style={style1}/>
                <input type={"text"} name={"userName"} placeholder={"Username"} id={"username"} style={style1}/>
                <input type={"number"} name={"mobileNumber"} placeholder={"Mobile Number"} id={"mobilenumber"}
                       style={style1}/>
                <input type={"password"} name={"password"} placeholder={"Password"} id={"password"} style={style1}/>
                <input type={"text"} name={"email"} placeholder={"email"} id={"email"} style={style1}/>
                <button style={{
                    "width": "300px",
                    "fontSize": "14px",
                    "height": "39px",
                    "borderRadius": "7px",
                    "backgroundImage": "linear-gradient(99deg, #0074f0, #0053ab)",
                    "color": "white"
                }} onClick={this.handleRegister.bind(this)}>Register
                </button>
            </div>
        )
    }
}
