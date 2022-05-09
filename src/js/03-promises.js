import Notiflix from 'notiflix';

const form = document.querySelector(".form");

form.addEventListener('submit', onFormSubmit);
let position = 0;
function onFormSubmit(evt) {
 evt.preventDefault();

  const formElements = evt.currentTarget.elements;
  let delay = Number(formElements.delay.value);
  const step = Number(formElements.step.value);
  const amount = Number(formElements.amount.value);
  
  let count = 1;
  while (count <= amount) {
    position += 1;
    createPromise(position, delay)
  .then(({position, delay}) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
      .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`); 
  });
    count += 1;
    delay += step;
  }

}
  

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
setTimeout(() => {
    if (shouldResolve) {
    resolve({position, delay});
  } else {
    reject({position, delay});
  }
}, delay);
   });
};

