$(document).ready(function() {

    

    function citySearch() {
        var city = $(".search").val();

        if(city === "") {
            alert("Please enter a city name!")
        } else {
            var apikey = "d34b9d9c99ee62182a270bf19fc399e7";
            var URL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey;
            
            $.ajax ({
                url: URL,
                method: "GET"
            }).then(function(response) {
                var tempF = (response.main.temp - 273.15) * 1.80 + 32;
                $(".currentDate").text(moment());
                $(".cityName").text(response.name);
                $(".temp").text("Temperature: " + tempF.toFixed(2));
                $(".humidity").text("Humidity: " + response.main.humidity);
                $(".wind").text("Wind Speed: " + response.wind.speed);
                // $(".UVindex").text("UV Index: ";
               
            })
        }
    }
    
})