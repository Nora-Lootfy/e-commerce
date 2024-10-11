let currentPage = 1;
const productsPerPage = 9;
const container = document.getElementById("products");

document.addEventListener("DOMContentLoaded", () => {    
  if (container) {
    const allProducts = JSON.parse(localStorage.getItem("products")) ?? [];
    let displayedProducts = [...allProducts];

    const productsHeading = container.querySelector("#productsHeading");
    productsHeading.innerHTML = "All products";

    const filters = container.querySelector("#filter");
    const appliedFilters = {
      color: [],
      size: [],
      price: [],
      brand: [],
    };

    const sizeBtns = filters.querySelectorAll(".sizes-wrapper button");
    const colorBtns = filters.querySelectorAll(".color-wrapper button");
    const priceBtns = filters.querySelectorAll(".price-wrapper button");
    const brandsBtns = filters.querySelectorAll(".brands-wrapper button");

    attachFilter(
      sizeBtns,
      "size",
      appliedFilters,
      allProducts,
      displayedProducts
    );
    attachFilter(
      colorBtns,
      "color",
      appliedFilters,
      allProducts,
      displayedProducts
    );
    attachFilter(
      priceBtns,
      "price",
      appliedFilters,
      allProducts,
      displayedProducts
    );
    attachFilter(
      brandsBtns,
      "brand",
      appliedFilters,
      allProducts,
      displayedProducts
    );

    renderPage(displayedProducts);
  }
});

function displayProduct(product) {
  let html = `
    <div class="col-lg-4 col-md-6">
    <a href="${product.url}" class="text-decoration-none">
        <div class="card ${
          product.isSold ? "sold-out" : ""
        } rounded-0 border-0">
        <img
            src="${product.image}"
            class="card-img-top object-fit-cover w-100 rounded-0"
            alt="Fashion model"
            style="height: 400px"
        />
        <div class="card-body p-1">
            <h4 class="card-title">${product.title}</h4>
            <p class="card-text">$${product.price.toFixed(2)}</p>
            <div class="d-flex flex-wrap mt-3 color-wrapper">

    `;

  product.colors.forEach((color) => {
    html += `
        <button class="btn ${color.selected ? "selected" : ""}" 
        id="${product.title.replace(/\s+/g, "").toLowerCase() + color.name}"
        ></button>`;
  });

  html += `
            </div>
        </div>
        </div>
        </a>
    </div>
    `;

  return html;
}

function displayPaginator(count, productConatiner) {
  productConatiner.innerHTML = "";

  if (count < 2) return;

  for (let i = 1; i <= count; i++) {
    productConatiner.innerHTML += `
    <li class="page-item"><a class="page-link" id="${i}">${i}</a></li>
    `;
  }

  productConatiner.innerHTML += `
  <li class="page-item">
    <a class="page-link" id="next"
        ><svg
        width="7"
        height="8"
        viewBox="0 0 7 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
            d="M2.85179 3.81408L0.451787 0.710078L1.25179 -0.00992203L4.29179 3.75008L1.25179 7.51008L0.451787 6.79008L2.85179 3.81408ZM5.41179 3.81408L3.01179 0.710078L3.81179 -0.00992203L6.85179 3.75008L3.81179 7.51008L3.01179 6.79008L5.41179 3.81408Z"
            fill="black"
        />
        </svg>
    </a>
  </li>
  `;
}

function renderPaginator(items, currentPage) {
    items.forEach((item) => {
    item.parentNode.classList.remove("active");
    item.parentNode.removeAttribute("aria-current");
    
    if (item.id == currentPage) {
      item.parentNode.classList.add("active");
      item.parentNode.setAttribute("aria-current", "page");
    }
  });
}

function renderProducts(
  productConatiner,
  currentPage,
  productsPerPage,
  displayedProducts
) {
  productConatiner.innerHTML = "";
  let endOfLoop = Math.min(
    productsPerPage * currentPage,
    displayedProducts.length
  );

  for (let i = productsPerPage * (currentPage - 1); i < endOfLoop; i++) {
    productConatiner.innerHTML += displayProduct(displayedProducts[i]);
  }
}

function renderColors() {
  const colorContainers = document.getElementsByClassName("color-wrapper");

  if (colorContainers) {
    Array.from(colorContainers).forEach((colorWrapper) => {
      colorWrapper.querySelectorAll("button").forEach((btn) => {
        btn.style.backgroundColor = "#" + btn.id.split("#")[1];
      });
    });
  }
}

function addValue(value, arr) {
  removeValue(value, arr);

  arr.push(value);
}

function removeValue(value, arr) {
  let idx = arr.indexOf(value);

  if (idx > -1) {
    arr.splice(idx, 1);
  }
}

function attachFilter(
  items,
  key,
  appliedFilters,
  allProducts,
  displayedProducts,
  paginatorNumbers
) {
  items.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const filter = e.target.id;

      if (e.target.classList.contains("selected")) {
        e.target.classList.remove("selected");
        removeValue(filter, appliedFilters[key]);
      } else {
        e.target.classList.add("selected");
        addValue(filter, appliedFilters[key]);
      }

      applyFilters(
        appliedFilters,
        allProducts,
        displayedProducts,
        paginatorNumbers
      );
    });
  });
}

function applyFilters(appliedFilters, allProducts, displayedProducts) {
  displayedProducts = [];

  allProducts.forEach((product) => {
    let match = true;

    // Filter by color
    if (appliedFilters.color.length > 0) {
      const productColors = product.colors.map((color) =>
        color.name.toLowerCase()
      );
      const matchesColor = appliedFilters.color.some((color) =>
        productColors.includes(color.toLowerCase())
      );
      if (!matchesColor) {
        match = false;
      }
    }

    // Filter by size
    if (appliedFilters.size.length > 0) {
      const matchesSize = appliedFilters.size.some((size) =>
        product.sizes.includes(size.toLowerCase())
      );
      if (!matchesSize) {
        match = false;
      }
    }

    // Filter by price
    if (appliedFilters.price.length > 0) {
      const matchesPrice = appliedFilters.price.some((priceRange) => {
        const [min, max] = priceRange.split("to").map(Number);
        return product.price >= min && product.price <= max;
      });
      if (!matchesPrice) {
        match = false;
      }
    }

    // Filter by brand
    if (appliedFilters.brand.length > 0) {
      if (!appliedFilters.brand.includes(product.brand.toLowerCase())) {
        match = false;
      }
    }

    // If product matches all filters, add it to displayedProducts
    if (match) {
      displayedProducts.push(product);
    }
  });

  currentPage = 1;
  renderPage(displayedProducts);
}

function renderPage(displayedProducts ) {
  const pageCount = Math.ceil(displayedProducts.length / productsPerPage);

  const productContainer = document.querySelector("#products .products-wrapper .row");
  const paginatorContainer = document.querySelector(
    "#products #products-paginator .pagination"
  );

  const productsPaginator = document.querySelector(
    "#products #products-paginator"
  );

  displayPaginator(pageCount, paginatorContainer);

  const paginatorNumbers = productsPaginator.querySelectorAll(
    ".page-item .page-link:not(#next)"
  );

  const paginatorNext = productsPaginator.querySelector(
    ".page-item .page-link#next"
  );

  renderProducts(
    productContainer,
    currentPage,
    productsPerPage,
    displayedProducts
  );
  renderPaginator(paginatorNumbers, currentPage);
  renderColors();

  if (paginatorNumbers) {
    paginatorNumbers.forEach((number) => {
      number.addEventListener("click", (e) => {
        currentPage = e.target.id;

        renderPaginator(paginatorNumbers, currentPage);
        renderProducts(
          productContainer,
          currentPage,
          productsPerPage,
          displayedProducts
        );
        renderColors();
        container.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  if (paginatorNext) {
    paginatorNext.addEventListener("click", () => {
      currentPage = Math.min(pageCount, currentPage + 1);
      renderPaginator(paginatorNumbers, currentPage);
      renderProducts(
        productContainer,
        currentPage,
        productsPerPage,
        displayedProducts
      );
      renderColors();
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}
