/* eslint-disable no-global-assign */
var data = {
  savedRecipes: [],
  savedBeers: [],
  savedCombos: []
};

var isLoading = false;
//
// taco API
//

var recipe = {};
function getTacoRecipe() {
  var tacoApi = new XMLHttpRequest();
  tacoApi.open('GET', 'http://taco-randomizer.herokuapp.com/random/');
  tacoApi.responseType = 'json';
  tacoApi.addEventListener('loadstart', function () {
    status($recipe);
    status($comboRecipe);
  });
  tacoApi.addEventListener('load', function () {
    recipeRender(tacoApi.response);
    comboRecipeRender(tacoApi.response);
    recipe = tacoApi.response;
    isLoading = false;
  });
  tacoApi.addEventListener('error', function () {
    error($container);
  });
  tacoApi.send();
}

//
// beer API
//

var beer = {};
function getBeerData() {
  var beerApi = new XMLHttpRequest();
  beerApi.open('GET', 'https://api.punkapi.com/v2/beers/random');
  beerApi.responseType = 'json';
  beerApi.addEventListener('loadstart', function () {
    status($beerWindow);
    status($comboBeer);
  });
  beerApi.addEventListener('load', function () {
    beerRender(beerApi.response);
    comboBeerRender(beerApi.response);
    beer = beerApi.response;
    isLoading = false;
  });
  beerApi.addEventListener('error', function () {
    error($container);
  });
  beerApi.send();
}

//
// Network notification
//

function status(view) {
  clearView(view);
  loading(view);
}

//
// clearView
//

function clearView(view) {
  while (view.firstChild) {
    view.removeChild(view.firstChild);
  }
}

//
// error
//

function error(view) {

  var errorContainer = document.createElement('div');
  errorContainer.setAttribute('class', 'error-container');
  view.appendChild(errorContainer);

  var errorDiv = document.createElement('div');
  errorDiv.setAttribute('class', 'error');
  errorContainer.appendChild(errorDiv);

  var errorText = document.createElement('p');
  errorText.textContent = 'Error 404 file not found';
  errorDiv.appendChild(errorText);

  var errorButton = document.createElement('button');
  errorButton.setAttribute('type', 'button');
  errorButton.setAttribute('class', 'error-button');
  errorButton.textContent = 'Close';
  errorDiv.appendChild(errorButton);

  return errorText;
}

//
// Clear Error
//

function clearError(eventTarget) {
  eventTarget.remove();
}

//
// loading
//

function loading(view) {

  var loadingText = document.createElement('p');
  loadingText.textContent = 'loading...';
  view.appendChild(loadingText);

  return loadingText;
}

//
// Recipe cycler
//

window.addEventListener('load', function () {
  if ($recipeWindow.getAttribute('class') !== 'recipe-window hidden') {
    getTacoRecipe();
  }
  if ($beerWindow.getAttribute('class') !== 'beer-window hidden') {
    getBeerData();
  }
  if ($comboWindow.getAttribute('class') !== 'taco-and-beer-window hidden') {
    getTacoRecipe();
    getBeerData();
  }
});

// var $windowHeader = document.querySelector('.window-header');

window.addEventListener('click', function () {
  var id = event.target.id;
  if (event.target.className === 'error-button') {
    clearError(event.target.closest('.error-container'));
  } else if (id === 'cycle-recipe' || id === 'cycle-combo-recipe') {
    isLoading = true;
    // status($recipe);
    getTacoRecipe();
  } else if (id === 'save-recipe' || id === 'save-combo-recipe') {
    if (isLoading) return;
    saveTaco();
    storeData();
  } else if (id === 'cycle-beer' || id === 'cycle-combo-beer') {
    isLoading = true;
    // status($beerWindow);
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

//
// Navigation
//
var $beerView = document.querySelector('.beer-window');
var $savedWindow = document.querySelector('.saved-window');
var $savedItemsView = document.querySelector('.saved-items-view');
var $recipeWindow = document.querySelector('.recipe-window');
var $comboWindow = document.querySelector('.taco-and-beer-window');
var $idRecipes = document.querySelector('#recipes');
var $idBeers = document.querySelector('#beers');
var $idCombos = document.querySelector('#combos');
var $saved = document.querySelector('#saved');
var $comboRandomizer = document.querySelector('#combo-randomizer');
var $tacoRandomizer = document.querySelector('#taco-randomizer');
var $beerRandomizer = document.querySelector('#beer-randomizer');
var $savedItemsWindow = document.querySelector('.saved-items-window');
var $mainDivs = document.querySelectorAll('main > div');
var $container = document.querySelector('.container');

function viewSwap() {
  for (var i = 0; i < $mainDivs.length; i++) {
    if ($mainDivs[i].getAttribute('data-view') === 'view') {
      $mainDivs[i].setAttribute('data-view', 'hidden');
    }
  }
}

$saved.addEventListener('click', function () {
  viewSwap();
  $savedWindow.setAttribute('data-view', 'view');
});

$comboRandomizer.addEventListener('click', function () {
  viewSwap();
  $comboWindow.setAttribute('data-view', 'view');
});

$tacoRandomizer.addEventListener('click', function () {
  viewSwap();
  $recipeWindow.setAttribute('data-view', 'view');
});

$beerRandomizer.addEventListener('click', function () {
  viewSwap();
  $beerView.setAttribute('data-view', 'view');
});

$idRecipes.addEventListener('click', function () {
  $savedWindow.setAttribute('data-view', 'hidden');
  $savedItemsView.setAttribute('data-view', 'view');
  $savedItemsWindow.setAttribute('id', 'saved-recipes');
  var title = document.createElement('h2');
  title.textContent = 'Recipes';
  clearChildren();
  $savedItemsView.prepend(title);

  for (var i = 0; i < data.savedRecipes.length; i++) {
    var pullRecipes = data.savedRecipes[i];
    $savedItemsWindow.appendChild(savedRecipesRender(pullRecipes, i));
  }

});

$idBeers.addEventListener('click', function () {
  $savedWindow.setAttribute('data-view', 'hidden');
  $savedItemsView.setAttribute('data-view', 'view');
  $savedItemsWindow.setAttribute('id', 'saved-beers');
  var title = document.createElement('h2');
  title.textContent = 'Beers';
  clearChildren();
  $savedItemsView.prepend(title);

  for (var i = 0; i < data.savedBeers.length; i++) {
    var pullBeers = data.savedBeers[i];
    $savedItemsWindow.appendChild(savedBeersRender(pullBeers, i));
  }
});

$idCombos.addEventListener('click', function () {
  $savedWindow.setAttribute('data-view', 'hidden');
  $savedItemsView.setAttribute('data-view', 'view');
  $savedItemsWindow.setAttribute('id', 'saved-combos');
  var title = document.createElement('h2');
  title.textContent = 'Combos';
  clearChildren();
  $savedItemsView.prepend(title);

  for (var i = 0; i < data.savedCombos.length; i++) {
    var pullCombos = data.savedCombos[i];
    $savedItemsWindow.appendChild(savedCombosRender(pullCombos, i));
  }
});

//
// saved items list
//

function savedRecipesRender(recipe, id) {

  var div = document.createElement('div');
  div.setAttribute('class', 'saved-item recipe');
  div.setAttribute('id', id);

  var recipeName = document.createElement('h2');
  recipeName.textContent = recipe.name;
  div.appendChild(recipeName);

  return div;
}

function savedBeersRender(recipe, id) {

  var div = document.createElement('div');
  div.setAttribute('class', 'saved-item beer');
  div.setAttribute('id', id);

  var div2 = document.createElement('div');
  div2.setAttribute('class', 'beer-container');
  div.appendChild(div2);

  var beerName = document.createElement('h2');
  beerName.textContent = recipe.name;
  div2.appendChild(beerName);

  var beerImg = document.createElement('img');
  beerImg.setAttribute('class', 'beer-img');
  if (recipe.data[0].image_url !== null) {
    beerImg.setAttribute('src', recipe.data[0].image_url);
  } else {
    beerImg.setAttribute('src', 'images/404 beer not found.png');
  }
  div2.appendChild(beerImg);

  return div;

}

function savedCombosRender(combos, id) {

  var div = document.createElement('div');
  div.setAttribute('class', 'saved-item combo');
  div.setAttribute('id', id);

  var recipeName = document.createElement('h2');
  recipeName.textContent = combos.foodName;
  div.append(recipeName);

  var div2 = document.createElement('div');
  div2.setAttribute('class', 'beer-container');
  div.appendChild(div2);

  var beerName = document.createElement('h2');
  beerName.textContent = combos.drinkName;
  div2.appendChild(beerName);

  var beerImg = document.createElement('img');
  beerImg.setAttribute('class', 'combo-beer-img');
  if (combos.drinkData[0].image_url !== null) {
    beerImg.setAttribute('src', combos.drinkData[0].image_url);
  } else {
    beerImg.setAttribute('src', 'images/404 beer not found.png');
  }
  div2.appendChild(beerImg);

  return div;
}

//
// Clear Children
//

function clearChildren() {
  $savedItemsView.removeChild($savedItemsView.firstChild);
  while ($savedItemsWindow.firstChild) {
    $savedItemsWindow.removeChild($savedItemsWindow.firstChild);
  }
}

//
// user can view specific saved items
//

$savedItemsWindow.addEventListener('click', function () {
  var closest = event.target.closest('.saved-item');
  var id = closest.id;
  var viewRecipe = data.savedRecipes;
  var viewBeer = data.savedBeers;
  var viewCombo = data.savedCombos;
  if ($savedItemsWindow.id === 'saved-recipes') {
    for (var i = 0; i < data.savedRecipes.length; i++) {
      if (id === i.toString()) {
        savedRecipeRender(viewRecipe[i]);
      }
    }
  } else if ($savedItemsWindow.id === 'saved-beers') {
    for (var j = 0; j < data.savedBeers.length; j++) {
      if (id === j.toString()) {
        savedBeerRender(viewBeer[j], $savedItemsWindow);
      }
    }
  } else if ($savedItemsWindow.id === 'saved-combos') {
    while ($savedItemsWindow.firstChild) {
      $savedItemsWindow.removeChild($savedItemsWindow.firstChild);
    }
    renderComboView();
    var $viewBeerCombo = document.querySelector('#view-beer-combo');
    var $viewRecipeCombo = document.querySelector('#view-recipe-combo');
    for (var k = 0; k < data.savedCombos.length; k++) {
      if (id === k.toString()) {
        savedComboRecipeRender(viewCombo[k], $viewRecipeCombo);
        savedComboBeerRender(viewCombo[k], $viewBeerCombo);
      }
    }
  }
});

function savedRecipeRender(recipe) {
  while ($savedItemsWindow.firstChild) {
    $savedItemsWindow.removeChild($savedItemsWindow.firstChild);
  }
  var baseName = recipe.data.base_layer.name;
  var mixinName = recipe.data.mixin.name;
  var condimentName = recipe.data.condiment.name;
  var shellName = recipe.data.shell.name;
  var tacoName = baseName + ' with ' + mixinName + ' and a ' + condimentName + ' in ' + shellName + '.';

  var recipeName = document.createElement('h2');
  recipeName.setAttribute('class', 'recipe-header');
  recipeName.textContent = tacoName;
  $savedItemsWindow.appendChild(recipeName);

  var baseDiv = document.createElement('div');
  baseDiv.setAttribute('class', 'recipe');
  $savedItemsWindow.appendChild(baseDiv);

  var baseTitle = document.createElement('h3');
  baseTitle.setAttribute('class', 'title');
  baseTitle.textContent = baseName + ' directions:';
  baseDiv.appendChild(baseTitle);

  var baseRecipe = document.createElement('p');
  baseRecipe.setAttribute('class', 'directions');
  baseRecipe.textContent = recipe.data.base_layer.recipe;
  baseDiv.appendChild(baseRecipe);

  var mixinDiv = document.createElement('div');
  mixinDiv.setAttribute('class', 'recipe');
  $savedItemsWindow.appendChild(mixinDiv);

  var mixinTitle = document.createElement('h3');
  mixinTitle.setAttribute('class', 'title');
  mixinTitle.textContent = mixinName + ' directions:';
  mixinDiv.appendChild(mixinTitle);

  var mixinRecipe = document.createElement('p');
  mixinRecipe.setAttribute('class', 'directions');
  mixinRecipe.textContent = recipe.data.mixin.recipe;
  mixinDiv.appendChild(mixinRecipe);

  var condimentDiv = document.createElement('div');
  condimentDiv.setAttribute('class', 'recipe');
  $savedItemsWindow.appendChild(condimentDiv);

  var condimentTitle = document.createElement('h3');
  condimentTitle.setAttribute('class', 'title');
  condimentTitle.textContent = condimentName + ' directions:';
  condimentDiv.appendChild(condimentTitle);

  var condimentRecipe = document.createElement('p');
  condimentRecipe.setAttribute('class', 'directions');
  condimentRecipe.textContent = recipe.data.condiment.recipe;
  condimentDiv.appendChild(condimentRecipe);

  var shellDiv = document.createElement('div');
  shellDiv.setAttribute('class', 'recipe');
  $savedItemsWindow.appendChild(shellDiv);

  var shellTitle = document.createElement('h3');
  shellTitle.setAttribute('class', 'title');
  shellTitle.textContent = shellName + ' directions:';
  shellDiv.appendChild(shellTitle);

  var shellRecipe = document.createElement('p');
  shellRecipe.setAttribute('class', 'directions');
  shellRecipe.textContent = recipe.data.shell.recipe;
  shellDiv.appendChild(shellRecipe);

  return recipeName;
}

function savedBeerRender(beer, view) {
  while (view.firstChild) {
    view.removeChild(view.firstChild);
  }

  var beerName = beer.name;
  var beerDescription = beer.data[0].description;
  var beerAbv = beer.data[0].abv;
  var beerImg = beer.data[0].image_url;

  var drinkName = document.createElement('h2');
  drinkName.setAttribute('class', 'beer-header');
  drinkName.textContent = beerName;
  view.appendChild(drinkName);

  var beerPicture = document.createElement('img');
  beerPicture.setAttribute('class', 'beer-img');
  if (beerImg !== null) {
    beerPicture.setAttribute('src', beerImg);
  } else {

    beerPicture.setAttribute('src', 'images/404 beer not found.png');
  }
  view.appendChild(beerPicture);

  var beerAlcohol = document.createElement('p');
  beerAlcohol.textContent = 'ABV: ' + beerAbv;
  view.appendChild(beerAlcohol);

  var beerTalk = document.createElement('p');
  beerTalk.textContent = 'Description: ' + beerDescription;
  view.appendChild(beerTalk);

  return drinkName;
}

function savedComboBeerRender(beer, view) {
  while (view.firstChild) {
    view.removeChild(view.firstChild);
  }

  var beerName = beer.drinName;
  var beerDescription = beer.drinkData[0].description;
  var beerAbv = beer.drinkData[0].abv;
  var beerImg = beer.drinkData[0].image_url;

  var beerDiv1 = document.createElement('div');
  beerDiv1.setAttribute('class', 'beer-combo-row');
  view.appendChild(beerDiv1);

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
  view.appendChild(beerDiv2);

  var beerAlcohol = document.createElement('p');
  beerAlcohol.textContent = 'ABV: ' + beerAbv;
  beerDiv2.appendChild(beerAlcohol);

  var beerTalk = document.createElement('p');
  beerTalk.textContent = 'Description: ' + beerDescription;
  beerDiv2.appendChild(beerTalk);

  return drinkName;
}

function savedComboRecipeRender(recipe, view) {
  while (view.firstChild) {
    view.removeChild(view.firstChild);
  }
  var baseName = recipe.foodData.base_layer.name;
  var mixinName = recipe.foodData.mixin.name;
  var condimentName = recipe.foodData.condiment.name;
  var shellName = recipe.foodData.shell.name;
  var tacoName = baseName + ' with ' + mixinName + ' and a ' + condimentName + ' in ' + shellName + '.';

  var recipeName = document.createElement('h2');
  recipeName.setAttribute('class', 'recipe-header');
  recipeName.textContent = tacoName;
  view.appendChild(recipeName);

  var baseDiv = document.createElement('div');
  baseDiv.setAttribute('class', 'recipe');
  view.appendChild(baseDiv);

  var baseTitle = document.createElement('h3');
  baseTitle.setAttribute('class', 'title');
  baseTitle.textContent = baseName + ' directions:';
  baseDiv.appendChild(baseTitle);

  var baseRecipe = document.createElement('p');
  baseRecipe.setAttribute('class', 'directions');
  baseRecipe.textContent = recipe.foodData.base_layer.recipe;
  baseDiv.appendChild(baseRecipe);

  var mixinDiv = document.createElement('div');
  mixinDiv.setAttribute('class', 'recipe');
  view.appendChild(mixinDiv);

  var mixinTitle = document.createElement('h3');
  mixinTitle.setAttribute('class', 'title');
  mixinTitle.textContent = mixinName + ' directions:';
  mixinDiv.appendChild(mixinTitle);

  var mixinRecipe = document.createElement('p');
  mixinRecipe.setAttribute('class', 'directions');
  mixinRecipe.textContent = recipe.foodData.mixin.recipe;
  mixinDiv.appendChild(mixinRecipe);

  var condimentDiv = document.createElement('div');
  condimentDiv.setAttribute('class', 'recipe');
  view.appendChild(condimentDiv);

  var condimentTitle = document.createElement('h3');
  condimentTitle.setAttribute('class', 'title');
  condimentTitle.textContent = condimentName + ' directions:';
  condimentDiv.appendChild(condimentTitle);

  var condimentRecipe = document.createElement('p');
  condimentRecipe.setAttribute('class', 'directions');
  condimentRecipe.textContent = recipe.foodData.condiment.recipe;
  condimentDiv.appendChild(condimentRecipe);

  var shellDiv = document.createElement('div');
  shellDiv.setAttribute('class', 'recipe');
  view.appendChild(shellDiv);

  var shellTitle = document.createElement('h3');
  shellTitle.setAttribute('class', 'title');
  shellTitle.textContent = shellName + ' directions:';
  shellDiv.appendChild(shellTitle);

  var shellRecipe = document.createElement('p');
  shellRecipe.setAttribute('class', 'directions');
  shellRecipe.textContent = recipe.foodData.shell.recipe;
  shellDiv.appendChild(shellRecipe);

  return recipeName;
}

function renderComboView() {

  var headerDiv1 = document.createElement('div');
  headerDiv1.setAttribute('class', 'window-header');
  $savedItemsWindow.appendChild(headerDiv1);

  var title = document.createElement('p');
  title.textContent = 'Beer:';
  headerDiv1.appendChild(title);

  var beerDiv = document.createElement('div');
  beerDiv.setAttribute('id', 'view-beer-combo');
  $savedItemsWindow.appendChild(beerDiv);

  var headerDiv2 = document.createElement('div');
  headerDiv2.setAttribute('class', 'window-header');
  $savedItemsWindow.appendChild(headerDiv2);

  var title2 = document.createElement('p');
  title2.textContent = 'Recipe:';
  headerDiv2.appendChild(title2);

  var recipeDiv = document.createElement('div');
  recipeDiv.setAttribute('id', 'view-recipe-combo');
  $savedItemsWindow.appendChild(recipeDiv);

  return beerDiv;
}
