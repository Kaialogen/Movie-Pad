// Takes the ID from the URL and loads all the data into the DOM
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieId = parseInt(urlParams.get('id'));
const movie = movies.find((movie) => movie.id === movieId);

document.getElementById('days-to-rent-x').id = 'days-to-rent-' + movieId.toString();
document.getElementById('movie-title').textContent = movie.name;
document.getElementById('movie-image').src = movie.image;
document.getElementById('movie-genre').textContent = movie.genre;
document.getElementById('movie-director').textContent = movie.director;
document.getElementById('movie-actors').textContent = movie.actors;
document.getElementById('movie-description').textContent = movie.description;
document.getElementById('movie-release-date').textContent = movie.releaseDate;
document.getElementById('movie-price').textContent = '£' + movie.price.toFixed(2);
document.getElementById('movie-video').src = movie.video;
