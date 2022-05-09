import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');
let selectedDate;

startBtn.disabled = true;
 
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = Date.parse(selectedDates) ;
        
        if (selectedDates[0].getTime() < options.defaultDate) {
            Notiflix.Notify.failure('Please choose a date in the future');
 
        } else {
            startBtn.disabled = false;
        }
  },
};

flatpickr("input#datetime-picker", options);

const timer = {

    isActive: false,
    timerId: null,

      stop() {
            clearInterval(this.timerId);
    },
      
    start() {
        if (this.isActive) {
            return;
        }
        
        const startTime = selectedDate;
        this.isActive = true;

            this.timerId = setInterval(() => {
                const currentTime = Date.now();
                const difference = Math.abs(currentTime - startTime);
                
                updateTimerInterface(convertMs(difference));
                if (difference<1000) {
                    this.stop()
                }
               
            }, 1000); 
    }, 
}; 

startBtn.addEventListener("click", onStartBtnClick);

function onStartBtnClick() {

    timer.start();  
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0'); 
}

function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
    
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    
    return { days, hours, minutes, seconds };
    
}

function updateTimerInterface({ days, hours, minutes, seconds }) {
    second.textContent = `${seconds}`;
    minute.textContent = `${minutes}`;
    hour.textContent = `${hours}`;
    day.textContent = `${days}`;

}

