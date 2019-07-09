import React,{Component} from "react";
import ovalImage from "../images/oval_image/oval_img.png";
//import "./messageBody.css";
import firebase from "../firebase-configure/configure";
import styled from "styled-components";

export default class MessageBody extends Component{
    constructor(props){
        super(props);
        this.state = {
            message : [],
            isLoaded:false
        }
    }


    componentDidMount() {
        let nextProps = {id:this.props.id}
        if (this.props.id) {
            let that = this;
            let allmessages = [];
            firebase.firestore().collection('messages').onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    let messageCollection = change.doc.data();

                    if (messageCollection.id === nextProps.id + window.rca.uid || messageCollection.id === window.rca.uid + nextProps.id) {
                        allmessages = [];
                        allmessages.push(change.doc.data());
                    }

                });
                that.setState({
                    message: allmessages,
                    isLoaded: true
                })

            })
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps)
    }

    handleMessage() {
        let that = this;
        let uniqueMessageid = false;
        let newMessage = {
            type: "sent",
            receiver: this.props.id,
            sender: window.rca.uid || "",
            message: document.getElementById("id_message_field").value
        };
        if (newMessage.message) {
            var query = firebase.firestore().collection("messages").get();
            query.then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    let data = childSnapshot.data();
                    if (data.id == that.props.id + window.rca.uid || data.id == window.rca.uid + that.props.id) {
                        uniqueMessageid = childSnapshot.id;
                    }

                });
            }).then(() => {
                if (uniqueMessageid) {
                    firebase.firestore().collection('messages').doc(uniqueMessageid).update({
                        messages:firebase.firestore.FieldValue.arrayUnion(newMessage)
                    })

                } else {
                    firebase.firestore().collection('messages').add({
                        id: that.props.id + window.rca.uid,
                        messages: [newMessage]
                    });

                }
            })


            document.getElementById("id_message_field").value = "";

            let messageAreaHeight = document.getElementById("id_messageArea").scrollHeight;
            let client = document.getElementById("id_messageArea").clientHeight;
            document.getElementById("id_messageArea").scrollBy(0, messageAreaHeight - client);
        }


    }

    // bgChange(color){
    //
    //     document.getElementById("basic-text1").style.backgroundImage = `linear-gradient(103deg, ${color}, ${color})`
    // }
    //
    // bgOutChange(){
    //     document.getElementById("basic-text1").style.backgroundImage = `linear-gradient(103deg, #0074f0, #0053ab)`
    // }

    render(){
        const MessageBody = styled.div`width:65%;height:100vh;border:1px solid black;background-color: #eff0f1;position:relative`;
        const CardHeader = styled.div`background-color: rgb(0, 94, 194);color: white;border-radius: 0px 0px 10px 0px;
                                    box-shadow: rgba(0, 94, 194, 0.45) 0px 2px 6px 0px;height: 67px;`;
        const InputDiv = styled.div`display: flex;flex-basis: 100%;width: inherit;position: fixed;bottom:-67px;`;
        const InputField = styled.input`border-right: none;padding-left: 15px;position: absolute;bottom: 69px;width: 91%;
                                        height: 57px;border: 1px solid #eff0f1;box-shadow: rgba(0,94,194,0.45) 0px 2px 6px 0px;
                                        outline:none;font-size: 18px;`;
        const SubmitDiv = styled.div`position: absolute;bottom: 69px;right: 0%;width: 9%;height: 57px;
                                    background-image: linear-gradient(103deg, #0074f0, #0053ab);display:flex;
                                    align-items:center;justify-content: center;color:white;font-size: 20px;
                                    font-style: italic;font-weight: 800;box-shadow: rgba(0,94,194,0.45) 0px 2px 6px 0px;
                                    border-radius: 3px;`;
        const OwnMessage = styled.div`    display: block;margin-bottom:12px;width:100%;position:relative;
        padding:0 40px;`;
        const OwnMessageDiv = styled.p`background: white;color:black;padding: 15px;border-radius:8px;max-width:300px`;
        const ReceivedMessageDiv = styled.p`background:blue;color:white;padding: 15px;border-radius:8px;max-width:300px`;


        return(

                <MessageBody >
                    <CardHeader>
                        <div className={"row"}>
                            <div className={"col-2"} style={{"padding": "5px 0 0 15px"}}>
                                <img src={ovalImage} width={"55px !important"} height={"55px !important"} alt={"oval_image"}/>
                            </div>
                        </div>
                    </CardHeader>
                    {this.state.isLoaded && this.state.message.length>0 ?
                            <div className={"card-footer"} style={{"overflow":"hidden scroll","height": "66vh","display":"flex","flex-direction":"column"}} id="id_messageArea">
                                {this.state.message[0].messages.map((item, index) => {
                                    return (
                                        item['sender'] === window.rca.uid ?
                                                <OwnMessage key={index} >
                                                    <div style={{"float":"left"}}>
                                                    <OwnMessageDiv>{item.message} </OwnMessageDiv>
                                                    </div>
                                                </OwnMessage>
                                        :
                                                <OwnMessage key={index} >
                                                    <div style={{"float":"right"}}>
                                                    <ReceivedMessageDiv>{item.message} </ReceivedMessageDiv>
                                                    </div>

                                                </OwnMessage>
                                    )
                                })}

                            </div>
                    :""}
                    <InputDiv>

                        <InputField id={"id_message_field"} type="text"
                               placeholder="Type a Message......"
                               aria-label="Search" />
                        <SubmitDiv  id={"id_submit_button"}
                             onClick={this.handleMessage.bind(this)}>
                                    <span>
                                        Send
                                        </span>
                        </SubmitDiv>

                    </InputDiv>
                </MessageBody>


        )
    }
}