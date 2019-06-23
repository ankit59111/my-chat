import React,{Component} from "react"
import searchIcon from "../images/search_icon/search_icon.png";
import MessageCard from "./messageCard";
import firebase from "../firebase-configure/configure";
import styled from "styled-components";

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
            console.log(snapshot)
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
            const UserListDiv = styled.div`width:30%;margin-left:20px;height:100vh;border:1px solid black;`;
            const SearchDiv = styled.div`width:100%;position:relative:`;
            const InputField = styled("input")`width:100%;height:50px;border: 1px solid black;
                border-radius: 23px;padding-left: 20px;font-size: 17px;outline:none; `;
            const SearchImageTag = styled("img")`position: absolute;left: 28%;top: 3%;`
        return (
            this.state.isLoaded ?
                <UserListDiv>
                    <SearchDiv>
                    <SearchImageTag className="fas fa-search text-white" src={searchIcon} aria-hidden="true" alt={"search icon"}/>
                    <InputField className="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search"/>
                    </SearchDiv>
                    <div>
                    {this.state.data.map((item, index) => {
                        return <MessageCard item={item} key={index} {...this.props} />
                    })}
                    </div>
                </UserListDiv>
                :
                <div>
                </div>
        );
    }
}