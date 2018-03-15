// export 문을 사용하여 hello 함수를 정의한다.
export const hello = (message) => {
	
	document.getElementById('app').innerHTML = `<h1>${message}</h1>`;
	
	console.log(`${message}를 출력하였습니다.`);
};