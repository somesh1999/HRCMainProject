import React from 'react';
import { Component } from 'react';

class Greet extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : "Somesh Manna",
            roll : "1705747"
        };  
    }

    changeroll = () => {
            this.setState({
                roll : "1705745"
            });
    }

    render(){
        return(
            <div>

                <h1>Hi I am {this.props.name} a.k.a {this.props.heroname}</h1>
                <h1>Hi I am {this.state.name} of roll no. {this.state.roll}</h1>
                <button onClick = {this.changeroll} >Click</button>
            </div>
        )
    };
}

export default Greet;
