import React, {Component} from 'react';
import path10 from './path-10.svg';
import path3 from './path-3.png';
import './App.css';
import LoginComponent from "./login";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: this.props.match.params.id
        }
    }

    componentDidMount() {
        if (!this.props.match.params.id) {
            this.setState({
                type: "login"
            })
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img className={"path1"} src={path10} alt={"background1"}/>
                    <img className={"path2"} alt={"background2"} style={{"width": "543px", "height": "267px", "objectFit": "contain"}}
                         src={path3}/>
                    <LoginComponent {...this.props} type={this.state.type}/>
                </header>
            </div>
        );
    }
}

export default App;
