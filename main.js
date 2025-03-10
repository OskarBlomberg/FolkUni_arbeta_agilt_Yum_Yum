import { renderNav } from "./modules/render_page/navBar.js";

if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html"
) {
  // index
  console.log("index");
} else if (window.location.pathname === "/pages/about-us.html") {
  // Om oss
  console.log("about us");
} else if (window.location.pathname === "/pages/admin.html") {
  // Admin
  console.log("admin");
} else if (window.location.pathname === "/pages/cart.html") {
  // Kundvagn
  console.log("cart");
} else if (window.location.pathname === "/pages/find-us.html") {
  // Hitta oss
  console.log("find us");
} else if (window.location.pathname === "/pages/order-status.html") {
  // Orderstatus
  console.log("order status");
} else if (window.location.pathname === "/pages/our-menu.html") {
  // Vår meny
  console.log("our menu");
} else if (window.location.pathname === "/pages/receipt.html") {
  // Kvitto
  console.log("receipt");
}

renderNav(window.location.pathname);
