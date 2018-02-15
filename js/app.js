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
  
});


