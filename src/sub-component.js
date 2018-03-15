import React from 'react';

export default class SubComponent extends React.Component {
	constructor() {
		super();
		this.state = { // 스태이트(상태) 초기화
			count: 0
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		console.log('클릭되었습니다.');
		this.setState({ // 상태 카운터
			count: this.state.count + 1
		});
	}
	
	render() {
		return (
			<div>
				<h2>{this.props.name}</h2>
				<div>{this.state.count}</div>
				<button onClick={this.handleClick}>Add +1</button>
			</div>
		);
	}
}