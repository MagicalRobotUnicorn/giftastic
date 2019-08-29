// Display favorites to page from localStorage
function displayFavorites() {
  $('#gifDisplay').html('');

  var storedNames = JSON.parse(localStorage.getItem("favoriteGifs"));


  var rowTotal = 0;

  var $newRow = $('<div class="row">')
  for (var i = 0; i < storedNames.length; i++) {

    var queryURL = 'https://api.giphy.com/v1/gifs/' + storedNames[i] + '?api_key=T9x1MWUOUhdZlJPCkwFiuhWl4Rpcewza';
    rowTotal++;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var $newCol = $('<div class="col-md-3 gifCard">');
      var $newImage = $('<div class="gifImageDiv"><img src="' + response.data.images.fixed_height_still.url + '" class="gifStill" data-gifAnimated="' + response.data.images.fixed_height.url + '"></div>');
      var $newDate = $('<div class="gifUploadDiv">Upload Date: ' + response.data.import_datetime + '</div>');
      var $newRating = $('<div class="gifRatingDiv"><center><img src="./assets/images/filmratings/' + response.data.rating + '.png"></div>')
      var $newButton = $('<button type="button" class="btn btn-outline-light unfavorite" id="' + response.data.id + '">Remove from Favorites</button>');
      $newCol.append($newImage);
      $newCol.append($newRating);
      $newCol.append($newButton);
      $newCol.append($newDate);
      $newRow.append($newCol);
    });

    if (rowTotal > 2) {
      $('#gifDisplay').append($newRow);
      $newRow = $('<div class="row">')
      rowTotal = 0;
    }

    if (i === (storedNames.length - 1)) {
      $(gifDisplay).append($newRow);
    }
  }
}

// Function to remove from list of favorites
function removeFavorite(id) {

  var storedNames = JSON.parse(localStorage.getItem("favoriteGifs"));

  var totalItems = storedNames.length;

  for (var i = 0; i < totalItems; i++) {
    if (storedNames[i] === id) {
      for (var j = i; j < totalItems; j++) {
        storedNames[j] = storedNames[j + 1];
      }
      totalItems -= 1;
    }
  }

  var newArray = [];

  for (var i = 0; i < totalItems; i++) {
    newArray.push(storedNames[i]);
  }

  localStorage.setItem("favoriteGifs", JSON.stringify(newArray));
  alert("Favorite Removed!");
  displayFavorites();
}

// Onclick function for animating gifs
$('body').on('click', 'img.gifStill', function () {
  var temp = $(this).attr('data-gifAnimated');
  $(this).attr('data-gifAnimated', $(this).attr('src'));
  $(this).attr('src', temp);
})

// Onclick function for removing favorite Gifs
$("body").on("click", "button.btn.btn-outline-light.unfavorite", function () {
  var identifier = $(this).attr('id');
  removeFavorite(identifier);
})

// Document on load function
$(document).ready(function () {
  displayFavorites();
});