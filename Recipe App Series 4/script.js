meals = document.getElementById('meals') ;

getRandomMeal( ) ;

async function getRandomMeal( ) {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const resp_data = await response.json( ) ;

    const random_meal = resp_data.meals[0] ; 
    console.log(random_meal) ; 
    
    addMeal(random_meal, true);
}

function getMealsById(id) {
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
}

function getMealsBySearch(term) {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div') ;

    meal.classList.add('meal');

    meal.innerHTML = `
                <div class = "meal-header">
                ${random ? `  <span class = "random"> 
                Random Recipe
        </span>` : ' '}
                       
                    <img src = "${mealData.strMealThumb}" alt = "${mealData.strMeal}">
                </div>

                <div class = "meal-body">
                    <h4>${mealData.strMeal} </h4>
                    <button class = "fav-btn"><i class="fas fa-heart"></i></button>
                </div>`;

        const btn = meal.querySelector(".meal .fav-btn") ;
        btn.addEventListener("click", ( ) => {

            if(btn.classList.contains("active")) {
                removeMealLS(mealData.idMeal);
                btn.classList.remove("active");
            } else {
                addMealLS(mealData.idMeal) ;
                btn.classList.add('active') ;
            }
 
        })
        meals.appendChild(meal);
}

function addMealLS(mealId) {   // Adds all meals to the local Storage
    const mealIds = getMealsLS( ) ;
    localStorage.setItem("mealIds", JSON.stringify([mealIds, mealId])) ;
} 

function removeMealLS(mealId) { // removes meals from the local Srorage
    const mealIds = getMealsLS( ) ;

    localStorage.setItem("mealIds", JSON.stringify(mealIds.filter((id) => id != mealId)));
}

function getMealsLS( ) {  // Gets meals from ht elocal Storage
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));

    return mealIds === null ? [ ] : mealIds ;
}