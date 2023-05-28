const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
require('dotenv').config();

//insert your api key here
const api_key = process.env.API_KEY;

//function to collect data from weather stack api
async function getWeather(city) {
    try {
      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`
      );
  
      const weatherData = response.data;
      return weatherData.current.temperature;
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



//home page route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


//weather city route
app.post('/city', async (req, res) => {
  try {
    const query = req.body.query;
    const weatherData = await getWeather(query);
    res.json(weatherData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});

//localhost:3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

console.log(api_key);