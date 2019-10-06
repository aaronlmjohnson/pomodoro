class Timer{
  constructor(seconds){
    this.milliseconds = seconds * 1000;
    this.startMilliseconds = this.milliseconds;
    this.timer;

    this.running = false;
    this.paused = false;
    this.stopped = true;
  }
  
  get time_s(){
  return this.milliseconds / 1000;
  }
  get time_ms(){
  return this.milliseconds;
  }
  set time_s(seconds){
    this.milliseconds = seconds * 1000;
  }
  
  setTime_ms(milliseconds){
    this.milliseconds = milliseconds;
  }

  start(){
    if(this.running)
      return;

    this.running = true;
    this.paused = false;
    this.stopped = false;
    this.timer = setInterval(()=>{
      if(this.milliseconds < 1)
        this.stop();
      else{
        this.milliseconds -= 1000;
        let minutes = Math.floor((this.milliseconds / 60000) % 60);
        let seconds = (this.milliseconds / 1000) % 60;
      } 
      
    },1000);
    
  }
  pause(){
    clearInterval(this.timer);
    this.running = false;
    this.paused = true;
    this.stopped = false;
  }

  stop(){
    this.pause();
    this.running = false;
    this.paused = false;
    this.stopped = true;
    this.milliseconds = this.startMilliseconds;
  }
}

const updateTimer = (element, timer)=> {
  let minutes = Math.floor((timer.time_ms / 60000) % 60);
  let seconds = (timer.time_ms / 1000) % 60
  element.innerHTML = (minutes < 9 ? "0"+minutes : minutes) + ":" + (seconds <= 9 ? "0"+seconds : seconds);
}

const nightMode = document.querySelector('#night-mode');
const body = document.querySelector('body');
const title = document.querySelector('#title');
const moonSun = document.querySelector('#night-mode button');
const headers = document.querySelector('.headers');
const timeButtons = document.querySelector('#time-buttons');
const time = document.querySelector('#time');
const clock = document.querySelector('#clock');
const arrowButtons = [...document.querySelectorAll('.arrow-button')];
const sessionValue = document.querySelector('#session-value');
const breakValue = document.querySelector('#break-value');
let sessionNum = 25;
let breakNum = 5;
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

    arrowButtons.forEach((button)=>{
      button.style.cssText = "color: black";
    });
    playPause.style.cssText = "color: black";
    stop.style.cssText = "color: black";
    restart.style.cssText = "color: black";
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
    arrowButtons.forEach((button)=>{
      button.style.cssText = "color: white";
    });

    playPause.style.cssText = "color: white";
    stop.style.cssText = "color: white";
    restart.style.cssText = "color: white";
  }
});

let sessionTimer = new Timer(sessionNum*60);
let breakTimer = new Timer(breakNum*60);

let activeTimer = '';

arrowButtons.forEach((button)=>{
  const buttonClasses = [...button.classList];
  button.addEventListener('click',(e)=>{
    if(buttonClasses.includes('up-arrow')){
      if(buttonClasses.includes("session")){
        sessionNum = sessionNum >= 25 ? 25: sessionNum+1; 
      }else{
        breakNum = breakNum >= 25 ? 25: breakNum+1;
      }
    }else if(buttonClasses.includes('down-arrow')){
      if(buttonClasses.includes("session")){
      sessionNum = sessionNum <= 1 ? 1: sessionNum-1;
      }else
      breakNum = breakNum <= 1 ? 1: breakNum-1;
    }
    sessionTimer.setTime_ms(sessionNum * 60000);
    sessionValue.innerHTML = sessionNum;
    breakValue.innerHTML = breakNum;

    clock.innerHTML = (sessionNum <=9 ? "0"+sessionNum : sessionNum) + ":00";
  });
});

setInterval(()=>{
  if(sessionTimer.running || breakTimer.running){
    arrowButtons.forEach((button)=>{
      button.style.cssText = "display: none";
      button.disabled = true;
    });
    playPause.innerHTML = '▮▮';
  }else{
    playPause.innerHTML = "▶";
  }
  
  if(activeTimer == 'session'){
    if(sessionTimer.running){
      updateTimer(clock, sessionTimer);
    }else if (sessionTimer.stopped){
      breakTimer.setTime_ms(breakNum * 60000);
      breakTimer.start();
      activeTimer = 'break'
    } 
  } else if(activeTimer == 'break'){
    if(breakTimer.running){
      updateTimer(clock, breakTimer);
    }else if (breakTimer.stopped){
      sessionTimer.setTime_ms(sessionNum * 60000);
      sessionTimer.start();
      activeTimer = 'session'
    } 
  } 
});



const playPause = document.querySelector('#play-pause');
let playing = false;

playPause.addEventListener('click',(e)=>{
  if(!playing){
    playing = true;

    if(!activeTimer)
      activeTimer = 'session';
    else
      breakTimer = 'break';

    if(activeTimer == 'session')
      sessionTimer.start();
    else
      breakTimer.start();
  }else{
    playing = false;
    if(activeTimer == 'session')
      sessionTimer.pause();
    else if(activeTimer == 'break')
      breakTimer.pause();
  }
});

const stop = document.querySelector('#stop');
const stopTimer = ()=>{
  playing = false;
  if(activeTimer == 'session')
      sessionTimer.stop();
    else
      breakTimer.stop();
  activeTimer = '';
  playPause.innerHTML = "▶";
  clock.innerHTML = (sessionNum <=9 ? "0"+sessionNum : sessionNum) + ":00";
  sessionTimer.setTime_ms(sessionNum * 60000);
  arrowButtons.forEach((button)=>{
    button.disabled = false;
    button.style.cssText = "display: inline-block";
    button.style.cssText = isNightMode ? "color: white" : "color: black";
    
  });

}

stop.addEventListener('click',stopTimer);

const restart = document.querySelector('#restart');
restart.addEventListener('click', ()=>{
  stopTimer();
  sessionNum = 25;
  breakNum = 25;
  sessionTimer.setTime_ms(sessionNum * 60000);
  breakTimer.setTime_ms(breakNum * 60000);
  clock.innerHTML = (sessionNum <=9 ? "0"+sessionNum : sessionNum) + ":00";
  sessionValue.innerHTML = sessionNum;
  breakValue.innerHTML = breakNum;
  
  
});








