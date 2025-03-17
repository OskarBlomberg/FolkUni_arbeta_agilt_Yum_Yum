export function imageCarousel() {
    const images = [
        "https://images.unsplash.com/photo-1666278170490-2b2a71939340?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1686538381343-ff6de76c8712?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1683141382715-668a4e0a615d?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];

    let currentIndex = 0;
    const imageElement = document.querySelector(".image-carousel img");
    const arrows = document.querySelectorAll(".material-icons");

    // Gjør at bildene endres når man klikker på pilene
    function changeImage(direction) {
        currentIndex = direction === "right" ? (currentIndex + 1) % images.length : (currentIndex - 1 + images.length) % images.length;
        imageElement.src = images[currentIndex];
    }

    //legger til eventlisteners på pilene
    arrows.forEach(arrow => {
        arrow.addEventListener("click", () => {
            changeImage(arrow.dataset.direction);
        });
    });

    // Vis første bilde ved oppstart
    imageElement.src = images[currentIndex];
}
