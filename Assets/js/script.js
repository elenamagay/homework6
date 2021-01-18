$(document).ready(function() {
    
    var citiesList = [];
    var apikey = "d34b9d9c99ee62182a270bf19fc399e7";
    
    function tempF(kelvin) {
        var F = Math.floor((kelvin - 273.15) * 1.80 + 32)
       return F;
    }

    function citySearch() {
        var city = $(".searchCity").val();                
        
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey;
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            
            // Current city weather information
            $(".cityName").text(response.name);
            $(".currentDate").text(moment().format("MM/DD/YYYY"));
            $("#weatherIcon").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
            $(".temp").text("Temperature: " + tempF(response.main.temp) + " F");
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
        forecast(city);
        cityHistoryAdd(city);    
    };
    
    function forecast(cityFor) {       
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityFor + "&appid=" + apikey;
        
        $.ajax({
            url:queryURL,
            method: "GET"
        }).then(forecastWeather)        
    }

    function forecastWeather(info) {
        // Day 1 forecast
        var day1date = $(".fDate1");
        var day1icon = $(".fIcon1");
        var day1temp = $(".fTemp1");
        var day1humid = $(".fHumidity1"); 
        var iconCode = info.list[4].weather[0].icon;     

        day1date.text(moment().add(1, "day").format("MM/DD/YYYY"));
        day1icon.attr("src", "https://openweathermap.org/img/w/" + iconCode + ".png")
        day1temp.text("Temp: " + tempF(info.list[4].main.temp) + " F");
        day1humid.text("Humidity: " + info.list[4].main.humidity + "%");

        // Day 2 forecast
        var day2date = $(".fDate2");
        var day2icon = $(".fIcon2");
        var day2temp = $(".fTemp2");
        var day2humid = $(".fHumidity2"); 
        var iconCode = info.list[12].weather[0].icon;     
                
        day2date.text(moment().add(2, "day").format("MM/DD/YYYY"));
        day2icon.attr("src", "https://openweathermap.org/img/w/" + iconCode + ".png")
        day2temp.text("Temp: " + tempF(info.list[12].main.temp) + " F");
        day2humid.text("Humidity: " + info.list[12].main.humidity + "%");

        // Day 3 forecast
        var day3date = $(".fDate3");
        var day3icon = $(".fIcon3");
        var day3temp = $(".fTemp3");
        var day3humid = $(".fHumidity3"); 
        var iconCode = info.list[20].weather[0].icon;     
                
        day3date.text(moment().add(3, "day").format("MM/DD/YYYY"));
        day3icon.attr("src", "https://openweathermap.org/img/w/" + iconCode + ".png")
        day3temp.text("Temp: " + tempF(info.list[20].main.temp) + " F");
        day3humid.text("Humidity: " + info.list[20].main.humidity + "%");

        // Day 4 forecast
        var day4date = $(".fDate4");
        var day4icon = $(".fIcon4");
        var day4temp = $(".fTemp4");
        var day4humid = $(".fHumidity4"); 
        var iconCode = info.list[28].weather[0].icon;     
                
        day4date.text(moment().add(4, "day").format("MM/DD/YYYY"));
        day4icon.attr("src", "https://openweathermap.org/img/w/" + iconCode + ".png")
        day4temp.text("Temp: " + tempF(info.list[28].main.temp) + " F");
        day4humid.text("Humidity: " + info.list[28].main.humidity + "%");

        // Day 5 forecast
        var day5date = $(".fDate5");
        var day5icon = $(".fIcon5");
        var day5temp = $(".fTemp5");
        var day5humid = $(".fHumidity5"); 
        var iconCode = info.list[36].weather[0].icon;     
                
        day5date.text(moment().add(5, "day").format("MM/DD/YYYY"));
        day5icon.attr("src", "https://openweathermap.org/img/w/" + iconCode + ".png")
        day5temp.text("Temp: " + tempF(info.list[36].main.temp) + " F");
        day5humid.text("Humidity: " + info.list[36].main.humidity + "%");
                 
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