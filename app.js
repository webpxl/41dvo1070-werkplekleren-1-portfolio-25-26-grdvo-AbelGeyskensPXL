let currentIndex = 0;

function scrollProjects(direction) {
    const carousel = document.getElementById("projectCarousel");
    const slides = carousel.children.length;

    currentIndex += direction;

    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= slides) currentIndex = slides - 1;

    carousel.scrollTo({
        left: carousel.clientWidth * currentIndex,
        behavior: "smooth"
    });
}
