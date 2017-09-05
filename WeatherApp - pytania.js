(function() {

	//object defining all functions and variables, inside of a self-executing function
	var WeatherApp =  {
		
		//cel: false, - zmienna do switchUnit -> NVMD
		WeatherData: [],
		loc: [],
		init: function()	{

			this.cacheDOM();
			this.LocationCall();
			this.APICall();
			this.render();
		},

		//defining cacheDOM method - a method minimising the use of $search in the module
		cacheDOM:  function()	{

			//we use $ only once, for the whole module
			this.$el = $("#module");

			//once #module is found, we can search through its elements without using $ again
			this.$location = this.$el.find('#location');
			this.$currentWeather = this.$el.find('#currentWeather');
			this.$currentTemp = this.$el.find('#currentTemp');
			this.$icon = this.$el.find('#icon');
			this.$toggle - this.$el.find('#toggle');
		},

		//processing user location for convenient use for actual API call
      	LocationCall: function() {
      		$.getJSON('https://ipinfo.io', function(data) {
          		loc = data.loc.split(",");
          	});
        },

		//defining APIcall method
		APICall: function() {
  
      		var API_KEY: "b66507bb73d941dcbcc192051170507";

      		$.getJSON('https://api.apixu.com/v1/current.json?key=' + API_KEY + '&q=' + loc[0] + ',' + loc[1], function(apiData) {
            	WeatherData = apiData;
          		});
      	},	

		//defining render method
		render: function(WeatherData,cel){

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

		}

	

	//end of the WeatherApp obj
	};
	
	

// function switchUnit(currentTempF, c) {
//     if (c) {
//         var valueInC = (currentTempF - 32) * (5 / 9) + '&deg;' + 'C';
//         return valueInC;
//     }
//     return currentTempF + '&deg;' + 'F';
// }



// 	$('#toggle').click(function() {
//         cel = !cel;
//         render(wd, cel)
//         })
	

	//executing init function, defined inside of the WeatherApp obj
	WeatherApp.init();

//end of the self-executing function

})()