document.addEventListener("DOMContentLoaded", () => {
  const categoriesContainer = document.getElementById("new-arrivals");
  const allProducts = JSON.parse(localStorage.getItem("products")) ?? [];
  const anchors = categoriesContainer.querySelectorAll(".categories a");

  let products = filterByNewArrivals(allProducts);
  let categories = Array.from(anchors).map((a) => {
    return a.getAttribute("aria-for");
  });

  let categorizedProducts = divideProductsIntoCats(products, categories);

  renderNewArrivals(categorizedProducts, categoriesContainer);
});

function filterByNewArrivals(allProducts) {
  return allProducts.filter((prod) => prod.newArrival);
}

function divideProductsIntoCats(products, categories) {
  const categorizedProducts = {};

  categories.forEach((category) => {
    categorizedProducts[category] = [];
  });

  products.forEach((product) => {
    const productCategory = product.category;

    if (categories.includes(productCategory)) {
      categorizedProducts[productCategory].push(product);
    }

    if('oldPrice' in product) {
      categorizedProducts['discount-deals'].push(product);
    }
  });



  return categorizedProducts;
}

function renderNewArrivals(categorizedProducts, categoriesContainer) {
  const content = categoriesContainer.querySelector(".content");

  content.innerHTML = ''

  for (let cat of Object.keys(categorizedProducts)) {
    content.innerHTML += renderElemnet(categorizedProducts[cat], cat);
  }
}

function renderElemnet(products, id) {
  let html = `
    <div id="${id}">
      <div class="row gy-4">
    `;
  products.forEach((prod) => {
    html += `
    <div class="col-lg-4 col-md-6">
    <a href="${prod.url}" class="text-decoration-none">
        <div
          class="card border-0 p-3"
          style="box-shadow: 0px 40px 90px rgba(0, 0, 0, 0.06)"
        >
          <img
            src="${prod.image}"
            class="card-img-top"
            alt="Fashion model"
            style="border-radius: 10px; height: 280px; object-fit:cover"
          />
          <div class="card-body py-2">
            <div class="d-flex justify-content-between">
              <h3 class="card-title text-secondary">Shiny Dress</h3>
              <img src="images/stars.svg" alt="5 stars" />
            </div>
            <h4
              class="card-subtitle text-muted fw-normal"
              style="font-family: poppins; font-size: 12px"
            >
              ${prod.brand.toUpperCase()}
            </h4>
            <p class="card-text my-3" style="font-size: 12px">
              (4.1k) Customer Reviews
            </p>
            <div class="d-flex justify-content-between align-items-end">
              <span class="m-0 fs-3 text-secondary fw-semibold"
                >$${prod.price.toFixed(1)}</span
              >
              <span class="text-danger" style="font-size: 12px"
                >Almost Sold Out</span
              >
            </div>
          </div>
        </div>
        </a>
      </div>
    `;
  });

  html += `
    </div>
  </div>
  `;

  return html;
}
