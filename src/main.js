import React from 'react';
import ReactDOM from 'react-dom';

import './style.css'; // 스타일 시트 추가
import SubComponent from './sub-component';

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Hello React!!</h1>
				<SubComponent name="My Counter for Babel" />
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));