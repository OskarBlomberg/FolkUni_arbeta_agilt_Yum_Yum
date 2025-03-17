import { adminEventListeners } from "../eventHandlers.js";
import { orders } from "../storage/lists.js";
import { arrFromStorage, arrToStorage } from "../storage/localStorage.js";

// orders.toRestaurant = arrFromStorage(toRestaurant)
let placeholderArr = [
  {
    items: [
      { name: "Item 1", quantity: 1, price: 10, totalPrice: "10.00" },
      { name: "Item 2", quantity: 1, price: 15, totalPrice: "15.00" },
      { name: "Item 3", quantity: 1, price: 7.5, totalPrice: "7.50" },
      { name: "Item 4", quantity: 1, price: 7.5, totalPrice: "7.50" },
    ],
    orderNumber: 1,
    totalPrice: "70.00",
  },
  {
    items: [
      { name: "Item 1", quantity: 1, price: 10, totalPrice: "10.00" },
      { name: "Item 2", quantity: 1, price: 15, totalPrice: "15.00" },
      { name: "Item 3", quantity: 1, price: 7.5, totalPrice: "7.50" },
      { name: "Item 4", quantity: 1, price: 7.5, totalPrice: "7.50" },
    ],
    orderNumber: 2,
    totalPrice: "70.00",
  },
  {
    items: [
      { name: "Item 1", quantity: 1, price: 10, totalPrice: "10.00" },
      { name: "Item 2", quantity: 1, price: 15, totalPrice: "15.00" },
      { name: "Item 3", quantity: 1, price: 7.5, totalPrice: "7.50" },
      { name: "Item 4", quantity: 1, price: 7.5, totalPrice: "7.50" },
    ],
    orderNumber: 3,
    totalPrice: "70.00",
  },
];

export let currentOrder = placeholderArr[0];

export function getQueue() {
  orders.toRestaurant = arrFromStorage("toRestaurant");
}

export function removeFromQueue(index) {
  orders.toRestaurant.splice(index, 1);
  arrToStorage("toRestaurant");
}

export function renderCurrentOrder(current) {
  let currentOrderEl = document.getElementById("current-order");
  let orderTotalPrice = [];
  currentOrderEl.innerHTML = "";

  for (const item of current.items) {
    orderTotalPrice.push(item.totalPrice);
    currentOrderEl.insertAdjacentHTML(
      "beforeend",
      `
      <section class="current-order__sub-item">
        <label class="current-order__check-name">
          <input
            class="current-order__checkbox"
            type="checkbox"
            name="item-ready"
          />
          <h2 class="admin__heading admin__heading--h2">${item.name}</h2>
        </label>
        <p class="current-order__amount">${item.quantity}</p>
        <ul class="current-order__ingredients">
          <li class="current-order__ingredient">Halm</li>
          <li class="current-order__ingredient">Sork</li>
          <li class="current-order__ingredient">Ost</li>
        </ul>
      </section>
      `
    );
  }
  currentOrderEl.insertAdjacentHTML(
    "beforeend",
    `
    <p class="current-order__price">${sumString(orderTotalPrice)} :-</p>
          <button class="button current-order__done-btn" id="done-btn">Avsluta</button>
    `
  );
  console.log(sumString(orderTotalPrice));
  adminEventListeners();
}

function sumString(arr) {
  let total = 0;
  for (const num of arr) {
    total += Number(num);
  }
  return total.toFixed(2);
}
