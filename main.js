
const nightMode = document.querySelector('#night-mode');
const body = document.querySelector('body');
const title = document.querySelector('#title');
const moonSun = document.querySelector('#night-mode button');
const headers = document.querySelector('.headers');
const timeButtons = document.querySelector('#time-buttons');
const time = document.querySelector('#time');
const clock = document.querySelector('#clock');
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
});

class Timer{
  constructor(seconds){
      this.milliseconds = seconds * 1000;
      this.startMilliseconds = this.milliseconds;
      this.timer;
  }

  get time(){
      return this.milliseconds;
  }
  set time(seconds){
    if(seconds > (60*25))
      this.milliseconds = 60*25*1000;
    else
      this.milliseconds = seconds * 1000;
  }

  start(element){
    this.timer = setInterval(()=>{
      element.innerHTML = `${Math.floor(this.milliseconds / 60000)} : ${this.milliseconds/ 1000}`;
      this.milliseconds -= 1000;
    },1000);
    
  }

}

let timer = new Timer(60);
timer.start(clock);






