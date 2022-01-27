// Replace this once my own key starts working
var apiKey = "b262298fbe39ad30d243f31f6e1297bc";
var citySearch = "Detroit";

var lat = "";
var lon = "";

// var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + apiKey;



var currentCityNameEl = document.querySelector("#cityname");
var currentTempEl = document.querySelector("#currTemp");
var currentHumidityEl = document.querySelector("#currHumidity");
var currentUvEl = document.querySelector("#currUv");



var getWeather = function (weatherCity) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

    console.log(apiUrl);

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);

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
                    console.log(data);

                    // Set city name to header
                    currentCityNameEl.textContent = data[0].name;

                    lat = data[0].lat;
                    lon = data[0].lon;
                    console.log(lat);
                    console.log(lon);
                    getWeather();
                })
            }
        })

}




geoCoordinates();


// getWeatherData();