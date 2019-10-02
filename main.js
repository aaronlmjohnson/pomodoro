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
  
  set time_ms(milliseconds){
  this.milliseconds = milliseconds;
  }

  start(/*element*/){
    this.running = true;
    this.paused = false;
    this.stopped = false;
    this.timer = setInterval(()=>{
      if(this.milliseconds < 1)
        this.stop();
      else{
        this.milliseconds -= 1000;
        let minutes = Math.floor((this.milliseconds / 60000) % 60);
        let seconds = (this.milliseconds / 1000) % 60
        
        //element.innerHTML = (minutes < 9 ? "0"+minutes : minutes) + ":" + (seconds < 9 ? "0"+seconds : seconds);

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


let sessionTimer = new Timer(5);
let breakTimer = new Timer(3);
let newCycle = true; // so the breakTimer doesn't restart once it finishes it's cycle
let activeTimer = '';
//sessionTimer.start();

setInterval(()=>{
  
  if(activeTimer == 'session'){
    if(sessionTimer.running){
      updateTimer(clock, sessionTimer);
    }else if (sessionTimer.stopped){
      breakTimer.start();
      activeTimer = 'break'
    } 
  } else if(activeTimer == 'break'){
    if(breakTimer.running){
      updateTimer(clock, breakTimer);
    }else if (breakTimer.stopped){
      sessionTimer.start();
      activeTimer = 'session'
    } 
  }
  /*if(sessionTimer.running){
    updateTimer(clock, sessionTimer);
  }else if (sessionTimer.stopped && breakTimer.stopped){
    breakTimer.start();
  } else if(breakTimer.running){
    updateTimer(clock, breakTimer);
  }else if(breakTimer.stopped){
    sessionTimer.start();
  }*/
    
});







