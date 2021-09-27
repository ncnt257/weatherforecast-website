const request = require('request');

function geocode(place, callback) {
  request(
    {
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        place
      )}}.json?access_token=pk.eyJ1IjoibmNudDI1NyIsImEiOiJja3R6bmtuaXUzZWFzMnBwM3I0NnlwdXdwIn0.8DMyIzhaRpSFnBWEGS7MHA`,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback(new Error('Unable to connect to location service'));
      } else if (body.features.length === 0) {
        callback(new Error('Not found, please try again'));
      } else {
        callback(undefined, {
          location: body.features[0].text,
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
        });
      }
    }
  );
}

module.exports = geocode;
