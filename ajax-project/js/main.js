// taco API
var recipe = {};
function getTacoRecipe() {
  var tacoApi = new XMLHttpRequest();
  tacoApi.open('GET', 'http://taco-randomizer.herokuapp.com/random/');
  tacoApi.responseType = 'json';
  tacoApi.addEventListener('load', function () {
    recipeRender(tacoApi.response);
    recipe = tacoApi.response;
  });
  tacoApi.send();
}
// var tacoApi = new XMLHttpRequest();
// tacoApi.open('GET', 'http://taco-randomizer.herokuapp.com/random/');
// tacoApi.responseType = 'json';
// tacoApi.addEventListener('load', function () {
//   var tacoData = tacoApi.response;
//   var tacoName = tacoData.base_layer.name + ' with ' + tacoData.mixin.name + ' and a ' + tacoData.condiment.name + ' in ' + tacoData.shell.name + '.';

// });
// tacoApi.send();

// beer API

// function getBeerData() {
//   var beerApi = new XMLHttpRequest();
//   beerApi.open('GET', 'https://api.punkapi.com/v2/beers/random');
//   beerApi.responseType = 'json';
//   beerApi.addEventListener('load', function () {
//     beerRender(beerApi.response);
//   });
//   beerApi.send();
// }

// var beerApi = new XMLHttpRequest();
// beerApi.open('GET', 'https://api.punkapi.com/v2/beers/random');
// beerApi.responseType = 'json';
// beerApi.addEventListener('load', function () {
// });
// beerApi.send();

// Recipe cycler

var $recipe = document.querySelector('.window');

document.addEventListener('click', function () {
  // debugger;

  if (event.target.getAttribute('id') === 'cycle-recipe') {
    getTacoRecipe();
    // getBeerData();
  }
  if (event.target.getAttribute('id') === 'save-recipe') {
    saveTaco();
  }
});

function recipeRender(recipe) {
  while ($recipe.firstChild) {
    $recipe.removeChild($recipe.firstChild);
  }
  var baseName = recipe.base_layer.name;
  var mixinName = recipe.mixin.name;
  var condimentName = recipe.condiment.name;
  var shellName = recipe.shell.name;
  var tacoName = baseName + ' with ' + mixinName + ' and a ' + condimentName + ' in ' + shellName + '.';

  var recipeName = document.createElement('h2');
  recipeName.setAttribute('class', 'recipe-header');
  recipeName.textContent = tacoName;
  $recipe.appendChild(recipeName);

  var baseDiv = document.createElement('div');
  baseDiv.setAttribute('class', 'recipe');
  $recipe.appendChild(baseDiv);

  var baseTitle = document.createElement('h3');
  baseTitle.setAttribute('class', 'title');
  baseTitle.textContent = baseName + ' directions:';
  baseDiv.appendChild(baseTitle);

  var baseRecipe = document.createElement('p');
  baseRecipe.setAttribute('class', 'directions');
  baseRecipe.textContent = recipe.base_layer.recipe;
  baseDiv.appendChild(baseRecipe);

  var mixinDiv = document.createElement('div');
  mixinDiv.setAttribute('class', 'recipe');
  $recipe.appendChild(mixinDiv);

  var mixinTitle = document.createElement('h3');
  mixinTitle.setAttribute('class', 'title');
  mixinTitle.textContent = mixinName + ' directions:';
  mixinDiv.appendChild(mixinTitle);

  var mixinRecipe = document.createElement('p');
  mixinRecipe.setAttribute('class', 'directions');
  mixinRecipe.textContent = recipe.mixin.recipe;
  mixinDiv.appendChild(mixinRecipe);

  var condimentDiv = document.createElement('div');
  condimentDiv.setAttribute('class', 'recipe');
  $recipe.appendChild(condimentDiv);

  var condimentTitle = document.createElement('h3');
  condimentTitle.setAttribute('class', 'title');
  condimentTitle.textContent = condimentName + ' directions:';
  condimentDiv.appendChild(condimentTitle);

  var condimentRecipe = document.createElement('p');
  condimentRecipe.setAttribute('class', 'directions');
  condimentRecipe.textContent = recipe.condiment.recipe;
  condimentDiv.appendChild(condimentRecipe);

  var shellDiv = document.createElement('div');
  shellDiv.setAttribute('class', 'recipe');
  $recipe.appendChild(shellDiv);

  var shellTitle = document.createElement('h3');
  shellTitle.setAttribute('class', 'title');
  shellTitle.textContent = shellName + ' directions:';
  shellDiv.appendChild(shellTitle);

  var shellRecipe = document.createElement('p');
  shellRecipe.setAttribute('class', 'directions');
  shellRecipe.textContent = recipe.shell.recipe;
  shellDiv.appendChild(shellRecipe);

  return recipeName;
}

// save taco data
function saveTaco() {
  var tacoName = recipe.base_layer.name;
  var tacoData = recipe;
  data.savedRecipes.push({ name: tacoName, data: tacoData });
}

// function beerRender(beer) {
//   console.log(beer);
//   var beerName = beer.name;
// }
