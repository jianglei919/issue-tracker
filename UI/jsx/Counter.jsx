import React, { useEffect, useState } from "react";

export default function MyCounter() {

    const [counter, addCounter] = useState(100);
    const [user, changeUser] = useState('');

    useEffect(() => {
            document.title = `${user} clicked ${counter} times`;
            changeUser('Nasser');
        }
    );

    return (
        <div>
            <button onClick={() => { addCounter(counter + 1) }}>click me</button>
            <p>{user} clicked {counter} times</p>
        </div>
    );
}

class CounterClass extends React.Component {
    constructor() {
        super();
        this.state = { counter: 0, user: "Andrew" };
    }

    componentDidUpdate() {
        document.title = `${this.state.user} clicked ${this.state.counter} times`;
    }

    addCount() {
        this.setState({ counter: this.state.counter + 1, user: "Nasser" });
    }

    render() {
        return (
            <div>
                <button onClick={this.addCount.bind(this)}>click me</button>
                <p>{this.state.user} clicked {this.state.counter} times</p>
            </div>
        );
    }
}