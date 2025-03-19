import { fetchMenuItems } from "../api.js";
import { orders } from "../storage/lists.js";
import {
  objToStorage,
  objFromStorage,
  arrToStorage,
} from "../storage/localStorage.js";
import { goToCart } from "../utility.js";

//ladda menyn
export const menuItems = await getMenuItems();
if (window.location.pathname === "/pages/our-menu.html") {
  await renderMenuItem(menuItems);
}

//hämta menyArray
export async function getMenuItems() {
  let response = await fetchMenuItems();
  // för att komma åt arrayen så används nyckeln items
  let itemsArray = response.items;
  return itemsArray;
}

async function renderMenuItem(menuItems) {
  const menuRef = document.querySelector("#menuItemsContainer");
  const wontonRef = document.querySelector('#menu__wonton')
  const drinkRef = document.querySelector('#menu__dricka');
  const dipRef = document.querySelector('#menu__dip');
//   const addonsdrinkRef = document.querySelector("#addonsdrink");
//   const addonsdipRef = document.querySelector("#addonsdip");

  for (let item of menuItems) {
	if(item.type === "wonton") {
		let wontonItem = createFoodItem(item);
		wontonRef.appendChild(wontonItem);
	} else if(item.type === "drink") {
		let drinkItem = createFoodItem(item);
		drinkRef.appendChild(drinkItem);
	} else {
		let dipItem = createFoodItem(item);
		dipRef.appendChild(dipItem);
	}
  }

  //   if (item.type === "dip" || item.type === "drink") {
  //     createAddonsItem(item);
  //   } else {
  //     let foodItem = createFoodItem(item);
  //     menuRef.appendChild(foodItem);
  //     menuRef.prepend(foodItem);
  //   }
  // }

  updateItemCounts();
  goToCart();
}


//Skapa Item object
function createFoodItem(menuItem) {
  let itemRef = document.createElement("article");
  itemRef.classList.add("menuItem");
  itemRef.dataset.itemId = menuItem.id;

  const menuItemTemp = `
        <div class="menu__Item">
            <div class="menu__item-title">
                <h2 class="menu__name menuText" id="menuName" title="Tryck för att få mer information" tabindex="0">${menuItem.name}</h2>

                <h2 class="menu__price">${menuItem.price} kr</h2>
            </div>
                <h3 class="menu__desc menuText">${menuItem.description}</h3>
        <div class="menu__controls">
            <button class="menu__btn menuMinusBtn" aria-label="Ta bort till 1 ${menuItem.name}">-</button>
            <span class="count" id="count">0</span>
            <button class="menu__btn menuPlusBtn" aria-label="Lägg till 1 ${menuItem.name}">+</button>
        </div>
        <div class="line"></div>
        </div>
    `;
  itemRef.innerHTML = menuItemTemp;

  // handelItemUpdate(itemRef, menuItem)
  addItem(itemRef, menuItem);
  removeItem(itemRef, menuItem);

  return itemRef;
}

//div som är modal
const modalItemRef = document.querySelector("#ItemModal");
//rubrik som man ska klicka på
document.querySelectorAll(".menuText").forEach((item) => {
  item.addEventListener("click", (event) => {
	openModal(event)
});

	item.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			console.log('Enter key was pressed');
			openModal(event)
		}
	})
});

function openModal(event) {
	const menuItemElement = event.target.closest(".menuItem");
	const itemId = menuItemElement.dataset.itemId;
	const item = menuItems.find((item) => item.id == itemId);
	
	let IndItem = createIndiviualItems(item);
	
	modalItemRef.innerHTML = "";
	modalItemRef.append(IndItem);
	modalItemRef.classList.add("active");
	
	const closeBtn = document.querySelector(".close-button");
	closeBtn.onclick = function () {
	  modalItemRef.classList.remove("active");
	};

	closeBtn.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
		  modalItemRef.classList.remove("active"); // Stäng modalen
		}
	  });

	closeBtn.focus();
	
	window.onclick = function (event) {
	  if (event.target == modalItemRef) {
		modalItemRef.classList.remove("active"); // Ta bort "active" för att dölja modalen
		console.log("Modal closed by clicking outside");
	  }
	};
}

function createIndiviualItems(item) {
  let indItemRef = document.createElement("div");
  indItemRef.classList.add("modal-content");

  let IndItemTemp = `
	<span class="close-button" tabindex="0" aria-label="Stäng beskrivningen om ${
    item.name
  }">&times;</span>
	<div class="modalItem-detail">
	<figure class="modalItem-figurImg"><img class="modalItem-img" src="../../styling/images/${
    item.name
  }.jpg" alt=""></figure>
	<h2 class="modalItem-name">${item.name}</h2>
	<h3 class="modalItem-price">${item.price} kr</h3>
	<p class="modalItem-desc">${item.description}</p>
	<h3 class="modalItem-name">Ingredienser:</h3>
	`;
	if(item.ingredients && item.ingredients.length > 0 ) {
		IndItemTemp += `<p class="modalItem-ingredients">${item.ingredients.join(", ")}</p>`
	} else {
		IndItemTemp += `<p class="modalItem-ingredients">Inga ingredienser tillgängliga</p>`
	}

	IndItemTemp += `</div>`

	indItemRef.innerHTML = IndItemTemp;

  return indItemRef;
}

// function createAddonsItem(item) {
//   const addonsdrinkRef = document.querySelector("#addonsdrink");
//   const addonsdipRef = document.querySelector("#addonsdip");

//   if (item.type === "drink") {
//     let button = createAddOnBtn(item);
//     addonsdrinkRef.appendChild(button);
//   } else if (item.type === "dip") {
//     let button = createAddOnBtn(item);
//     addonsdipRef.appendChild(button);
//   }

//   return addonsdipRef;
// }

// function createAddOnBtn(item) {
//   const button = document.createElement("button");
//   button.textContent = item.name;
//   button.classList.add("menu__addonBtn");
//   button.setAttribute("data-id", item.id);

//   button.addEventListener("click", function () {
//     toggleItemInLocalStorage(item, button);
//     updateCartIcon();
//   });
//   return button;
// }

// function createAddOnPrice(Item) {
// 	const price = document.createElement('p');
// 	price.textContent = Item.price;
// 	price.classList.add('menu__addons-text');
// 	price.classList.add('addonPrice');

// 	return price;
// }

//Lägg till i localstorage

function addToCart(item) {
  if (!orders.current[item.id]) {
    orders.current[item.id] = { ...item, quantity: 1 };
  } else {
    orders.current[item.id].quantity++;
  }
  objToStorage(orders.current, "currentOrder");
  updateCartBtn();
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
    objToStorage(orders.current, "currentOrder");
	updateCartBtn();
    console.log(orders.current);
  }
}

//ta bort 1 när man trycker på minusknappen
function removeItem(itemRef, menuItem) {
  const minusButton = itemRef.querySelector(".menuMinusBtn");

  minusButton.addEventListener("click", () => {
    removeFromCart(menuItem);
    updateItemCounts();
    updateCartIcon();
  });
}

//adderar 1 när man trycker på plusknappen
function addItem(itemRef, menuItem) {
  const plusButton = itemRef.querySelector(".menuPlusBtn");

  plusButton.addEventListener("click", () => {
    addToCart(menuItem); // Lägg till objektet i kundvagnen
    updateItemCounts(); // Uppdatera alla count-element på sidan
    updateCartIcon();
  });
}

window.addEventListener("load", () => {
  const saveOrder = objFromStorage("currentOrder");
  orders.current = saveOrder;
  updateItemCounts();
  updateCartBtn();

  for (let key in orders.current) {
    let item = orders.current[key];
    let button = document.querySelector(`button[data-id='${item.id}']`);
    if (button) {
      button.classList.add("selected");
    }
  }
});

export function updateItemCounts() {
  orders.current = objFromStorage("currentOrder");
  const countRef = document.querySelectorAll(".count");

  countRef.forEach((countElement) => {
    const itemId = countElement.closest(".menuItem").dataset.itemId;
    const itemCount = orders.current[itemId]
      ? orders.current[itemId].quantity
      : 0;

    countElement.textContent = itemCount;
  });
}

function updateCartBtn() {
	const toCartBtnRef = document.querySelector('.menu__footer-btn');
	const footerRef = document.querySelector('.menu__footer');

	if(Object.keys(orders.current).length === 0) {
		toCartBtnRef.disabled = true;
		footerRef.classList.add('d-none');
	} else {
		toCartBtnRef.disabled = false;
		footerRef.classList.remove('d-none');
	}
}


// function toggleItemInLocalStorage(item, button) {
//   if (orders.current[item.id]) {
    // button.classList.remove("selected");
//     removeFromCart(item);
//   } else {
//     button.classList.add("selected");
//     addToCart(item);
//   }
// }

export function updateCartIcon() {
  //henter den lagrede ordren fra localstorage
  const savedOrder = objFromStorage("currentOrder") || {};
  // console.log("Saved Order:", savedOrder); //logger eventuelle bugger

  //Beregner totalt antall varer i ordren
  const itemCount = Object.values(savedOrder).reduce((sum, item) => {
    // Sjekker om varen og antallet er gyldig
    if (item && item.quantity) {
      return sum + item.quantity; //legger til antall
    }
    return sum;
  }, 0);

  const cartElement = document.querySelector(".cart");
  const countElement = document.querySelector(".cart_count");

  // console.log("Item Count:", itemCount); //Sjekker antallet i handlekurv
  countElement.textContent = itemCount; // Oppdaterer antallet som vises

  //Gjør at handlekurven skjules om den er tom og vises om ligger noe i den
  if (itemCount === 0) {
    cartElement.style.display = "none";
  } else {
    cartElement.style.display = "flex";
    countElement.style.display = "flex";
  }
}
