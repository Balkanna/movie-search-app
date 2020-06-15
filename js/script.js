const searchBtn = document.querySelector('.search__button'),
      search = document.querySelector('.search__input'),
      resultsSection = document.querySelector('#results'),
      favoritesSection = document.querySelector('#favorites');

function getFilms(search) {
    const key = 'd8090274';
    const url = `https://www.omdbapi.com/?apiKey=${key}&s=${search}`;

    return fetch(url)
        .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.log('Error HTTP: ', response.status);
            throw new Error(response.status);
        }
    });   
}

searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const value = search.value;
    getFilms(value).then(data => showResults(data.Search));
});

function showResults(results) {
    resultsSection.innerHTML = results.reduce((html, movie) => {
        return html + getMovieTemplate(movie, 3);
    }, '');

    const favoritesButton = document.querySelectorAll('.favorites-button');

    favoritesButton.forEach( button => {
        button.addEventListener('click', (event) => {
            const { id } = button.dataset;
            const movie = results.find(movie => movie.imdbID === id);
            favoritesSection.innerHTML = favoritesSection.innerHTML + getMovieTemplate(movie, 12, false);
            button.parentNode.removeChild(button);
        })
    });
}

function removeFavorites() {
    const removeButton = document.querySelectorAll('.remove-button');
    removeButton.forEach( button => {
        button.addEventListener('click', (event) => {
            console.log('Clicked!');
            favoritesSection.innerHTML += '';
        })
    });
}

function getMovieTemplate(movie, cols, button = true) {
    return `
    <div class="card col-${cols}">
        <h5 class="card-title">${movie.Title}</h5>
        <img src="${movie.Poster}" class="card-img-top card-img" alt="${movie.Title}">
        <div class="card-body">
            <p class="card-text">(${movie.Year})</p>
            ${
                button ? 
                `<button data-id="${movie.imdbID}" type="button" class="btn btn-primary favorites-button">Add to favorites</button>`
                : `<button data-id="${movie.imdbID}" type="button" class="btn btn-primary remove-button">Remove</button>`
            }
         </div>
    </div>
    `;
};