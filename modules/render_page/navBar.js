import { objFromStorage } from "../storage/localStorage.js";

let placedOrder = objFromStorage("placedOrder");

const hamburger = document.getElementById("nav-list");
const items = [
  { path: "/index.html", altPath: "/", text: "Startsida" },
  { path: "/pages/our-menu.html", text: "Vår meny" },
  { path: "/pages/find-us.html", text: "Hitta oss" },
  { path: "/pages/about-us.html", text: "Om oss" },
  { path: "/pages/order-status.html", text: "Senaste order" },
];

export function renderNav(currentPage) {
  for (const item of items) {
    if (
      !(item.path == currentPage || item.altPath == currentPage) &&
      !(
        (
          item.path === "/pages/order-status.html" &&
          Object.keys(placedOrder).length === 0
        ) // tomma objekt är truthy, därav denna workaround
      )
    ) {
      const li = document.createElement("li");
      const a = document.createElement("a");

      li.classList.add("hamburger-menu__item");
      a.classList.add("hamburger-menu__link");
      a.href = item.path;
      a.textContent = item.text;

      li.append(a);
      hamburger.append(li);
    }
  }
}
