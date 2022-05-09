const BODY_DELAY = 1000;

const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;
stopBtn.disabled = true;

startBtn.addEventListener("click", onStartBtnClick);
stopBtn.addEventListener("click", onStopBtnClick);

function onStartBtnClick() {

  timerId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
      startBtn.setAttribute("disabled", "true");
      stopBtn.removeAttribute("disabled");
    }, BODY_DELAY);
    
};

function onStopBtnClick() {  
    clearInterval(timerId);
    startBtn.removeAttribute("disabled");
    stopBtn.setAttribute("disabled", "true");
};
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};