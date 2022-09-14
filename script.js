const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone =  document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherforecastel = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const API_KEY = '8a848406f6c77a4761bb72631e52b5fb';

setInterval(() =>{
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes +' ' + `<spam id="am-pm">${ampm}</spam>`
    dateEl.innerHTML = days[day] + ',' + date + ' ' + months[month]


},100);

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) =>{

        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            showWeatherData(data);
        })
    })
}

function showWeatherData(data){
    let {humidity,pressure, sunrise, sunset, wind_speed} = data.current;

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
     <div>Humidity</div>
     <div>${humidity}%</div>
     </div>
     <div class="weather-item">
     <div>Pressure</div>
     <div>${pressure}</div>
     </div>
     <div class="weather-item">
     <div>Wind Speed</div>
     <div>${wind_speed}</div>
     </div>
     <div class="weather-item">
     <div>Sunrise</div>
     <div>${window.Comment(sunrise * 1000).format('HH:mm a')}</div>
     </div>
     <div class="weather-item">
     <div>sunset</div>
     <div>${window.Comment(sunset*1000).format('HH:mm a')}</div>
     </div>
     `;
}