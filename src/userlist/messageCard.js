import React,{Component} from "react";
import ovalImage from "../images/oval_image/oval_img.png";
import singletick from "../images/tick_2019-01-08/tick.png";
import "./messageCard.css";
import styled from "styled-components";

export default class MessageCard extends Component {
    constructor(props){
        super(props)
    }


    componentDidMount() {
        /*
        let message = document.getElementsByClassName("message").innerText;
        document.getElementById("message").innerText = "";
        document.getElementById("message").innerText = message.substr(0,37);

         */
    }

    render() {
        let message = "Lorem Ipsum is the dummy text of prin sfgsd sdf sdgf sdfds f".substr(0,37);
        const CardDiv = styled.div`display: flex;flex-direction: row;height: 72px;overflow: hidden;
                            justify-content: space-around;border-bottom: 1px solid #eff0f1;padding-top: 11px;`;
        const UserName = styled("h5")`margin:0`;
        return (
            <React.Fragment>
                <CardDiv>
                    <img src={ovalImage} width={"42px !important"} height={"42px !important"} alt={"oval img"}/>
                    <div className={"col-sm-10"}>
                        <UserName>{this.props.item.username}</UserName>
                        <p style={{"opacity": "0.8","marginTop":"0px"}} className="message">{message}</p>
                    </div>

                </CardDiv>
                <span></span>
            </React.Fragment>
        )

    }
}