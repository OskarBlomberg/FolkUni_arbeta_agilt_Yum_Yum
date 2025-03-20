export function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function goToFindUs() {
  const findUsRef = document.querySelector(".findUsButton");
  findUsRef.addEventListener("click", () => {
    window.location.href = "/pages/find-us.html";
  });
}

export function goToMenu() {
  const findUsRef = document.querySelector(".menuButton");
  findUsRef.addEventListener("click", () => {
    window.location.href = "/pages/our-menu.html";
  });
}

export function goToCart() {
  const gotoCartBtnRef = document.querySelector('.menu__footer-btn');
  gotoCartBtnRef.addEventListener('click', () => {
    window.location.href = "/pages/cart.html"
  })
}