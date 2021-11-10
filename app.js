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
const date = d.getDate();
const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const x = days[d.getDay()];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const month = months[d.getMonth()];
todayDate.innerHTML = `${x}, ${date} ${month}`;

const test2 = document.getElementById('unit-change');


const allunits = document.getElementsByClassName('new-unit');
console.log(allunits);


// start custom city search
const wSearch = document.getElementById('w-search').addEventListener('click', (e) => {
    const wInput = document.getElementById('w-input');

    let city = wInput.value;

    e.preventDefault();
    const apiKey = 'b6291b4c6cf82a1db1adbdf33aad5d3f'

    const api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(api)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            loc.innerHTML = data.city.name;

            desc.innerHTML = data.list[0].weather[0].description;

            const newTemp = converttoCelsius(data.list[0].main.temp);
            temp.innerHTML = `${newTemp}<span class="new-unit">°C</span>`;



            const newIcon = data.list[0].weather[0].icon;
            icon.setAttribute('src', `https://openweathermap.org/img/wn/${newIcon}@2x.png`)

            wind.innerHTML = `${data.list[0].wind.speed}<span>mph</span>`;
            const newDirection = data.list[0].wind.deg;
            direction.style.transform = `rotate(${newDirection}deg)`;


            humidity.innerHTML = `${data.list[0].main.humidity}<span>%</span>`;
            humidityfill.style.width = `${data.list[0].main.humidity}%`

            const newVisibilty = Math.floor((data.list[0].visibility) / 1609);
            visibility.innerHTML = `${newVisibilty}<span>miles</span>`;

            pressure.innerHTML = `${data.list[0].main.pressure}<span>hPa</span>`;

            const myElement = document.getElementById('forecast');
            // console.log();
            const newmyelements = myElement.children;

            Array.from(newmyelements).forEach((ele, i) => {
                ele.children[0].innerHTML = `${i + 2}-day`;
                ele.children[1].setAttribute('src', `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`);
                ele.children[2].innerHTML = `<p>${converttoCelsius(data.list[i + 1].main.temp_max)} <span class="new-unit">°C</span></p>
                    <p>${converttoCelsius(data.list[i + 1].main.temp_min)}<span class="new-unit">°C</span></p>`
            })

            test2.addEventListener('click', (e) => {
                if (e.target.classList.contains('farenheit')) {
                    // console.log('newTemp');
                    const fahhiet = converttoFahrenheit(newTemp);
                    temp.innerHTML = `${fahhiet}<span>°F</span>`
                    Array.from(allunits).forEach(unit => {
                        unit.textContent = '°F';
                    })
                    Array.from(newmyelements).forEach((ele, i) => {
                        // ele.children[0].innerHTML = `${i + 2}-day`;
                        // ele.children[1].setAttribute('src', `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`);
                        ele.children[2].innerHTML = `<p>${converttoFahrenheit(data.list[i + 1].main.temp_max)} <span class="new-unit">°F</span></p>
                    <p>${converttoFahrenheit(data.list[i + 1].main.temp_min)}<span class="new-unit">°F</span></p>`
                    })
                }
                else {
                    temp.innerHTML = `${newTemp}<span class="new-unit">°C</span>`;
                    Array.from(allunits).forEach(unit => {
                        unit.textContent = '°C';
                    })
                    Array.from(newmyelements).forEach((ele, i) => {
                        // ele.children[0].innerHTML = `${i + 2}-day`;
                        // ele.children[1].setAttribute('src', `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`);
                        ele.children[2].innerHTML = `<p>${converttoCelsius(data.list[i + 1].main.temp_max)} <span class="new-unit">°C</span></p>
                    <p>${converttoCelsius(data.list[i + 1].main.temp_min)}<span class="new-unit">°C</span></p>`
                    })

                }

            });
        });
    wInput.value = '';
    hide();
    // console.log(data.main);
})

//start current city search using GPS of the device

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

                const newTemp = converttoCelsius(data.main.temp);
                temp.innerHTML = `${newTemp}<span class="new-unit">°C</span>`;

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


                test2.addEventListener('click', (e) => {

                    // console.log(e.target);

                    if (e.target.classList.contains('farenheit')) {
                        // console.log('newTemp');
                        const fahhiet = converttoFahrenheit(newTemp);
                        temp.innerHTML = `${fahhiet}<span>°F</span>`
                        Array.from(allunits).forEach(unit => {
                            unit.textContent = '°F';
                        })
                    }
                    else {
                        temp.innerHTML = `${newTemp}<span class="new-unit">°C</span>`;
                        Array.from(allunits).forEach(unit => {
                            unit.textContent = '°C';
                        })
                    }

                });
            });
    }
    getLocation();
});


function converttoCelsius(celsius) {
    const newCelsius = Math.floor(celsius - 273);
    return newCelsius;
}

function converttoFahrenheit(f) {
    const newFahrenheit = Math.floor((f * (9 / 5)) + 32);
    return newFahrenheit;
}