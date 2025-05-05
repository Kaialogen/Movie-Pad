let slideIndex = 0;

//Function calls for automatic and manual slideshows;
showSlidesManual(slideIndex);
showSlidesAutomatic(slideIndex);


//Function for manual slideshow index change
function plusSlides(value) {
    slideIndex += value;
    showSlidesManual(slideIndex);
}

//Function for automatic slideshow index change
function showSlidesManual(n) {
    let slides = document.getElementsByClassName("mySlides");
    if (n < 1) {
        slideIndex = slides.length;
    }

    for (const element of slides) {
        element.style.display = "none";
    }

    if (n > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex-1].style.display = "block";
}

function showSlidesAutomatic(slideIndex) {
    let slides = document.getElementsByClassName("mySlides");
    for (let j = 0; j < slides.length; j++) {
        slides[j].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlidesAutomatic, 10000); // Change image every 10 seconds
}