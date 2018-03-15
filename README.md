# webpack4_quickstarter
Webpack 4로 시작하는 웹개발 빌드 환경 만들기


### 1. Webpack 의 개요
![webpack 개요](https://webpack.github.io/assets/what-is-webpack.png)
webpack은 웹 콘텐츠를 구성할 파일을 정리하는 툴입니다. **주요 활용은 여러개의 JavaScript 파일을 묶는 것**입니다. 복수의 JavaScript(이하 JS)를 준비하는 여러가지 이점이 있습니다.

우선 HTTP/1.1 접속에서는 브라우저와 웹 서버의 동시 접속 수가 한정되어 복수의 파일 전송 시간이 걸립니다. 이 때 **복수의 JS파일을 하나도 묶는 것이 일반적인 해결 방법**입니다.

여러 JS 파일을 하나로 묶는 것은 다른 툴로도 할 수 있지만, webpack의 경우는 표준 사양의 ES Modules 나 node_modules 모듈을 결합할 수 있다는 장점이 있습니다.

표준 ES Modules를 사용하면 변수의 충돌이나 글로벌 변수 오염을 예방하여 개발 시 안정성이 높아집니다. 또 코드의 가독성이 높아 개발 작업 분담이나 테스트하기 쉬워지고 재이용성, 보수성이 높아집니다. 그래서, 요즘 프론트 엔드 개발자의 도구로 사용하는 이유입니다.

그것도 편리하지만, webpack은 JS뿐만 아니라 스타일시트(CSS, SASS)나 이미지파일 까지 번들 할 수 있습니다, 그리고 JS파일의 압축이나 소스 맵에 대응하거나 로컬 서버의 기동까지 포괄적인 제작환경과 기능까지 있습니다.

### 2. 설치 방법
1. [Node.js](https://nodejs.org/ko/) 가 사전에 설치 되어 있어야 합니다. 
2. 프로젝트 설정 
```
$ mkdir myproject
$ cd myproject
/myproject$ npm init -y    //-> package.json 생성
```
3. webpack 설치하기
```
/myproject$ npm i -D webpack webpack-cli
```
4. webpack 명령어를 package.json 파일에 'build' 명령어로 등록
```js
	// package.json
	"scripts": {
    	"build": "webpack"
    },
```

### 3. webpack으로 JS 파일을 정리해 보자.

1. 예제 파일 만들기
src 폴더에 index.js, sub.js 예제 파일을 만들어 보자
index.js에서 sub.js에 정의된 hello() 메소드를 호출하는 구조이다

 ```js
	// src/index.js
	
	// import 문을 사용하여 sub.js파일을 가져온다.
	import {hello} from './sub';

	// sub.js에 정의된 Javascript를 실행한다.
	hello();
```
 ```js
	// src/sub.js
	
	// export 문을 사용하여 hello 함수를 정의한다.
	export function hello() {
		alert('hello 메서드가 실행됨.');
	}
```
2. webpack JS 파일을 빌드하기

 ```
/myproject$ npx webpack
	or
/myproject$ npm run build
```
3. 빌드 결과
 ```
	src/index.js
	src/sub.js
		|
	dist/main.js 로 빌드됨.	
 ```
4. webpack.config.js. 설정 파일 
webpack.config.js 파일을 생성하여 webpack 사용시 환경 설정을 미리지정하여 사용 할 수 있습니다.
 ```javascript
	const config = {
	
		// 모드 값을 'production'으로 설정하면 최적화된 상태에서
		// 'development'로 설정하면 소스맵을 효과적으로 JS파일이 출력된다.
		mode: 'development',
		
		// 주를 이루는 JavaScript 파일(엔트리 포인트)
		entry: './src/index.js',
		
		// 파일 출력 설정
		output: {
			path: `${__dirname}/dist`, // 출력 파일 디렉토리 이름
			filename: 'main.js' // 출력 파일 이름
		}
	};
	module.exports = config;
 ```

5. webpack-dev-server 설치하여 로컬 서버 가동하기
  *  webpack-dev-server 설치
  ```
  myproject$ npm i -D webpack-dev-server
  ```
  * package.json 파일에 명령어 추가
  ```javascript
	  "scripts": {
		"build": "webpack",
		"start": "webpack-dev-server --color"
	  },
	  "devDependencies": {
		"webpack": "^4.1.1",
		"webpack-cli": "^2.0.12",
		"webpack-dev-server": "^3.1.1"
	  }
  ```
  * webpack.config.js 파일에 설정
  ```javascript
  
	const path = require('path');

	const config = {
		
		/* ... 설정 내용 ... */	
		
		// 로컬 개발용 환경을 만듦
		// 실행시 브라우저가 자동적으로 localhost를 연다.
		devServer: {
			contentBase: path.join(__dirname, 'dist'),
			compress: true, // gzip 압축 설정
			host: "0.0.0.0",
			port: 3000,
			open: true, // 자동 부라우저 열기
			// disableHostCheck: true, // 호스트 체크 해제
			allowedHosts: [ // 접속하는 호스트 이름
				'.run.gooorm.io',
				'reactboy.run.goorm.io',
			],
			// hot: true
		}
	};
  ```
---
## Babel로 ES2017 환경 만들기

### 1. Webpack + Babel 구성

1. babel-core, babel-loader babel-preset-env 설치
 ```
 $ npm i -D babel-core babel-loader babel-preset-env
 ```
2. 설치후 package.json 파일
 ```
 {
	 "scripts": {
		"build": "webpack",
		"start": "webpack-dev-server --color"
	  },
	  "private": true,
	  "devDependencies": {
		"babel-core": "^6.26.0",
		"babel-loader": "^7.1.4",
		"babel-preset-env": "^1.6.1",
		"webpack": "^4.1.1",
		"webpack-cli": "^2.0.12",
		"webpack-dev-server": "^3.1.1"
	  }
  }
 ```
3. webpack.config.js 설정하기
 ```javascript
 	/* -- 설정 내용 --*/
	module: {
		rules: [
			{   // 확장자가 .js 경우 규칙
				test: /\.js$/,
				use: [
					{	// Babel 로더 이용
						loader: 'babel-loader',
						options: { // Babel 옵션 지정
							presets: [
								// 'env'로 지정하여 ES2017를 ES5로 변환
								//  modules: false 로 하지않으면 import문이 Babel에 의해서 CommonJS로 변환됨
								['env', {'modules' : false}	]
							]
						}
					}
				]
			}
		]
	},
 ```
4. index.js sub.js 예제 파일을 ES2017 문법으로 변경

5. webpack 또는 webpack-dev-server 실행하여 변환 및 테스트 하기
 ```
 $ npm run build
 
 $ npm start 
 ```
### 2. webpack + Babel + jQuery 구성하기

1. npm 으로 jQuery 설치
 ```
 $ npm install --save jquery
 ```
2. webpack.config.js 설정 추가
  모듈 변환 규칙에서 'exclude' 설정으로 node_modules 폴더 제외한다.
 ```
	const path = require('path');
	module.exports = {
		mode: 'production',
		entry: './src/app.js',
		output: {
			path: `${__dirname}/dist`,
			filename: 'bundle.js'
		},
		module: {
			rules: [
				{   // 확장자가 .js 경우 규칙
					test: /\.js$/,
					use: [
						{	// Babel 로더 이용
							loader: 'babel-loader',
							options: { // Babel 옵션 지정
								presets: [
									// 'env'로 지정하여 ES2017를 ES5로 변환
									//  modules: false 로 하지않으면 import문이 Babel에 의해서 CommonJS로 변환됨
									['env', {'modules' : false}	]
								]
							}
						}
					],
					// node_node_modules는 제외한다.
					exclude: /node_modules/,
				}
			]
		},
		/* -- 이하 생략 -- */
	}
 ```
4. src/app.js  dist/index_jquery.html 예제 파일 생성.
5. `npm run build` 또는 `npm start` 하여 index_jquery.html 예제 확인
	변환된 dist/bundle.js 파일 확인.
	
### 3. webpack + Babel + React 구성 하기

```
npm i -D webpack webpack-cli 
npm i -D babel-core babel-loader babel-preset-env babel-preset-react

npm i -S react react-dom
```