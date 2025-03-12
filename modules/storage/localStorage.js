export function arrFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function arrToStorage(arr, key) {
  localStorage.setItem(key, JSON.stringify(arr));
}

export function objToStorage(obj, key) {
  localStorage.setItem(key, JSON.stringify(obj));
}

export function objFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || {};
}
