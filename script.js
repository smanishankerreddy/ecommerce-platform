let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let activeProduct = null;

// Load Products
async function loadProducts() {
  try {
    const res = await fetch("data/products.json");
    products = await res.json();
    renderCategoryFilters();
    renderProducts();
    renderCart();
  } catch (e) {
    console.error("Error loading products.json", e);
  }
}

// Product Grid
function renderProducts() {
  const prodGrid = document.getElementById("prodGrid");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  const onSaleOnly = document.getElementById("onSaleOnly");
  const emptyState = document.getElementById("emptyState");

  const search = searchInput.value.toLowerCase();
  const sort = sortSelect.value;
  const category = document.querySelector(".chip.active")?.dataset.category || null;
  const onSale = onSaleOnly.checked;

  let filtered = products.filter(p => {
    const matchSearch =
      p.title.toLowerCase().includes(search) ||
      p.tags.some(t => t.toLowerCase().includes(search));
    const matchCat = category && category !== "all" ? p.category === category : true;
    const matchSale = onSale ? p.onSale : true;
    return matchSearch && matchCat && matchSale;
  });

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);

  prodGrid.innerHTML = "";
  if (!filtered.length) {
    emptyState.style.display = "block";
    return;
  }
  emptyState.style.display = "none";

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" />
      <div class="card-content">
        <h3 class="card-title">${p.title}</h3>
        <div class="card-meta">
          <span class="card-price">₹${p.price}</span>
          ${p.onSale ? `<span class="chip">Sale</span>` : ""}
        </div>
        <div class="card-actions">
          <button class="btn primary add-btn">Add</button>
          <button class="btn outline view-btn">View</button>
        </div>
      </div>
    `;
    card.querySelector(".add-btn").addEventListener("click", () => addToCart(p));
    card.querySelector(".view-btn").addEventListener("click", () => openModal(p));
    prodGrid.appendChild(card);
  });
}

// Category Filters 
function renderCategoryFilters() {
  const categoryFilters = document.getElementById("categoryFilters");
  const categoryToggle = document.getElementById("categoryToggle");

  const cats = [...new Set(products.map(p => p.category))];
  categoryFilters.innerHTML = "";

  const allChip = document.createElement("button");
  allChip.className = "chip active";
  allChip.textContent = "All";
  allChip.dataset.category = "all";
  allChip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    allChip.classList.add("active");
    renderProducts();
  });
  categoryFilters.appendChild(allChip);

  cats.forEach(cat => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.textContent = cat;
    chip.dataset.category = cat;
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      renderProducts();
    });
    categoryFilters.appendChild(chip);
  });

  if (categoryToggle) {
    categoryToggle.addEventListener("click", () => categoryFilters.classList.toggle("active"));
  }
}

// Modal
const productModal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");
const modalMeta = document.getElementById("modalMeta");
const addToCartBtn = document.getElementById("addToCartBtn");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.getElementById("modalBackdrop");

addToCartBtn.addEventListener("click", () => {
  if (activeProduct) addToCart(activeProduct);
  productModal.setAttribute("aria-hidden", "true");
});

modalClose.addEventListener("click", () => productModal.setAttribute("aria-hidden", "true"));
modalBackdrop.addEventListener("click", () => productModal.setAttribute("aria-hidden", "true"));

function openModal(p) {
  activeProduct = p;
  modalImage.src = p.image;
  modalTitle.textContent = p.title;
  modalPrice.textContent = `₹${p.price}`;
  modalDesc.textContent = p.description;
  modalMeta.innerHTML = p.tags.map(t => `<li>${t}</li>`).join("");
  productModal.setAttribute("aria-hidden", "false");
}

// Cart
function addToCart(product) {
  const item = cart.find(i => i.id === product.id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  saveCart();
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  cartItems.innerHTML = "";
  let total = 0;

  if (!cart.length) {
    cartItems.innerHTML = `<p class="empty-cart"> Your cart is empty 🛒</p>`;
    cartTotal.textContent = "₹0";
    cartCount.textContent = "0";
    return;
  }

  cart.forEach(i => {
    total += i.price * i.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${i.image}" alt="${i.title}" />
      <div class="cart-item-info">
        <div><strong>${i.title}</strong></div>
        <div class="price-line">₹${i.price} × ${i.qty}</div>
        <div class="item-controls">
          <button class="btn outline minus-btn">-</button>
          <button class="btn outline plus-btn">+</button>
          <button class="btn outline remove-btn">Remove</button>
        </div>
      </div>
    `;
    div.querySelector(".minus-btn").addEventListener("click", () => changeQty(i.id, -1));
    div.querySelector(".plus-btn").addEventListener("click", () => changeQty(i.id, 1));
    div.querySelector(".remove-btn").addEventListener("click", () => removeFromCart(i.id));
    cartItems.appendChild(div);
  });

  cartTotal.textContent = `₹${total}`;
  cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Cart Popup
function setupCartPopup() {
  const cartBtn = document.getElementById("cartBtn");
  const cartPopup = document.getElementById("cartPopup");
  const cartBackdrop = document.getElementById("cartBackdrop");
  const closeCart = document.getElementById("closeCart");
  const clearCart = document.getElementById("clearCart");
  const checkoutBtn = document.getElementById("checkoutBtn");

  cartBtn.addEventListener("click", () => cartPopup.setAttribute("aria-hidden", "false"));
  closeCart.addEventListener("click", () => cartPopup.setAttribute("aria-hidden", "true"));
  cartBackdrop.addEventListener("click", () => cartPopup.setAttribute("aria-hidden", "true"));

  clearCart.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
  });

  checkoutBtn.addEventListener("click", () => {
    if (!cart.length) {
      alert("Your cart is empty 🛒");
      return;
    }
    if (confirm("Proceed to checkout?")) {
      alert("Thank you for your order!");
      cart = [];
      saveCart();
      renderCart();
      cartPopup.setAttribute("aria-hidden", "true");
    }
  });
}

// Filters
function setupFilters() {
  document.getElementById("searchInput").addEventListener("input", renderProducts);
  document.getElementById("sortSelect").addEventListener("change", renderProducts);
  document.getElementById("onSaleOnly").addEventListener("change", renderProducts);
}

function init() {
  loadProducts();
  setupFilters();
  setupCartPopup();
}

init();
