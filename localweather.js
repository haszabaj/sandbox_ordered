var API_KEY = "b66507bb73d941dcbcc192051170507";
var cel = false;
var wd;


function switchUnit(currentTempF, c) {
    if (c) {
        var valueInC = (currentTempF - 32) * (5 / 9) + '&deg;' + 'C';
        return valueInC;
    }
    return currentTempF + '&deg;' + 'F';
}

function render(wd, cel) {
    var currentLocation = wd.location.name;
    var currentWeather = wd.current.condition.text;
    var currentTempF = switchUnit(wd.current.temp_f, cel);
    var icon = wd.current.condition.icon;
    var iconSrc = "https:" + icon;

    $('#location').html(currentLocation);
    $('#currentWeather').html(currentWeather);
    $('#currentTemp').html(currentTempF);
    $('#icon').html('https:' + icon);
	$('#currentTemp').prepend('<img src="' + iconSrc + '" id="#icon">');
}

$(function() {
    var loc;
    $.getJSON('https://ipinfo.io', function(d) {
        loc = d.loc.split(",");
			$.getJSON('https://api.apixu.com/v1/current.json?key=' + API_KEY + '&q=' + loc[0] + ',' + loc[1], function(apiData) {
            wd = apiData;
            render(apiData, cel);
	

	$('#toggle').click(function() {
        cel = !cel;
        render(wd, cel)
        })
	})
    
    })

})