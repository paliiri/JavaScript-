VANTA.NET({
  el: "#page",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00
})

const weather = document.getElementById("weather")

function printWeather(data) {
  const t = data.current.temp_c
  const l = data.location.name

  const weatherString = l + " " + t + " °C"
  weather.innerText = weatherString

}

function handlePosition(data){
  const lat = data.coords.latitude
  const lon = data.coords.longitude

  $.get('https://api.weatherapi.com/v1/current.json?key=a16bbfad31b24780926200703240309&q=' + lat + ',' + lon, printWeather)
}

navigator.geolocation.getCurrentPosition(handlePosition)