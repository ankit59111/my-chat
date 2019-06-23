import React,{Component} from "react";
import firebase from "../firebase-configure/configure";

export default class SignUpForm extends Component{
    constructor(props){
        super(props)
    }

    handleRegister(){
        let that = this;
        let fullName = document.getElementById("fullname").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("password").value;

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                let newuser = firebase.auth().currentUser;
                newuser =  newuser.toJSON();

                if(newuser) {
                    firebase.firestore()
                        .collection('users')
                        .add({
                        uid: newuser.uid,
                        username: fullName,
                        email: newuser.email,
                    }).then((doc) => {
                        console.log("done ", doc)
                    }).catch((err) => console.log(err));
                }
            })
            .catch((error) => {
                console.log({ error: error });
            });


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
