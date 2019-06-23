import React,{Component} from "react";
import oval_img from "../images/oval_image/oval_img.png";
import "./messageNavbar.css"
import MessageColumn2 from "../userlist/messageColumn2";
import MessageBody from "../messages/messageBody";
import firebase from "../firebase-configure/configure";
import styled from "styled-components";
export default class MessageNavBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:"",
            currentConversationId:""
        }
    }

    componentDidMount() {
        let user = firebase.auth().currentUser;
        //firebase.auth().setPersistence().then()
        console.log(user)
        if (user != null) {
            window.rca.uid = user.uid;
            window.rca.name = user.displayName;
            window.rca.email = user.email;
            this.writeUserData();
            this.setState({
                name:user.displayName
            })
        }


    }



     writeUserData(userId, name, email) {

        // This is used for to acces firestore as real time database

        firebase.firestore()
            .collection('users')
            .onSnapshot((snapshot)=>{
            snapshot.docChanges().forEach((change)=>{
                if(change.type === "modified"){
                    this.setState({
                        name:change.doc.data().displayName
                    })
                }
            })
        })
    }

    handleMessages(id){
        this.setState ({
            currentConversationId:id
        })
    }


    render(){
        const Body = styled("div")`display:flex;flex-direction:row`;
        return (
            <Body>
                <MessageColumn2 handleConversation={(id) => this.handleMessages(id)}/>
                <MessageBody id={this.state.currentConversationId}/>
            </Body>
        )
    }
}