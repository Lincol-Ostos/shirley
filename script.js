/* ================================================================
   CONFIGURACIÓN DEL NEGOCIO
   Edita esta sección para reutilizar la plantilla con otro cliente.
   ================================================================ */
const CONFIG = {
  businessName: "Shirley Food", // nombre del negocio, se muestra en encabezado y pie de página
  whatsappNumber: "5990551540", // código de país + número, sin '+' ni espacios
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
    name: "Lonchera",
    category: "Lonchera",
    price: 12,
    img: "https://images.unsplash.com/photo-1670710029403-607db8eeec83?w=600&h=400&fit=crop&q=80",
    desc: "Combo listo para llevar, ideal para el trabajo o el colegio.",
    featured: true,
  },
  {
    id: "p2",
    name: "Sándwich de salpicón de pollo",
    category: "Sándwich",
    price: 6,
    img: "https://images.unsplash.com/photo-1703219342329-fce8488cf443?w=600&h=400&fit=crop&q=80",
    desc: "Pollo deshilachado con verduras frescas y mayonesa de la casa.",
    featured: true,
  },
  {
    id: "p3",
    name: "Sándwich de lomo saltado",
    category: "Sándwich",
    price: 7,
    img: "https://images.unsplash.com/photo-1707750795395-f9a4cababde9?w=600&h=400&fit=crop&q=80",
    desc: "Lomo salteado al estilo criollo entre pan fresco.",
    featured: false,
  },
  {
    id: "p4",
    name: "Hamburguesa",
    category: "Sándwich",
    price: 8,
    img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&h=400&fit=crop&q=80",
    desc: "Con lechuga, tomate y salsas de la casa.",
    featured: false,
  },
  {
    id: "p5",
    name: "Sándwich de queso",
    category: "Sándwich",
    price: 5,
    img: "https://images.unsplash.com/photo-1716834092510-3be5db563920?w=600&h=400&fit=crop&q=80",
    desc: "Sencillo y clásico, con queso fresco.",
    featured: false,
  },
  {
    id: "p6",
    name: "Sándwich de huevo",
    category: "Sándwich",
    price: 5,
    img: "https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?w=600&h=400&fit=crop&q=80",
    desc: "Huevo frito o revuelto a elección.",
    featured: false,
  },
  {
    id: "p7",
    name: "Sándwich de palta",
    category: "Sándwich",
    price: 5,
    img: "https://images.unsplash.com/photo-1666819604716-7b60a604bb76?w=600&h=400&fit=crop&q=80",
    desc: "Palta fresca en pan del día.",
    featured: false,
  },
  {
    id: "p8",
    name: "Quinua",
    category: "Bebidas",
    price: 3,
    img: "https://images.unsplash.com/photo-1622484212110-0c65f49e6ec6?w=600&h=400&fit=crop&q=80",
    desc: "Bebida caliente de quinua, nutritiva y reconfortante.",
    featured: false,
  },
  {
    id: "p9",
    name: "Quáker",
    category: "Bebidas",
    price: 3,
    img: "https://images.unsplash.com/photo-1702165639524-252a1c1b1ab5?w=600&h=400&fit=crop&q=80",
    desc: "Avena caliente, clásica y llenadora.",
    featured: false,
  },
  {
    id: "p10",
    name: "Maca",
    category: "Bebidas",
    price: 3.5,
    img: "https://images.unsplash.com/photo-1497048297103-b34f2fc1df34?w=600&h=400&fit=crop&q=80",
    desc: "Bebida energizante a base de maca andina.",
    featured: false,
  },
  {
    id: "p11",
    name: "Soya",
    category: "Bebidas",
    price: 3,
    img: "https://images.unsplash.com/photo-1608651057580-4a50b2fc2281?w=600&h=400&fit=crop&q=80",
    desc: "Bebida caliente de soya.",
    featured: false,
  },
  {
    id: "p12",
    name: "Té",
    category: "Bebidas",
    price: 2,
    img: "https://images.unsplash.com/photo-1601390501377-34e129291cdb?w=600&h=400&fit=crop&q=80",
    desc: "Infusión clásica de té.",
    featured: false,
  },
  {
    id: "p13",
    name: "Manzanilla",
    category: "Bebidas",
    price: 2,
    img: "https://images.unsplash.com/photo-1637572815755-c4b80092dce1?w=600&h=400&fit=crop&q=80",
    desc: "Infusión de manzanilla, suave y relajante.",
    featured: false,
  },
  {
    id: "p14",
    name: "Café pasado",
    category: "Bebidas",
    price: 3,
    img: "https://images.unsplash.com/photo-1679941035424-d215b0230472?w=600&h=400&fit=crop&q=80",
    desc: "Café filtrado, preparado al momento.",
    featured: false,
  },
  {
    id: "p15",
    name: "Anís",
    category: "Bebidas",
    price: 2,
    img: "https://images.unsplash.com/photo-1682988452398-ce8385099765?w=600&h=400&fit=crop&q=80",
    desc: "Infusión de anís, ideal después de comer.",
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
  createSakuraPetals();

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
   PÉTALOS DE SAKURA
   Capa decorativa, minimalista y no intrusiva: pocos pétalos,
   caída lenta con leve balanceo. Se respeta prefers-reduced-motion
   (oculto vía CSS) y se reduce la cantidad en pantallas chicas.
   ================================================================ */
function createSakuraPetals() {
  const container = document.createElement("div");
  container.className = "sakura-container";
  container.setAttribute("aria-hidden", "true");
  document.body.appendChild(container);

  const count = window.innerWidth < 480 ? 8 : 14;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";

    const size = 8 + Math.random() * 6; // 8–14px
    const left = Math.random() * 100; // 0–100vw
    const fallDuration = 10 + Math.random() * 6; // 10–16s
    const swayDuration = 3 + Math.random() * 3; // 3–6s
    const negativeDelay = Math.random() * 16; // arranca ya en marcha
    const opacity = 0.3 + Math.random() * 0.3; // 0.3–0.6

    petal.style.left = `${left}vw`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.opacity = opacity;
    petal.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
    petal.style.animationDelay = `-${negativeDelay}s, -${negativeDelay}s`;

    container.appendChild(petal);
  }
}

/* ================================================================
   UTILIDADES
   ================================================================ */
function formatPrice(amount) {
  return `${CONFIG.currency} ${amount.toFixed(2)}`;
}

init();
