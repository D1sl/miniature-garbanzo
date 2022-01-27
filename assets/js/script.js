// Replace this once my own key starts working
var apiKey = "b262298fbe39ad30d243f31f6e1297bc";
var citySearch = "Detroit";

var lat = "";
var lon = "";

// var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + apiKey;



var currentCityNameEl = document.querySelector("#cityname");
var currentTempEl = document.querySelector("#currTemp");
var currentHumidityEl = document.querySelector("#currHumidity");
var currentWindEl = document.querySelector("#currWind");
var currentUvEl = document.querySelector("#currUv");

// Get weather info based on geoCoordinates function's output
var getWeather = function (weatherCity) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" +  "&appid=" + apiKey;

    console.log(apiUrl);

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    currentTempEl.textContent = "Temperature: " + data.current.temp + " °F";
                    currentWindEl.textContent = "Wind: " + data.current.wind_speed + " MPH";
                    currentHumidityEl.textContent = "Humidity: " + data.current.humidity + "%";
                    currentUvEl.textContent = data.current.uvi*100 + "%";
                })
            }
        })

}


// Fetch latitude and longitude for the search term
var geoCoordinates = function () {
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + citySearch + "&appid=" + apiKey;
    console.log(apiUrl);

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    // Set city name to header
                    currentCityNameEl.textContent = data[0].name;

                    lat = data[0].lat;
                    lon = data[0].lon;
                    getWeather();
                })
            }
        })

}




geoCoordinates();


// getWeatherData();