import { fetchMenuItems } from "../api.js";
import { orders } from "../storage/lists.js";
import { objToStorage, objFromStorage } from "../storage/localStorage.js";


//ladda menyn
const menuItems = await getMenuItems()
renderMenuItem(menuItems);

//hämta menyArray
async function getMenuItems() {
    let response = await fetchMenuItems();
    // för att komma åt arrayen så används nyckeln items
    let itemsArray = response.items
    return itemsArray;
}

async function renderMenuItem(menuItems) {
    const menuRef = document.querySelector('#menuItemsContainer');

    for (let item of menuItems) {
        let menuItem = createFoodItem(item)
        menuRef.appendChild(menuItem)
    }

    updateItemCounts();
}

//Skapa Item object
function createFoodItem(menuItem) {
    let itemRef = document.createElement('article');
    itemRef.classList.add('menuItem');
    itemRef.dataset.itemId = menuItem.id;

    const menuItemTemp = `
        <div class="menu__Item">
            <div class="menu__item-title">
                <h2 class="menu__name">${menuItem.name}</h2>

                <h2 class="menu__price">${menuItem.price} kr</h2>
            </div>
                <h3 class="menu__desc">${menuItem.description}</h3>
        <div class="menu__controls">
            <button class="menu__btn menuMinusBtn">-</button>
            <span class="count" id="count">0</span>
            <button class="menu__btn menuPlusBtn">+</button>
        </div>
        <div class="line"></div>
        </div>
    `;
    itemRef.innerHTML = menuItemTemp;

    addItem(itemRef, menuItem);
    removeItem(itemRef, menuItem);

    return itemRef;
}

//Lägg till i localstorage
function addToCart(item) {
    if (!orders.current[item.id]) {
        orders.current[item.id] = { ...item, quantity: 1 }
    } else {
        orders.current[item.id].quantity++;
    }
    objToStorage(orders.current, 'currentOrder')
    console.log(orders.current);
}

//ta bort från localstorage
function removeFromCart(item) {
    if (orders.current[item.id]) {
        if (orders.current[item.id].quantity > 1) {
            orders.current[item.id].quantity--;
        } else {
            delete orders.current[item.id];
        }
        objToStorage(orders.current, 'currentOrder');
        console.log(orders.current);
    }
}

//ta bort 1 när man trycker på minusknappen
function removeItem(itemRef, menuItem) {
    const minusButton = itemRef.querySelector(".menuMinusBtn");

    minusButton.addEventListener('click', () => {
        removeFromCart(menuItem);
        updateItemCounts();
        updateCartIcon();
    });
}

//adderar 1 när man trycker på plusknappen
function addItem(itemRef, menuItem) {
    const plusButton = itemRef.querySelector(".menuPlusBtn");

    plusButton.addEventListener('click', () => {
        addToCart(menuItem); // Lägg till objektet i kundvagnen
        updateItemCounts(); // Uppdatera alla count-element på sidan
        updateCartIcon();
    });
}

window.addEventListener('load', () => {
    const saveOrder = objFromStorage('currentOrder')
    orders.current = saveOrder;

    updateItemCounts();
});

//updatera antalet på alla objekt från localstorage
export function updateItemCounts() {
    const countRef = document.querySelectorAll('.count');

    countRef.forEach((countElement) => {
        const itemId = countElement.closest('.menuItem').dataset.itemId;
        const itemCount = orders.current[itemId] ? orders.current[itemId].quantity : 0;

        countElement.textContent = itemCount;
    });
}

export function updateCartIcon() {
    //henter den lagrede ordren fra localstorage
    const savedOrder = objFromStorage('currentOrder') || {};
    console.log('Saved Order:', savedOrder);  //logger eventuelle bugger

    //Beregner totalt antall varer i ordren
    const itemCount = Object.values(savedOrder).reduce((sum, item) => {
        // Sjekker om varen og antallet er gyldig
        if (item && item.quantity) {
            return sum + item.quantity;  //legger til antall
        }
        return sum; 
    }, 0);

    const cartElement = document.querySelector('.cart');
    const countElement = document.querySelector('.cart_count');

    console.log('Item Count:', itemCount);  //Sjekker antallet i handlekurv
    countElement.textContent = itemCount;  // Oppdaterer antallet som vises

    //Gjør at handlekurven skjules om den er tom og vises om ligger noe i den
    if (itemCount === 0) {
        cartElement.style.display = 'none';
    } else {
        cartElement.style.display = 'flex';
        countElement.style.display = 'flex';
    }
}


