export function saveToLocalStorage(list) {
  localStorage.setItem("list", JSON.stringify(list));
}
export function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("list")) || [];
}
