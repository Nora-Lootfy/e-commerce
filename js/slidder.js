// section to work with
const section = document.getElementById("deals-of-month");

if (section) {
  // left and right arrows container
  const leftArrow = section.querySelector(
    ".slidder-indicators button[aria-label='slider left']"
  );
  const rightArrow = section.querySelector(
    ".slidder-indicators button[aria-label='slider right']"
  );

  // points container
  const pointersContainer = section.querySelector(".slidder-pointers");
  pointersContainer.innerHTML = "";

  // products container
  const productContainer = section.querySelector(".products-wrapper");

  // get nodelist of products and attach to it an index
  let products = Array.from(
    section.querySelectorAll(".products-wrapper .product")
  ).map((prod, idx) => {
    return {
      product: prod,
      idx: idx,
    };
  });

  displayPointers(products, pointersContainer);

  let intervalId = setInterval(
    () => move(products, -1, pointersContainer, productContainer),
    2000
  );

  [leftArrow, rightArrow].forEach((btn) => {
    btn.addEventListener("mouseover", () => {
      clearInterval(intervalId);
    });

    btn.addEventListener("mouseleave", () => {
      intervalId = setInterval(
        () => move(products, -1, pointersContainer, productContainer),
        2000
      );
    });
  });

  leftArrow.addEventListener("click", () => {
    move(products, 1, pointersContainer, productContainer);
  });

  rightArrow.addEventListener("click", () => {
    move(products, -1, pointersContainer, productContainer);
  });
}

function displayPointers(items, pointersContainer) {
  pointersContainer.innerHTML = "";
  pointersContainer.style.transition = `all 0.3s ease-in-out`;

  const pointersHtml = {
    pointerActive: `<img src="images/pointer-active.svg" alt="pointer" />`,
    pointer: `<img src="images/pointer.svg" alt="pointer" />`,
  };

  if (items) {
    let indexOfFirstItem = items[0].idx;

    for (let i = 0; i < items.length; i++) {
      if (i != indexOfFirstItem) {
        pointersContainer.innerHTML += pointersHtml.pointer;
      } else {
        pointersContainer.innerHTML += pointersHtml.pointerActive;
      }
    }
  }
}

function move(items, step, pointersContainer, productContainer) {
  // item width
  let width = getWidth();

  items.forEach((item) => {
    const p = item.product.querySelector("p");
    item.product.style.transform = `translateX(${width * step}px)`;
    item.product.style.transition = `transform 1s ease-in-out`;

    item.product.classList.remove("current");
    if (p) {
      item.product.removeChild(p);
    }
  });

  if (step == -1) {
    let item = items.shift();
    items.push(item);
  } else if (step == 1) {
    let item = items.pop();
    items.unshift(item);
  }

  items[0].product.classList.add("current");
  items[0].product.innerHTML += `<p
    class="bg-white text-secondary m-0 d-flex flex-column px-3 py-4"
  >
    <span>01 <span class="line"></span>Spring Sale</span
    ><span class="fs-3">30% OFF</span>
  </p>`;

  setTimeout(() => {
    displayPointers(items, pointersContainer);
    renderProducts(items, productContainer);
  }, 1050);
}

function getWidth() {
  return section.querySelector(".products-wrapper .product:not(.current)")
    .offsetWidth;
}

function renderProducts(items, productContainer) {
  items.forEach((item) => {
    item.product.style.transform = `translateX(0)`;
    productContainer.removeChild(item.product);
  });

  items.forEach((item) => {
    productContainer.appendChild(item.product);
  });
}
