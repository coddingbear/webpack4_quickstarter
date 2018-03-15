// jQuery 모듈 호출
import jQuery from 'jquery';

// $ 기호에 참조 대입
const $ = jQuery;

const text = $('#content').text();

$('#content').empty() // 내용 비우기
			 .show(); // 보이기

const arr = text.split(''); // 한 문자식 배열에 저장.

const elements = [];

// 한 문자 씩 span 태그로 감싼다
arr.map((str, index) => {
  elements[index] = $(`<span>${str}</span>`);
  $('#content').append(elements[index]); // #content요소에 추가
});

// 이펙트 적용
elements.map((element, index) => {
  element
    .delay(40 * index)
    .queue(function () {
      $(this).addClass('motion');
    });
});