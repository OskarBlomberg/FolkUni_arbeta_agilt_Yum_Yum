// Object to store item quantities
let counts = {};
// Object to store item prices
let prices = {};
// Variable to store the total price of items in the cart
let total = 0;

// Function to calculate the total number of items in the cart
const calculateCartTotal = () => {
  let total = 0;
  for (let key in counts) {
    total = total + counts[key]; // Summing up item quantities
  }
  document.querySelector(".cart_count").textContent = total; // Update cart count in UI
  return total; // Return the total number of items
};

// Execute once the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Select all plus and minus buttons
  const plusButtons = document.querySelectorAll(".plus_btn");
  const minusButtons = document.querySelectorAll(".minus_btn");

  // Attach event listeners to plus buttons
  plusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const count = button.closest(".menu_controls").querySelector(".count");
      const value = count.textContent;
      count.textContent = parseInt(value) + 1; // Increase count by 1

      const menuItem = button.closest(".menu_item"); // Get menu item container
      const name = menuItem.querySelector("#name").textContent; // Get item name
      const price = parseInt(menuItem.querySelector("#price").textContent); // Get item price

      counts[name] = parseInt(value) + 1; // Store updated quantity
      prices[name] = price; // Store price

      calculateCartTotal(); // Update cart count in UI
    });
  });

  // Attach event listeners to minus buttons
  minusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const count = button.closest(".menu_controls").querySelector(".count");
      const value = count.textContent;
      count.textContent = Math.max(parseInt(value) - 1, 0); // Decrease count but not below 0

      const menuItem = button.closest(".menu_item"); // Get menu item container
      const name = menuItem.querySelector("#name").textContent; // Get item name
      const price = parseInt(menuItem.querySelector("#price").textContent); // Get item price

      counts[name] = parseInt(value) - 1; // Store updated quantity
      prices[name] = price; // Store price

      calculateCartTotal(); // Update cart count in UI
    });
  });

  // Get cart and menu elements
  const cartButton = document.getElementById("cart-btn");
  const closeCartButton = document.getElementById("close-cart-btn");
  const menuContent = document.getElementById("menu-content");
  const cartContent = document.getElementById("cart-content");
  const cartListContent = document.getElementById("cart-list-content");
  const totalPriceSpan = document.getElementById("total_price");
  const cartItem = document.getElementById("cart_item");

  // Show cart when cart button is clicked
  cartButton.addEventListener("click", function () {
    const cartTotal = calculateCartTotal(); // Get total number of items

    if (cartTotal === 0) {
      alert("Your cart is empty"); // Show alert if cart is empty
      return;
    }

    for (let key in counts) {
      const item = cartItem.cloneNode(true); // Clone cart item template
      item.classList.add("dynamic_cart_item"); // Add class for dynamic items

      item.querySelector("#cart_item_name").textContent = key; // Set item name
      item.querySelector(
        "#cart_item_calculation"
      ).textContent = `${counts[key]} x ${prices[key]}`; // Set quantity and price
      item.querySelector("#cart_item_price").textContent =
        counts[key] * prices[key]; // Set total item price

      cartListContent.appendChild(item); // Append item to cart list
      total = total + counts[key] * prices[key]; // Update total cart price
    }

    cartItem.classList.add("d-none"); // Hide template item
    totalPriceSpan.textContent = total; // Display total price
    cartContent.classList.remove("d-none"); // Show cart
    menuContent.classList.add("d-none"); // Hide menu
  });

  // Close cart and return to menu
  closeCartButton.addEventListener("click", function () {
    cartContent.classList.add("d-none"); // Hide cart
    menuContent.classList.remove("d-none"); // Show menu
    cartItem.classList.remove("d-none"); // Show template item

    document.querySelectorAll(".dynamic_cart_item").forEach((item) => {
      item.remove(); // Remove all dynamically added cart items
    });

    total = 0; // Reset total price
  });
});
