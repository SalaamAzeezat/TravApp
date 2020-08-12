const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const axios = require('axios');

// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express()

/* Dependencies*/
const bodyParser = require('body-parser')

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

console.log(__dirname)

// Setup Server
const port = 4040;

// Spin Up the Server
const server = app.listen(port, listening);

//Callback to debug
function listening() {
  console.log('server running');
  console.log(`running on localhost: ${port}`);
}

// Callback function to complete GET '/all'
app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

//Post route
app.post('/add', addData);

function addData(req, res) {
  let location = req.body.city;
  let countryCode = req.body.countrycode;
  let departureDate = req.body.departDate;
  let arrivalDate = req.body.arriveDate

  //Geonames API Credentials
  const geonamesURL = 'http://api.geonames.org/searchJSON?q=';
  const geonamesKey = process.env.username;

  //Weatherbit API Credentials
  const weatherbitURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
  const weatherbitKey = process.env.weatherkey;

  //Pixabay API Credentials
  const pixabayURL = 'https://pixabay.com/api/?key=';
  const pixabayQuery = '&category=places&image_type=photo&pretty=true';
  const pixabayKey = process.env.pixabaykey;


  axios.all([
    axios.get(geonamesURL + location + '&countryCode=' + countryCode + "&maxRows=1&username=" + geonamesKey),
    axios.get(weatherbitURL + '&city=' + location + '&key=' + weatherbitKey),
    axios.get(pixabayURL + pixabayKey + "&q=" + location + pixabayQuery)
  ])
    .then(response => {
      let coordinateData = response[0];
      let weatherData = response[1];
      let imageData = response[2];

      console.log(coordinateData.data.geonames[0].lat);
      console.log(coordinateData.data.geonames[0].lng);
      console.log(weatherData.data.data[0].weather.description);
      console.log(weatherData.data.data[0].temp);
      console.log(weatherData.data.data[0].weather.icon);
      console.log(imageData.data.hits[0].webformatURL);
      projectData.push({'latitude': coordinateData.data.geonames[0].lat, 'longitude': coordinateData.data.geonames[0].lng, 'description': weatherData.data.data[0].weather.description, 'temp': weatherData.data.data[0].temp, 'icon': weatherData.data.data[0].weather.icon, 'image': imageData.data.hits[0].webformatURL, 'city': location, 'countrycode': countryCode, 'arriveDate': arrivalDate, 'departDate': departureDate});
      console.log(projectData);
      res.send(projectData);
    })
    .catch(error => console.log(error));

}


module.exports = app;




