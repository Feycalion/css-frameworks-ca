const openModalButton = document.getElementById("openModalButton");
const closeModalButton = document.getElementById("closeModalButton");
const modalContainer = document.getElementById("modalContainer");

openModalButton.addEventListener("click", () => {
  modalContainer.classList.remove("hidden");
});

closeModalButton.addEventListener("click", () => {
  modalContainer.classList.add("hidden");
});
