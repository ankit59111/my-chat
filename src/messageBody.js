import React,{Component} from "react";
import ovalImage from "./oval_image/oval_img.png";
import searchIcon from "./search_icon/search_icon.png";
import settingIcon from "./group-2_2019-01-08/group-2.png"
import "./messageBody.css"
export default class MessageBody extends Component{
    constructor(props){
        super(props);
        this.state = {
            message : [{type:"sent",message:"Hello "},{type:"receive",message:" Hello world adffasfa adfdafa afadfa"},
                {type:"sent",message:"Hello "},{type:"sent",message:"Hello "},{type:"receive",message:"Hello "},
                {type:"sent",message:"Hello "}]
        }
    }

    handleMessage() {
        let messages = this.state.message;
        let newMessage = {type: "sent", message: document.getElementById("id_message_field").value}
        if(newMessage.message) {
            messages.push(newMessage);

            document.getElementById("id_message_field").value = "";
            debugger;
            this.setState({
                message: messages
            },()=>{
                let messageAreaHeight = document.getElementById("id_messageArea").scrollHeight;
                let client = document.getElementById("id_messageArea").clientHeight;
                document.getElementById("id_messageArea").scrollBy(0,messageAreaHeight-client);
            })
        }


    }

    bgChange(color){

        document.getElementById("basic-text1").style.backgroundImage = `linear-gradient(103deg, ${color}, ${color})`
    }

    bgOutChange(){
        document.getElementById("basic-text1").style.backgroundImage = `linear-gradient(103deg, #0074f0, #0053ab)`
    }

    render(){

        return(
            <React.Fragment>
                <div className={"card"}>
                    <div className={"card-header"} style={{"backgroundColor":"#005ec2","color":"white",
                        "borderRadius":"0px 0px 10px 10px","boxShadow":"0 2px 6px 0 rgba(0, 94, 194, 0.45)"}}>
                        <div className={"row"}>
                            <div className={"col-2"}>
                                <img src={ovalImage} width={"55px !important"} height={"55px !important"} alt={"oval_image"}/>
                            </div>
                            <div className={"col-8"}>
                                <h6>qwerty</h6>
                                <p style={{"fontFamily":"MicrosoftSansSerif","fontSize":"13px"}}>Last seen today at 1:30 PM</p>
                            </div>
                            <div className={"col-2"} style={{"paddingTop":"10px"}}>
                                <div className={"row"}>
                                    <div className={"col-1"}>
                                        <img src={searchIcon} alt={"search_icon"}/>
                                    </div>
                                    <div className={"col-1"} style={{"paddingLeft":"50px"}}>
                                    <span><img src={settingIcon} alt={"settingIcon"}/></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{"height":"590px"}}>
                    <div className={"card-footer"} style={{"backgroundColor":"white","height":"600px","overflow-y":"scroll"}} id="id_messageArea">
                        {this.state.message.map((item,index)=>{
                            return (
                            <div className={"card-body"} key={index} style={{"paddingLeft":"0","paddingRight":"0"}}>

                                        <div className={item.type == "sent" ?"row styleRight" : "row"} >
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
                            )})}

                    </div>
                    </div>
                    <div className={"card"}>
                        <div className="input-group md-form form-sm form-2 pl-0">
                            <input className="form-control my-0 py-1 red-border" id={"id_message_field"} type="text" placeholder="Type a Message......"
                                   aria-label="Search" style={{"borderRight": "none","paddingLeft":"0px"}}/>
                            <div className="input-group-append" id={"id_submit_button"}  onClick={this.handleMessage.bind(this)}>
                                    <span className="input-group-text red lighten-3" onMouseDown={this.bgChange.bind(this,"white")} onMouseUp={this.bgOutChange.bind(this)} id="basic-text1">
                                        <img className="fas fa-search text-white" src={searchIcon} aria-hidden="true" alt="submit icon"
                                        />
                                        </span>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}