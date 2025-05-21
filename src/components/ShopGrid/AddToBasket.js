// Get the basket from sessionStorage, or initialise an empty array if it doesn't exist
const save = JSON.parse(sessionStorage.getItem('save') ?? '[]');
const basket = JSON.parse(sessionStorage.getItem('basket') ?? '[]');

function addToBasket(movieId) {
  // Get the movie from data and add to the basket
  const movie = movies.find((movie) => movie.id === movieId);

  // If movies does not exist, error and return
  if (!movie) {
    return;
  }

  // Check if the movie is already in the "save" list
  const exists = basket.some((item) => item.id === movie.id);

  // Retrieve the number of days the user wants to rent the movie
  let daysRent = parseInt(document.getElementById('days-to-rent-' + movieId).value);

  // Validate rental days input
  if (isNaN(daysRent) || daysRent <= 0) {
    alert('Please enter a valid number of days to rent (minimum 1 day).');
    return;
  }

  // Limit the rental period to a maximum of 30 days
  let rentalDays = Math.min(daysRent, 30);
  if (rentalDays < daysRent) {
    alert('Sorry, you cannot rent a movie for more than 30 days. Rent time has been adjusted to 30 days.');
  }

  // Update the movie's rentDays property
  if (movie.rentDays == null) {
    movie.rentDays = rentalDays;
  } else {
    movie.rentDays += rentalDays;
  }

  // Save updates to sessionStorage
  sessionStorage.setItem('save', JSON.stringify(save));

  // Call function to handle adding to the basket or updating existing rental
  if (exists) {
    updateBasket(movie);
  } else {
    addBasket(movie);
  }
}

// Helper function to update a movie to the basket
function updateBasket(movie) {
  let movieIndex = basket.findIndex((item) => item.id === movie.id);

  // Update rentDays for the movie in the basket
  basket[movieIndex].rentDays + movie.rentDays;

  if (basket[movieIndex].rentDays < 1) {
    alert('Item has been removed from the basket.');
    basket.splice(movieIndex, 1);
  } else if (basket[movieIndex].rentDays > 30) {
    alert('Sorry, you cannot rent a movie for more than 30 days. Rent time has been adjusted to 30 days.');
    basket[movieIndex].rentDays = 30;
  }
  alert(`${movie.name} has been updated in your basket. You are renting it for ${basket[movieIndex].rentDays} days.`);

  // Save the basket to sessionStorage
  sessionStorage.setItem('basket', JSON.stringify(basket));
}

// Helper function to add a movie to the basket
function addBasket(movie) {
  if (movie.rentDays < 1) {
    movie.rentDays = 1;
    alert('Sorry, you cannot rent a movie for less than 1 day. Rent time has been adjusted to 1 day.');
  }
  basket.push(movie);
  alert(`${movie.name} has been added to your basket. You are renting it for ${movie.rentDays} days.`);

  // Save the basket to sessionStorage
  sessionStorage.setItem('basket', JSON.stringify(basket));
}
