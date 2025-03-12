// AI genererad placeholder-kod för att populera kundvagnen

// Example data for the cart with quantity
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

// Function to update the total price based on current cart items
function updateTotalPrice() {
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to update the quantity of an item
function updateQuantity(index, change) {
    cartItems[index].quantity += change;
    if (cartItems[index].quantity < 1) {
        cartItems[index].quantity = 1; // Don't allow quantity to go below 1
    }
    populateCart(); // Re-render the cart
    updateTotalPrice(); // Recalculate total price
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

// Call the function to populate the cart initially
populateCart();
updateTotalPrice();