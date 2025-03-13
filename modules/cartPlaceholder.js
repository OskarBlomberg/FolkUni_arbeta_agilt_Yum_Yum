import { orders } from "../modules/storage/lists.js";

const orderHistory = orders.previous
// Placeholder items för ordern
const cartItems = [
    { name: "Item 1", price: 10.00, quantity: 1 },
    { name: "Item 2", price: 15.00, quantity: 1 },
    { name: "Item 3", price: 7.50, quantity: 1 },
    { name: "Item 4", price: 7.50, quantity: 1 },
    { name: "Item 5", price: 7.50, quantity: 1 },
];

// Reference to the container where the items will be added
const orderContainer = document.querySelector('.order-container');
const totalPriceElement = document.getElementById('total-price');

// Prisuppdatering
function updateTotalPrice() {
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // totalPriceElement.textContent = `${totalPrice.toFixed(2)}`;
}

// Function to update the quantity of an item
function updateQuantity(index, change) {
    const item = cartItems[index];
    item.quantity += change;

    // Remove item from cart if quantity is less than 1
    if (item.quantity < 1) {
        cartItems.splice(index, 1); // Remove the item from the cart array
    } else {
        // Ensure quantity does not go below 1
        if (item.quantity < 1) {
            item.quantity = 1;
        }
    }

    // Re-render the cart and update the total price
    populateCart();
    updateTotalPrice();
}

// Function to populate the cart with items and quantity controls
function populateCart() {
    let totalPrice = 0;
    
    // Clear current content
    orderContainer.innerHTML = '';

    // Add each item to the container
    cartItems.forEach((item, index) => {
        totalPrice += item.price * item.quantity;

        const itemElement = document.createElement('div');
        itemElement.classList.add('placeholder__item-element');
        
        const itemName = document.createElement('span');
        itemName.classList.add('item-name');
        itemName.textContent = item.name;

        const itemPrice = document.createElement('span');
        itemPrice.classList.add('item-price');
        itemPrice.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

        // Quantity controls (plus/minus buttons)
        const quantityControls = document.createElement('div');
        quantityControls.classList.add('quantity-controls');

        const minusButton = document.createElement('button');
        minusButton.classList.add('minus-btn');
        minusButton.textContent = '<';
        minusButton.addEventListener('click', () => updateQuantity(index, -1));

        const quantityDisplay = document.createElement('span');
        quantityDisplay.classList.add('quantity-display');
        quantityDisplay.textContent = `x ${item.quantity}`;

        const plusButton = document.createElement('button');
        plusButton.classList.add('plus-btn');
        plusButton.textContent = '>';
        plusButton.addEventListener('click', () => updateQuantity(index, 1));

        quantityControls.appendChild(minusButton);
        quantityControls.appendChild(quantityDisplay);
        quantityControls.appendChild(plusButton);


        // Append elements to item
        itemElement.appendChild(itemName);
        itemElement.appendChild(itemPrice);
        itemElement.appendChild(quantityControls);
        
        
        orderContainer.appendChild(itemElement);
    });

    // Add the sum element at the bottom
    const sumElement = document.createElement('div');
    sumElement.classList.add('placeholder__sum-element');
    
    const totalLabel = document.createElement('span');
    totalLabel.textContent = 'Total';
    
    const totalPriceElement = document.createElement('span');
    totalPriceElement.classList.add('price');
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    
    sumElement.appendChild(totalLabel);
    sumElement.appendChild(totalPriceElement);
    
    orderContainer.appendChild(sumElement);
}

// Function to handle the "Pay" button click
function handlePayment() {

    const orderNumber = Date.now();
    // Add current cart to order history
    const currentOrder = cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        totalPrice: (item.price * item.quantity).toFixed(2)
    }));

    // Add order to order history
    orderHistory.push({
        orderID: orderNumber,
        items: currentOrder,
        // addOns: addOns, // Tillägg som läsk, såser osv osv
        totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)
    });
    console.log(orderHistory)
    // Disable cart (no further modifications allowed)
    document.querySelector('.pay-btn').disabled = true;

    // Push till previous
    orders.previous.push(currentOrder)
    // Push till toRestaurant
    // orderContainer.toRestaurant.push(currentOrder)
    // Clear cart (optional)
    cartItems.length = 0; // Empty the cart
console.log(order.previous)
    // Re-render the cart (which will now be empty) and total price
    populateCart();
    updateTotalPrice();

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
document.querySelector('.pay-btn').addEventListener('click', handlePayment);

// Call the function to populate the cart initially
populateCart();