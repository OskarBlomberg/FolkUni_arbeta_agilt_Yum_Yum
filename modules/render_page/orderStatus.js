import { orders } from "../storage/lists.js";
import { arrFromStorage, objFromStorage } from "../storage/localStorage.js";
import { randomInRange } from "../utility.js";

export default function renderOrderStatus() {
  orders.toRestaurant = arrFromStorage("toRestaurant");
  orders.placedOrder = objFromStorage("placedOrder");
  orderNumberToPage(orders.placedOrder);
  renderEta();
}

//const latestOrder = arrFromStorage("previous)[-1]");

let totalQueue = countQueue(orders.toRestaurant);
let etaInterval;

export function startEtaInterval() {
  if (!etaInterval) {
    etaInterval = setInterval(() => {
      if (window.location.pathname === "/pages/order-status.html") {
        renderEta();
      } else {
        clearEtaInterval();
      }
    }, 60000);
  }
}

export function clearEtaInterval() {
  clearInterval(etaInterval);
  etaInterval = null;
}

// Går igenom kö-arrayen, för varje order-objekt tittar den om typen är wonton och lägger antalet, varpå det totala antalet returneras
export function countQueue(orders) {
  let courseCount = 0;

  for (const order of orders) {
    for (const item of order.items) {
      if (item.type === "wonton") {
        courseCount += item.quantity;
      }
    }
  }
  return courseCount;
}

// lägger på en slumpad tillagningstid för varje wonton
export function addCookingTime(arr) {
  let courseCount = 0;
  let cookingTime = 0;
  for (const item of arr) {
    if (item.type === "wonton") {
      courseCount += item.quantity;
    }
  }
  for (let i = courseCount; i > 0; i--) {
    cookingTime += randomInRange(2, 4);
  }
  return cookingTime;
}

// Räkna ut sammanlagd kö
function calcQueueTime(arr) {
  let total = 0;
  for (const entry of arr) {
    total += entry.cookingTime;
  }
  return total;
}

// Skriv ut ordernummer
export function orderNumberToPage(order) {
  document.getElementById("order-number").textContent = order.orderID;
}

// Räkna ut kötid
export function calcEta(_orderNumber) {
  const totalQueueTime = calcQueueTime(orders.toRestaurant);

  let timeSincePlacedOrder = Math.floor(
    (Date.now() - Number(orders.placedOrder.orderID)) / 1000 / 60
  );

  return totalQueueTime - timeSincePlacedOrder;
}

// Skriv ut ETA
export function renderEta(_orderNumber) {
  let totalTimeLeft = calcEta();

  if (totalTimeLeft > 0) {
    const etaEl = document.getElementById("order-eta__amount");
    etaEl.textContent = totalTimeLeft;
  } else {
    const etaContainer = document.getElementById("order-eta");
    etaContainer.textContent = "Din order är redo att hämtas";
  }

  // etaEl.textContent = clockTimePlusEta(totalQueueTime); // ger ETA i klocktid (ska använda riktiga kötiden)
}

/* // Alternativ tidshantering:
export function clockTimePlusEta(itemsInQueue) {
  const date = new Date();
  const nowPlusMinutes = new Date(date.getTime() + itemsInQueue * 60 * 1000);
  return nowPlusMinutes.toLocaleTimeString("sv-SE", {
    timeZone: "Europe/Stockholm",
    hour: "2-digit",
    minute: "2-digit",
  });
}
 */
