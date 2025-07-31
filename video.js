

import {videoData} from './video_data.js';


//썸네일 키 가져와서 iframe src 주소로 입력 /제목 타이틀

document.addEventListener('DOMContentLoaded', () => {

const iframe = document.getElementById('previewFrame');
const params = new URLSearchParams(window.location.search);
const imageKey = params.get('imageKey');
const videoId = params.get('videoId');
const videoDescriptionContainer = document.getElementById('videoDescriptionContainer');
const toggle = document.getElementById('toggle');
const commentInput = document.getElementById('commentInput');
const submitComment = document.getElementById('submitComment');
const commentList = document.getElementById('commentList');


if (!iframe) {
    console.warn('영상 재생 페이지가 아닙니다. video.js 스크립트를 종료합니다.');
    return;
  }

if(toggle){
 toggle.addEventListener('click', () => {
    const isExpanded = videoDescriptionContainer.classList.toggle('expanded');
    toggle.textContent = isExpanded ? toggle.getAttribute('data-text-less') : toggle.getAttribute('data-text-more');
  });
}

if(imageKey){

const iframeSrc = "https://www.youtube.com/embed/" + encodeURIComponent(imageKey);

const iframe = document.getElementById('previewFrame');
iframe.src = iframeSrc;

 const videoInfo = videoData.find(video => video.videoId === videoId);

    if (videoInfo) {
      const titleElement = document.getElementById('playComment01');
      titleElement.textContent = videoInfo.title;

      const descriptionElement = document.getElementById('videoDescription');
      descriptionElement.textContent = videoInfo.description || "설명이 없습니다.";

      const channelElement = document.getElementById('channelName');
      channelElement.textContent = videoInfo.channel;

      const subscriberElement = document.getElementById('subscriber');
      subscriberElement.textContent = videoInfo.subscriber;

      const thumbsUpCountEl = document.getElementById('thumbsUpCount');
      thumbsUpCountEl.textContent = videoInfo.thumbsUp;



    } else {
      console.warn("videoData에서 일치하는 영상이 없습니다.");
    }

}


submitComment.addEventListener('click', () =>{

const text = commentInput.value.trim();
if(text){
const comment = document.createElement('div');
comment.className = 'commentItem';
comment.innerText = text;

commentList.appendChild(comment);
commentInput.value = '';
}
});


/*댓글 더보기 */

const toggleBtn = document.getElementById('toggle');
const content = document.querySelector('[data-ke-type="moreLess"]');

toggleBtn.addEventListener('click', () => {
  content.classList.toggle('playComment_01');
  content.classList.toggle('collapsed');
  toggleBtn.textContent = content.classList.contains('expanded')
    ? content.getAttribute('data-text-less')
    : content.getAttribute('data-text-more');
});



//사이드바 옆에 스크롤 버튼
const scrollBox = document.getElementById('scrollBox');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

leftBtn.addEventListener('click' , () =>{
scrollBox.scrollLeft -= 50;
});

rightBtn.addEventListener('click' , () => {
scrollBox.scrollLeft +=50;
});



let currentVideoId = null;

function loadVideo(videoId) {
  currentVideoId = videoId;
  const videoInfo = videoData.find(video => video.videoId === videoId);

  if (videoInfo) {
    document.getElementById("thumbsUpCount").textContent = videoInfo.thumbsUp.toLocaleString();

  }
}

loadVideo(videoId);

//좋아요 누를때
document.getElementById("top03_01").addEventListener("click", () => {
  const videoInfo = videoData.find(video => video.videoId === currentVideoId);
  const icon = document.getElementById("iconElement_01");



if (icon.classList.contains("fa-regular")) {
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");

    if (videoInfo) {
        icon.classList.add("shake-animation");
          setTimeout(() => {
            icon.classList.remove("shake-animation");
          }, 400);

        videoInfo.thumbsUp += 1;
        document.getElementById("thumbsUpCount").textContent = videoInfo.thumbsUp.toLocaleString();
      }

  } else {
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");

    if (videoInfo) {
        videoInfo.thumbsUp -= 1;
        document.getElementById("thumbsUpCount").textContent = videoInfo.thumbsUp.toLocaleString();
      }
  }


});



//싫어요 누룰때
document.getElementById("top03_02").addEventListener("click", () => {
  const videoInfo = videoData.find(video => video.videoId === currentVideoId);
  const icon = document.getElementById("iconElement_02");



if (icon.classList.contains("fa-regular")) {
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");

    if (videoInfo) {
        videoInfo.thumbsDown += 1;
      }

  } else {
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");

    if (videoInfo) {
        videoInfo.thumbsDown -= 1;

      }
  }





});

});


