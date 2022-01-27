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

// Fetch latitude and longitude for the search term
var geoCoordinates = function (city) {
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + citySearch + "&appid=" + apiKey;
    console.log(apiUrl);
    
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                lat = data[0].lat;
                lon = data[0].lon;
                console.log(lat)
                console.log(lon)
            })
        }
    })
    
}

// var getWeatherData = function () {
    
//     // Fetch data from API
    
//     fetch(apiUrl)
//     .then(function (response) {
//         // If request was successful
//         if (response.ok) {
//             response.json().then(function (data) {
//                 console.log(data);

//                 currentCityNameEl.textContent = data.name;
                
//                 currentTempEl.textContent = data.main.temp;



//             })
//         }
//     })
    
// }



geoCoordinates();

// getWeatherData();