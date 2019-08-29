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
    $('#sortingButtons').html('<button type="button" class="btn btn-primary" id="returnHome" onclick="location.href=\'./index.html\';">Return Home</button>');
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
  var storedNames = JSON.parse(localStorage.getItem("names"));

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=T9x1MWUOUhdZlJPCkwFiuhWl4Rpcewza&q=" + searchTerm;
  
  $('#gifDisplay').html('');
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    var total;
    if (response.data.length < 10){
      total = response.data.length;
    }
    else {
      total = 10;
    }

    var rowTotal = 0;

    var $newRow = $('<div class="row">')
    for (var i = 0; i < total; i++){
      var $newCol = $('<div class="col-md-3 gifCard">');
      var $newImage = $('<div class="gifImageDiv"><img src="' + response.data[i].images.fixed_height_still.url + '" class="gifStill" data-gifAnimated="' + response.data[i].images.fixed_height.url + '"></div>');
      var $newDate = $('<div class="gifUploadDiv">Upload Date: ' + response.data[i].import_datetime + '</div>');
      var $newRating = $('<div class="gifRatingDiv"><center><img src="./assets/images/filmratings/' + response.data[i].rating + '.png"></div>')
      var $newButton = $('<button type="button" class="btn btn-outline-light favorite" id="' + response.data[i].id + '">Favorite</button>');
      $newCol.append($newImage);
      $newCol.append($newRating);
      $newCol.append($newButton);
      $newCol.append($newDate);
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
    var $endRow = $('<div id="row">');

    var $addingButton = $('<button type="button" class="btn btn-primary" id="addMoreGifs" data-searchTerm="' + searchTerm + '" data-iteration=1>Add 10 More Gifs</button>');
    $endRow.append($addingButton);

    $('#addingGifs').append($endRow);
  });
}

function addMoreGifs(searchTerm) {
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=T9x1MWUOUhdZlJPCkwFiuhWl4Rpcewza&q=" + searchTerm;
  
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    var total;
    if (response.data.length + 10 < 20){
      total = response.data.length;
    }
    else {
      total = 20;
    }

    var rowTotal = 0;

    var $newRow = $('<div class="row">')
    for (var i = 10; i < total; i++){
      var $newCol = $('<div class="col-md-3 gifCard">');
      var $newImage = $('<div class="gifImageDiv"><img src="' + response.data[i].images.fixed_height_still.url + '" class="gifStill" data-gifAnimated="' + response.data[i].images.fixed_height.url + '"></div>');
      var $newDate = $('<div class="gifUploadDiv">Upload Date: ' + response.data[i].import_datetime + '</div>');
      var $newRating = $('<div class="gifRatingDiv"><center><img src="./assets/images/filmratings/' + response.data[i].rating + '.png"></div>');
      var $newButton = $('<button type="button" class="btn btn-outline-light favorite" id="' + response.data[i].id + '">Favorite</button>');
      $newCol.append($newImage);
      $newCol.append($newRating);
      $newCol.append($newButton);
      $newCol.append($newDate);
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

    $('#addingGifs').html('');
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

// On click function to create 10 more gifs
$("body").on("click", "button#addMoreGifs.btn.btn-primary", function () {
  var searchTerm = $(this).attr('data-searchterm');
  var iteration = $(this).attr('data-iteration');
  addMoreGifs(searchTerm, iteration);
});

$("body").on("click", "button.btn.btn-outline-light.favorite", function() {
  var identifier = $(this).attr('id');
  addFavorite(identifier);
})

// On click function for creating GIFs from buttons
$("body").on("click", "button#prepareSpell.btn.btn-primary", function() {
  var newSpell = $('#spellInput').val();

  $('#spellInput').val('');
  createButton(newSpell);
});

function addFavorite(id){

  var storedNames = JSON.parse(localStorage.getItem("favoriteGifs"));

  if (storedNames === null) {
    storedNames = [];
  }
  storedNames.push(id);

  localStorage.setItem("favoriteGifs", JSON.stringify(storedNames));
  alert("Favorite Saved!");
  console.log(id);
}




// date added: use moment.js

// Adding gifs to favorite section
// button on top -> my favorites
// button on each gif -> add to favorites

// On clicking the add to favorites button:
// The current names are unpacked
// The name which was clicked is added to the collection
// The collection is reserialized

// local storage: the array
// capture the gif id as a variable on the button
// load that value into a function
// rinse and repeat

///////////////////////////////////////////

// Diplay favorites page
// De-serialize local storage
// iterate through the loop
// create a card for each gif id


// function sortingHat(){
//   var queryURL = 'https://www.potterapi.com/v1/sortingHat/?key=$2a$10$keI8PT9iiqnbBl/NUjDhZeDd9X1cVemSK.K5eOE7ZH0maFQH9dQ1K';

//   $.ajax({
//     url: queryURL,
//     method: 'GET'
//   }).then(function(response){
//     displayHouse(response);
//   });
// }





// var names = [];
// names[0] = prompt("New member name?");
// localStorage.setItem("names", JSON.stringify(names));

// //...
// var storedNames = JSON.parse(localStorage.getItem("names"));
// using local storage