const singleProduct = document.getElementById("single-product");

if (singleProduct) {
  const id = new URL(window.location.href).searchParams.get("id");

  if (!id) {
    redircet("index.html");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (singleProduct) {
    // get the product
    const id = new URL(window.location.href).searchParams.get("id");
    const product = searchProduct(id);

    // render views of the product
    renderViews(singleProduct.querySelector("#views"), product);

    // title
    singleProduct.querySelector("#product-title").innerHTML = product.title;

    // old price
    if (product.oldPrice) {
      const oldPrice = singleProduct.querySelector(".old-price");
      oldPrice.innerHTML = `$ ${product.oldPrice.toFixed(2)}`;

      const savingPercentage = Math.ceil(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      );

      oldPrice.parentNode.innerHTML += `
      <span class="badge rounded-pill bg-danger text-white fw-normal py-1 saving">
        SAVE ${savingPercentage}%
      </span>
      `;
    }

    // current price
    singleProduct.querySelector(
      ".current-price"
    ).innerHTML = `$ ${product.price.toFixed(2)}`;

    // product count
    singleProduct.querySelector(".product-count").innerHTML = product.count;

    // product left
    singleProduct.querySelector(
      ".product-left .progress-bar"
    ).style.width = `${product.count}%`;

    // size
    renderSize(singleProduct.querySelector(".product-size"), product);

    // color
    renderColor(singleProduct.querySelector(".product-color"), product);

    // quantity
    renderQuantity(singleProduct.querySelector(".quantity-wrapper"), product);
  }
});

function redircet(uri) {
  window.location.href = uri;
}

function searchProduct(id) {
  const allProducts = JSON.parse(localStorage.getItem("products"));
  let product;

  allProducts.forEach((prod) => {
    if (prod.id == id) {
      product = prod;
    }
  });

  if (product) {
    return product;
  }

  redircet("index.html");
}

function renderViews(viewsContainer, product) {
  viewsContainer.innerHTML = `
  <div class="img-wrapper current cursor-pointer">
    <img
      src="${product.image}"
      class="w-100"
      alt="Product view"
      style="height: 78px; object-fit: cover"
    />
  </div>
  `;

  product.views.forEach((view) => {
    viewsContainer.innerHTML += `
    <div class="img-wrapper cursor-pointer">
      <img
        src="${view}"
        class="w-100"
        alt="Product view"
        style="height: 78px; object-fit: cover"
      />
    </div>
    `;
  });

  // render image
  const img = singleProduct.querySelector("#main-img img");
  img.src = product.image;

  const views = viewsContainer.querySelectorAll(".img-wrapper");

  views.forEach((view) => {
    view.addEventListener("click", (e) => {
      img.src = e.target.src;

      views.forEach((view) => {
        view.classList.remove("current");
      });

      e.target.classList.add("selected");
    });
  });
}

function renderSize(sizeContainer, product) {
  const sizes = ["s", "m", "l", "xl", "2xl"];

  product.sizes = product.sizes.map((size) => size.toLowerCase());

  let html = `
  <h4 class="h5 current-size">Size: ${product.sizes[0].toUpperCase()}</h4>
  <div class="d-flex flex-wrap mt-3 sizes-wrapper">
  `;

  sizes.forEach((size) => {
    html += `
      <button 
        class="btn btn-outline-secondary ${
          product.sizes[0] == size ? "selected" : ""
        }" 
        id="${size}"
        ${
          product.sizes.indexOf(size) == -1
            ? 'disabled aria-disabled="true"'
            : ""
        }
      >
      ${size.toUpperCase()}
      </button>
    `;
  });

  sizeContainer.innerHTML = html + "</div>";

  const currentSize = sizeContainer.querySelector(".current-size");
  const btns = sizeContainer.querySelectorAll("button:not([disabled])");

  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      currentSize.innerHTML = `Size: ${e.target.id.toUpperCase()}`;

      btns.forEach((btn) => {
        btn.classList.remove("selected");
      });

      e.target.classList.add("selected");
    });
  });
}

function renderColor(colorContainer, product) {
  product.colors = product.colors.map((color) => {
    color.nickname = color.nickname.toLowerCase();
    return color;
  });

  let html = "";

  product.colors.forEach((color) => {
    if (color.selected) {
      html = `
        <h4 class="h5 current-color">Color: ${color.nickname.toUpperCase()}</h4>
      `;
    }
  });

  html += `
  <div class="d-flex flex-wrap mt-3 color-wrapper">
  `;

  product.colors.forEach((color) => {
    html += `<button class="btn ${color.selected ? "selected" : ""}" id="${
      color.name
    }"></button>`;
  });

  html += `</div>`;

  colorContainer.innerHTML = html;

  const btns = colorContainer.querySelectorAll(".color-wrapper button");
  const currentColor = colorContainer.querySelector(".current-color");

  btns.forEach((btn) => {
    btn.style.backgroundColor = btn.id;

    btn.addEventListener("click", (e) => {
      btns.forEach((btn) => {
        btn.classList.remove("selected");
      });

      currentColor.innerHTML = `Color: ${
        product.colors.find((c) => c.name == e.target.id).nickname.toUpperCase()
      }`;
      e.target.classList.add("selected");
    });
  });
}


function renderQuantity(quantityContainer, product) {
  const minus = quantityContainer.querySelector('#minus');
  const plus = quantityContainer.querySelector('#plus');
  const currentValue = quantityContainer.querySelector('.current-value');

  if(product.count == 0) {
    minus.disabled = true;
    plus.disabled = true;
    currentValue.innerHTML = '0';
  } else {
    minus.addEventListener('click', ()=> {
      currentValue.innerHTML = Math.max(Number(currentValue.innerHTML) - 1, 1);
    })
    plus.addEventListener('click', ()=> {
      currentValue.innerHTML = Math.min(Number(currentValue.innerHTML) + 1, product.count);
    })
  }
}