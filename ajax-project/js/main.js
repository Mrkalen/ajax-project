// taco API

var tacoApi = new XMLHttpRequest();
tacoApi.open('GET', 'http://taco-randomizer.herokuapp.com/random/');
tacoApi.responseType = 'json';
tacoApi.addEventListener('load', function () {
});
tacoApi.send();

// beer API

var beerApi = new XMLHttpRequest();
beerApi.open('GET', 'https://api.punkapi.com/v2/beers/random');
beerApi.addEventListener('load', function () {
});
beerApi.send();

// Recipe cycler

var $recipeWindow = document.querySelector('.recipe-window');
var $recipe = document.querySelector('.window');

document.addEventListener('click', function () {
  event.preventDefault();
  debugger;
  function recipeRender(recipe) {
    var recipeName = document.createElement('h2');
    recipeName.setAttribute('class', 'title');
    recipeName.textContent = tacoName;
    $recipe.appendChild(recipeName);

    return recipeName;
  }
  var tacoData = tacoApi.response;
  var tacoName = tacoData.base_layer.name + ' with ' + tacoData.mixin.name + ' and a ' + tacoData.condiment.name + ' in ' + tacoData.shell.name + '.';

  if (event.target.getAttribute('id') === 'cycle-recipe') {
    recipeRender(tacoData);
    console.log('tacoAPI:', tacoApi.response);
    console.log('taco name:', tacoName);
  }
});
