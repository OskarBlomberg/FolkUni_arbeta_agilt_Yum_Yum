// det måste finnas en kö med alla ordrar och deras innehåll
// varje MATrätt ska generera ett slumptal mellan 5-10 min, och summan ska sparas i ordern
// väntetiden för en order ska vara total kö för alla ordrar + summan av orderns egen kötid
// när en order avslutas tas orderns tid bort från totaltiden, (optimalt vore om alla ordrars eta uppdateras)
// eta ska räkna ner varje minut

// Alternativ funktionalitet: generera beräknat klockslag när ordern väntas vara klar och spara i local storage ihop med ordern

import { orders } from "../storage/lists.js";
import { arrFromStorage } from "../storage/localStorage.js";
import { randomFiveToTen } from "/..modules/utility.js";

// const orders = arrFromStorage(resturantsOrders);
// const latestOrder = arrFromStorage(customersOrders)[-1];
let placeHolderAmount = 3; // Ska ersättas med kundens aktuella MATorder (från localStorage)
let placeHolderQueue = 12; // Ska ersättas med totalkö
const queueBefore = countQueue(orders.toRestaurant);
const newOrderBtn = document.getElementById("new-order-btn");
const receiptBtn = document.getElementById("receipt-btn");

function countQueue(orders) {
  let courseCount = 0;
  for (const item of orders) {
    courseCount += item.courseAmount;
  }
  return courseCount;
}

function addEtaToOrder(amount) {
  let total = 0;
  for (let i = 1; i <= amount; i++) {
    total += randomFiveToTen();
  }
  return total;
}

// Skriv ut ordernummer
export function orderNumberToPage(orderNumber) {
  document.getElementById("order-number").textContent = orderNumber;
}

// Sammanställ och skriv ut ETA
export function renderEta(orderNumber) {
  const etaEl = document.getElementById("order-eta");

  const orderTime = addEtaToOrder(placeHolderAmount); // argument ska vara orderNumber.numberOfCourses

  /* etaEl.textContent = orderTime + placeHolderQueue; */ // Om man vill ha ETA i minuter

  etaEl.textContent = clockTimePlusEta(orderTime, placeHolderQueue); // ger ETA i klocktid (ska använda riktiga kötiden)
  placeHolderQueue += orderTime; // ska uppdatera totalQueueTime
}

// Alternativ tidshantering:
export function clockTimePlusEta(order, queue) {
  const date = new Date();
  const nowPlusMinutes = new Date(date.getTime() + (order + queue) * 60 * 1000);
  return nowPlusMinutes.toLocaleTimeString("sv-SE", {
    timeZone: "Europe/Stockholm",
    hour: "2-digit",
    minute: "2-digit",
  });
}
