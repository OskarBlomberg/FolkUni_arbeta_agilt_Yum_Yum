export async function fetchMenuItems() {
  try {
    const response = await fetch(
      "https://santosnr6.github.io/Data/yumyumproducts.json"
    );
    let menuItems = await response.json();

    return menuItems;
  } catch {
    console.error(error.message);
  }
}
