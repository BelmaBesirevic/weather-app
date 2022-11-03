const api = {
  key: '8b788b1c5dca79c865eb6eee6c2194cb',
  base: 'https://api.openweathermap.org/data/2.5/',
}

// https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&apikey="+key

const search = document.querySelector('.search')
const btn = document.querySelector('.btn')

btn.addEventListener('click', getInput)

function getInput(e) {
  e.preventDefault()
  if (e.type == 'click') {
    getData(search.value)
    //console.log(search.value)
  }
}

function getData() {
  fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then(response => response.json())
    .then(displayData)
    .catch(error => {
      console.log(error);
    })
}

function displayData(response) {
  // console.log(response)
  if(response.cod === "404") {
    const error = document.querySelector('.error')
    error.textContent = "Please enter a valid city"
    error.classList.add('show')
    search.value = ""
  } else {
    const city = document.querySelector('.city')
    city.innerText = `${response.name}, ${response.sys.country}`

    const today = new Date
    const date = document.querySelector('.date')
    date.innerText = dateFunction(today)

    const temp = document.querySelector('.temp')
    temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>ºC</span>`
    
    const weather = document.querySelector('.weather')
    weather.innerText = `Weather: ${response.weather[0].main}`

    const tempRange = document.querySelector('.temp-range')
    tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}ºC / ${Math.round(response.main.temp_max)}ºC`

    const weatherIcon = document.querySelector('.icon')
    const iconURL = "http://openweathermap.org/img/w/"
    weatherIcon.src = iconURL + response.weather[0].icon + ".png"
    weatherIcon.classList.add("show")

    search.value = ""
  }
}

function dateFunction(d) {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  let day = days[d.getDay()]
  let date = d.getDate()
  let month = months[d.getMonth()]
  let year = d.getFullYear()

  return `${day}, ${date} ${month} ${year}`
}