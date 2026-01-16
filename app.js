let currentIndex = 0;
let showingAfter = false;

let photoIndex = 0;

function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}

function getMostVisibleSlideIndex(carousel) {
    if (!carousel || !carousel.children.length) return 0;

    const viewport = carousel.getBoundingClientRect();
    let bestIndex = 0;
    let bestVisible = -1;

    const slides = Array.from(carousel.children);

    for (let i = 0; i < slides.length; i++) {
        const rect = slides[i].getBoundingClientRect();

        const visibleLeft = Math.max(rect.left, viewport.left);
        const visibleRight = Math.min(rect.right, viewport.right);
        const visibleWidth = Math.max(0, visibleRight - visibleLeft);

        if (visibleWidth > bestVisible) {
            bestVisible = visibleWidth;
            bestIndex = i;
        }
    }

    return bestIndex;
}

function setProjectCarouselHeight(index) {
    const carousel = document.getElementById("projectCarousel");
    if (!carousel || !carousel.children.length) return;

    const i = clamp(index, 0, carousel.children.length - 1);
    const slide = carousel.children[i];
    if (!slide) return;

    const height = Math.ceil(slide.offsetHeight);
    if (height > 0) {
        carousel.style.height = height + "px";
    }
}

function syncProjectCarouselToVisibleSlide() {
    const carousel = document.getElementById("projectCarousel");
    if (!carousel || !carousel.children.length) return;

    const idx = getMostVisibleSlideIndex(carousel);
    currentIndex = idx;
    setProjectCarouselHeight(idx);
}

function scrollProjects(direction) {
    const carousel = document.getElementById("projectCarousel");
    if (!carousel || !carousel.children.length) return;

    const slides = carousel.children.length;

    currentIndex += direction;

    if (currentIndex < 0) currentIndex = slides - 1;
    if (currentIndex >= slides) currentIndex = 0;

    setProjectCarouselHeight(currentIndex);

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

    if (photoIndex < 0) photoIndex = slides - 1;
    if (photoIndex >= slides) photoIndex = 0;

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

    const projectCarousel = document.getElementById("projectCarousel");
    if (projectCarousel) {
        projectCarousel.style.transition = "height 200ms ease";

        let rafId = null;
        projectCarousel.addEventListener("scroll", () => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                rafId = null;
                syncProjectCarouselToVisibleSlide();
            });
        });

        const imgs = projectCarousel.querySelectorAll("img");
        imgs.forEach((img) => {
            if (img.complete) return;
            img.addEventListener("load", syncProjectCarouselToVisibleSlide);
        });

        if ("ResizeObserver" in window) {
            const ro = new ResizeObserver(() => {
                syncProjectCarouselToVisibleSlide();
            });

            Array.from(projectCarousel.children).forEach((slide) => ro.observe(slide));
            ro.observe(projectCarousel);
        }

        syncProjectCarouselToVisibleSlide();
        window.addEventListener("resize", syncProjectCarouselToVisibleSlide);
        window.addEventListener("load", syncProjectCarouselToVisibleSlide);
    }
});
