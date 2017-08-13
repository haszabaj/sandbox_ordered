
var weatherApp = (function () {

  var settings = {
    API_KEY: "b66507bb73d941dcbcc192051170507",
    celcius: false,
    toggle: $("#toggle"),
    weatherData
  },
    
    // private module
  var _private = {

    toDegrees: function(num, celcius){
        if (celcius) {
          return num + '&deg;' + 'C'; 
        }
        return num + '&deg;' + 'F'
      },

    switchUnit: function(currentTempF, celcius) {
      if (celcius) {
        var valueInC = (currentTempF - 32) * (5 / 9)
        return toDegrees(valueInC, celcius);
      }
        return toDegrees(currentTempF, celcius);
      },
      
    render: function(weatherData, celcius) {
      var currentLocation = weatherData.location.name;
      var currentWeather = weatherData.current.condition.text;
      var currentTempF = switchUnit(weatherData.current.temp_f, celcius);
      var icon = weatherData.current.condition.icon;
      var iconSrc = "https:" + icon;

      $('#location').html(currentLocation);
      $('#currentWeather').html(currentWeather);
      $('#currentTemp').html(currentTempF);
      $('#icon').html('https:' + icon);
      $('#currentTemp').prepend('<img src="' + iconSrc + '" id="#icon">');
      },

    changeTemp: function() {
      WeatherApp.toggle.on("click", function() {
      celcius = !celcius;
      render(weatherData, celcius);
      });
    },

    getData: function() {
      var location;
      $.getJSON('https://ipinfo.io', function(d) {
        location = data.location.split(",");
        $.getJSON('https://api.apixu.com/v1/current.json?key=' + API_KEY + '&q=' + location[0] + ',' + location[1], function(apiData) {
            weatherData = apiData;
            render(apiData, celcius);
        });
      });
    };
  },
    
    // public module
  var _public = {
    switchUnit: _private.switchUnit(),
    render: _private.render(),
    getData:_private.getData(),
    changeTemp:_private.changeTemp(),
  };
    
  return _public;
    
})();

