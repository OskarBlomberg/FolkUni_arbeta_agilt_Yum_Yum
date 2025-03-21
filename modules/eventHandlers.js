import {
  removeFromQueue,
  getQueue,
  renderCurrentOrder,
  currentOrder,
} from "./render_page/admin.js";

export function adminEventListeners() {
  const checkboxes = document.getElementsByClassName("current-order__checkbox");

  const doneBtn = document.getElementById("done-btn");

  doneBtn.addEventListener("click", () => {
    const allChecked = Array.from(checkboxes).every(
      (checkbox) => checkbox.checked
    );

    if (!allChecked) {
      alert("Alla rätter är inte förkryssade.");
    } else {
      removeFromQueue(0);
      getQueue();
      renderCurrentOrder(currentOrder);
    }
  });
}
