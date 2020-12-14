$("#search").on("click", function() {
    event.preventDefault();
    console.log("clicked");
    console.log($("#input-value").val());

    $(".hidden").css("display", "inline-block");
})