import { arrFromStorage } from "../storage/localStorage.js";

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

export function renderCurrentOrder(current) {
  let currentOrderEl = document.getElementById("current-order");
  currentOrderEl.innerHTML = "";
  console.log(current);
  for (const item of current.items) {
    currentOrderEl.insertAdjacentHTML(
      "beforeend",
      `
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
        `
    );
  }
}
