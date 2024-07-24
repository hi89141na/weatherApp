const weatherForm = document.querySelector(".weatherForm");
const formInput = document.querySelector(".formInput");
const card = document.querySelector(".card");
const apikey = "5da9837656495ccd1ba33545db0a560e";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = formInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (err) {
            console.error(err);
            displayError(err.message);
        }
    } else {
        displayError("Please enter a valid city");
    }
});

async function getWeatherData(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("City not found");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    const {
        name: city,
        main: { temp, humidity },
        weather
    } = data;
    const { description, id } = weather[0];

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const temperatureDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descriptionDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    temperatureDisplay.textContent = `${Math.round((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
    humidityDisplay.textContent = `${humidity}%`;
    descriptionDisplay.textContent = description;

    cityDisplay.classList.add("cityDisplay");
    temperatureDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descriptionDisplay.classList.add("descDisplay");

    card.appendChild(cityDisplay);
    card.appendChild(temperatureDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descriptionDisplay);
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.innerHTML = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
