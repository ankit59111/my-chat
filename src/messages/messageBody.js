import React,{Component} from "react";
import ovalImage from "../images/oval_image/oval_img.png";
import searchIcon from "../images/search_icon/search_icon.png";
import settingIcon from "../images/group-2_2019-01-08/group-2.png"
import "./messageBody.css";
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


    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.id !== nextProps.id) {
            let that = this;
            let allmessages = [];
            firebase.firestore().collection('messages').onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    let messageCollection = change.doc.data();
                    console.log(messageCollection)
                    if (messageCollection.id === nextProps.id + window.rca.uid || messageCollection.id === window.rca.uid + nextProps.id) {
                        allmessages = [];
                        allmessages.push(change.doc.data());
                    }

                })
                that.setState({
                    message: allmessages,
                    isLoaded: true
                })

            })
        }
    }


    componentDidMount() {


    }

    handleMessage() {
        let that = this;
        let uniqueMessageid = false;
        let newMessage = {
            type: "sent",
            receiver: this.props.id,
            sender: window.rca.uid || "",
            message: document.getElementById("id_message_field").value
        }
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
                    console.log("ereqwfdgs")
                }
            })


            document.getElementById("id_message_field").value = "";

            let messageAreaHeight = document.getElementById("id_messageArea").scrollHeight;
            let client = document.getElementById("id_messageArea").clientHeight;
            document.getElementById("id_messageArea").scrollBy(0, messageAreaHeight - client);
        }


    }

    bgChange(color){

        document.getElementById("basic-text1").style.backgroundImage = `linear-gradient(103deg, ${color}, ${color})`
    }

    bgOutChange(){
        document.getElementById("basic-text1").style.backgroundImage = `linear-gradient(103deg, #0074f0, #0053ab)`
    }

    render(){
        const MessageBody = styled.div`width:65%;height:100vh;border:1px solid black;background-color: #eff0f1;`;
        const CardHeader = styled.div`background-color: rgb(0, 94, 194);color: white;border-radius: 0px 0px 10px 10px;
                                    box-shadow: rgba(0, 94, 194, 0.45) 0px 2px 6px 0px;height: 67px;`;
        const InputDiv = styled.div`display: flex;flex-basis: 100%;width: 100%;height: 100vh;position: relative;`;
        const InputField = styled.input`border-right: none;padding-left: 0px;position: absolute;bottom: 69px;width: 91%;
                                        height: 57px;border: 1px solid #eff0f1;box-shadow: rgba(0,94,194,0.45) 0px 2px 6px 0px;
                                        outline:none;font-size: 18px;`;
        const SubmitDiv = styled.div`position: absolute;bottom: 69px;right: 0%;width: 9%;height: 57px;
                                    background-image: linear-gradient(103deg, #0074f0, #0053ab);display:flex;
                                    align-items:center;justify-content: center;color:white;font-size: 20px;
                                    font-style: italic;font-weight: 800;box-shadow: rgba(0,94,194,0.45) 0px 2px 6px 0px;
                                    border-radius: 3px;`;


        return(

                <MessageBody >
                    <CardHeader>
                        <div className={"row"}>
                            <div className={"col-2"}>
                                <img src={ovalImage} width={"55px !important"} height={"55px !important"} alt={"oval_image"}/>
                            </div>
                        </div>
                    </CardHeader>
                    {this.state.isLoaded && this.state.message.length>0 ?
                        <div style={{"height": "590px"}}>
                            <div className={"card-footer"}
                                 style={{"backgroundColor": "white", "height": "600px", "overflowY": "scroll"}}
                                 id="id_messageArea">

                                {this.state.message[0].messages.map((item, index) => {
                                    return (
                                        <div className={"card-body"} key={index}
                                             style={{"paddingLeft": "0", "paddingRight": "0"}}>

                                            <div className={item.sender == window.rca.uid ? "row styleRight" : "row"}>
                                                <div className="container">
                                                    <div className={"row"}>
                                                        <div className={"col-9"}>
                                                            <p>{item.message} </p>
                                                        </div>
                                                        <div className={"col-3"}>
                                                            <span className="time-right">11:00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            {/*<div className="row" style={{"float":"right","backgroundColor":"white"}}>*/}
                                            {/*<div className="container darker">*/}
                                            {/*<div className={"row"}>*/}
                                            {/*<div className={"col-9"}>*/}
                                            {/*<p>Hello world adffasfa adfdafa afadfa </p>*/}
                                            {/*</div>*/}
                                            {/*<div className={"col-3"}>*/}
                                            {/*<span className="time-right">11:00</span>*/}
                                            {/*</div>*/}
                                            {/*</div>*/}
                                            {/*<span className="time-left">11:01</span>*/}
                                            {/*</div>*/}
                                            {/*</div>*/}
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    :<div></div>}
                    <InputDiv>

                        <InputField id={"id_message_field"} type="text"
                               placeholder="Type a Message......"
                               aria-label="Search" />
                        <SubmitDiv  id={"id_submit_button"}
                             onClick={this.handleMessage.bind(this)}>
                                    <span
                                          onMouseDown={this.bgChange.bind(this, "white")}
                                          onMouseUp={this.bgOutChange.bind(this)} >
                                        Send
                                        </span>
                        </SubmitDiv>

                    </InputDiv>
                </MessageBody>


        )
    }
}