import { getTrendingMoviesPreview, getCategoriesPreview, getMoviesByCategory, genericGetMovie, getMoviesBySearch, getTrendingMovies, getMovieByID} from "./main.js";

import { headerSection, trendingPreviewSection, categoriesPreviewSection, genericSection, 
    movieDetailSection, searchForm, trendingMoviesPreviewList, categoriesPreviewList, movieDetailCategoriesList, 
    relatedMoviesContainer, headerTitle, arrowBtn, headerCategoryTitle, searchFormInput, searchFormBtn, trendingBtn, 
    movieDetailTitle, movieDetailDescription, movieDetailScore } from "./nodes.js"


searchFormBtn.addEventListener("click", () => {
    location.hash = `#search=${searchFormInput.value}`;

})

trendingBtn.addEventListener("click", () => {
    location.hash = "#trends";
});

arrowBtn.addEventListener("click", () => {
    history.back();
    //location.hash = "#home";
})

window.addEventListener('DOMContentLoaded', navigation, false);
window.addEventListener('hashchange', navigation, false);

function navigation(){
    console.log({ location });
    
    if(location.hash.startsWith("#trends")){
        trendsPage();
    } else if(location.hash.startsWith("#search=")){
        searchPage();
    } else if(location.hash.startsWith("#movie=")){
        moviePage();
    } else if(location.hash.startsWith("#category=")){
        categoryPage();
    } else {
        homePage();
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


function homePage(){
    console.log("home");
    headerSection.classList.remove("header-container--long");
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive'); 
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getCategoriesPreview();
    getTrendingMoviesPreview();
}

function searchPage(){
    console.log("search");


    headerSection.classList.remove("header-container--long");
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive'); 
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    //Get input value name from url
    const query = location.hash.split('=')[1];
    const titleWithSpaces = decodeURI(query)
    getMoviesBySearch(titleWithSpaces);
}


function trendsPage(){
    console.log("trends");

    headerSection.classList.remove("header-container--long");
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive'); 
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    headerCategoryTitle.innerHTML = 'Trending';
    getTrendingMovies();
}

function categoryPage(){
    console.log("category");
    window.scrollTo(0, 0);
    headerSection.classList.remove("header-container--long");
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive'); 
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    const playdo = location.hash.split("=")[1].split("-");
    console.log(playdo);
    const [id, title] = location.hash.split("=")[1].split("-");
    headerCategoryTitle.innerHTML = decodeURI(title);
    document.title = decodeURI(title);
    getMoviesByCategory(id);

}


function moviePage(){
    console.log("movie");

    headerSection.classList.add("header-container--long");
    //headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive'); 
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');


    const id = location.hash.split('=')[1];
    getMovieByID(id);

}
