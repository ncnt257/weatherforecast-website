'use strict';
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

const app = express();

const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partial');

app.use(express.static(publicDir));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Tung Nguyen',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Tung Nguyen',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Helper',
    name: 'Tung Nguyen',
  });
});
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }
  geocode(req.query.address, (error, gecodeRes) => {
    if (error) {
      return res.send({
        error: error.message,
      });
    }
    forecast(gecodeRes.latitude, gecodeRes.longitude, (error, forecastRes) => {
      if (error) {
        return res.send({
          error: error.message,
        });
      }
      res.send({
        address: req.query.address,
        location: gecodeRes.location,
        forecast: forecastRes,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Not found',
    name: 'Tung Nguyen',
    errorMessage: 'Help aritcle not found',
  });
});

app.get('/*', (req, res) => {
  res.render('404', {
    title: 'Not found',
    name: 'Tung Nguyen',
    errorMessage: 'Not found',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
