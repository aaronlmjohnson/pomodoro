const nightMode = document.querySelector('#night-mode');
const body = document.querySelector('body');
const title = document.querySelector('#title');
const moonSun = document.querySelector('#night-mode button');
const headers = document.querySelector('.headers');
const timeButtons = document.querySelector('#time-buttons');
const time = document.querySelector('#time');
let isNightMode = false;

nightMode.addEventListener('click',()=>{
  if(isNightMode){
    isNightMode = false;

    body.classList.remove("to-night-mode");
    body.classList.add("to-standard-mode");
    
    moonSun.style.cssText = "color: black";
    moonSun.innerHTML = "☽";

    title.style.cssText = "color: white; background-color: black";

    headers.style.cssText = "color: black";
    time.style.cssText = "color: black";
    timeButtons.style.cssText = "color: black";
  }else{
    isNightMode = true;
    body.classList.remove("to-standard-mode");
    body.classList.add("to-night-mode");

    moonSun.style.cssText = "color: white";
    moonSun.innerHTML = "☼";

    title.style.cssText = "color: black; background-color: white";
    title.style.animation = "standardMode 2s";

    headers.style.cssText = "color: white";
    time.style.cssText = "color: white";
    timeButtons.style.cssText = "color: white";
  }
  console.log(body);
});




