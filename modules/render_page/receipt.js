import { arrFromStorage } from "../storage/localStorage.js";

function createReceipt() {

  const placedOrder = arrFromStorage("placedOrder");
  console.log(placedOrder);

  // Check if placedOrder has data
  if (!placedOrder) {
    console.error("Ingen order att hämta");
    return;
  }


// Set parent element
  const receiptContainer = document.getElementById('receipt-container');
  const rcWrapper = document.createElement('div');
  rcWrapper.classList.add('receipt-wrapper');
  receiptContainer.appendChild(rcWrapper);

// Fetch order number  
  const rcOrderNumber = document.createElement('h3');
  rcOrderNumber.innerText = `Ordernummer: ${placedOrder.orderID}`;
  rcWrapper.appendChild(rcOrderNumber);

// Make separate container for ordered items for styling purposes
  const rcItemContainer = document.createElement('div');
  rcItemContainer.classList.add('rc__item-container');
  // rcItemContainer.innerText = 'Namn' + 'Antal' + 'Pris';
  rcWrapper.appendChild(rcItemContainer);
  const rcItemHeaderName = document.createElement('p');
  rcItemHeaderName.innerText ='Namn:';
  const rcItemHeaderQnt = document.createElement('p');
  rcItemHeaderQnt.innerText ='Antal:';
  const rcItemHeaderPrice = document.createElement('p');
  rcItemHeaderPrice.innerText ='Pris:';
  rcItemContainer.appendChild(rcItemHeaderName);
  rcItemContainer.appendChild(rcItemHeaderQnt);
  rcItemContainer.appendChild(rcItemHeaderPrice);

// Fetch items, quantities and price and put these into rcItemContainer

  const rcContainer = document.createElement('section');
  rcContainer.classList.add('rc__container');
  rcWrapper.appendChild(rcContainer);
  const rcItemWrapper = document.createElement('div');
  rcItemWrapper.classList.add('rc__item-name');
  rcContainer.appendChild(rcItemWrapper);
  placedOrder.items.forEach(item => {
    const rcItemName = document.createElement('li');
    rcItemName.innerText = `${item.name}`;
    rcItemWrapper.appendChild(rcItemName);
  }); 
    // for quantitiy
  const rcQntWrapper = document.createElement('div');
  rcQntWrapper.classList.add('rc__item-qnt');
  rcContainer.appendChild(rcQntWrapper);
    placedOrder.items.forEach(item => {
      const rcItemQnt = document.createElement('li');
      rcItemQnt.innerText = `x${item.quantity}`;
      rcQntWrapper.appendChild(rcItemQnt);
    });
    // for price
    const rcPriceWrapper = document.createElement('div');
    rcPriceWrapper.classList.add('rc__item-price');
    rcContainer.appendChild(rcPriceWrapper);
      placedOrder.items.forEach(item => {
        const rcItemPrice = document.createElement('li');
        rcItemPrice.innerText = `${item.totalPrice}kr`;
        rcPriceWrapper.appendChild(rcItemPrice);
  });  

  const rcFooter = document.createElement('div');
  rcFooter.classList.add('rc__footer');
  receiptContainer.appendChild(rcFooter);
  const rcTotalPrice = document.createElement('h3');
  rcTotalPrice.classList.add('rc__sum-total');
  rcTotalPrice.innerText = `Betalat: ${placedOrder.totalPrice}kr`
  rcFooter.appendChild(rcTotalPrice);


}

createReceipt();
