var API_KEY = "a21046a44c20287047521f42766abe66";

$(function() {
  //call to get IP
  var loc;

  $.getJSON("https://ipinfo.io", function(d) {
    console.log("assigning the data");
    loc = d.loc.split(",");
    console.log(loc);

    $.getJSON(
      "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?" + loc[0] + "&lon=" + loc[1] + "&units=metric&APPID=" + API_KEY,
      function(wd) {
        console.log(wd);
        var currentLocation = wd.name;
        var currentWeather = wd.weather[0].description;
        var currentTemp = wd.main.temp;
      }
    );
  });
});