var isLoading = false;
// taco API

var recipe = {};
function getTacoRecipe() {
  var tacoApi = new XMLHttpRequest();
  tacoApi.open('GET', 'http://taco-randomizer.herokuapp.com/random/');
  tacoApi.responseType = 'json';
  tacoApi.addEventListener('load', function () {
    recipeRender(tacoApi.response);
    comboRecipeRender(tacoApi.response);
    recipe = tacoApi.response;
    isLoading = false;
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

var beer = {};
function getBeerData() {
  var beerApi = new XMLHttpRequest();
  beerApi.open('GET', 'https://api.punkapi.com/v2/beers/random');
  beerApi.responseType = 'json';
  beerApi.addEventListener('load', function () {
    beerRender(beerApi.response);
    comboBeerRender(beerApi.response);
    beer = beerApi.response;
    isLoading = false;
  });
  beerApi.send();
}

// var beerApi = new XMLHttpRequest();
// beerApi.open('GET', 'https://api.punkapi.com/v2/beers/random');
// beerApi.responseType = 'json';
// beerApi.addEventListener('load', function () {
// });
// beerApi.send();

// Recipe cycler

var $recipeWindow = document.querySelector('.recipe-window');
var $comboWindow = document.querySelector('.taco-and-beer-window');

window.addEventListener('load', function () {
  if ($recipeWindow.getAttribute('class') !== 'recipe-window hidden') {
    getTacoRecipe();
  }
  if ($beerWindow.getAttribute('class') !== 'beer-window hidden') {
    getBeerData();
  }
  if ($comboWindow.getAttribute('class') !== 'taco-and-beer-window hidden') { getTacoRecipe(); }
  getBeerData();
});

var $windowHeader = document.querySelector('.taco-and-beer-window');

$windowHeader.addEventListener('click', function () {
  var id = event.target.id;
  console.log(event.target);
  if (id === 'cycle-recipe' || id === 'cycle-combo-recipe') {
    isLoading = true;
    getTacoRecipe();
  } else if (id === 'save-recipe' || id === 'save-combo-recipe') {
    if (isLoading) return;
    saveTaco();
    storeData();
  } else if (id === 'cycle-beer' || id === 'cycle-combo-beer') {
    isLoading = true;
    getBeerData();
  } else if (id === 'save-beer' || id === 'save-combo-beer') {
    if (isLoading) return;
    saveBeer();
    storeData();
  }

});

var $saveCombo = document.querySelector('#save-combo');

$saveCombo.addEventListener('click', function () {
  if (isLoading) return;
  saveCombo();
  storeData();
});

var $cycleCombo = document.querySelector('#cycle-combo');

$cycleCombo.addEventListener('click', function () {
  isLoading = true;
  getBeerData();
  getTacoRecipe();
});

// Recipe Render

var $recipe = document.querySelector('#recipe-window');

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

// Beer Render

var $beerWindow = document.querySelector('#beer-window');

function beerRender(beer) {
  while ($beerWindow.firstChild) {
    $beerWindow.removeChild($beerWindow.firstChild);
  }

  var beerName = beer[0].name;
  var beerDescription = beer[0].description;
  var beerAbv = beer[0].abv;
  var beerImg = beer[0].image_url;

  var drinkName = document.createElement('h2');
  drinkName.setAttribute('class', 'beer-header');
  drinkName.textContent = beerName;
  $beerWindow.appendChild(drinkName);

  var beerPicture = document.createElement('img');
  beerPicture.setAttribute('class', 'beer-img');
  if (beerImg !== null) {
    beerPicture.setAttribute('src', beerImg);
  } else {

    beerPicture.setAttribute('src', 'images/404 beer not found.png');
  }
  $beerWindow.appendChild(beerPicture);

  var beerAlcohol = document.createElement('p');
  beerAlcohol.textContent = 'ABV: ' + beerAbv;
  $beerWindow.appendChild(beerAlcohol);

  var beerTalk = document.createElement('p');
  beerTalk.textContent = 'Description: ' + beerDescription;
  $beerWindow.appendChild(beerTalk);

  return drinkName;
}

// Save Beer

function saveBeer() {
  var beerName = beer[0].name;
  var beerData = beer;
  data.savedBeers.push({ name: beerName, data: beerData });
}

// combo recipe render

var $comboRecipe = document.querySelector('#combo-recipe-window');

function comboRecipeRender(recipe) {
  while ($comboRecipe.firstChild) {
    $comboRecipe.removeChild($comboRecipe.firstChild);
  }
  var baseName = recipe.base_layer.name;
  var mixinName = recipe.mixin.name;
  var condimentName = recipe.condiment.name;
  var shellName = recipe.shell.name;
  var tacoName = baseName + ' with ' + mixinName + ' and a ' + condimentName + ' in ' + shellName + '.';

  var recipeName = document.createElement('h2');
  recipeName.setAttribute('class', 'recipe-header');
  recipeName.textContent = tacoName;
  $comboRecipe.appendChild(recipeName);

  var baseDiv = document.createElement('div');
  baseDiv.setAttribute('class', 'recipe');
  $comboRecipe.appendChild(baseDiv);

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
  $comboRecipe.appendChild(mixinDiv);

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
  $comboRecipe.appendChild(condimentDiv);

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
  $comboRecipe.appendChild(shellDiv);

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

// combo beer render

var $comboBeer = document.querySelector('#combo-beer-window');

function comboBeerRender(beer) {
  while ($comboBeer.firstChild) {
    $comboBeer.removeChild($comboBeer.firstChild);
  }

  var beerName = beer[0].name;
  var beerDescription = beer[0].description;
  var beerAbv = beer[0].abv;
  var beerImg = beer[0].image_url;

  var beerDiv1 = document.createElement('div');
  beerDiv1.setAttribute('class', 'beer-combo-row');
  $comboBeer.appendChild(beerDiv1);

  var drinkName = document.createElement('h2');
  drinkName.setAttribute('class', 'beer-header');
  drinkName.textContent = beerName;
  beerDiv1.appendChild(drinkName);

  var beerPicture = document.createElement('img');
  beerPicture.setAttribute('class', 'beer-img');
  if (beerImg !== null) {
    beerPicture.setAttribute('src', beerImg);
  } else {

    beerPicture.setAttribute('src', 'images/404 beer not found.png');
  }
  beerDiv1.appendChild(beerPicture);

  var beerDiv2 = document.createElement('div');
  beerDiv2.setAttribute('class', 'beer-combo-row');
  $comboBeer.appendChild(beerDiv2);

  var beerAlcohol = document.createElement('p');
  beerAlcohol.textContent = 'ABV: ' + beerAbv;
  beerDiv2.appendChild(beerAlcohol);

  var beerTalk = document.createElement('p');
  beerTalk.textContent = 'Description: ' + beerDescription;
  beerDiv2.appendChild(beerTalk);

  return drinkName;
}

// save combo data

function saveCombo() {
  var beerName = beer[0].name;
  var beerData = beer;
  var tacoName = recipe.base_layer.name;
  var tacoData = recipe;
  data.savedCombos.push({ drinkName: beerName, drinkData: beerData, foodName: tacoName, foodData: tacoData });
}

// Local Storage

var savedData = localStorage.getItem('saved-tacos-and-beer');
if (savedData !== null) {
  data = JSON.parse(savedData);
}

function storeData() {
  var dataJson = JSON.stringify(data);
  localStorage.setItem('saved-tacos-and-beer', dataJson);
}
