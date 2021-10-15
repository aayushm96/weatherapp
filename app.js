const searchBtn = document.getElementById('search-btn');
const closeBtn = document.getElementById('close-btn');


const loc = document.getElementById('w-location');
const desc = document.getElementById('w-desc');
const temp = document.getElementById('w-temp');
const icon = document.getElementById('w-icon')
const todayDate = document.getElementById('date')

const wind = document.getElementById('w-wind');
const direction = document.getElementById('w-direction');
const humidity = document.getElementById('w-humidity');
const humidityfill = document.getElementById('w-humidity-fill');
const visibility = document.getElementById('w-visibility');
const pressure = document.getElementById('w-pressure');

const nav = document.getElementById('mobile-nav');
const hero = document.getElementById('hero');



closeBtn.addEventListener('click', hide);
hide();
function hide() {
    if (nav.classList.contains('weather-nav-show')) {
        nav.classList.remove('weather-nav-show')
        hero.style.display = 'grid';

    }
}


searchBtn.addEventListener('click', (e) => {
    nav.classList.add('weather-nav-show');
    hero.style.display = 'none';

})


const d = new Date();
// const daay = d.getDay();
// console.log(daay);
const date = d.getDate();
const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const x = days[d.getDay()];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const month = months[d.getMonth()];
todayDate.innerHTML = `${x}, ${date} ${month}`;

const wSearch = document.getElementById('w-search').addEventListener('click', (e) => {
    const wInput = document.getElementById('w-input');

    let city = wInput.value;

    e.preventDefault();
    const apiKey = 'b6291b4c6cf82a1db1adbdf33aad5d3f'

    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(api)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            loc.innerHTML = data.name;

            desc.innerHTML = data.weather[0].description;

            const newTemp = Math.floor(data.main.temp - 273);
            temp.innerHTML = `${newTemp}<span>°C</span>`;



            const newIcon = data.weather[0].icon;
            icon.setAttribute('src', `https://openweathermap.org/img/wn/${newIcon}@2x.png`)

            wind.innerHTML = `${data.wind.speed}<span>mph</span>`;
            const newDirection = data.wind.deg;
            direction.style.transform = `rotate(${newDirection}deg)`;


            humidity.innerHTML = `${data.main.humidity}<span>%</span>`;
            humidityfill.style.width = `${data.main.humidity}%`

            const newVisibilty = Math.floor((data.visibility) / 1609);
            visibility.innerHTML = `${newVisibilty}<span>miles</span>`;

            pressure.innerHTML = `${data.main.pressure}<span>hPa</span>`;
        });

    wInput.value = '';
    hide();
    // console.log(data.main);
})


const geolocation = document.getElementById('w-geolocation').addEventListener('click', function (e) {
    const apiKey = 'b6291b4c6cf82a1db1adbdf33aad5d3f'


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showme);
            // console.log(ele);
        } else {
            console.log('no GPS found');
        }
    }
    function showme(ele) {
        const x = ele.coords.latitude;
        const y = ele.coords.longitude;
        // console.log(x);
        // console.log(y);
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&appid=${apiKey}`;

        fetch(api)
            .then(response => response.json())
            .then(data => {
                console.log(data);


                loc.innerHTML = data.name;

                desc.innerHTML = data.weather[0].description;

                const newTemp = Math.floor(data.main.temp - 273);
                temp.innerHTML = `${newTemp}<span>°C</span>`;

                const newIcon = data.weather[0].icon;
                icon.setAttribute('src', `https://openweathermap.org/img/wn/${newIcon}@2x.png`)

                wind.innerHTML = `${data.wind.speed} <span>mph</span>`;
                const newDirection = data.wind.deg;
                direction.style.transform = `rotate(${newDirection}deg)`;


                humidity.innerHTML = `${data.main.humidity} <span>%</span>`;
                humidityfill.style.width = `${data.main.humidity}%`

                const newVisibilty = Math.floor((data.visibility) / 1609);
                visibility.innerHTML = `${newVisibilty} <span>miles</span>`;

                pressure.innerHTML = `${data.main.pressure}<span>hPa</span>`;
            });
    }
    getLocation();



});

const neww = 'https://api.openweathermap.org/data/2.5/forecast?q=lucknow&appid=b6291b4c6cf82a1db1adbdf33aad5d3f'
fetch(neww)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    });

