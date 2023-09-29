const apiKey = 'a171760a4770ab418db0118dbeade76b'; 
const weatherResult = document.getElementById('weatherResult');
const getWeatherBtn = document.getElementById('getWeatherBtn');

getWeatherBtn.addEventListener('click', () => {
    const locationInput = document.getElementById('locationInput').value;
    if (!locationInput) {
        alert('Please enter a location.');
        return;
    }
    const temperatureUnit = document.getElementById('temperatureUnit').value;
    getWeather(locationInput, temperatureUnit);
});

function getWeather(location, temperatureUnit) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            displayWeather(data, temperatureUnit);
        })
        .catch((error) => {
            console.error('Error:', error);
            weatherResult.innerHTML = 'Error fetching weather data.';
        });
}

function displayWeather(data, temperatureUnit) {
    let temperature;
    let unitSymbol;

    switch (temperatureUnit) {
        case 'metric': // Celsius
            temperature = Math.round(data.main.temp - 273.15);
            unitSymbol = '°C';
            break;
        case 'imperial': // Fahrenheit
            temperature = Math.round((data.main.temp - 273.15) * 1.8 + 32);
            unitSymbol = '°F';
            break;
        case 'standard': // Kelvin
            temperature = Math.round(data.main.temp);
            unitSymbol = 'K';
            break;
        default:
            temperature = Math.round(data.main.temp - 273.15);
            unitSymbol = '°C';
            break;
    }

    const description = data.weather[0].main;
    const humidity=data.main.humidity;
    const windSpeed=data.wind.speed.toFixed(2)*3.6
    const location = data.name;
    const weatherHTML = `<p>Location: ${location}</p>
                        <p>Temperature: ${temperature}${unitSymbol}</p>
                        <p>Humidity:${humidity}%</p>
                        <p>Wind Speed:${windSpeed}km/hr</p>
                        <p>Description: ${description}</p>`;
    weatherResult.innerHTML = weatherHTML;
}
