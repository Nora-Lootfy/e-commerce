document.addEventListener('DOMContentLoaded', ()=> {
const colorContainers = document.getElementsByClassName("color-wrapper");

if (colorContainers) {
  Array.from(colorContainers).forEach((colorWrapper) => {
    colorWrapper.querySelectorAll("button").forEach((btn) => {
      btn.style.backgroundColor = btn.id;
    });
  });
}
});
