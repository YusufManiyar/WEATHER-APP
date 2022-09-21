const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone =  document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherforecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


// const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
// const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// const API_KEY = ;


// const time = new Date();
// const month = time.getMonth();
// const date = time.getDate();
// const day = time.getDay();
// const hour = time.getHours();
// const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
// let minute = time.getMinutes();
//     minute = minute < 10 ? '0' + minute : minute
// const ampm = hour >=12 ? 'PM' : 'AM'

timeEl.innerHTML = window.moment().format('hh:mm A')
dateEl.innerHTML =window.moment().format('dddd, DD MMM YYYY')

getWeatherData()

function getWeatherData() {
    console.log("getWeatherData")
    navigator.geolocation.getCurrentPosition((success) =>{
    
        let {latitude, longitude } = success.coords;
         console.log('latitude=>',latitude)
         console.log('longitude=>',longitude)
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=8a848406f6c77a4761bb72631e52b5fb`).then(res =>{
            console.log(res)
            return res.json()
            
        }).then(data => {
            showWeatherData(data);
        }).catch(error=>console.log(error))
    },(error)=> console.log(error))
}

function showWeatherData(data){
    let {humidity,pressure} = data.main;
    let {speed} = data.wind;
    let {sunrise,sunset} = data.sys;

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
     <div>${speed}</div>
     </div>

     <div class="weather-item">
     <div>Sunrise</div>
     <div>${window.moment(sunrise * 1000).format('hh:mm a')}</div>
     </div>
     <div class="weather-item">
     <div>sunset</div>
     <div>${window.moment(sunset*1000).format('hh:mm a')}</div>
     </div>
     `
}

getDailyWeatherData()

function getDailyWeatherData() {
    navigator.geolocation.getCurrentPosition((success) =>{
    
        let {latitude, longitude } = success.coords;
         console.log('latitude=>',latitude)
         console.log('longitude=>',longitude)
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=8a848406f6c77a4761bb72631e52b5fb`).then(res =>{
            console.log(res)
            return res.json()
            
        }).then(data => {
            showDailyWeatherData(data);
        }).catch(error=>console.log(error))
    },(error)=> console.log(error))
}

function showDailyWeatherData(data){
    
    let {humidity,pressure} = data.main;
    let {speed} = data.wind;

    weatherforecastEl.innerHTML = 
`

`
}