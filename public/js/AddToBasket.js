function addToBasket(movieId) {
    // Get the movie from data and add to the basket
    const movie = movies.find((movie) => movie.id === movieId);
    if (!movie) return;

    // Get the basket from local storage, or initialize an empty array if it doesn't exist
    const basket = JSON.parse(localStorage.getItem("basket") ?? "[]");
    const save = JSON.parse(localStorage.getItem("save") ?? "[]");

    // Check if the movie is already in the "save" list
    let exists = save.indexOf(movie.name) !== -1;

    if (!exists) {
        save.push(movie.name);
    }

    // Retrieve the number of days the user wants to rent the movie
    let daysRent = parseInt(document.getElementById("days-to-rent-" + movieId).value);

    // Validate rental days input
    if (isNaN(daysRent) || daysRent <= 0) {
        alert("Please enter a valid number of days to rent (minimum 1 day).");
        return;
    }

    // Limit the rental period to a maximum of 30 days
    let rentalDays = Math.min(daysRent, 30);
    if (rentalDays < daysRent) {
        alert("Sorry, you cannot rent a movie for more than 30 days. Rent time has been adjusted to 30 days.");
    }

    // Update the movie's rentDays property
    if (movie.rentDays == null) {
        movie.rentDays = rentalDays;
    } else {
        movie.rentDays += rentalDays;
    }

    // Save updates to localStorage
    localStorage.setItem("save", JSON.stringify(save));

    // Call function to handle adding to the basket or updating existing rental
    updateBasket(movie, basket, exists);
}

function updateBasket(movie, basket, exists) {
    // Helper function to update or add a movie to the basket
    if (exists) {
        let movieIndex = basket.findIndex((item) => item.name === movie.name);
        basket[movieIndex].rentDays += movie.rentDays;

        if (basket[movieIndex].rentDays < 1) {
            alert("Item has been removed from the basket.");
            basket.splice(movieIndex, 1);
        } else if (basket[movieIndex].rentDays > 30) {
            alert("Sorry, you cannot rent a movie for more than 30 days. Rent time has been adjusted to 30 days.");
            basket[movieIndex].rentDays = 30;
        }

        alert(`${movie.name} has been updated in your basket. You are renting it for ${basket[movieIndex].rentDays} days.`);
    } else {
        if (movie.rentDays < 1) {
            movie.rentDays = 1;
            alert("Sorry, you cannot rent a movie for less than 1 day. Rent time has been adjusted to 1 day.");
        }
        basket.push(movie);
        alert(`${movie.name} has been added to your basket. You are renting it for ${movie.rentDays} days.`);
    }

    // Save the basket to localStorage
    localStorage.setItem("basket", JSON.stringify(basket));
}
