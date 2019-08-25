// Javscript, CSS put it on monster
// Reference -> Ask Tim for reference

// Github, LinkedIn (Friend Tim), Monster

// Read Evaluate Print Loop

// Sorting hat function

// Potential waiting meme?
// https://media.giphy.com/media/gMisXTaOeVw6Q/giphy.gif

// Spiral Card Back
// https://media.giphy.com/media/hoQKg8xPg35Sg/giphy.gif

var houses = {
  "Hufflepuff": 'PMp40oEvNfKve',
  "Slytherin": 'A1xhQcogWZAIg',
  "Gryffindor": 'Jd4sezus42AjC',
  "Ravenclaw": '69xNNUtTkQK9q'
}

function sortingHat(){
  var queryURL = 'https://www.potterapi.com/v1/sortingHat/?key=$2a$10$keI8PT9iiqnbBl/NUjDhZeDd9X1cVemSK.K5eOE7ZH0maFQH9dQ1K';

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response){
    displayHouse(response);
  });
}

function displayHouse(response) {
  var queryURL = 'https://api.giphy.com/v1/gifs/' + houses[response] + '?api_key=T9x1MWUOUhdZlJPCkwFiuhWl4Rpcewza';

  $.ajax({
    url: queryURL,
    method: "GET"
  }). then(function(response) {
    $('#houseGif').append(('<div id="resultGifDiv"><img src="' + response.data.images.original.url  + '" id="resultGif"></div>'));
  });
}

// 'Magic Wand' function
// API Call: api.giphy.com/v1/gifs/search?api_key=T9x1MWUOUhdZlJPCkwFiuhWl4Rpcewza&q=hamburgers

function findGifs(searchTerm) {
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=T9x1MWUOUhdZlJPCkwFiuhWl4Rpcewza&q=" + searchTerm;
  
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    var total;
    if (response.length < 10){
      total = response.length;
    }
    else {
      total = 10;
    }

    console.log('Total: ' + total);
    var rowTotal = 0;

    var $newRow = $('<div class="row">')
    for (var i = 0; i < total; i++){
      var $newCol = $('<div class="col-md-3 gifCards">');
      var $newImage = $('<img src="' + response.data[i].images.fixed_height_still.url + '" class="gifStill data-gifAnimated="' + response.data[i].images.fixed_height + '">');
      var $newRating = $('<p >' + response.data[i].rating + '<p>')
      $newCol.append($newImage);
      $newCol.append($newRating);
      $newRow.append($newCol);
      rowTotal++;

      console.log(rowTotal);
      if (rowTotal > 2) {
        $('#gifDisplay').append($newRow);
        $newRow = $('<div class="row">')
        rowTotal = 0;
      }

      if (i === (total -1)){
        $(gifDisplay).append($newRow);
      }
    }
  });
}

function createButton(value) {
  var $newButton = $('<button class="gifButton">');
  $newButton.attr('id', value);

  $newButton.text(value);

  $('#buttonSection').append($newButton);
}

$('.gifStill').on('click', function() {

});

$('.gifButton').on('click', function(){
  var searchTerm = $(this).attr('id');

  findGifs(searchTerm);
})


