import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer, setConfig } from 'react-hot-loader';
setConfig({ logLevel: 'debug' });
import './styles/style.scss'; // 스타일 시트 추가

import App from './components/App'; // App 컴포넌트 호출

const appElement = document.getElementById('app');

const render = Component => {
	ReactDOM.render( 
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('app')
	);	
};

render(App);

// Webpack Hot Module Replacement API
if(module.hot) {
	module.hot.accept('./components/App', () => {
		render(App); // {modules:false} 옵션 사용시
		// render(require('./components/App'));
	})
}