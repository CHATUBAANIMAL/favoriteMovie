
const searchButton = document.getElementById('search-button');
const modalContainer = document.getElementById('modal-container')
const overlay = document.getElementById('modal-overlay');
const background = document.getElementById('modal-background');
const movieName = document.getElementById('movie-name');
const movieYear = document.getElementById('movie-year');
const movieListContainer = document.getElementById("movie-list");


let movieList = [];

async function searchButtonClickHandler () {
    try{
        let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}${movieYearParameterGeenration()}`;
        
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data.Error) {
            throw new Error ('Filme não encontrado!');
        }
        createModal(data);
        overlay.classList.add('open');
    
    } catch (error) {
        notie.alert({type: 'error',
            text: error.message});
        
    }
}


function movieNameParameterGenerator () {
    if (movieName.value === '') {
        throw new Error('O nome do filme deve ser informado!');
    }
    return movieName.value.split(' ').join('+');
}

function movieYearParameterGeenration () {
    if (movieYear.value === '') {
        return '';
    };
    if (movieYear.value.length !== 4 || Number.isNaN(Number(movieYear.value))) {
        throw new Error('Ano do filme inválido!');
    };

    return `&y=${movieYear.value}`;
};

function addToList (movieObject) {
    movieList.push(movieObject);
}

function isMovieAlreadyOnList (id) {
    function DoesThisIdBelongToThisMovie (movieObject) {
        return movieObject.imdbID === id;
    }
    return Boolean(movieList.find(DoesThisIdBelongToThisMovie));
}

function updateUI(movieObject) {
    movieListContainer.innerHTML += `<article id="movie-card-${movieObject.imdbID}">
    <img src="${movieObject.Poster}" alt="${movieObject.Title}.">
    <button class="remove-button" onclick="{removeFilmFromList('${movieObject.imdbID}')}">
        <i class="bi bi-trash3"></i>
    </button>
</article>`;

}

function removeFilmFromList (id) {
    movieList = movieList.filter(movie => movie.imdbID !== id);
    document.getElementById(`movie-card-${id}`).remove();
    
}
searchButton.addEventListener('click', searchButtonClickHandler);
