// det måste finnas en kö med alla ordrar och deras innehåll
// varje MATrätt ska generera ett slumptal mellan 5-10 min, och summan ska sparas i ordern
// väntetiden för en order ska vara total kö för alla ordrar + summan av orderns egen kötid
// när en order avslutas tas orderns tid bort från totaltiden, (optimalt vore om alla ordrars eta uppdateras)
// eta ska räkna ner varje minut

// Alternativ funktionalitet: generera beräknat klockslag när ordern väntas vara klar och spara i local storage ihop med ordern

import { orders } from "../storage/lists.js";
import { arrFromStorage, objFromStorage } from "../storage/localStorage.js";
import { randomInRange } from "../utility.js";

//const latestOrder = arrFromStorage("previous)[-1]");

let totalQueue = countQueue(orders.toRestaurant);
const newOrderBtn = document.getElementById("new-order-btn");
const receiptBtn = document.getElementById("receipt-btn");

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

function addEtaToOrder(amount) {
  let total = 0;
  for (let i = 1; i <= amount; i++) {
    total += randomInRange(2, 5); // lägger på 2-5 minuter per rätt
  }
  return total;
}

// Skriv ut ordernummer
export function orderNumberToPage(order) {
  document.getElementById("order-number").textContent = order.orderID;
}

// Sammanställ och skriv ut ETA
export function renderEta(orderNumber) {
  const etaEl = document.getElementById("order-eta");

  const orderTime = addEtaToOrder(totalQueue); // argument ska vara orderNumber.numberOfCourses

  /* etaEl.textContent = orderTime + placeHolderQueue; */ // Om man vill ha ETA i minuter

  etaEl.textContent = clockTimePlusEta(orderTime); // ger ETA i klocktid (ska använda riktiga kötiden)
  // placeHolderQueue += orderTime; // ska uppdatera totalQueueTime
}

// Alternativ tidshantering:
export function clockTimePlusEta(itemsInQueue) {
  const date = new Date();
  const nowPlusMinutes = new Date(date.getTime() + itemsInQueue * 60 * 1000);
  return nowPlusMinutes.toLocaleTimeString("sv-SE", {
    timeZone: "Europe/Stockholm",
    hour: "2-digit",
    minute: "2-digit",
  });
}
