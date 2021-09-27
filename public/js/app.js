'use strict';

const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const message1 = document.querySelector('#message01');
const message2 = document.querySelector('#message02');

searchForm.addEventListener('submit', e => {
  e.preventDefault();

  const location = searchInput.value;
  message01.textContent = 'Loading...';
  message02.textContent = '';
  message01.classList.remove('forecast-error');
  message01.classList.remove('forecast-success');
  message02.classList.remove('forecast-error');
  message02.classList.remove('forecast-success');
  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        message01.classList.add('forecast-error');
        message01.textContent = data.error;
      } else {
        message01.textContent = data.location;
        message02.textContent = data.forecast;
        message01.classList.add('forecast-success');
        message02.classList.add('forecast-success');
      }
    });
  });
});
