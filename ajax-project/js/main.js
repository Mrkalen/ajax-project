// taco API

var tacoApi = new XMLHttpRequest();
tacoApi.open('GET', 'http://taco-randomizer.herokuapp.com/random/');
tacoApi.responseType = 'json';
tacoApi.addEventListener('load', function () {
});
tacoApi.send();

// beer API

var recipeApi = new XMLHttpRequest();
recipeApi.open('GET', 'https://api.punkapi.com/v2/beers/random');
recipeApi.addEventListener('load', function () {
});
recipeApi.send();

// Recipe cycler

var $recipeWindow = document.querySelector('.recipe-window');

document.addEventListener('click', function () {
  if (event.target.getAttribute('id') === 'cycle-recipe') {
    console.log('tacoAPI:', tacoApi.response);
  }
});
