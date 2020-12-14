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
        })


    $(".hidden").css("display", "inline-block");
})
