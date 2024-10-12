const currentAuth = localStorage.getItem("authID");

const cartData = localStorage.getItem("cart");
let cartItems = cartData ? JSON.parse(cartData)[currentAuth] ?? [] : [];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cart");
  const table = container.querySelector("table tbody");

  if (container) {
    renderItems(cartItems, container);
  }
});

function renderItem(container, item) {
  container.innerHTML += `
  <tr>
    <td scope="row">
      <div class="row" style="width:500px; max-width:95vw">
        <div class="col-5">
          <img
            src="${item.image}"
            alt="Fashion model"
            style="height: 225px; object-fit: cover"
            class="w-100"
          />
        </div>
        <div class="col-6">
          <h3 class="product-name">${item.title}</h3>
          <p class="text-secondary">
            Color : <span class="product-color">${item.color}</span>
          </p>

          <a onclick="remove(${
            item.id
          })" class="text-secondary cursor-pointer remove-btn">Remove</a>
        </div>
      </div>
    </td>
    <td class="product-price">$${item.price.toFixed(2)}</td>
    <td>
        <span class="current-value p-3">${item.quantity}</span>
    </td>
    <td class="product-price-total">$${(item.price * item.quantity).toFixed(
      2
    )}</td>
  </tr>
  `;
}

function renderItems(cartItems, container) {
  const table = container.querySelector("table tbody");
  const totalPriceContainer = container.querySelector(".product-price");

  table.innerHTML = "";
console.log(cartItems.length !== 0)
  if (cartItems.length !== 0) {
    cartItems.forEach((item) => {
      renderItem(table, item);
    });
  } else {
    table.innerHTML = `
    <tr class="text-center fst-italic">
      <td colspan="4" class="text-secondary">No products added yet</td>
    </tr>
  `;
    container.querySelector(".checkout").addEventListener("click", (e) => {
      e.preventDefault();
    })
  }

  calculateTotalPrice(totalPriceContainer);
}

function remove(id) {
  const container = document.getElementById("cart");

  if (container) {
    let idx = cartItems.findIndex((item) => item.id == id);

    if (idx !== -1) {
      cartItems.splice(idx, 1);

      storeInCart(cartItems);
    }

    renderItems(cartItems, container);
  }
}

function calculateTotalPrice(container) {
  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  container.innerHTML = `$${totalPrice.toFixed(2)}`;
}

function storeInCart(data) {
  const cart = JSON.parse(localStorage.getItem("cart")) ?? {};

  cart[currentAuth] = data;
  localStorage.setItem("cart", JSON.stringify(cart));
}
