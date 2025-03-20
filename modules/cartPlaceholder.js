import { orders } from "../modules/storage/lists.js";
import {
  objFromStorage,
  objToStorage,
  arrToStorage,
  arrFromStorage,
} from "./storage/localStorage.js";
import { updateItemCounts, updateCartIcon } from "./render_page/menuPage.js";
import { addCookingTime } from "./render_page/orderStatus.js";

const orderHistory = arrFromStorage("toRestaurant");
const currentCartItems = objFromStorage("currentOrder");
let cartItems = Object.values(currentCartItems);
console.log(typeof cartItems);

const orderContainer = document.querySelector(".order-container");
const totalPriceElement = document.getElementById("total-price");
console.log(cartItems);

// Prisuppdatering
function updateTotalPrice() {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // totalPriceElement.textContent = `${totalPrice.toFixed(2)}`;
}

// Function to update the quantity of an item
function updateQuantity(index, change) {
  const item = cartItems[index];

  // Update the item quantity
  item.quantity += change;

  // Ensure quantity is at least 1
  if (item.quantity < 1) {
    // Remove the item from the cart object and from local storage
    delete currentCartItems[item.id];
    // Save the updated cart to local storage (with item removed)
    objToStorage(currentCartItems, "currentOrder");
  } else {
    // Update local storage if the item quantity is still valid
    objToStorage(currentCartItems, "currentOrder");
  }

  // Re-render the cart and update the total price
  populateCart();
  updateTotalPrice();
  updateItemCounts();
  updateCartIcon();
}

// Function to populate the cart with items and quantity controls
function populateCart() {
  cartItems = Object.values(currentCartItems);
  let totalPrice = 0;

  // Clear current content
  orderContainer.innerHTML = "";

  // Add each item to the container
  cartItems.forEach((item, index) => {
    totalPrice += item.price * item.quantity;

    const itemElement = document.createElement("div");
    itemElement.classList.add("placeholder__item-element");

    const itemName = document.createElement("span");
    itemName.classList.add("item-name");
    itemName.textContent = item.name;

    const itemPrice = document.createElement("span");
    itemPrice.classList.add("item-price");
    itemPrice.textContent = `${(item.price * item.quantity).toFixed(2)}kr`;

    // Quantity controls (plus/minus buttons)
    const quantityControls = document.createElement("div");
    quantityControls.classList.add("quantity-controls");

    const minusButton = document.createElement("button");
    minusButton.classList.add("minus-btn");
    minusButton.textContent = "<";
    minusButton.addEventListener("click", () => updateQuantity(index, -1));

    console.log(objFromStorage("currentOrder"));

    const quantityDisplay = document.createElement("span");
    quantityDisplay.classList.add("quantity-display");
    quantityDisplay.textContent = `x ${item.quantity}`;

    const plusButton = document.createElement("button");
    plusButton.classList.add("plus-btn");
    plusButton.textContent = ">";
    plusButton.addEventListener("click", () => updateQuantity(index, 1));

    quantityControls.appendChild(minusButton);
    quantityControls.appendChild(quantityDisplay);
    quantityControls.appendChild(plusButton);

    // Append elements to item
    itemElement.appendChild(itemName);
    itemElement.appendChild(itemPrice);
    itemElement.appendChild(quantityControls);

    orderContainer.appendChild(itemElement);
    updateCartIcon();
  });

  // Add the sum element at the bottom
  const sumElement = document.createElement("div");
  sumElement.classList.add("placeholder__sum-element");

  const totalLabel = document.createElement("span");
  totalLabel.textContent = "Total";

  const totalPriceElement = document.createElement("span");
  totalPriceElement.classList.add("price");
  totalPriceElement.textContent = `${totalPrice.toFixed(2)}kr`;

  sumElement.appendChild(totalLabel);
  sumElement.appendChild(totalPriceElement);

  orderContainer.appendChild(sumElement);

  //uppdatera item counts där det är nödvändigt
  // addItem()
  // removeItem()
  updateItemCounts();
}

// Function to handle the "Pay" button click
function handlePayment() {
  // const saveToRestaurant = objFromStorage("orderHistory") || {}
  // objToStorage(toRestaurant)

  const orderNumber = Date.now();
  // Add current cart to order history
  const currentOrder = cartItems.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    type: item.type,
    price: item.price,
    totalPrice: (item.price * item.quantity).toFixed(2),
  }));

  // Add order to order history
  let ongoingOrder = {
    orderID: orderNumber,
    items: currentOrder,
    cookingTime: addCookingTime(currentOrder), // slumpar koktid baserat på antal wontons
    // addOns: addOns, // Tillägg som läsk, såser osv osv
    totalPrice: cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2),
  };
  orderHistory.push(ongoingOrder);

  arrToStorage(orderHistory, "toRestaurant");

  // Clear cart
  objToStorage(ongoingOrder, "placedOrder"); // Empty the cart

  localStorage.removeItem("currentOrder");

  populateCart();
  updateTotalPrice();

  window.location.href = "/pages/order-status.html";
  // arrToStorage(currentOrder)
  // Display the completed order (without the ability to change it)
  // displayOrderHistory();
}

// // Function to display completed orders in a new section
// function displayOrderHistory() {
//     const orderHistoryContainer = document.querySelector('.order-history-container');
//     // orderHistoryContainer.innerHTML = ''; // Clear previous orders

//     orderHistory.forEach(order => {
//         const orderElement = document.createElement('div');
//         orderElement.classList.add('order-history-item');

//         const orderTitle = document.createElement('h3');
//         orderTitle.textContent = `Order #${order.orderNumber} (Total: $${order.totalPrice})`;

//         const itemsList = document.createElement('ul');
//         order.items.forEach(item => {
//             const itemElement = document.createElement('li');
//             itemElement.textContent = `${item.name} - Qty: ${item.quantity} - $${item.totalPrice}`;
//             itemsList.appendChild(itemElement);
//         });

//         orderElement.appendChild(orderTitle);
//         orderElement.appendChild(itemsList);

//         // orderHistoryContainer.appendChild(orderElement);
//     });
// }

// Event listener to the pay button
document.querySelector(".pay-btn").addEventListener("click", handlePayment);

// Call the function to populate the cart initially
populateCart();
