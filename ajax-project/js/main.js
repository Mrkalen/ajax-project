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

//
