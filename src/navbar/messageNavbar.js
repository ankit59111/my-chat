import React,{Component} from "react";
import "./messageNavbar.css"
import MessageBody from "../messages/messageBody";
import firebase from "../firebase-configure/configure";
import styled from "styled-components";
import ovalImage from "../images/oval_image/oval_img.png";
import searchIcon from "../images/search_icon/search_icon.png";
import MessageCard from "../userlist/messageCard";
export default class MessageNavBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:"",
            data:[],
            currentConversationId:""
        };

    }

    componentDidMount() {
        let user = firebase.auth().currentUser;
        //firebase.auth().setPersistence().then()
        if(user != null){
            window.rca.uid = user.uid;
            window.rca.username = user.displayName;
        }
        let that = this;
        let currentUserlist = this.state.data || [];

        firebase.firestore().collection('users').onSnapshot((snapshot)=>{

            snapshot.docChanges().forEach((change)=>{
                if(change.type === "added"){
                    if(change.doc.data().uid !== window.rca.uid) currentUserlist.push(change.doc.data());
                }

            });
            that.setState({
                data : currentUserlist,
                isLoaded:true
            })

        })


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
        let that = this;
        const Body = styled("div")`display:flex;flex-direction:row`;
        const UserListDiv = styled.div`width:30%;margin-left:20px;height:100vh;`;
        const SearchDiv = styled.div`width:100%;background: rgb(246,246,246);padding: 7px;`;
        const InputField = styled("input")`width:100%;height:42px;border: none;
                border-radius: 23px;padding-left: 20px;font-size: 17px;outline:none; `;
        const SearchImageTag = styled("img")`position: absolute;left: 28%;top: 84px;`;
        const CardHeader = styled.div`background-color: rgb(0, 94, 194);color: white;border-radius: 0px 0px 0px 10px;
                                    box-shadow: rgba(0, 94, 194, 0.45) 0px 2px 6px 0px;height: 67px;
                                    border-right: 1px solid white;`;
        let id = this.state.currentConversationId;
        return (
            this.state.isLoaded?
                <Body>

                    <UserListDiv>
                        <CardHeader>
                            <div className={"row"}>
                                <div className={"col-2"} style={{"padding": "5px 0 0 15px"}}>
                                    <img src={ovalImage} width={"55px !important"} height={"55px !important"}
                                         alt={"oval_image"}/>
                                </div>
                            </div>
                        </CardHeader>
                        <SearchDiv>
                            <SearchImageTag className="fas fa-search text-white" src={searchIcon} aria-hidden="true"
                                            alt={"search icon"}/>
                            <InputField className="form-control my-0 py-1" type="text" placeholder="Search"
                                        aria-label="Search"/>
                        </SearchDiv>
                        <div style={{"background": "white"}}>
                            {this.state.data.map((item, index) => {
                                return <div key={index} onClick={() => this.handleMessages(item.uid)}>
                                    <MessageCard item={item} {...this.props} />
                                </div>
                            })}
                        </div>
                    </UserListDiv>
                    <MessageBody id={id}/>


                </Body>
                :
                <div/>
        )
    }
}