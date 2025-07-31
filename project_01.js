

import {videoData} from './video_data.js';

/*로고를 클릭하면 맨 윗상단 호출*/


/*
const logo = document.getElementById("logo");

logo.addEventListener('click', function(){
window.scrollTo({
top : 0, behavior:'smooth'
});
});

*/




/*메인 화면의 동영상 리스트*/

document.addEventListener('DOMContentLoaded', () => {

const container = document.getElementById('play_01');


if (!container) {
    console.warn(' 메인페이지가 아닙니다. project_01.js 스크립트를 종료합니다.');
    return;
  }


if (!container) {
    console.error('play_01 요소를 찾을 수 없습니다. 여기는 리스트페이지');
    return;
  }

videoData.forEach(video => {
const div = document.createElement('div');
div.className = 'video-item';
div.innerHTML = `
<div class="col">
        <div class="card">
          <div class="cardAni01">
            <a href="#" class="videoLink" data-video-id="${video.videoId}" data-image-src="${video.thumbnail}"><img src="${video.thumbnail}" class="card-img-top" alt="..."></a>
          </div>
          <div class="contentHead"><button class="contentButton"> </button></div>
          <div class="card-body01">
            <p class="card-text01" >${video.title}</p>
          </div>
          <div class="card-body02">
            <small class="card-text01"><a style="font-weight: bold;">채널명 · </a>${video.channel}</small><br>
            <small class="card-text01">조회수 ${video.views}회 · 12일 전</small>
          </div>
        </div>
      </div>


`;
container.appendChild(div);

});




/* 파라미터 보내기 */

const links= document.querySelectorAll(".videoLink");

links.forEach(link => {
const videoId = link.dataset.videoId;
const imageSrc = link.dataset.imageSrc;
const parts = imageSrc.split('/');
const middleValue = parts[parts.length -2 ];

link.href  = `video.html?videoId=${encodeURIComponent(videoId)}&imageKey=${encodeURIComponent(middleValue)}`;
});
});






