// Javscript, CSS put it on monster
// Reference -> Ask Tim for reference

// Github, LinkedIn (Friend Tim), Monster

// Read Evaluate Print Loop

// Sorting hat function

// Potential waiting meme?
// https://media.giphy.com/media/gMisXTaOeVw6Q/giphy.gif

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
  }).then(function(respsonse) {
    $('#exampleDiv').append("Success");
  });
}

function createButton(value) {
  var $newButton = $('<button class="gifButton">');
  $newButton.attr('id', value);

  $newButton.text(value);

  $('#buttonSection').append($newButton);
}
// Create Button for search term



