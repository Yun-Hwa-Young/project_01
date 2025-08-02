

import {videoData} from './video_data.js';


//썸네일 키 가져와서 iframe src 주소로 입력 /제목 타이틀

function timeAgo(dateString) {
  const now = new Date();
   const date = new Date(dateString);


   const KST_OFFSET = 9 * 60 * 60 * 1000;
   const nowKST = new Date(now.getTime() + KST_OFFSET);
   const dateKST = new Date(date.getTime() + KST_OFFSET);

   let diff = nowKST - dateKST;


   if (diff < 0) return "방금 전";

   const seconds = Math.floor(diff / 1000);
   const minutes = Math.floor(diff / (1000 * 60));
   const hours = Math.floor(diff / (1000 * 60 * 60));
   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
   const weeks = Math.floor(days / 7);
   const months = Math.floor(days / 30);
   const years = Math.floor(days / 365);

   if (seconds < 60) return `${seconds}초 전`;
   if (minutes < 60) return `${minutes}분 전`;
   if (hours < 24) return `${hours}시간 전`;
   if (days < 7) return `${days}일 전`;
   if (weeks < 5) return `${weeks}주 전`;
   if (months < 12) return `${months}개월 전`;
   return `${years}년 전`;
}



document.addEventListener('DOMContentLoaded', () => {

const iframe = document.getElementById('previewFrame');
const params = new URLSearchParams(window.location.search);
const imageKey = params.get('imageKey');
const videoId = params.get('videoId');
const videoDescriptionContainer = document.getElementById('videoDescriptionContainer');
const toggle = document.getElementById('toggle');
const commentInput = document.getElementById('commentInput');
const submitComment = document.getElementById('submitComment');
const submitCommentCl = document.getElementById('submitCommentCl');
const commentList = document.getElementById('commentList');
const commentCount = document.getElementById('commentCount');
const container = document.querySelector('.sidebarList');


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


videoData.forEach(video => {

const div = document.createElement('div');
div.className = 'sidebarList';

const img = document.createElement('img');
img.src= video.thumbnail;
img.style.width = '180px';
img.style.height='90px';
img.style.borderRadius='8px';
div.style.padding ='3px';
div.style.display = 'flex';


const div2 = document.createElement('div');
div2.className = 'sidebarList2';

const p1 = document.createElement('p');
p1.className='sidebarListP1';
const p2 = document.createElement('p');
p2.className='sidebarListP2';
const p3 = document.createElement('p');
p3.className='sidebarListP3';


p1.textContent = video.title;
p2.textContent = video.channel;
p3.textContent = "조회수: " + video.views +"회";

div2.style.display ='inline-block';



div.appendChild(img);
div.appendChild(div2);
div2.appendChild(p1);
div2.appendChild(p2);
div2.appendChild(p3);
container.appendChild(div);
});



if(imageKey){

const iframeSrc = "https://www.youtube.com/embed/" + encodeURIComponent(imageKey);

const iframe = document.getElementById('previewFrame');
iframe.src = iframeSrc;

 const videoInfo = videoData.find(video => video.videoId === videoId);

    if (videoInfo) {
      const titleElement = document.getElementById('playComment01');
      titleElement.textContent = videoInfo.title;

      const descriptionElement = document.getElementById('videoDescription');
      const infoP = document.createElement('p');
      infoP.classList.add('videoInfo');
      infoP.textContent = `조회수 ${videoInfo.views.toLocaleString()}회 • ${timeAgo(videoInfo.upDate)}`;


      const descP = document.createElement('p');
      infoP.classList.add('descP');
      descP.textContent = videoInfo.description || "설명이 없습니다.";


     descriptionElement.appendChild(infoP);
     descriptionElement.appendChild(descP);

      const channelElement = document.getElementById('channelName');
      channelElement.textContent = videoInfo.channel;

      const subscriberElement = document.getElementById('subscriber');
      subscriberElement.textContent = videoInfo.subscriber;

      const thumbsUpCountEl = document.getElementById('thumbsUpCount');
      thumbsUpCountEl.textContent = videoInfo.thumbsUp;

      const commentCountEl = document.getElementById('commentCount');
      commentCount.textContent = videoInfo.commentCount;




    } else {
      console.warn("videoData에서 일치하는 영상이 없습니다.");
    }

}


document.getElementById("commentButton").hidden = true;


commentInput.addEventListener('click', () =>{



document.getElementById("commentButton").hidden = false;
submitComment.classList.add("active");
}
);



submitCommentCl.addEventListener('click', () =>{


document.getElementById("commentButton").hidden = true;
});



commentInput.addEventListener('keydown', (event) => {
const text = commentInput.value;
const videoInfo = videoData.find(video => video.videoId === currentVideoId);


  if (event.key === 'Enter' && !event.shiftKey) {

        videoInfo.commentCount += 1;
         commentCount.textContent = videoInfo.commentCount;
    event.preventDefault(); // 기본 줄바꿈 방지

    const comment = document.createElement('div');
    comment.className = 'commentItem';

    const button = document.createElement('button');
    button.className = "userIcon";

    const textNode = document.createElement('span');
    textNode.className = 'commentText';
    textNode.innerText = text;


    comment.appendChild(button);
    comment.appendChild(textNode);


    commentList.appendChild(comment);
    commentInput.value = '';

  }

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
  const icon2 = document.getElementById("iconElement_02");



if (icon.classList.contains("fa-regular")&&icon2.classList.contains("fa-regular")) {
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

  } else if(icon.classList.contains("fa-regular")&&icon2.classList.contains("fa-solid")){
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");
    icon2.classList.remove("fa-solid");
    icon2.classList.add("fa-regular");

    if (videoInfo) {
        videoInfo.thumbsUp += 1;
        videoInfo.thumbsDown -= 1;
        document.getElementById("thumbsUpCount").textContent = videoInfo.thumbsUp.toLocaleString();
      }
  } else if(icon.classList.contains("fa-solid")&&icon2.classList.contains("fa-regular")){
       icon.classList.remove("fa-solid");
       icon.classList.add("fa-regular");


       if (videoInfo) {
           videoInfo.thumbsUp -= 1;
           document.getElementById("thumbsUpCount").textContent = videoInfo.thumbsUp.toLocaleString();
         }
     }  else if(icon.classList.contains("fa-solid")&&icon2.classList.contains("fa-solid")){
               icon.classList.remove("fa-solid");
               icon.classList.add("fa-regular");

               if (videoInfo) {
                   videoInfo.thumbsUp -= 1;
                   document.getElementById("thumbsUpCount").textContent = videoInfo.thumbsUp.toLocaleString();
                 }
             }else{}




});


//댓글 전송 누를 때
submitComment.addEventListener('click', () =>{

const videoInfo = videoData.find(video => video.videoId === currentVideoId);
const text = commentInput.value;


if(text){

      videoInfo.commentCount += 1;
       commentCount.textContent = videoInfo.commentCount;


const comment = document.createElement('div');
comment.className = 'commentItem';

const button = document.createElement('button');
button.className = "userIcon";

const textNode = document.createElement('span');
textNode.className = 'commentText';
textNode.innerText = text;


comment.appendChild(button);
comment.appendChild(textNode);


commentList.appendChild(comment);
commentInput.value = '';






}
});



//싫어요 누룰때
document.getElementById("top03_02").addEventListener("click", () => {
  const videoInfo = videoData.find(video => video.videoId === currentVideoId);
  const icon = document.getElementById("iconElement_02");
   const icon2 = document.getElementById("iconElement_01");



if (icon.classList.contains("fa-regular")&&icon2.classList.contains("fa-regular")) {
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");
    if (videoInfo) {
        videoInfo.thumbsDown += 1;
        document.getElementById("thumbsUpCount").textContent = videoInfo.thumbsUp.toLocaleString();
      }



  }else if(icon.classList.contains("fa-regular")&&icon2.classList.contains("fa-solid")){

   icon.classList.remove("fa-regular");
   icon.classList.add("fa-solid");
   icon2.classList.remove("fa-solid");
   icon2.classList.add("fa-regular");

    if (videoInfo) {
           videoInfo.thumbsDown += 1;
          videoInfo.thumbsUp -= 1;
           document.getElementById("thumbsUpCount").textContent = videoInfo.thumbsUp.toLocaleString();
         }
  }

  else if(icon.classList.contains("fa-solid")&&icon2.classList.contains("fa-regular")){
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");

    if (videoInfo) {
        videoInfo.thumbsDown -= 1;
         document.getElementById("thumbsUpCount").textContent = videoInfo.thumbsUp.toLocaleString();
      }

      }else if(icon.classList.contains("fa-solid")&&icon2.classList.contains("fa-solid")){
          icon.classList.remove("fa-solid");
          icon.classList.add("fa-regular");


          if (videoInfo) {
              videoInfo.thumbsDown -= 1;
               document.getElementById("thumbsUpCount").textContent = videoInfo.thumbsUp.toLocaleString();
            }
  }
});

});
