const path = require('path');

const config = {
	// 모드 값을 'production'으로 설정하면 최적화된 상태에서
	// 'development'로 설정하면 소스맵을 효과적으로 JS파일이 출력된다.
	mode: 'development',
	// 주를 이루는 JavaScript 파일(엔트리 포인트)
	entry: './src/app.js',
	// 파일 출력 설정
	output: {
		path: `${__dirname}/dist`, // 출력 파일 디렉토리 이름
		filename: 'bundle.js' // 출력 파일 이름
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
				exclude: /node_modules/,
			}
		]
	},
	// 로컬 개발용 환경을 만듦
	// 실행시 브라우저가 자동적으로 localhost를 연다.
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true, // gzip 압축 설정
		host: "0.0.0.0",
		port: 3000,
		// open: true, // 자동 부라우저 열기
		// disableHostCheck: true, // 호스트 체크 해제
		allowedHosts: [ // 접속하는 호스트 이름
			'.run.gooorm.io',
			'reactboy.run.goorm.io',
		],
		// hot: true
	}
};

module.exports = config;