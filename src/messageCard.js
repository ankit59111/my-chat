import React,{Component} from "react";
import ovalImage from "./oval_image/oval_img.png";
import singletick from "./tick_2019-01-08/tick.png";
import "./messageCard.css"

export default class MessageCard extends Component {


    render() {

        return (
            <React.Fragment>
                <div className={"card"}
                     style={{"backgroundColor": "transparent", "borderStyle": "none", "marginTop": "50px"}}>
                    <div className={"card-text"}>
                        <div className={this.props.item.username=="qwerty"?"row active":"row"} style={{"marginLeft":"0px"}}>
                            <div className={"col-sm-2"} style={{"padding":"0"}}>
                                <img src={ovalImage} width={"60px !important"} height={"60px !important"} alt={"oval img"}/>
                            </div>
                            <div className={"col-sm-10"}>
                                <h5>{this.props.item.username} <span style={{"float":"right","opacity":"0.5","fontSize":"15px","fontStyle":"none"}}>12:00pm</span></h5>
                                <div className={"row"} style={{"marginLeft":"-15px","display":"-webkit-inline-box"}}>
                                    <div className={"col-sm-1"}>
                                        <img src={singletick} alt={"singletick"}/>
                                    </div>
                                    <div className={"col-sm-11"}>
                                    <p style={{"opacity":"0.8"}}>Lorem Ipsum is  the dummy text of prin</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )

    }
}