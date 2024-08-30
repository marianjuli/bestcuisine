




document.getElementById('search-btn').addEventListener('click', function() {
    const ingredients = document.getElementById('ingredients').value.trim();
    const cuisine = document.getElementById('cuisine').value.trim();
    fetchRecipes(ingredients, cuisine);
});

function fetchRecipes(ingredients, cuisine) {
   
    const apiKey = '102185a7f5f84081be7a06e06fe02072'; 
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&includeIngredients=${encodeURIComponent(ingredients)}&cuisine=${encodeURIComponent(cuisine)}&number=10`;

    console.log('Fetching from URL:', apiUrl); // Debugging: log the URL being fetched

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data); // Debugging: log the API response
            displayRecipes(data.results);
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
            alert('Failed to fetch recipes. Please check your API key and internet connection.');
        });
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = '';

    if (!recipes || recipes.length === 0) {
        recipesContainer.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.className = 'recipe';

        recipeElement.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p><a href="https://spoonacular.com/recipes/${recipe.id}" target="_blank">View Recipe</a></p>
        `;

        recipesContainer.appendChild(recipeElement);
    });
}



function fetchRecipeDetails(recipeId) {
    const apiKey = '102185a7f5f84081be7a06e06fe02072'; 
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    console.log('Fetching recipe details from URL:', apiUrl); // Debugging: log the URL being fetched

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Recipe Details Response:', data); // Debugging: log the API response
            displayRecipeDetails(data);
        })
        .catch(error => {
            console.error('Error fetching recipe details:', error);
            alert('An error appeared. Sorry about that.');
        });
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = '';

    if (!recipes || recipes.length === 0) {
        recipesContainer.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.className = 'recipe';

        recipeElement.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p><a href="#" onclick="fetchRecipeDetails(${recipe.id}); return false;">View Recipe</a></p>
        `;

        recipesContainer.appendChild(recipeElement);
    });
}

function displayRecipeDetails(recipe) {
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = '';

    const recipeDetailElement = document.createElement('div');
    recipeDetailElement.className = 'recipe-detail';

    recipeDetailElement.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        <p>${recipe.summary}</p>
        <p>Preparation Time: ${recipe.readyInMinutes} minutes</p>
        <p>Servings: ${recipe.servings}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
        </ul>
        <h3>Instructions:</h3>
        <p>${recipe.instructions}</p>
        <p><a href="index.html">Back to recipes</a></p>
    `;

    recipesContainer.appendChild(recipeDetailElement);
}

