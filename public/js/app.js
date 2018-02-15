cl = console.log;
$(document).ready(function() {
  // al cargar obtenemos la gelogalicacion del usuario
  searchPosition();

  // Geolocalizacion:
  function searchPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let myPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        cl('obteniendo tu geolocalizacion: Lay->' + myPosition.lat + 'Long->' + myPosition.lng);

        var proxy = 'https://cors-anywhere.herokuapp.com/';
        var linkApiDarsky = `https://api.darksky.net/forecast/4c8492a068a69fe76e0866fdb82194c5/${myPosition.lat},${myPosition.lng}?units=si`;

        $.ajax({
          url: proxy + linkApiDarsky,
          success: getWeather
        });
      });
    } else {
      cl('Su navegador no soporta Geolocalización');
    }
  }

  function getWeather(data) {
    // Obtenemos los elementos del index
    let imageWeather = $('#img-principal');
    let temperatureToday = $('#temperature');
    let wind = $('#wind');
    let humidity = $('#humidity');
    let uvIndex = $('#uv-index');
    let pressure = $('#pressure');
    let summary = $('#summary');
    let responseToday = data.currently;
    let icon = responseToday.icon;
    cl(responseToday);
    // Obtenemos los resultados de la api
    temperatureToday.text(responseToday.temperature + '°');
    wind.text(responseToday.windSpeed + ' m/s');
    humidity.text(responseToday.humidity + '%');
    uvIndex.text(responseToday.uvIndex);
    pressure.text(responseToday.pressure + 'hPa');
    imageWeather.attr('src', `assets/img/${responseToday.icon}.png`);
    
    $('#btn-prediction-week').on('click', () => {
      window.location.href = 'views/prediction.html';
    });

    // En la vista prediction
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // obtenemos los elementos
    let containerPredictionforDays = $('#container-days');

    let responseWeek = data.daily.data;
    // Obtenemos  los primeros 7 dias 
    let daysOfResponse = responseWeek.slice(0, 7);

    // Obtenemos el clima por dia
    daysOfResponse.forEach((element, index) => {
      let html = `<div><br><div class="col-xs-3 container-flex-column "><img class="text-center img-days" src="../assets/img/${element.icon}.png" alt="img"></div><div class="col-xs-3 container-flex-column "><p class="text-center text-white">${days[index]}</p></div><div class="col-xs-3 container-flex-column "><p class="text-center text-white">${element.temperatureMax}°</p></div><div class="col-xs-3 container-flex-column "><p class="text-center text-white">${element.temperatureMin}°</p></div></div></div>`;
      containerPredictionforDays.append(html);
    });
  }
});
