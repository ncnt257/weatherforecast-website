'use strict';

const request = require('request');

function forecast(lat, lng, callback) {
  request(
    {
      url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}4&lon=${lng}&appid=ba285619d8a2af075df4ce59c10646ac&units=metric`,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback(new Error('Unable to connect to weather service'));
      } else if (body.cod === '400') {
        callback(new Error('Unable to find location'));
      } else {
        callback(
          undefined,
          `It is currently ${body.main.temp} degrees out there. Today is a ${body.weather[0].description} day`
        );
      }
    }
  );
}

module.exports = forecast;
