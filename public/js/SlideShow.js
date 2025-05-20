let slideIndex = 0;

// Function for automatic slideshow index change
function showSlidesAutomatic() {
    let slides = document.getElementsByClassName("mySlides");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlidesAutomatic, 10000); // Change image every 10 seconds
}

showSlidesAutomatic();