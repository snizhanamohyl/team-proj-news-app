import axios from "axios";

const API_KEY = '330800086c869b55fadd072cf641d172';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

const refs ={
    degree: document.querySelector('.weather__app--degree'),
    daysValue: document.querySelector('.weather__app--days--value'),
    city: document.querySelector('.weather__app--city'),
    img: document.querySelector('.weather__app--skyCons'),
    day: document.querySelector('.weather__app--day'),
    year: document.querySelector('.weather__app--year'),
}
async function weatherApp() {
    const url = `${BASE_URL}q=London&units=metric&appid=${API_KEY}`;
    const response = await axios.get(url);

    return response.data;
      
}

async function weatherAppGeo(lon,lat) {
    const url = `${BASE_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);

    return response.data;
      
}
// console.log(weatherApp());
renderWeatherApp();
renderYourGeoPos();

async function renderWeatherApp(){

    const data = await weatherApp();
    const { temp } = data.main;
    const weather = data.weather[0].main;
    const { icon } = data.weather[0];
    refs.degree.textContent = `${Math.round(temp)}°`;
    refs.daysValue.textContent = weather;
    refs.city.textContent = data.name;
    refs.day.textContent = curretDay();
    refs.year.textContent = allInfoDays();
    refs.img.setAttribute( 'src', `https://openweathermap.org/img/wn/${icon}@4x.png`)
}

async function renderYourGeoPos(){
    if(navigator.geolocation){
        await navigator.geolocation.getCurrentPosition(
            async ({coords:{latitude,longitude}}) =>{
                const data = await weatherAppGeo(latitude,longitude);
                const { temp } = data.main;
                const weather = data.weather[0].main;
                const { icon } =data.weather[0];
                refs.degree.textContent = `${Math.round(temp)}°`;
                refs.daysValue.textContent = weather;
                refs.city.textContent = data.name;
                refs.day.textContent = currentDay();
                refs.year.textContent = allInfoDays();
                refs.img.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@4x.png`);
                },
                error => console.error(error)
        );
    }
}


function curretDay() {
    let today = new Date();
    let day = today.getDay();

    let dayList = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    return dayList[day];
}



// function allInfoDays(){
//     let myDay = new Date();

//     let day = myDay.getDate();
//     let month = myDay.getMonth();
//     let year = myDay.getYear();
//         if(year < 1000){
//             year += 1900
//         }

//     let monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Now','Dec'];

//     return  `${day} ${monthList[month]} ${year}`;
// };
function allInfoDays(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Now','Dec'];
    const fullDate = `${day} ${monthList[month]} ${year}`;
    return fullDate;
    };