// taco API

var tacoApi = new XMLHttpRequest();
tacoApi.open('GET', 'http://taco-randomizer.herokuapp.com/random/');
tacoApi.responseType = 'json';
tacoApi.addEventListener('load', function () {
  console.log('taco api status:', tacoApi.status);
  console.log('random taco response:', tacoApi.response);
});
tacoApi.send();

// beer API

var recipeApi = new XMLHttpRequest();
recipeApi.open('GET', 'https://api.punkapi.com/v2/beers/random');
recipeApi.addEventListener('load', function () {
  console.log('beer status:', recipeApi.status);
  console.log('beer response:', recipeApi.response);
});
recipeApi.send();

//

var banana = 'banana';
