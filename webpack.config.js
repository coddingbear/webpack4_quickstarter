const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const MODE = 'development'; 
// 소스 맵의 이용 여부(production의 때는 소스 맵을 이용하지 않는다.)
const enabledSourceMap=(MODE==='development');

const config = {
	// 모드 값을 'production'으로 설정하면 최적화된 상태에서
	// 'development'로 설정하면 소스맵을 효과적으로 JS파일이 출력된다.
	mode: MODE,
	// 주를 이루는 JavaScript 파일(엔트리 포인트)
	entry: [
		'webpack-dev-server/client?http://reactboy.run.goorm.io',
		'webpack/hot/only-dev-server',
		'./src',	
	],
	// 파일 출력 설정
	output: {
		path: path.resolve(__dirname, 'dist'), // 출력 파일 디렉토리 이름
		filename: '[name].bundle.js' // 출력 파일 이름
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
								['env', {'modules' : false}	],
								// React의 JSX 해석
								'react',
								
							],
							cacheDirectory: true,
							plugins : ['react-hot-loader/babel'],
						}
					}
				],
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/,
			},
			{  // css 파일 번들 규칙
				test:/\.css$/,
				use: [ 
					'style-loader', // link 태그에 출력 하는 기능
					{
						loader:'css-loader', // CSS를 번들하기 위한 기능
						options:{
							url:false, // 옵션에서 CSS내 url()메소드의 혼잡을 금지
							minimize: true, // css의 공백 문자를 삭제한다.
							sourceMap: enabledSourceMap,
						}
					},
					// 번들 흐름은 배열의 뒤에서부터 차례로 해석됨
					// css-loader -> style-loader 
				],
			},			
			{ //Sass파일 읽기와 컴파일
				test: /\.scss$/,//대상 파일의 확장자
				use: [
					'style-loader', //link태그에 출력하는 기능
					{ //CSS를 번들하기 위한 기능
						loader:'css-loader',
						options: {
							url: true, // 옵션에서 css내 url() 메소드를 넣는다.
							sourceMap:enabledSourceMap, //소스 맵의 이용 여부
							// 0=>no loaders(default);
							// 1=>postcss-loader
							// 2=>postcss-loader, sass-loader
							importLoaders:2
						},
					},
					{
						loader:'sass-loader', //Sass -> Css 변환 로더
						options: {
							sourceMap:enabledSourceMap, //소스 맵의 이용 여부
						}
					}
				],
			},
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
		],
	},
	devtool: 'inline-source-map',
	// 로컬 개발용 환경을 만듦
	// 실행시 브라우저가 자동적으로 localhost를 연다.
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true, // gzip 압축 설정
		host: '0.0.0.0',
		port: 3000,
		// open: true, // 자동 부라우저 열기
		//https: true,
		//historyApiFallback: true,
		// disableHostCheck: true, // 호스트 체크 해제
		allowedHosts: [ // 접속하는 호스트 이름
			'.run.gooorm.io',
			'reactboy.run.goorm.io',
		],
		headers: {
          'Access-Control-Allow-Origin': '*',
        },
		hot: true // 핫 모듈 사용
	},
	plugins : [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Hot Module Replacement',
			template: './src/index.html',
			filename: 'index.html',
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
};

module.exports = config;