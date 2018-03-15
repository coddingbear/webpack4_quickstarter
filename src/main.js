import React from 'react';
import ReactDOM from 'react-dom';

import './style.scss'; // 스타일 시트 추가
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

const element  = document.getElementById('app');

ReactDOM.render(<App/>, element);

// Hot Module Replacement 사용
if(module.hot) {
	module.hot.accept('./main.js',  () => {
		console.log('Accepting the updated SubComponent module!');
		ReactDOM.render(<App/>, element);
	});
}