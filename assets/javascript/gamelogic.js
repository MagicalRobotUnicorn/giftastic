// Sorting Hat Functions

// Houses for sorting hat function (location on giphy)
var houses = {
  "Hufflepuff": 'PMp40oEvNfKve',
  "Slytherin": 'A1xhQcogWZAIg',
  "Gryffindor": 'Jd4sezus42AjC',
  "Ravenclaw": '69xNNUtTkQK9q'
}

// Ajax call to Harry Potter API for finding the House
function sortingHat(){
  var queryURL = 'https://www.potterapi.com/v1/sortingHat/?key=$2a$10$keI8PT9iiqnbBl/NUjDhZeDd9X1cVemSK.K5eOE7ZH0maFQH9dQ1K';

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response){
    displayHouse(response);
  });
}

// Function to change the cardback image to the corresponding house through the giphy api
function displayHouse(response) {
  var queryURL = 'https://api.giphy.com/v1/gifs/' + houses[response] + '?api_key=T9x1MWUOUhdZlJPCkwFiuhWl4Rpcewza';

  $.ajax({
    url: queryURL,
    method: "GET"
  }). then(function(response) {
    $('#houseImage').attr('src', response.data.images.original.url);
    flipCard();
  });
}

// Flip sorting hat function
function flipCard() {
  var userCard = document.getElementById('houseReveal');
  userCard.classList.remove('flip-card-inner');
  setTimeout(userCard.classList.add('flip-card-inner'), 2000);
}

// On Click function for sorting hat
$('#clicktoSort').on("click", function() {
  sortingHat();
});


// GIF Magic Functions

// Function to find the relavant gifs on giphy
function findGifs(searchTerm) {
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=T9x1MWUOUhdZlJPCkwFiuhWl4Rpcewza&q=" + searchTerm;
  
  $('#gifDisplay').html('');
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

    var rowTotal = 0;

    var $newRow = $('<div class="row">')
    for (var i = 0; i < total; i++){
      var $newCol = $('<div class="col-md-3 gifCard">');
      var $newImage = $('<div class="gifImageDiv"><img src="' + response.data[i].images.fixed_height_still.url + '" class="gifStill" data-gifAnimated="' + response.data[i].images.fixed_height.url + '"></div>');
      var $newRating = $('<div class="gifRatingDiv"><center><img src="./assets/images/filmratings/' + response.data[i].rating + '.png"></div>')
      $newCol.append($newImage);
      $newCol.append($newRating);
      $newRow.append($newCol);
      rowTotal++;

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

// Create buttons from a search term
function createButton(value) {

  var $newButtonDiv = $('<div class="col-md-2 spellButtonDivs">');
  var $newButton = $('<button type="button" class="btn btn-warning gifButton">');
  $newButton.attr('id', value);

  $newButton.text(value);

  $newButtonDiv.append($newButton);
  $('#preparedSpells').append($newButtonDiv);
}

// Create the initial buttons
function initialButtons() {
  var autoButtons = ['magical', 'robot', 'unicorn', 'javascript', 'python', 'Node Js', 'Linux', 'Oregon'];

  for (var i =0; i < autoButtons.length; i++){
    createButton(autoButtons[i]);
  }
}

// Initialization function
$(document).ready(function() {
  initialButtons();
});

// Onclick function for animating gifs
$('body').on('click', 'img.gifStill', function() {
  var temp = $(this).attr('data-gifAnimated');
  $(this).attr('data-gifAnimated', $(this).attr('src'));
  $(this).attr('src', temp);
})

// On click function to create gifs from each button
$("body").on("click", "button.btn.btn-warning.gifButton", function () {
  var searchTerm = $(this).attr('id');
  findGifs(searchTerm);
});

// On click function for creating GIFs from buttons
$("body").on("click", "button#prepareSpell.btn.btn-primary", function() {
  var newSpell = $('#spellInput').val();

  $('#spellInput').val('');
  createButton(newSpell);
});