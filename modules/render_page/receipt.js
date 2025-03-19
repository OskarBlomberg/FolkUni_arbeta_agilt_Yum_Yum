import { arrFromStorage } from "../storage/localStorage";

// const receipt = localStorage.getItem("placedOrder")
// console.log(receipt);

function createReceiptOverlay() {

    const placedOrder = arrFromStorage("placedOrder");
console.log(placedOrder);

// Check if placedOrder has data
    if(!placedOrder) {
        console.error('Ingen order att hämta');
        return;
    }

// Create the container for the overlay    
    const receiptOverlay = document.createElement('article');
    receiptOverlay.id = 'receipt-overlay';
// Self-explanatory
    const receiptContent = document.createElement('div');
// Header for overlay
    const receiptHead = document.createElement('h1');
    receiptHead.innerText = 'Kvitto';
    receiptContent.appendChild(receiptHead);
// Fetch order number from placedOrder
    const receiptOrderNumber = document.createElement('p');
    receiptOrderNumber.innerText = `Ordernummer: ${placedOrder.orderID}`;
    receiptContent.appendChild(receiptOrderNumber);
// Fetch item names from placedOrder
    const receiptItems = document.createElement('li');
    placedOrder.items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerText = `${item.name} - ${item.price.toFixed(2)}kr`;
        receiptItems.appendChild(listItem);
    });
    receiptContent.appendChild(receiptItems);

// Add totals
    const receiptTotal = document.createElement('p');
    receiptTotal.innerText = `Betalat: $${placedOrder.receiptTotal.toFixed(2)}`;
    receiptContent.appendChild(receiptTotal);

// Close overlay button
    const closeOverlay = document.createElement('button');
    closeOverlay.innerText = 'Återgå till ordern';
    closeOverlay.onclick = removeOverlay;
    receiptContent.appendChild(closeOverlay);

// Append receipt content
    receiptOverlay.appendChild(receiptContent);

// Append overlay to body
    document.body.appendChild(receiptOverlay);
}

function removeOverlay() {
    const receiptOverlay = document.getElementById('receipt-overlay');
    if (receiptOverlay) {
        receiptOverlay.remove();
    }
}

createReceiptOverlay();