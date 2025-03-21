import { adminEventListeners } from "../eventHandlers.js";
import { orders } from "../storage/lists.js";
import { arrFromStorage, arrToStorage } from "../storage/localStorage.js";

orders.toRestaurant = arrFromStorage("toRestaurant");

export let currentOrder = orders.toRestaurant[0];

export function getQueue() {
  orders.toRestaurant = arrFromStorage("toRestaurant");
  currentOrder = orders.toRestaurant[0];
}

export function removeFromQueue(index) {
  orders.toRestaurant.splice(index, 1);
  arrToStorage(orders.toRestaurant, "toRestaurant");
}

export function renderCurrentOrder(current) {
  let currentOrderEl = document.getElementById("current-order");
  let orderTotalPrice = [];
  currentOrderEl.innerHTML = "";

  if (current) {
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
        </ul>
      </section>
      `
      );
    }

    currentOrderEl.insertAdjacentHTML(
      "beforeend",
      `
    <p class="current-order__price">${currentOrder.totalPrice} :-</p>
          <button class="button current-order__done-btn" id="done-btn">Avsluta</button>
    `
    );
    adminEventListeners();
  }
  renderFollowingOrders();
}

function renderFollowingOrders() {
  let followingQueue = document.getElementById("admin-following-queue");
  followingQueue.innerHTML = "";
  for (let i = 1; i < orders.toRestaurant.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${orders.toRestaurant[i].orderID} - cirka: ${orders.toRestaurant[i].cookingTime} min`;

    followingQueue.append(li);
  }
}
