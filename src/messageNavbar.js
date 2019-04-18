import React,{Component} from "react";
import oval_img from "./oval_image/oval_img.png";
import "./messageNavbar.css"
import MessageColumn2 from "./messageColumn2";
import MessageBody from "./messageBody";
import io from "socket.io-client";
export default class MessageNavBar extends Component{

    componentDidMount() {
        let socket = io.connect("http://localhost:7000");
        socket.on("this",function () {
            console.log("connected")
        })
    }


    render(){
        return(
            <React.Fragment>
                <div className={"row"} style={{"position":"fixed","marginLeft":"100px","marginRight":"80px"}}>
                    <div style={{"backgroundColor": "#005ec2", "height": "800px"}} className={"col-2"}>
                        <div style={{"width": "95%", "height": "150px", "backgroundColor": "#0053ab","border-radius": "10px"}}>
                            <img src={oval_img} className="rounded-circle" alt="Cinque Terre"
                                 style={{"marginLeft": "27%"}}/>
                            <div style={{"marginLeft": "20%", "marginTop": "10%"}}>
                                <p style={{"color": "white"}}>hello Fuckers</p>

                            </div>
                        </div>
                        <div style={{"marginTop": "35%"}}>
                            <ul style={{"color": "white", "paddingTop": "4px", "paddingLeft":"0","listStyle": "none"}}>
                                <li className="addBox active"><span className={"rectangle"}></span>Messages</li>
                                <li className={"addBox"}>Groups</li>
                                <li className={"addBox"}>Contacts</li>
                                <li className={"addBox"}>Profile</li>
                            </ul>
                        </div>
                    </div>
                    <div className={"col-4"} style={{"backgroundColor":"rgba(236, 245, 255, 0.6)"}}>
                        <MessageColumn2/>
                    </div>
                    <div className={"col-6"} style={{"paddingLeft":"0px"}}>
                        <MessageBody/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}