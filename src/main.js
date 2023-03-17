import { API_KEY } from "./secretKeys.js";
import { categoriesPreviewList, trendingMoviesPreviewList } from "./nodes.js";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
    'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },

})


async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day')
   
    const movies = data.results
    trendingMoviesPreviewList.innerHTML = "";
   // const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src',`https://image.tmdb.org/t/p/w300${movie.poster_path}`);
        movieContainer.appendChild(movieImg);
        trendingMoviesPreviewList.appendChild(movieContainer);
        
    });
    console.log(movies);
}


async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    
    const genres = data.genres;
    categoriesPreviewList.innerHTML = '';
   // const PreviewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');

    genres.forEach(genre => {
        const categoryContainer = document.createElement('div');
        const categoryTitle = document.createElement('h3');       
        categoryContainer.classList.add('category-container');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${genre.id}`);
        categoryTitle.textContent = genre.name;
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewList.appendChild(categoryContainer); 
    });
    console.log(genres);
}


export { getTrendingMoviesPreview, getCategoriesPreview };
