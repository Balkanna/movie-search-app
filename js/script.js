const searchBtn = document.querySelector('.search__button'),
      search = document.querySelector('.search__input'),
      resultsSection = document.querySelector('#results');

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
    resultsSection.innerHTML = '';
    let html = '';
    results.forEach(movie => {
        html += `
        <div class="card col-3">
            <h5 class="card-title">${movie.Title}</h5>
            <img src="${movie.Poster}" class="card-img-top card-img" alt="${movie.Title}">
            <div class="card-body">
                <p class="card-text">(${movie.Year})</p>
                <!--<a href="#" class="btn btn-primary">Watch</a>-->
            </div>
        </div>
        `;
    });
    resultsSection.innerHTML = html;
}



