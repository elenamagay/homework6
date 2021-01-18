$(document).ready(function() {
    
    var citiesList = [];
    
    
   

    function citySearch() {
        var city = $(".searchCity").val();                
        var apikey = "d34b9d9c99ee62182a270bf19fc399e7";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey;
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            
            // Temperature convertation from Kelvin to Fahrengeit
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;

            // Current city weather information
            $(".cityName").text(response.name);
            $(".currentDate").text(moment().format("MM/DD/YYYY"));
            $("#weatherIcon").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
            $(".temp").text("Temperature: " + tempF.toFixed(2) + " F");
            $(".humidity").text("Humidity: " + response.main.humidity + " %");
            $(".wind").text("Wind Speed: " + response.wind.speed + " m/s");

            // UV Index
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var UVurl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apikey;

            $.ajax({
                url:UVurl,
                method: "GET"
            }).then(function(UVI) {
                $(".UVindex").text("UV Index: " + UVI.value);

                var UVnumber = parseInt(UVI.value);
                $(".UVindex").removeClass();

                if(UVnumber<=2) {
                    $(".UVindex").addClass("UVIlow")
                } else if (UVnumber>=3 && UVnumber <6) {
                    $(".UVindex").addClass("UVImoderate")
                } else if (UVnumber>=6 && UVnumber <8) {
                    $(".UVindex").addClass("UVIhigh")
                } else if (UVnumber>=8 && UVnumber <11) {
                    $(".UVindex").addClass("UVIveryhigh")
                } else {
                    $(".UVindex").addClass("UVIextreme")
                }

            });           
        });

        cityHistoryAdd(city);    
    };

    function forecastWeather() {
        
    }

    
    function cityHistoryAdd(c) {
        if (!(localStorage.getItem("city")) === null) {
            citiesList = JSON.parse(localStorage.getItem("city"))           
        };
        
        if (citiesList.indexOf(c)<0) {
            citiesList.push(c);
            localStorage.setItem("city", JSON.stringify(citiesList))
        };
        cityHistoryShow();
    };

    function cityHistoryShow() {
        $(".btnCity").remove();
        for (var i = 0; i < citiesList.length; i++) {
            var cityBtn = $("<button>").attr("value", citiesList[i]);
            cityBtn.addClass("btn btnCity");
            cityBtn.text(citiesList[i]);
            $("#history").append(cityBtn);
        };

        $(".btnCity").click(function() {
            $(".searchCity").val($(this).attr("value"));

            citySearch();
        });
    };

    if (!(localStorage.getItem("city")===null)) {
        citiesList = JSON.parse(localStorage.getItem("city"));
        cityHistoryShow();
    }

    
    $(".search-btn").click(function() {        
        citySearch();
    })

})