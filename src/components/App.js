import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { counter: 0 };
	}
	componentDidMount() {
		this.interval = setInterval(
			this.increment.bind(this),
			1000
		);
	}
	increment() {
		this.setState(({counter}) => {
			return {counter: counter + 1};
		});
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	render() {
		const { counter } = this.state;
		
		return (
			<div>
				<h1>Webpack is doing its thing with React and ES2017</h1>
				<h2>{counter}</h2>
				<p>수정내용부분입력</p>
			</div>
		);
	}
}
export default hot(module)(App);