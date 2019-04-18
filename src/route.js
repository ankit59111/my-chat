import React,{Component} from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import MessageNavBar from "./messageNavbar";
import App from "./App";

export default class Routing extends Component{

    render() {
        return (
            <BrowserRouter basename={"/"}>
                <Switch>
                    <Route exact path={"/home"} render={(props)=><MessageNavBar {...props}/>}/>
                    <Route exact path={"/"} render={(props)=><App {...props}/>}/>
                    <Route exact path={"/register"} render={(props)=><App {...props}/>}/>

                </Switch>
            </BrowserRouter>
        );
    }
}