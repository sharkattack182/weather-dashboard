var currentDay = moment().format('dddd ll');

console.log(currentDay)

$("#search").on("click", function () {
    // prevents the page from restarting
    event.preventDefault();

    console.log("clicked");

    // settin search query to the input value
    var searchQuery = $("#input-value").val().trim();
    console.log(searchQuery);

    // setting up variables for ajax call
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + searchQuery + "&appid=" + APIKey;

        console.log(queryURL);

    // Ajax call 
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            console.log(response)


            // filling in apropriate info
            $(".city").text(response.name + "'s");

            // weather icon
            var iconKey = response.weather[0].icon;
            var iconUrl = "https://openweathermap.org/img/w/" + iconKey + ".png";
            console.log(iconUrl)
            $("#condition-icon").attr("src", iconUrl);
            $(".icon").text(response.weather[0].description);

            // temp conversion
            var k = response.main.temp;
            var f = (k - 273.15) * 9/5 + 32;


            $(".temp").text("Temp: " + Math.round(f) + " F");
            $(".humidity").text("Humidity: " + response.main.humidity + "%");
            $(".windspeed").text("Windspeed: " + response.wind.speed + " mph");
        })

    // 5 day forecast ajax call
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + searchQuery + "&cnt=5&appid=" + APIKey;
    console.log(fiveDayURL);
    $.ajax({
        url: fiveDayURL,
        method: "GET"
    }) .then(function(res) {
        console.log(res.list);
        var array = res.list;

        // for loop iterates over the array of days
        for (var i = 0; i < array.length; i++) {
            var day = array[i];

            // setting date
            var increment = i + 1;
            var date = moment().add(increment,'days');
            var d = moment(date).format("dddd")
            var newDate = $("<h5>");
            newDate.text(d);
            $("." + i).append(newDate);

            // setting icon 
            var newIcon = $("<img>");
            var icon = day.weather[0].icon;
            var url = "https://openweathermap.org/img/w/" + icon + ".png";
            newIcon.attr("src", url);
            $("." + i).append(newIcon);

            // setting the temp
            var newTemp = $("<h5>");
            var kel = day.temp.day;
            var far = (kel - 273.15) * 9/5 + 32;
            newTemp.text("Temp: " + Math.round(far) + " F");
            $("." + i).append(newTemp);

            // setting the humidity
            var newHum = $("<h5>");
            newHum.text("Humidity: " + day.humidity + "%");
            $("." + i).append(newHum);

            // setting the windspeed
            var newWS = $("<h5>");
            newWS.text(Math.round(day.speed) + "mph");
            $("." + i).append(newWS);
        }
    })

    // sets date and displays the div
    $(".forecast").text(currentDay);
    $(".hidden").css("display", "inline-block");
})
