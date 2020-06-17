const searchBtn = document.querySelector('.search__button');
const search = document.querySelector('.search__input');
const resultsSection = document.querySelector('#results');
const favoritesSection = document.querySelector('#favorites');
const savedItems = localStorage.getItem('favorites') || '[]';
const favoritesArr = JSON.parse(savedItems);

renderFavorites();

function getFilms(search) {
    const key = 'd8090274';
    const url = `https://www.omdbapi.com/?apiKey=${key}&s=${search}`;

    return fetch(url).then((response) => {
    if (response.ok) {
        return response.json();
        } else {
            console.error('Error HTTP: ', response.status);
            throw new Error(response.status);
        }
    });
}

searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const value = search.value;
    getFilms(value).then((data) => showResults(data.Search));
});

function showResults(results) {
    resultsSection.innerHTML = results.reduce((html, movie) => {
        return html + getMovieTemplate(movie, 3);
    }, '');

    const favoritesButton = document.querySelectorAll('.favorites-button');

    favoritesButton.forEach((button) => {
        button.addEventListener('click', (event) => {
            const { id } = button.dataset;
            const movie = results.find((movie) => movie.imdbID === id);

            addToFavoritesArr(movie);

            renderFavorites();
            button.disabled = true;
        });
    });
}

function renderFavorites() {
    const favoritesHtml = favoritesArr.reduce((html, movie) => {
        return html + getMovieTemplate(movie, 12, false);
    }, '');

    favoritesSection.innerHTML = favoritesHtml;
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach((button) =>
        button.addEventListener('click', () => {
            const { id } = button.dataset;
            deleteFromFavArr(id);
            renderFavorites();
            enableFavoriteBtn(id);
        })
    );
}

function enableFavoriteBtn(id) {
    const selector = `.favorites-button[data-id="${id}"]`;
    const favoriteButton = document.querySelector(selector);
    favoriteButton.disabled = false;
}

function getMovieTemplate(movie, cols, button = true) {
    return `
        <div class="card col-${cols} card-column">
            <h5 class="card-title">${movie.Title}</h5>
            <img src="${movie.Poster}" class="card-img-top card-img" alt="${movie.Title}">
            <div class="card-body">
                <p class="card-text">(${movie.Year})</p>
                ${
                    button
                    ? `<button data-id="${movie.imdbID}" type="button" class="btn btn-primary favorites-button">Add to <i class="fa fa-heart"></i></button>`
                    : `<button data-id="${movie.imdbID}" type="button" class="btn btn-primary remove-button"><i class="fa fa-minus"></i></button>`
                }
            </div>
        </div>
    `;
}

function addToFavoritesArr(movie) {
    favoritesArr.push(movie);
    localStorage.setItem('favorites', JSON.stringify(favoritesArr));
}

function deleteFromFavArr(id) {
    const movieIndex = favoritesArr.findIndex((movie) => movie.imdbID === id);
    favoritesArr.splice(movieIndex, 1);
    localStorage.setItem('favorites', JSON.stringify(favoritesArr));
}