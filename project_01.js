


/*
 var bannerOffset = $('.backGround01' ).offset();

$( window ).scroll( function(){
 if ( $( document ).scrollTop() > bannerOffset.top ){
 $('.backGround01' ).addClass( 'backGround01Fixed' );
 console.log("안녕하세요");
  }else { $('.backGround01' ).removeClass( 'backGround01Fixed' );
  }
  });
*/






document.addEventListener('DOMContentLoaded', () => {
const links= document.querySelectorAll(".videoLink");

links.forEach(link => {
const videoId = link.dataset.videoId;
const imageSrc = link.dataset.imageSrc;

const parts = imageSrc.split('/');
const middleValue = parts[parts.length -2 ];

link.href  = `video.html?videoId=${encodeURIComponent(videoId)}&imageKey=${encodeURIComponent(middleValue)}`;
});
});



const toggleBtn = document.getElementById('toggle');
const content = document.querySelector('[data-ke-type="moreLess"]');

toggleBtn.addEventListener('click', () => {
  content.classList.toggle('playComment_01');
  content.classList.toggle('collapsed');
  toggleBtn.textContent = content.classList.contains('expanded')
    ? content.getAttribute('data-text-less')
    : content.getAttribute('data-text-more');
});
