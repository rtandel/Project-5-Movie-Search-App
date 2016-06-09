// Makes sure the page loads before running the code.
$(document).ready(function() {
  // Dynamically changes movie list while the user types.
  $("#search").keyup(function() {
    var title = $(this).val();                  // The input from the user
    var omdbAPI = "http://www.omdbapi.com/?";   // The omdbAPI.
    var omdbOptions = {                         // The omdb options.
      s: title,
      r: "json"
    };
    // Displays the movies that were found.
    function displayMovies(data) {
      var movieList = $("#movies");        // The movie list
      var movieHTML = '';                  // Compiles the list items.
      console.log(data.Response);
      console.log(data);
      // Goes through each item in the list and adds the appropriate
      $.each( data.Search, function(i, movie) {
        // If the poster doesn't exist or can't be found.
        if (movie.Poster === "N/A") {
          movieHTML += '<li><div class="poster-wrap"><i class="material-icons poster-placeholder">crop_original</i></div><span class="movie-title">'+movie.Title+'</span><span class="movie-year">'+movie.Year +'</span></li>';
        } else {
          movieHTML += '<li><div class="poster-wrap"><img class="movie-poster" src="'+movie.Poster+'"></div><span class="movie-title">'+movie.Title+'</span><span class="movie-year">'+movie.Year +'</span></li>';
        }
      });
      // If no movies were found.
      if (data.Response === 'False') {
        movieHTML = '<li class="no-movies"><i class="material-icons icon-help">help_outline</i>No movies found that match: '+title+'.</li>';
      }
      movieList.html(movieHTML);
    }
    // Gets the JSON.
    $.getJSON(omdbAPI, omdbOptions, displayMovies);
  });
  // Makes the submit button perform the same actions as above.
  $("#submit").click(function(evt) {
    evt.preventDefault();
    $("#search").trigger("keyup");
  });
});
