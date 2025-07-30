




//썸네일 키 가져와서 iframe src 주소로 입력

document.addEventListener('DOMContentLoaded', () => {

const params = new URLSearchParams(window.location.search);
const imageKey = params.get('imageKey');

if(imageKey){

const iframeSrc = "https://www.youtube.com/embed/" + encodeURIComponent(imageKey);

const iframe = document.getElementById('previewFrame');
iframe.src = iframeSrc;

console.log(iframe.src);

}
});


const scrollBox = document.getElementById('scrollBox');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

leftBtn.addEventListener('click' , () =>{
scrollBox.scrollLeft -= 50;
});

rightBtn.addEventListener('click' , () => {
scrollBox.scrollLeft +=50;
});

