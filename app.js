let currentIndex = 0;
let showingAfter = false;

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

function togglePhoto() {
    const img = document.getElementById("photoCompare");
    const btn = document.querySelector(".photo-toggle-btn");

    if (showingAfter) {
        img.src = "Assets/photo_before.png";
        btn.textContent = "Toon na bewerking";
    } else {
        img.src = "Assets/photo_after.png";
        btn.textContent = "Toon voor bewerking";
    }

    showingAfter = !showingAfter;
}
