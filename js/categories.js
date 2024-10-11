document.addEventListener('DOMContentLoaded', ()=> {
const categoriesContainer = document.getElementById("new-arrivals");

if (categoriesContainer) {
  const anchors = categoriesContainer.querySelectorAll(".categories a");
  const content = categoriesContainer.querySelectorAll(".content > div");
  let shownContent = categoriesContainer
    .querySelector(".categories a.active")
    .getAttribute("aria-for");

  displayContent(content, shownContent);

  anchors.forEach((a) => {
    a.addEventListener("click", (e) => {
      anchors.forEach((a) => {
        a.classList.remove("active");
      });
      e.target.classList.add("active");

      shownContent = e.target.getAttribute("aria-for");

      displayContent(content, shownContent);
    });
  });
}

function displayContent(items, id) {
  items.forEach((item) => {
    item.style.display = "none";
    if (item.id == id) {
      item.style.display = "block";
    }
  });
}
});
