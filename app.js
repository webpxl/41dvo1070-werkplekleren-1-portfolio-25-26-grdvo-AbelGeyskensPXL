let currentIndex = 0;
let showingAfter = false;

let photoIndex = 0;

function scrollProjects(direction) {
    const carousel = document.getElementById("projectCarousel");
    const slides = carousel.children.length;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = slides - 1;
    }

    if (currentIndex >= slides) {
        currentIndex = 0;
    }

    carousel.scrollTo({
        left: carousel.clientWidth * currentIndex,
        behavior: "smooth"
    });
}

function getCurrentPhotoImage() {
    const carousel = document.getElementById("photoCarousel");
    if (!carousel || !carousel.children.length) return null;

    const slide = carousel.children[photoIndex];
    if (!slide) return null;

    return slide.querySelector("img");
}

function updateCurrentPhotoDisplay() {
    const img = getCurrentPhotoImage();
    const btn = document.querySelector(".photo-toggle-btn");

    if (!img || !btn) return;

    const beforeSrc = img.getAttribute("data-before");
    const afterSrc = img.getAttribute("data-after");

    if (showingAfter) {
        img.src = afterSrc;
        btn.textContent = "Toon voor bewerking";
    } else {
        img.src = beforeSrc;
        btn.textContent = "Toon na bewerking";
    }
}

function scrollPhotos(direction) {
    const carousel = document.getElementById("photoCarousel");
    if (!carousel) return;

    const slides = carousel.children.length;
    if (!slides) return;

    photoIndex += direction;

    if (photoIndex < 0) {
        photoIndex = slides - 1;
    }

    if (photoIndex >= slides) {
        photoIndex = 0;
    }

    carousel.scrollTo({
        left: carousel.clientWidth * photoIndex,
        behavior: "smooth"
    });

    updateCurrentPhotoDisplay();
}

function togglePhoto() {
    showingAfter = !showingAfter;
    updateCurrentPhotoDisplay();
}

document.addEventListener("DOMContentLoaded", () => {
    updateCurrentPhotoDisplay();
});
