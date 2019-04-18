import React,{Component} from "react"
import searchIcon from "./search_icon/search_icon.png";
import MessageCard from "./messageCard";

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
        fetch("http://localhost:7000/5c973958667e281124d61499/users")
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                that.setState({
                    data:data.data,
                    isLoaded:true
                })
            })
    }

    render() {
        return (
            this.state.isLoaded?
            <React.Fragment>
                <div className="input-group md-form form-sm form-1 pl-0" style={{"marginTop":"15px"}}>
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{"backgroundColor": "white", "borderRight": "none"}}>
                            <img className="fas fa-search text-white" src={searchIcon} aria-hidden="true" alt={"search icon"}/>
                        </span>
                    </div>
                    <input className="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search" style={{"borderLeft": "none","paddingLeft":"0px"}}/>
                </div>
                {this.state.data.map((item,index)=>{
                    return  <MessageCard item={item} key={index}/>
                })}

            </React.Fragment>
                    :<div></div>
        );
    }
}