import React,{Component} from "react";

export default class LoginForm extends Component{


    handleLogin(){
        let that = this;
       let email = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        console.log({email,password})

        fetch("http://localhost:7000/login",{
            method:"post",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body:JSON.stringify({email,password})
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
            <div style={{
                "display": "block",
                "float": "left",
                "marginLeft": "13px",
                "marginTop": "30px",
                "color": "black",
                "fontSize": "16px"
            }}>
                <input type={"text"} name={"username"} placeholder={"Username or Mobile Number"} id={"username"}
                       style={style1}/>
                <input type={"password"} name={"password"} placeholder={"Password"} id={"password"} style={style1}/>
                <div style={{"float": "left", "fontSize": "12px"}}>
                    <input type={"checkbox"} name={"remember"}/>
                    <span style={{"paddingLeft": "5px"}}>Remember Me</span>
                    <span style={{
                        "fontSize": "11px",
                        "color": "#005ec2",
                        "paddingLeft": "108px"
                    }}>Forgot Password ?</span>
                </div>
                <div style={{"float": "left", "width": "100%"}}>
                    <button style={{
                        "width": "300px",
                        "height": "39px",
                        "borderRadius": "7px",
                        "backgroundImage": "linear-gradient(99deg, #0074f0, #0053ab)",
                        "color": "white",
                        "marginTop": "5px"
                    }} onClick={this.handleLogin.bind(this)}>Log in
                    </button>
                </div>
            </div>
        )
    }
}
