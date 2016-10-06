//From the yummly website The base url for the Search Recipes GET 
//is....< http://api.yummly.com/v1/api/recipes?_app_id=app-id&_app_key=app-key&your _search_parameters >

$(document).ready( function() {
	$('#searchButton').on('click', function (event) {
	    event.preventDefault();
	    var mainIng = $('#ingredient').val();
	    var cuisine = $('#cuisine-name').val();
	    var allergy = $('#allergies').val();
	    recipeInput(mainIng,cuisine,allergy);
	});
});

var recipeInput = function(mainIng,cuisine,allergy) {
	if ((mainIng == '') && (cuisine == null) && (allergy == null)) {
	   	alert('Please input and enter a word in the textbox and try again!!');
	    $('.recipe-details').html('');
	    return false;
	} else {
		getRecipe(mainIng,cuisine,allergy);
	}
}
// This takes the error string and turns this into the displayable DOM element.
var showError = function(error){
	var errorElement = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElement.append(errorText);
}
//Gets all the information after all the input and get the results displayed with API/ajax.
var getRecipe = function(mainIng,cuisine,allergy) {
	var result = $.ajax({
		url: "http://api.yummly.com/v1/api/recipes?_app_id=   &_app_key= =" + keyword + "&allowedCuisine[]=cuisine^cuisine-" + cuisine + "&requirePictures=true",
		dataType: "jsonp",
		type: "GET"
		})
	.done(function(result){
		$('.recipe-details').html('');
		$.each(result.matches, function(i, matches) {
			var recipe = '<li><div class="recipe-image"><img src="' +
							matches.imageUrlsBySize[90] + '" alt="Recipe image" width="170"></div><div class="recipe-description"><p>' +
							matches.sourceDisplayName + '</p><p><a target="_blank" href=https://www.yummly.com/recipe/' +
							matches.id + ' >' + matches.recipeName + '</a></p><p>Cooking time: ' + 
							matches.totalTimeInSeconds/60 + ' minutes</p><p>Rating: ' + 
							matches.rating + '</p></div></li>';
			$('.recipe-details').append(recipe);
		});
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElement = showError(error);
		$('.search-results').append(errorElement);
	});
}
