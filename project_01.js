

import {videoData} from './video_data.js';
import {subVideoData} from './subVideo_data.js';


const content01 = document.querySelector(".content01");
const contentButton01 = document.querySelector(".contentButton01");
const container = document.getElementById('play_01');




/*메인 화면의 동영상 리스트*/

document.addEventListener('DOMContentLoaded', () => {

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



/*구독버튼 누를때*/

document.getElementById("setting03_3").addEventListener("click", () => {

const oldHeaderWrapper = document.querySelector(".headerWrapper");
const oldSubContent = document.querySelector(".subContent");

if (oldHeaderWrapper) oldHeaderWrapper.remove();
if (oldSubContent) oldSubContent.remove();


container.style.display ='none';
contentButton01.style.display ='none';



const headerWrapper = document.createElement('div');
headerWrapper.classList.add('headerWrapper');
 headerWrapper.style.display = 'flex';
 headerWrapper.style.justifyContent = 'space-between'; // 왼쪽과 오른쪽 끝으로 배치
 headerWrapper.style.alignItems = 'center';
 headerWrapper.style.marginBottom = '30px';



const div2 = document.createElement('div');
div2.classList.add('adminBox');
div2.style.display = 'flex';
div2.style.gap = '10px';


const p = document.createElement('p');
p.className = 'video-item_p';
p.textContent = "최신순";
p.style.color='#F1F1F1';
p.style.fontSize='20px';
p.style.fontWeight='bold';
p.style.margin = '0';

const adminButton = document.createElement('button');
const boardButton = document.createElement('button');
const listButton = document.createElement('button');

adminButton.textContent = '관리';
adminButton.id='adminButton';
boardButton.classList.add('fa-solid', 'fa-border-all', 'fa-lg');
boardButton.style.color='#ffffff';
boardButton.style.background = 'none';
boardButton.style.border = 'none';
boardButton.style.cursor = 'pointer';

listButton.classList.add('fa-solid', 'fa-list-ul', 'fa-lg');
listButton.style.color='#ffffff';
listButton.style.background = 'none';
listButton.style.border = 'none';
listButton.style.cursor = 'pointer';


div2.appendChild(adminButton);
div2.appendChild(boardButton);
div2.appendChild(listButton);

div2.style.display = 'flex';
div2.style.justifyContent = 'space-between';
div2.style.alignItems = 'center';

headerWrapper.appendChild(p);
headerWrapper.appendChild(div2);


content01.appendChild(headerWrapper);

const div1 = document.createElement('div');
div1.classList.add('subContent', 'row', 'row-cols-1','row-cols-md-3');


subVideoData.forEach(video => {
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
div1.appendChild(div);
});

content01.appendChild(div1);
});




/* 홈버튼 누를 때*/
document.getElementById("setting03_1").addEventListener("click", () => {
const subContent = document.querySelector(".subContent");
const headerWrapper = document.querySelector(".headerWrapper");

  if (subContent) {
     subContent.remove();
   }

   if (headerWrapper) {
     headerWrapper.remove();
   }

   container.style.removeProperty('display');
   contentButton01.style.removeProperty('display');


});



document.getElementById("logo").addEventListener("click", () => {

const subContent = document.querySelector(".subContent");
const headerWrapper = document.querySelector(".headerWrapper");

  if (subContent) {
     subContent.remove();
   }

   if (headerWrapper) {
     headerWrapper.remove();
   }


 container.style.removeProperty('display');
 contentButton01.style.removeProperty('display');

});




