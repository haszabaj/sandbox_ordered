(function() {

		var WeatherData = [];
		var loc = [];
		var cel = false;

		//cacheDOM - limit the use of $ - now it's used only once for module
		this.$el = $("#module");

		//once #module is found, we can search through its elements without using $ again
		this.$location = this.$el.find('#location');
		this.$currentWeather = this.$el.find('#currentWeather');
		this.$currentTemp = this.$el.find('#currentTemp');
		this.$icon = this.$el.find('#icon');
		this.$toggle - this.$el.find('#toggle');

		//bind events
		$toggle.on('click', toggle);


		locationCall();
		APICall();
		render();

		//processing user location for convenient use for actual API call
      	function locationCall() {
      		$.getJSON('https://ipinfo.io', function(data) {
          		this.loc = data.loc.split(",");
          	});
        },

		//defining APIcall method
		function APICall() {
  
      		var API_KEY: "b66507bb73d941dcbcc192051170507";

      		$.getJSON('https://api.apixu.com/v1/current.json?key=' + API_KEY + '&q=' + loc[0] + ',' + loc[1], function(apiData) {
            	this.WeatherData = apiData;
          		});
      	},	

		//defining render method
		function render(WeatherData,cel){

			//render defines certain data fetched by API and displays them in desired positions


			//API data definitions is inside of a render.data object
			var data = {
				currentLocation: WeatherData.location.name,
				currentLocation: WeatherData.location.name,
				currentTempF: switchUnit(WeatherData.current.temp_f, cel),
				icon: WeatherData.current.condition.icon,
				iconSrc: "https:" + icon,

			//end of the data.render object
			};
			
			//putting API data inside of previously cached elements
    		this.$location.html(currentLocation);
    		this.$currentWeather.html(currentWeather);
    		this.$currentTemp.html(currentTempF);
    		this.$icon.html('https:' + icon);
			this.$currentTemp.prepend('<img src="' + iconSrc + '" id="#icon">')

		},

		function toggle()  {
			this.cel = !cel;
	       	this.render(WeatherData, cel)
		}, 


	
	

// function switchUnit(currentTempF, c) {
//     if (c) {
//         var valueInC = (currentTempF - 32) * (5 / 9) + '&deg;' + 'C';
//         return valueInC;
//     }
//     return currentTempF + '&deg;' + 'F';
// }


	return {
		toggle: toggle

	}

//end of the self-executing function

})()