// Replace this once my own key starts working
var apiKey = "98580df80078d18a3d18dd61ce4d926a";
var currentCityNameEl = document.querySelector("#cityname");
var currentTempEl = document.querySelector("#currTemp");
var currentHumidityEl = document.querySelector("#currHumidity");
var currentWindEl = document.querySelector("#currWind");
var currentUvEl = document.querySelector("#currUv");
var searchFormEl = document.querySelector("#searchform");
var searchFieldEl = document.querySelector("#city");
var searchListEl = document.querySelector(".list-group");
var cities = JSON.parse(localStorage.getItem('searchhistory')) || [];

// Load searches from localStorage if any
function loadHistory() {
    if (localStorage.getItem('searchhistory')) {
        // Clear old content
        searchListEl.textContent = "";
        cities.reverse();
        // Loop over the array to dsiplay contents on page
        for (var i = 0; i < cities.length; i++) {
            var listItemEl = document.createElement('button');
            listItemEl.textContent = cities[i];
            listItemEl.setAttribute("data-city", cities[i]);
            listItemEl.className = "list-group-item";
            searchListEl.appendChild(listItemEl);
        };
    };
};

// Fetch latitude and longitude for the search term
var geoCoordinates = function (city) {
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    // Set city name to header
                    currentCityNameEl.textContent = data[0].name + " (" + moment().format('M/D/YY') + ')';
                    lat = data[0].lat;
                    lon = data[0].lon;
                    getWeather(lat, lon);
                });
            };
        });
};

// Get weather info based on geoCoordinates function's output
var getWeather = function (lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + apiKey;
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

// Populate five day array with weather data for each day
var fiveDayForecast = function (forecast) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + apiKey;
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    // Load date specific information to each box
                    for (var i = 1; i < 6; i++) {
                        document.querySelector(`#d${i}`).textContent = moment().add(i, 'days').format('M/D/YY');
                        document.querySelector(`#ico${i}`).setAttribute('src', `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`);
                        document.querySelector(`#t${i}`).textContent = data.daily[i].temp.day;
                        document.querySelector(`#w${i}`).textContent = data.daily[i].wind_speed;
                        document.querySelector(`#h${i}`).textContent = data.daily[i].humidity;
                    }

                    // Once results have loaded, show them on the page
                    document.querySelector("#results").setAttribute("style", "display: block");

                });
            };
        });
};

var formSubmitHandler = function (event) {
    event.preventDefault();
    // Hides results until they have been found
    document.querySelector("#results").setAttribute("style", "display: none");

    citySearch = searchFieldEl.value.trim();
    if (citySearch) {

        // If statement - check if the value already exists in the array to avoid search history from repeating
        if (!cities.includes(citySearch)) {
            cities.push(citySearch)
        }

        localStorage.setItem('searchhistory', JSON.stringify(cities));

        geoCoordinates(citySearch);
        loadHistory();
        searchFieldEl.value = "";
    } else {
        alert("Please enter a search term");
    };
};

var searchFromHistory = function (event) {
    var pastCity = event.target.getAttribute("data-city");
    if (city) {
        // Hides results until they have been found
        document.querySelector("#results").setAttribute("style", "display: none");
        geoCoordinates(pastCity);
    };
};

// Event listeners for history and for the search button
searchFormEl.addEventListener("submit", formSubmitHandler);
searchListEl.addEventListener("click", searchFromHistory);

// Call loadHistory to show history of recent searches on the page
loadHistory();
