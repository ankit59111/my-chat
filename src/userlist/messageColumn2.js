import React,{Component} from "react"
import searchIcon from "../images/search_icon/search_icon.png";
import MessageCard from "./messageCard";
import firebase from "../firebase-configure/configure";
import styled from "styled-components";
import ovalImage from "../images/oval_image/oval_img.png";

export default class MessageColumn2 extends Component{
    constructor(props){
        super(props);
        this.state={
            usersList:[{username:"asdf",message:"adafddfassaf asdsa saas assa saas"},
                {username:"asdf",message:"adafddfassaf asdsa saas assa saas"},
                {username:"asdf",message:"adafddfassaf asdsa saas assa saas"}
                ,{},{},{}],
            data:[],
            isLoaded:false
        }
    }

    componentDidMount() {
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


    render() {
            const UserListDiv = styled.div`width:30%;margin-left:20px;height:100vh;`;
            const SearchDiv = styled.div`width:100%;background: rgb(246,246,246);padding: 7px;`;
            const InputField = styled("input")`width:100%;height:42px;border: none;
                border-radius: 23px;padding-left: 20px;font-size: 17px;outline:none; `;
            const SearchImageTag = styled("img")`position: absolute;left: 28%;top: 84px;`;
        const CardHeader = styled.div`background-color: rgb(0, 94, 194);color: white;border-radius: 0px 0px 0px 10px;
                                    box-shadow: rgba(0, 94, 194, 0.45) 0px 2px 6px 0px;height: 67px;border-right: 1px solid white;`;
        return (
            this.state.isLoaded ?
                <UserListDiv>
                    <CardHeader>
                        <div className={"row"}>
                            <div className={"col-2"} style={{"padding": "5px 0 0 15px"}}>
                                <img src={ovalImage} width={"55px !important"} height={"55px !important"} alt={"oval_image"}/>
                            </div>
                        </div>
                    </CardHeader>
                    <SearchDiv>
                    <SearchImageTag className="fas fa-search text-white" src={searchIcon} aria-hidden="true" alt={"search icon"}/>
                    <InputField className="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search"/>
                    </SearchDiv>
                    <div style={{"background":"white"}}>
                    {this.state.data.map((item, index) => {
                        return <div key={index} onClick={()=>this.props.handleConversation(item.uid)}>
                                    <MessageCard item={item} {...this.props} />
                                </div>
                    })}
                    </div>
                </UserListDiv>
                :
                <div>
                </div>
        );
    }
}