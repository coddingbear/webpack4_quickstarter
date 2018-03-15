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
![React + Babel + Webpack](http://blogs.quovantis.com/wp-content/uploads/2017/01/React-JS-ES6-Setup-01.png)

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

1. react 설치하기

```
npm i -D webpack webpack-cli 
npm i -D babel-core babel-loader babel-preset-env babel-preset-react

npm i -S react react-dom
 ```

 ```
 /* package.json 파일 */
  {
	  "scripts":{
		"build":"webpack"
	  },
	  "devDependencies":{
		"babel-core":"^6.26.0",
		"babel-loader":"^7.1.3",
		"babel-preset-env":"^1.6.1",
		"babel-preset-react":"^6.24.1",
		"webpack":"^4.0.0",
		"webpack-cli":"^2.0.9"
	  },
	  "dependencies":{
		"react":"^16.2.0",
		"react-dom":"^16.2.0"
	  },
	  "private":true
 }

 ```

2. webpack.config.js 설정하기
 ```javascript
	module.exports={
	  mode:'development',
	  entry:'./src/main.js',
	  output:{
		path: `${__dirname}/dist`,
		filename:'main.js'
	  },
	  module:{
		rules:[
		  {
			test:/\. js$/,
			use:[
			  {
				loader:'babel-loader',
				options:{
				  presets:[
					['env',{'modules':false}],
					//React의 JSX를 해석 추가
					'react'
				  ]
			    }
			  }
			],
			exclude:/node_modules/,
		  }
		]
	  }
	};
 ```
3. 예제 소스 파일 만들기
 
4. 간단하게 React 빌드 환경 만들기
위 설정 과정을 거치지 말고 간단하게 React 개발 환경을 만들 수 있다.
바로 [create-react-app](https://github.com/facebook/create-react-app)를 이용해서 만들 수 있다.
이 빌드 내부에 webpack, babel, react를 사용하고 있다.

 * 글로벌로 `create-react-app` 설치하기
 ```
  $ npm i -g create-react-app
 ```
 *  프로젝트 생성하고 실행하기
    ```
	  $ create-react-app my_app
	  $ cd my_app
	  $ npm start
    
    ```
	![create-react-app](https://camo.githubusercontent.com/29765c4a32f03bd01d44edef1cd674225e3c906b/68747470733a2f2f63646e2e7261776769742e636f6d2f66616365626f6f6b2f6372656174652d72656163742d6170702f323762343261632f73637265656e636173742e737667)
---

## 스타일 시트 (CSS, SASS) 번들 구성하기
webpack에서 JavaScript 만 아니라 스타일 시트, 이미지, 웹 폰트 등 모든 자원을 모듈로 취급할 수 있습니다. 이런 JS 파일 이외의 파일을 다루기 위해 webpack에서 [Loader](https://webpack.js.org/loaders/) 기능을 사용합니다.

### 1. Webpack + CSS 구성하기

1. 모듈 설치 하기
 ```
	npm i -D webpack webpack-cli  // -> 설치 되었으면 생략
	
	npm i -D style-loader css-loader
 ```
2. webpack.config.js 설정 파일 
 ```javascript
	module.exports={
		//모드 값을 production으로 설정하면 최적화된 상태에서
		//development로 설정하면 소스 맵 효과적으로 JS파일이 출력된다
		mode:'production',
		/* -- 다른 설정 생략 -- */
		module:{
			rules:[
				{  // css 파일 번들 규칙
					test:/\. css/,
						use:[ 
							'style-loader',
							{loader:'css-loader', options:{url:false}},
							// 번들 흐름은 배열의 뒤에서부터 차례로 해석됨
							// css-loader -> style-loader 
						],
				},
			]
		}
	};
 ```
3. CSS 를 활용한 예제 파일 생성  style.css
 ```javascript
 // src/main.js
 import './style.css';  // 스타일 파일을 임포트 한다.
 
 ```
4. webpack을 실행하여 번들된 스타일을 확인한다.

5. 소스맵 활용하기
 소스 맵이란 변환 정의 코드 정보를 보관하여 개발시에 활용할 수 있는 기능입니다.
 변환 후의  코드는 형태가 크게 변화기 때문에 디버깅시 원래 코드의 몇 줄 번째가 영향을 주는 지 알기 쉽게 하기 위해 소스 맵 설정을 한다.
 ```javascript
	const MODE='development';
	//소스 맵의 이용 여부(production의 때는 소스 맵을 이용하지 않는다)
	const enabledSourceMap=(MODE==='development');

	module.exports={
	  //모드 값을 production으로 설정하면 최적화된 상태에서
	  //development로 설정하면 소스 맵 효과적으로 JS파일이 출력된다
	  mode:MODE,

	  module:{
		rules:[
		  //CSS파일의 읽기
		  {
			test: /\.css$/,
			// 사용하는 로더
			use:[
			  //link태그에 출력하는 기능
			  'style-loader',
			  //CSS를 번들하기 위한 기능
			  {
				loader:'css-loader',
				options:{				  
				  url:false, // 옵션에서 CSS내 url()메소드의 혼잡을 금지하는				  
				  minimize:true, // CSS의 공백 문자를 삭제한다
				  sourceMap: enabledSourceMap, //소스 맵 사용
				},
			  },
			],
		  },
		]
	  }
	};
 ```

### 2. Webpack + Sass 구성하기 

1. 설치 명령 (위에 설치된 모듈은 생략해도 된다.)
 ```
   npm i-D webpack webpack-cli css-loader style-loader node-sass sass-loader
 ```
2. webpack.config.js 설정하기
 ```javascript
	//'production'이나 'development'을 지정
	const MODE='development';
	//소스 맵의 이용 여부(production의 때는 소스 맵을 이용하지 않는다)
	const enabledSourceMap=(MODE==='development');

	module.exports={
	  //모드 값을 production으로 설정하면 최적화된 상태에서
	  //development로 설정하면 소스 맵 효과적으로 JS파일이 출력된다
	  mode:MODE,

	  module:{
		rules:[ 
		  //Sass파일 읽기와 컴파일
		  {
			test: /\.scss$/,//대상 파일의 확장자
			use:[
			  'style-loader', //link태그에 출력하는 기능
			  { //CSS를 번들하기 위한 기능
				loader:'css-loader',
				options: {
				  url:true, // 옵션에서 css내 url() 메소드를 넣는다.
				  sourceMap:enabledSourceMap, //소스 맵의 이용 여부
				  // 0=>no loaders(default);
				  // 1=>postcss-loader;
				  // 2=>postcss-loader, sass-loader
				  importLoaders:2
				},
			  },
			  {
				loader:'sass-loader', //Sass -> Css 변환 로더
				options:{
				  sourceMap:enabledSourceMap, //소스 맵의 이용 여부
				}
			  }
			],
		  },
		  { // 이미지 파일, 웹 폰트 번들
			test: /.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
			// 화상을 Base64으로 끌어들인다.
			loader: 'url-loader'
		  },
		],
	  },
	};
 ```
3. build 명령

 ```
   npm run build
   
   npm start
 ```
4. scss 속에 URL 참조하는 이미지파일과 폰트 파일을 url-loader 번들할 수 있도록 하려면 로더를 설치하고 위 webpack.config.js에 설정을 추가한다.
 ```
 npm i -D url-loader file-loader
 ```
5. 이미지 파일을 일괄적으로 url-loader로 번들하여 포함하지 않고 file-loader로 사용하여 외부 참조를 할 수 있다.

  > JavaScript에서 이미지를 번들하면 
   1. JS 파일 평가 시간이 증대
   2. 본래 파일 보다 용량이 Base64화 함으로써 1.33배 증대된다.
   3. 단 서버요청 처리 비용에 비해 (i), (ii) 는 작을 경우도 있음
  해결 방법으로 url-loader를 limit를 설정한다.
  
  ```javascript
    // webpack.config.js 이미지 번들 설정 수정
  	{ // 이미지 파일, 웹 폰트 번들
		test: /.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
		// 화상을 Base64으로 끌어들인다.
		use: [
			{
				loader: 'url-loader',
				options: {
					limit: 100 * 1023,  // 100KB 이하의 이미지 파일로 한정
					name: './img/[name].[ext]'
				}
			}
		],
	},
  ```