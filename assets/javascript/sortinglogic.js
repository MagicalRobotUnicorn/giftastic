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
