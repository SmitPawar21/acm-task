import './App.css';
import { useState } from 'react';

function App() {

const apikey = "93a959d95f7db4d334110a6179a96e36";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const [cityName, setCity] = useState("")

const changeCity = (event)=>{
  setCity(event.target.value);
}

async function checkWeather(city){
    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apikey}`);
    var data = await response.json();
    
    if(response.status === 404){
        document.querySelector(".errorbox").style.display = "flex";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".windspeed").innerHTML = data.wind.speed + " Km/h";
        const weatherImage = document.querySelector(".weather-image");
        const weatherName = document.querySelector(".weather-name");

        if(data.weather[0].main === "Clouds")
        {
            weatherImage.src = "images/clouds.svg";
            weatherName.innerHTML = "cloudy";
        }
        else if(data.weather[0].main === "Clear")
        {
            weatherImage.src = "images/clear.svg";
            weatherName.innerHTML = "clear";
        }
        else if(data.weather[0].main === "Rain")
        {
            weatherImage.src = "images/rain.svg";
            weatherName.innerHTML = "rain";
        }
        else if(data.weather[0].main === "Drizzle")
        {
            weatherImage.src = "images/drizzle.svg";
            weatherName.innerHTML = "drizzle";
        }
        else if(data.weather[0].main === "Haze")
        {
            weatherImage.src = "images/haze.svg";
            weatherName.innerHTML = "haze";
        }
        else if(data.weather[0].main === "Mist")
        {
            weatherImage.src = "images/mist.svg";
            weatherName.innerHTML = "mist";
        }
    
        console.log(data.weather[0].main)
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".errorbox").style.display = "none";
    }

}

  return (
    <div className="App">
      <div class="container">
        <div class="card">
            <div class="search">
                <input type="text" placeholder="Enter city name" class="input-box" spellcheck="false" onChange={changeCity}/>
                <button class="btn" onClick={()=> checkWeather(cityName)}><img src="images/searchIcon.svg" alt=""/></button>
            </div>

            <div class="weather">
                <div class="weather_info">
                    <img src="" alt="" class="weather-image"/>
                    <p class="weather-name"></p>
                    <h2 class="temp"></h2>
                    <h1 class="city"></h1>
                </div>
                <div class="details">
                    <div class="humid">
                        <img src="images/humid.svg" alt=""/>
                        <h5>Humidity</h5>
                        <p class="humidity">40%</p>
                    </div>
                    <div class="wind">
                        <img src="images/wind.svg" alt=""/>
                        <h5>Wind</h5>
                        <p class="windspeed">13 km/h</p>
                    </div>
                </div>
            </div>

            <div class="errorbox">
                Invalid city name
            </div>
        </div>
        <div class="blackbox"></div>
      </div>
    </div>
  );
}

export default App;
