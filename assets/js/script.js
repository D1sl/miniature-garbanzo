// Replace this once my own key starts working
var apiKey = "b262298fbe39ad30d243f31f6e1297bc";

var currentCityNameEl = document.querySelector("#cityname");
var currentTempEl = document.querySelector("#currTemp");
var currentHumidityEl = document.querySelector("#currHumidity");
var currentWindEl = document.querySelector("#currWind");
var currentUvEl = document.querySelector("#currUv");
var searchFormEl = document.querySelector("#searchform");
var searchFieldEl = document.querySelector("#city");

// Fetch latitude and longitude for the search term
var geoCoordinates = function (city) {
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;
    console.log(apiUrl);

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    // Set city name to header
                    currentCityNameEl.textContent = data[0].name;
                    lat = data[0].lat;
                    lon = data[0].lon;
                    getWeather(lat, lon);
                });
            };
        });
};

// Get weather info based on geoCoordinates function's output
var getWeather = function (lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" +  "&appid=" + apiKey;
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    currentTempEl.textContent = "Temperature: " + data.current.temp + " °F";
                    currentWindEl.textContent = "Wind: " + data.current.wind_speed + " MPH";
                    currentHumidityEl.textContent = "Humidity: " + data.current.humidity + "%";
                    currentUvEl.textContent = data.current.uvi;
                    fiveDayForecast();
                });
            };
        });
};

var fiveDayForecast = function(forecast) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" +  "&appid=" + apiKey;
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    document.querySelector("#t1").textContent = data.daily[1].temp.day;
                    document.querySelector("#t2").textContent = data.daily[2].temp.day;
                    document.querySelector("#t3").textContent = data.daily[3].temp.day;
                    document.querySelector("#t4").textContent = data.daily[4].temp.day;
                    document.querySelector("#t5").textContent = data.daily[5].temp.day;
                    
                    document.querySelector("#w1").textContent = data.daily[1].wind_speed;
                    document.querySelector("#w2").textContent = data.daily[2].wind_speed;
                    document.querySelector("#w3").textContent = data.daily[3].wind_speed;
                    document.querySelector("#w4").textContent = data.daily[4].wind_speed;
                    document.querySelector("#w5").textContent = data.daily[5].wind_speed;
                    
                    document.querySelector("#h1").textContent = data.daily[1].humidity;
                    document.querySelector("#h2").textContent = data.daily[2].humidity;
                    document.querySelector("#h3").textContent = data.daily[3].humidity;
                    document.querySelector("#h4").textContent = data.daily[4].humidity;
                    document.querySelector("#h5").textContent = data.daily[5].humidity;

                    // Once results have loaded, show them on the page
                    document.querySelector("#results").setAttribute("style", "display: block");

                });
            };
        });
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    citySearch = searchFieldEl.value.trim();
    if (citySearch) {
        geoCoordinates(citySearch);
        searchFieldEl.value = "";
    } else {
        alert("Please enter a search term");
    };
};

searchFormEl.addEventListener("submit", formSubmitHandler);