/* ================================================================
   CONFIGURACIÓN DEL NEGOCIO
   Edita esta sección para reutilizar la plantilla con otro cliente.
   ================================================================ */
const CONFIG = {
  businessName: "Sazón",
  whatsappNumber: "51943621317", // código de país + número, sin '+' ni espacios
  currency: "S/",
};

/* ================================================================
   CATÁLOGO
   Cada plato: id único, nombre, categoría, precio, imagen, descripción.
   'featured: true' le pone la cinta de "FAVORITO".
   ================================================================ */
const CATEGORIES = ["Todos", "Entradas", "Fondos", "Bebidas", "Postres"];

const PRODUCTS = [
  {
    id: "p1",
    name: "Anticuchos de corazón",
    category: "Entradas",
    price: 14,
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    desc: "Brochetas marinadas a la brasa, papa dorada y choclo.",
    featured: true,
  },
  {
    id: "p2",
    name: "Causa rellena",
    category: "Entradas",
    price: 12,
    img: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=600&q=80",
    desc: "Causa limeña rellena de pollo, palta y mayonesa de la casa.",
    featured: false,
  },
  {
    id: "p3",
    name: "Lomo saltado",
    category: "Fondos",
    price: 22,
    img: "https://images.unsplash.com/photo-1615937691194-97dbd3ecc767?w=600&q=80",
    desc: "Lomo salteado al wok con papas fritas y arroz.",
    featured: true,
  },
  {
    id: "p4",
    name: "Trucha a la parrilla",
    category: "Fondos",
    price: 24,
    img: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=600&q=80",
    desc: "Trucha fresca de laguna, ensalada andina y papas nativas.",
    featured: false,
  },
  {
    id: "p5",
    name: "Chicha morada",
    category: "Bebidas",
    price: 6,
    img: "https://images.unsplash.com/photo-1621506821957-1b50ab7bb1c5?w=600&q=80",
    desc: "Preparada en casa, con piña y especias.",
    featured: false,
  },
  {
    id: "p6",
    name: "Emoliente tradicional",
    category: "Bebidas",
    price: 5,
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80",
    desc: "Hierbas, linaza y cebada, servido caliente.",
    featured: false,
  },
  {
    id: "p7",
    name: "Suspiro a la limeña",
    category: "Postres",
    price: 10,
    img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80",
    desc: "Manjar blanco y merengue al oporto.",
    featured: false,
  },
];

/* ================================================================
   ESTADO
   ================================================================ */
let cart = {}; // { productId: qty }
let activeCategory = "Todos";
let modalProduct = null;
let modalQty = 1;

/* ================================================================
   REFERENCIAS DOM
   ================================================================ */
const el = {
  bizName: document.getElementById("biz-name"),
  bizNameFooter: document.getElementById("biz-name-footer"),
  tabs: document.getElementById("tabs"),
  menu: document.getElementById("menu"),
  cartToggle: document.getElementById("cart-toggle"),
  cartCount: document.getElementById("cart-count"),
  cartDrawer: document.getElementById("cart-drawer"),
  cartItems: document.getElementById("cart-items"),
  cartEmpty: document.getElementById("cart-empty"),
  cartTotal: document.getElementById("cart-total"),
  overlay: document.getElementById("overlay"),
  closeCart: document.getElementById("close-cart"),
  whatsappBtn: document.getElementById("whatsapp-checkout"),
  overlayModal: document.getElementById("overlay-modal"),
  productModal: document.getElementById("product-modal"),
  modalContent: document.getElementById("modal-content"),
  closeModal: document.getElementById("close-modal"),
};

/* ================================================================
   INIT
   ================================================================ */
function init() {
  el.bizName.textContent = CONFIG.businessName;
  el.bizNameFooter.textContent = CONFIG.businessName;
  renderTabs();
  renderMenu();
  updateCartUI();

  el.cartToggle.addEventListener("click", openCart);
  el.closeCart.addEventListener("click", closeCart);
  el.overlay.addEventListener("click", closeCart);
  el.overlayModal.addEventListener("click", closeModal);
  el.closeModal.addEventListener("click", closeModal);
  el.whatsappBtn.addEventListener("click", sendOrderToWhatsApp);
}

/* ================================================================
   TABS DE CATEGORÍA
   ================================================================ */
function renderTabs() {
  el.tabs.innerHTML = "";
  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "tab-btn" + (cat === activeCategory ? " active" : "");
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      activeCategory = cat;
      renderTabs();
      renderMenu();
    });
    el.tabs.appendChild(btn);
  });
}

/* ================================================================
   GRID DE PRODUCTOS
   ================================================================ */
function renderMenu() {
  const list =
    activeCategory === "Todos"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  el.menu.innerHTML = "";

  list.forEach((product) => {
    const card = document.createElement("article");
    card.className = "dish-card" + (product.featured ? " featured" : "");
    card.innerHTML = `
      <img class="dish-img" src="${product.img}" alt="${product.name}" loading="lazy">
      <div class="dish-body">
        <h3 class="dish-name">${product.name}</h3>
        <p class="dish-desc">${product.desc}</p>
        <div class="dish-tear"></div>
        <div class="dish-footer">
          <span class="dish-price">${formatPrice(product.price)}</span>
          <button class="add-btn" aria-label="Agregar ${product.name}">+</button>
        </div>
      </div>
    `;
    card.addEventListener("click", (e) => {
      // el botón + agrega directo; el resto de la tarjeta abre el detalle
      if (e.target.closest(".add-btn")) {
        addToCart(product.id, 1);
        pulseCart();
      } else {
        openModal(product);
      }
    });
    el.menu.appendChild(card);
  });
}

/* ================================================================
   MODAL DE PRODUCTO
   ================================================================ */
function openModal(product) {
  modalProduct = product;
  modalQty = 1;
  renderModal();
  el.productModal.classList.add("open");
  el.overlayModal.classList.add("visible");
}

function renderModal() {
  const p = modalProduct;
  el.modalContent.innerHTML = `
    <img class="modal-img" src="${p.img}" alt="${p.name}">
    <h2 class="modal-name">${p.name}</h2>
    <p class="modal-price">${formatPrice(p.price)}</p>
    <p class="modal-desc">${p.desc}</p>
    <div class="modal-qty">
      <button id="modal-minus" aria-label="Quitar uno">−</button>
      <span>${modalQty}</span>
      <button id="modal-plus" aria-label="Agregar uno">+</button>
    </div>
    <button class="modal-add-btn" id="modal-add">
      Añadir ${modalQty} por ${formatPrice(p.price * modalQty)}
    </button>
  `;
  document.getElementById("modal-minus").addEventListener("click", () => {
    modalQty = Math.max(1, modalQty - 1);
    renderModal();
  });
  document.getElementById("modal-plus").addEventListener("click", () => {
    modalQty += 1;
    renderModal();
  });
  document.getElementById("modal-add").addEventListener("click", () => {
    addToCart(p.id, modalQty);
    closeModal();
    pulseCart();
  });
}

function closeModal() {
  el.productModal.classList.remove("open");
  el.overlayModal.classList.remove("visible");
  modalProduct = null;
}

/* ================================================================
   CARRITO — lógica
   ================================================================ */
function addToCart(productId, qty) {
  cart[productId] = (cart[productId] || 0) + qty;
  updateCartUI();
}

function setQty(productId, qty) {
  if (qty <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = qty;
  }
  updateCartUI();
}

function cartTotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = PRODUCTS.find((p) => p.id === id);
    return sum + (product ? product.price * qty : 0);
  }, 0);
}

function cartCount() {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

/* ================================================================
   CARRITO — UI
   ================================================================ */
function updateCartUI() {
  const count = cartCount();
  el.cartCount.textContent = count;

  const entries = Object.entries(cart);
  el.cartItems.innerHTML = "";

  if (entries.length === 0) {
    el.cartItems.appendChild(el.cartEmpty);
    el.whatsappBtn.disabled = true;
  } else {
    el.whatsappBtn.disabled = false;
    entries.forEach(([id, qty]) => {
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product) return;
      const row = document.createElement("div");
      row.className = "cart-row";
      row.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <div class="cart-row-info">
          <p class="cart-row-name">${product.name}</p>
          <p class="cart-row-price">${formatPrice(product.price * qty)}</p>
          <div class="qty-control">
            <button data-action="minus">−</button>
            <span>${qty}</span>
            <button data-action="plus">+</button>
          </div>
        </div>
        <button class="remove-row">Quitar</button>
      `;
      row.querySelector('[data-action="minus"]').addEventListener("click", () =>
        setQty(id, qty - 1)
      );
      row.querySelector('[data-action="plus"]').addEventListener("click", () =>
        setQty(id, qty + 1)
      );
      row.querySelector(".remove-row").addEventListener("click", () => setQty(id, 0));
      el.cartItems.appendChild(row);
    });
  }

  el.cartTotal.textContent = formatPrice(cartTotal());
}

function pulseCart() {
  el.cartToggle.style.borderColor = "var(--ember)";
  setTimeout(() => (el.cartToggle.style.borderColor = ""), 300);
}

function openCart() {
  el.cartDrawer.classList.add("open");
  el.overlay.classList.add("visible");
}

function closeCart() {
  el.cartDrawer.classList.remove("open");
  el.overlay.classList.remove("visible");
}

/* ================================================================
   CHECKOUT POR WHATSAPP
   Arma un mensaje de texto con el detalle del pedido y abre wa.me
   con el número configurado arriba. No hay pasarela de pago: el
   cobro se cierra directo con el negocio por WhatsApp.
   ================================================================ */
function sendOrderToWhatsApp() {
  const entries = Object.entries(cart);
  if (entries.length === 0) return;

  let message = `Hola! Quiero hacer este pedido en *${CONFIG.businessName}*:\n\n`;
  entries.forEach(([id, qty]) => {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return;
    message += `• ${qty}x ${product.name} — ${formatPrice(product.price * qty)}\n`;
  });
  message += `\n*Total: ${formatPrice(cartTotal())}*`;

  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

/* ================================================================
   UTILIDADES
   ================================================================ */
function formatPrice(amount) {
  return `${CONFIG.currency} ${amount.toFixed(2)}`;
}

init();
