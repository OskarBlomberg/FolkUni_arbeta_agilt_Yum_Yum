export function randomFiveToTen() {
  return Math.floor(Math.random() * 6) + 5; // 5, 6, 7, 8, 9, 10
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