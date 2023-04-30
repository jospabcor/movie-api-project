import { API_KEY } from "./secretKeys.js";
import { categoriesPreviewList, trendingMoviesPreviewList, genericSection, headerCategoryTitle,
    movieDetailTitle,movieDetailDescription,movieDetailScore, movieDetailCategoriesList, headerSection, relatedMoviesContainer} from "./nodes.js";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
    'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },

})


    // utils 

    function createMovies(movies,container) {
        container.innerHTML = '';
        movies.forEach( movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
        })
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
        })
    }

    function createCategories(categories,container) {
        container.innerHTML = '';
        categories.forEach( category => {
        const categoryContainer = document.createElement('div'); 
        const categoryTitle = document.createElement('h3');
        categoryContainer.classList.add('category-container');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id',`id${category.id}`);
        categoryTitle.addEventListener('click', ()=> {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        categoryTitle.textContent = category.name;
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
        })
    }

    // Llamados a la api

async function getTrendingMoviesPreview() {
    const  {data}  = await api('trending/movie/day')
    const movies = data.results

    createMovies(movies,trendingMoviesPreviewList)
    console.log('DATA:',data);
   
}


async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    
    const genres = data.genres;
    createCategories(genres,categoriesPreviewList);
   
    console.log(genres);
}

async function getMoviesByCategory(ID){
    const { data } = await api(`discover/movie`, {
        params: {
            with_genres:ID,
        }
    });
    const movies = data.results;
    createMovies(movies,genericSection);
    
}

async function getMoviesBySearch(query){
    const { data } = await api('search/movie',{
        params: {
            query,
        }
    });
    const movies = data.results;
    createMovies(movies,genericSection);
}

async function getTrendingMovies(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    createMovies(movies,genericSection);
}


async function getMovieByID(movieID){
    const {data: movie} = await api(`movie/${movieID}`);
    const movieImgURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    headerSection.style.background= `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(${movieImgURL})`;
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;
    createCategories(movie.genres,movieDetailCategoriesList);
    getSimilarMovies(movieID);

}

async function getSimilarMovies(movieID){
    const { data } = await api(`movie/${movieID}/similar`);
    const movies = data.results;
    createMovies(movies, relatedMoviesContainer);
}

async function genericGetMovie(path, container, optionalParams = {}){
    const { data } = await api(path, optionalParams);
    const movies = data.results;

    container.innerHTML = "";
    movies.forEach( movie => {
        const movieContainer = document.createElement('div');
        const movieImg = document.createElement('img');
        movieContainer.classList.add('movie-container');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', `https://image.tmdb/t/p/w300${movie.poster_path}`);
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    })

}


export { getTrendingMoviesPreview, getCategoriesPreview, getMoviesByCategory, genericGetMovie, getMoviesBySearch, getTrendingMovies, getMovieByID};
