// Global variables
var spinner;
var target;
var opts;

$(document).ready(function() {

  // Configure spin.js
  opts = {
    lines: 8, // The number of lines to draw
    length: 1, // The length of each line
    width: 8, // The line thickness
    radius: 16, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#FFC107', // #rgb or #rrggbb or array of colors
    speed: 1, // Rounds per second
    trail: 25, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: true, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '50%', // Top position relative to parent
    left: '50%' // Left position relative to parent
  };
  target = document.getElementsByTagName("body")[0];
  spinner = new Spinner(opts);

  $("#artist-input").focus();

});

function research(artist) {
  $("#artist-input").val(artist).trigger("enterKey");
}

function reset() {
  $(".artist").remove();
  spinner.stop();
  $("#artist-input").val("").focus();
}

$("#artist-input").bind("enterKey", function() {

  // Focus
  $(this).blur();

  // spin.js
  spinner.stop();
  spinner.spin(target);

  // Hide error
  $(".error-message").hide();

  // Remove existing results
  $(".artist").remove();

  // Variables
  var rq = this.value.trim();
  var q = encodeURIComponent(rq);

  // Spotify 
  // Get artist ID
  $.ajax({
    type: "GET",
    url: "https://api.spotify.com/v1/search?q=" + q + "&type=artist&limit=5",
    dataType: "json",
    success: function(data) {

      var id = null;

      // If valid ID
      if (data.artists.items[0]) {
        // Selecting right ID
        for (var x = 0; x < data.artists.items.length; x++) {
          if (data.artists.items[x].name.toUpperCase() === rq.toUpperCase()) {
            id = data.artists.items[x].id;
          }
        }
      }

      // If valid ID
      if (id !== null) {

        // Get related
        $.ajax({
          type: "GET",
          url: "https://api.spotify.com/v1/artists/" + id + "/related-artists",
          dataType: "json",
          success: function(data) {

            var artists = data.artists;

            // Insert artists
            if (artists.length > 0) {

              for (var i = 0; i < artists.length; i++) {

                var img = "";

                try {
                  img = artists[i].images[0].url;
                } catch(err) {
                  img = "img/error.png";
                }

                $(".content").append("<div class=\"artist\">" + 
                  "<img src=\"" + img + "\">" + 
                  "<div class=\"layover\">" + 
                  "<h2>" + artists[i].name + "</h2>" + 
                  "<a href=\"javascript:void(0)\" onClick=\"research(\'" + artists[i].name + "\');\">" + 
                  "<img src=\"img/outlets/research.png\" alt=\"New search\" class=\"tooltip\" title=\"New search\"></a>" + 
                  "<a href=\"https://www.youtube.com/results?search_query=" + encodeURIComponent(artists[i].name) + "\" alt=\"YouTube\" target=\"_blank\">" + 
                  "<img src=\"img/outlets/youtube.png\" alt=\"YouTube\" class=\"tooltip\" title=\"YouTube\"></a>" + 
                  "<a href=\"http://en.wikipedia.org/wiki/" + encodeURIComponent(artists[i].name) + "\" alt=\"Wikipedia\" target=\"_blank\">" + 
                  "<img src=\"img/outlets/wikipedia.png\" alt=\"Wikipedia\" class=\"tooltip\" title=\"Wikipedia\"></a><br>" + 
                  "<a href=\"spotify:search:" + encodeURIComponent(artists[i].name) + "\" alt=\"Spotify\" target=\"_blank\">" + 
                  "<img src=\"img/outlets/spotify.png\" alt=\"Spotify\" class=\"tooltip\" title=\"Spotify\"></a>" + 
                  "<a href=\"http://www.rdio.com/artist/" + encodeURIComponent(artists[i].name) + "\" alt=\"Rdio\" target=\"_blank\">" + 
                  "<img src=\"img/outlets/rdio.png\" alt=\"Rdio\" class=\"tooltip\" title=\"Rdio\"></a>" + 
                  "<a href=\"http://grooveshark.com/#!/" + artists[i].name.split(" ").join("_") + "\" alt=\"Grooveshark\" target=\"_blank\">" + 
                  "<img src=\"img/outlets/grooveshark.png\" alt=\"Grooveshark\" class=\"tooltip\" title=\"Grooveshark\"></a>" + 
                  "</div>" + 
                  "</div>");

              }

              // Set div height to be same as width
              var width = $(".artist").width();
              $(".artist").css("height", width + "px");

              // Image formatting
              $(".artist img").each(function() {
                $(this).load(function() {
                  if ($(this).width() >= $(this).height()) {
                    $(this).addClass("landscape");
                  } else {
                    $(this).addClass("portrait");
                  }
                  $(this).fadeIn();
                });
              });

              // Setup hovers
              $(".artist").hover(function() {
                $(".layover", this).fadeToggle("fast");
              });

              $('.tooltip').tooltipster({
                position: "bottom",
                onlyOne: true,
                speed: 200,
                delay: 0
              });

            } else {
              $(".error-message").html("<h3>Error: No related artists were found.</h3>");
              $(".error-message").show();
            }

            // Remove spin.js
            spinner.stop();

          }
        });

      } else {
        spinner.stop();
        $(".error-message").html("<h3>Error: The artist that you entered was not found.</h3>");
        $(".error-message").show();
      }

    },
    error: function() {
      spinner.stop();
      $(".error-message").html("<h3>Error: You have entered an invalid artist.</h3>");
      $(".error-message").show();
    }
  });

});

$("#artist-input").keyup(function(e) {
  if(e.keyCode === 13)
  {
    $(this).trigger("enterKey");
  }
});
