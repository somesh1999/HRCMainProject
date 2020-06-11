import React from 'react';
import { Component } from 'react';

class CustomIndex extends Component{
    constructor(props){
        super(props);
        this.state = { 
            name: "Somesh",
            roll: "1705745",
            sec: "CSE" 
        };
    }
    render(){
        const {myProp} = this.props;
        return (
            <div>
                <p>{myProp}</p>
                <table className="table-data">
                    <tr>
                        <td>{this.state.name}</td>
                        <td>{this.state.roll}</td>
                        <td>{this.state.sec}</td>
                    </tr>
                </table>
            </div>
        
        );
    }
}


export default CustomIndex;
