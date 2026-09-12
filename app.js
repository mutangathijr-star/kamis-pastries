// FRONTEND STOREFRONT CONTROLLER - KAMI'S PASTRIES

const INITIAL_PRODUCTS = [
  {
    "id": "1",
    "name": "Luxury Chocolate Fudge Cake",
    "price": 28.00,
    "category": "Cakes",
    "badge": "Bestseller",
    "rating": 4.9,
    "reviews": 128,
    "servings": "Serves 8-10",
    "description": "Rich, moist layers of premium dark Belgian chocolate cake filled and iced with silky 70% cocoa ganache.",
    "ingredients": "Organic Belgian Dark Chocolate, Pure Butter, Espresso, Organic Eggs, Madagascar Vanilla",
    "image": "assets/chocolate_cake.jpg"
  },
  {
    "id": "2",
    "name": "Glazed Strawberry Tart",
    "price": 22.00,
    "category": "Pastries",
    "badge": "Fresh Seasonal",
    "rating": 4.8,
    "reviews": 94,
    "servings": "Individual / Shares 2",
    "description": "A crisp buttery pastry shell filled with organic vanilla bean pastry cream, topped with fresh glazed strawberries.",
    "ingredients": "Fresh Organic Strawberries, Vanilla Bean Custard, Butter Crust, Apricot Glaze",
    "image": "assets/strawberry_tart.jpg"
  },
  {
    "id": "3",
    "name": "Elegant Gold Leaf Celebration Cake",
    "price": 45.00,
    "category": "Custom Celebrations",
    "badge": "Chef's Special",
    "rating": 5.0,
    "reviews": 210,
    "servings": "Serves 12-16",
    "description": "Stunning two-tier vanilla bean cake finished with smooth Swiss buttercream, edible 24k gold leaf details, and organic floral elements.",
    "ingredients": "Tahitian Vanilla Bean, Swiss Buttercream, Edible 24k Gold Leaf, Almond Flour",
    "image": "assets/celebration_cake.jpg"
  },
  {
    "id": "4",
    "name": "Deluxe French Macarons Box",
    "price": 18.00,
    "category": "Pastries",
    "badge": "Popular Gift",
    "rating": 4.9,
    "reviews": 315,
    "servings": "Box of 6 Macarons",
    "description": "A colorful box of 6 delicate French macarons in pistachio, lavender, dark chocolate, rose, and lemon flavours.",
    "ingredients": "California Almond Flour, Organic Egg Whites, Ganache Fillings, Natural Botanical Extracts",
    "image": "assets/macarons.jpg"
  },
  {
    "id": "5",
    "name": "Velvet Raspberry Rose Cake",
    "price": 32.00,
    "category": "Cakes",
    "badge": "Signature Creation",
    "rating": 5.0,
    "reviews": 87,
    "servings": "Serves 8-10",
    "description": "Subtle rosewater sponge cake layered with fresh raspberry reduction and light white chocolate cream, garnished with fresh raspberries & gold accents.",
    "ingredients": "Fresh Raspberries, Organic Rosewater, White Chocolate Mousse, Soft Vanilla Sponge",
    "image": "assets/raspberry_cake.jpg"
  },
  {
    "id": "6",
    "name": "Salted Caramel Almond Croissant",
    "price": 8.50,
    "category": "Pastries",
    "badge": "Baked Morningly",
    "rating": 4.9,
    "reviews": 162,
    "servings": "Individual Pastry",
    "description": "Golden flaky French butter croissant double-baked with frangipane almond cream, drizzled with warm sea salt caramel and toasted almonds.",
    "ingredients": "French AOP Butter, Housemade Salted Caramel, Almond Cream, Flaked Almonds",
    "image": "assets/caramel_croissant.jpg"
  },
  {
    "id": "7",
    "name": "Dark Chocolate Hazelnut Eclair",
    "price": 9.00,
    "category": "Pastries",
    "badge": "Decadent",
    "rating": 4.8,
    "reviews": 105,
    "servings": "Individual Pastry",
    "description": "Classic French choux pastry casing stuffed with velvety hazelnut praline cream and crowned with mirror chocolate glaze.",
    "ingredients": "Choux Pastry, Roasted Piedmont Hazelnuts, 70% Dark Chocolate Glaze, Whipped Cream",
    "image": "assets/hazelnut_eclair.jpg"
  },
  {
    "id": "8",
    "name": "Royal Tiered Event & Wedding Cake",
    "price": 120.00,
    "category": "Custom Celebrations",
    "badge": "Luxury Bespoke",
    "rating": 5.0,
    "reviews": 43,
    "servings": "Serves 30-40",
    "description": "A magnificent three-tier showpiece cake tailored for grand weddings & special galas, featuring delicate sugar flower art and gold accents.",
    "ingredients": "Madagascar Bourbon Vanilla, White Velvet Cake, Fondant Accents, Edible 24k Gold Leaf",
    "image": "assets/wedding_cake.jpg"
  }
];

const INITIAL_CONFIG = {
  "hours": "Mon-Sat: 8:00 AM - 8:00 PM, Sun: 9:00 AM - 6:00 PM",
  "email": "hello@kamispastries.com",
  "phone": "+1 (555) 902-1324",
  "address": "124 Bakers Court, Pastry Lane, Sweetwood",
  "facebook": "https://facebook.com/kamispastries",
  "instagram": "https://instagram.com/kamispastries"
};

// Global States
let products = [];
let storeConfig = {};
let cart = JSON.parse(localStorage.getItem('kamis_cart')) || [];
let activeCategory = 'all';
let searchQuery = '';
let currentSort = 'featured';
let isBackendOnline = false;
let appliedDiscountRatio = 0;
let qvProduct = null;
let qvQuantity = 1;

const API_URL = window.location.origin;

function initializeLocalStorageDB() {
  if (!localStorage.getItem('kamis_db_products')) {
    localStorage.setItem('kamis_db_products', JSON.stringify(INITIAL_PRODUCTS));
  }
  if (!localStorage.getItem('kamis_db_config')) {
    localStorage.setItem('kamis_db_config', JSON.stringify(INITIAL_CONFIG));
  }
  if (!localStorage.getItem('kamis_db_orders')) {
    localStorage.setItem('kamis_db_orders', JSON.stringify([]));
  }
}

async function checkBackendStatus() {
  try {
    const res = await fetch(`${API_URL}/api/config`);
    if (res.ok) {
      isBackendOnline = true;
    }
  } catch (err) {
    isBackendOnline = false;
  }
}

async function loadProducts() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      products = await res.json();
    } catch (e) {
      loadProductsFallback();
    }
  } else {
    loadProductsFallback();
  }
}

function loadProductsFallback() {
  products = JSON.parse(localStorage.getItem('kamis_db_products')) || INITIAL_PRODUCTS;
}

async function loadStoreConfig() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_URL}/api/config`);
      storeConfig = await res.json();
    } catch (e) {
      loadConfigFallback();
    }
  } else {
    loadConfigFallback();
  }
  applyConfig();
}

function loadConfigFallback() {
  storeConfig = JSON.parse(localStorage.getItem('kamis_db_config')) || INITIAL_CONFIG;
}

function applyConfig() {
  const hoursWeek = document.getElementById('hoursWeek');
  const hoursSun = document.getElementById('hoursSun');
  
  if (hoursWeek && hoursSun && storeConfig.hours) {
    const parts = storeConfig.hours.split(', ');
    if (parts.length >= 2) {
      hoursWeek.textContent = parts[0].replace('Mon-Sat:', '').trim();
      hoursSun.textContent = parts[1].replace('Sun:', '').trim();
    } else {
      hoursWeek.textContent = storeConfig.hours;
      hoursSun.textContent = "Closed";
    }
  }
  
  const contactEmail = document.getElementById('contactEmail');
  const contactPhone = document.getElementById('contactPhone');
  const mapAddress = document.getElementById('mapAddress');
  const contactInsta = document.getElementById('contactInsta');
  const contactFB = document.getElementById('contactFB');

  if (contactEmail) {
    contactEmail.textContent = storeConfig.email;
    contactEmail.href = `mailto:${storeConfig.email}`;
  }
  if (contactPhone) {
    contactPhone.textContent = storeConfig.phone;
    contactPhone.href = `tel:${storeConfig.phone.replace(/[^0-9+]/g, '')}`;
  }
  if (mapAddress) {
    mapAddress.textContent = storeConfig.address;
  }
  if (contactInsta && storeConfig.instagram) {
    contactInsta.href = storeConfig.instagram;
  }
  if (contactFB && storeConfig.facebook) {
    contactFB.href = storeConfig.facebook;
  }
}

function saveCart() {
  localStorage.setItem('kamis_cart', JSON.stringify(cart));
  updateCartUI();
}

// Render Products Grid with Search, Filter & Sorting
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  grid.innerHTML = '';

  // 1. Filter Category
  let filtered = activeCategory === 'all'
    ? [...products]
    : products.filter(p => p.category === activeCategory);

  // 2. Filter Search Query
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      (p.ingredients && p.ingredients.toLowerCase().includes(q))
    );
  }

  // 3. Sorting
  if (currentSort === 'price-asc') {
    filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (currentSort === 'price-desc') {
    filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
  } else if (currentSort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="loading-spinner"><p>No sweet treats match your search query.</p></div>';
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';
    
    const ratingStars = '★'.repeat(Math.round(product.rating || 5));

    card.innerHTML = `
      <div class="product-img-wrapper" data-qv="${product.id}">
        <span class="product-badge">${product.badge || product.category}</span>
        <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/chocolate_cake.jpg'">
        <button class="quick-view-btn" data-qv="${product.id}">Quick View</button>
      </div>
      <div class="product-info">
        <div class="product-rating-row">
          <span class="stars">${ratingStars}</span>
          <span>${product.servings || 'Individual'}</span>
        </div>
        <h3 class="product-title" data-qv="${product.id}">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">$${parseFloat(product.price).toFixed(2)}</span>
          <button class="add-cart-btn" data-id="${product.id}" aria-label="Add to bag" title="Add to bag">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Attach quick view listeners
  document.querySelectorAll('[data-qv]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      const pid = elem.getAttribute('data-qv');
      openQuickViewModal(pid);
    });
  });

  // Attach Add Cart Listeners
  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pid = e.currentTarget.getAttribute('data-id');
      addToCart(pid);
    });
  });
}

// Quick View Modal Controller
function openQuickViewModal(productId) {
  qvProduct = products.find(p => p.id === productId);
  if (!qvProduct) return;

  qvQuantity = 1;

  document.getElementById('qvImage').src = qvProduct.image;
  document.getElementById('qvBadge').textContent = qvProduct.badge || qvProduct.category;
  document.getElementById('qvCategory').textContent = qvProduct.category;
  document.getElementById('qvTitle').textContent = qvProduct.name;
  document.getElementById('qvPrice').textContent = `$${parseFloat(qvProduct.price).toFixed(2)}`;
  document.getElementById('qvDescription').textContent = qvProduct.description;
  document.getElementById('qvServings').textContent = qvProduct.servings || 'Individual';
  document.getElementById('qvIngredients').textContent = qvProduct.ingredients || 'Fresh organic dairy, premium chocolate, real fruit';
  document.getElementById('qvRatingScore').textContent = qvProduct.rating || '5.0';
  document.getElementById('qvReviews').textContent = qvProduct.reviews || '42';
  document.getElementById('qvQtyDisplay').textContent = qvQuantity;

  const modal = document.getElementById('quickViewModal');
  const overlay = document.getElementById('modalOverlay');
  modal.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  const overlay = document.getElementById('modalOverlay');
  modal.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Cart Management
function addToCart(productId, qty = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: qty
    });
  }

  showToast(`Added ${qty}x "${product.name}" to your bag!`);

  const cartTrigger = document.getElementById('cartTrigger');
  cartTrigger.classList.add('bounce-animation');
  setTimeout(() => cartTrigger.classList.remove('bounce-animation'), 400);

  saveCart();
}

function updateCartUI() {
  const countBadge = document.querySelector('.cart-count');
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  countBadge.textContent = totalCount;

  const itemsContainer = document.getElementById('cartItemsContainer');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const cartTotalSum = document.getElementById('cartTotalSum');
  
  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = '<div class="empty-cart-message">Your bag is empty. Explore our menu to add sweet delights!</div>';
    checkoutBtn.disabled = true;
    cartTotalSum.textContent = '$0.00';
    return;
  }

  checkoutBtn.disabled = false;
  itemsContainer.innerHTML = '';
  
  let totalPrice = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='assets/chocolate_cake.jpg'">
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${parseFloat(item.price).toFixed(2)}</div>
        <div class="cart-item-ctrl">
          <button class="quantity-btn dec-qty" data-id="${item.id}">-</button>
          <span class="quantity-display">${item.quantity}</span>
          <button class="quantity-btn inc-qty" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}" title="Remove item">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
      </button>
    `;
    itemsContainer.appendChild(row);
  });

  cartTotalSum.textContent = `$${totalPrice.toFixed(2)}`;

  document.querySelectorAll('.dec-qty').forEach(btn => {
    btn.addEventListener('click', (e) => adjustQuantity(e.target.getAttribute('data-id'), -1));
  });

  document.querySelectorAll('.inc-qty').forEach(btn => {
    btn.addEventListener('click', (e) => adjustQuantity(e.target.getAttribute('data-id'), 1));
  });

  document.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', (e) => removeFromCart(e.currentTarget.getAttribute('data-id')));
  });
}

function adjustQuantity(productId, amount) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += amount;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

function updateCheckoutSummary() {
  const container = document.getElementById('checkoutSummaryItems');
  const sumTotal = document.getElementById('checkoutSummaryTotal');
  const discountRow = document.getElementById('discountRow');
  const discountAmount = document.getElementById('checkoutDiscountAmount');
  if (!container) return;

  container.innerHTML = '';
  let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'summary-item-line';
    div.style.cssText = 'display:flex; justify-content:space-between; margin-bottom:6px; font-size:14px;';
    div.innerHTML = `
      <span>${item.name} <strong>x${item.quantity}</strong></span>
      <span>$${itemTotal.toFixed(2)}</span>
    `;
    container.appendChild(div);
  });

  let discount = subtotal * appliedDiscountRatio;
  let finalTotal = Math.max(0, subtotal - discount);

  if (appliedDiscountRatio > 0) {
    discountRow.style.display = 'flex';
    discountAmount.textContent = `-$${discount.toFixed(2)}`;
  } else {
    discountRow.style.display = 'none';
  }

  sumTotal.textContent = `$${finalTotal.toFixed(2)}`;
}

function toggleCartDrawer(isOpen) {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  
  if (isOpen) {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function toggleCheckoutModal(isOpen) {
  const modal = document.getElementById('checkoutModal');
  const overlay = document.getElementById('modalOverlay');

  if (isOpen) {
    updateCheckoutSummary();
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Toast System
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Tracking Order Functionality
function handleTrackOrder(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('trackingIdInput').value.trim().toUpperCase();
  if (!input) return;

  const localOrders = JSON.parse(localStorage.getItem('kamis_db_orders')) || [];
  let order = localOrders.find(o => o.id === input);

  const resultBox = document.getElementById('trackingResult');

  if (!order) {
    // Generate simulated order timeline for demonstration
    order = {
      id: input,
      customerName: "Valued Guest",
      type: "pickup",
      total: 36.50,
      status: "pending",
      items: [{ name: "Artisan Pastry Box", quantity: 1 }]
    };
  }

  document.getElementById('trackResultId').textContent = order.id;
  document.getElementById('trackResultName').textContent = order.customerName;
  document.getElementById('trackResultType').textContent = order.type === 'delivery' ? 'Home Delivery' : 'Store Pickup';
  document.getElementById('trackResultTotal').textContent = `$${parseFloat(order.total).toFixed(2)}`;

  let itemsHTML = '';
  order.items.forEach(i => {
    itemsHTML += `<span>${i.name} (x${i.quantity})</span> `;
  });
  document.getElementById('trackResultItemsList').innerHTML = itemsHTML;

  // Stepper timeline logic
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const step4 = document.getElementById('step4');
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');
  const line3 = document.getElementById('line3');
  const statusPill = document.getElementById('trackStatusPill');

  step1.classList.add('active');
  
  if (order.status === 'completed') {
    step2.classList.add('active');
    step3.classList.add('active');
    step4.classList.add('active');
    line1.classList.add('active');
    line2.classList.add('active');
    line3.classList.add('active');
    statusPill.textContent = 'Completed / Ready';
    statusPill.style.color = 'var(--success-color)';
  } else {
    step2.classList.add('active');
    line1.classList.active;
    step3.classList.remove('active');
    step4.classList.remove('active');
    line2.classList.remove('active');
    line3.classList.remove('active');
    statusPill.textContent = 'Baking in Progress';
    statusPill.style.color = 'var(--gold-accent)';
  }

  resultBox.style.display = 'block';
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// DOM Setup
document.addEventListener('DOMContentLoaded', async () => {
  initializeLocalStorageDB();
  
  // Theme Setup
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  
  const savedTheme = localStorage.getItem('kamis_theme') || 'light-mode';
  document.body.className = savedTheme;
  updateThemeIcons(savedTheme);

  themeToggle.addEventListener('click', () => {
    let nextTheme = document.body.className === 'light-mode' ? 'dark-mode' : 'light-mode';
    document.body.className = nextTheme;
    localStorage.setItem('kamis_theme', nextTheme);
    updateThemeIcons(nextTheme);
  });

  function updateThemeIcons(theme) {
    if (theme === 'dark-mode') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  }

  // Promo Bar Close
  const closePromo = document.getElementById('closePromo');
  if (closePromo) {
    closePromo.addEventListener('click', () => {
      document.getElementById('promoBar').style.display = 'none';
    });
  }

  await checkBackendStatus();
  await loadProducts();
  await loadStoreConfig();
  
  renderProducts();
  updateCartUI();

  // Search input event listener
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Sort Select event listener
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // Category Tabs
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      activeCategory = e.target.getAttribute('data-category');
      renderProducts();
    });
  });

  // Quick View Quantity controls
  document.getElementById('qvDecQty').addEventListener('click', () => {
    if (qvQuantity > 1) {
      qvQuantity -= 1;
      document.getElementById('qvQtyDisplay').textContent = qvQuantity;
    }
  });

  document.getElementById('qvIncQty').addEventListener('click', () => {
    qvQuantity += 1;
    document.getElementById('qvQtyDisplay').textContent = qvQuantity;
  });

  document.getElementById('qvAddToCartBtn').addEventListener('click', () => {
    if (qvProduct) {
      addToCart(qvProduct.id, qvQuantity);
      closeQuickViewModal();
    }
  });

  document.getElementById('closeQuickView').addEventListener('click', closeQuickViewModal);

  // Cart Drawer
  document.getElementById('cartTrigger').addEventListener('click', () => toggleCartDrawer(true));
  document.getElementById('closeCart').addEventListener('click', () => toggleCartDrawer(false));
  document.getElementById('cartOverlay').addEventListener('click', () => toggleCartDrawer(false));

  // Mobile Menu
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
  });

  // Checkout Modal
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    toggleCartDrawer(false);
    toggleCheckoutModal(true);
  });
  
  document.getElementById('closeCheckout').addEventListener('click', () => toggleCheckoutModal(false));
  document.getElementById('modalOverlay').addEventListener('click', () => {
    toggleCheckoutModal(false);
    closeQuickViewModal();
  });

  // Order Type Radio change
  const orderTypeRadios = document.querySelectorAll('input[name="orderType"]');
  const deliveryAddressGroup = document.getElementById('deliveryAddressGroup');
  const custAddress = document.getElementById('custAddress');

  orderTypeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.value === 'delivery') {
        deliveryAddressGroup.style.display = 'block';
        custAddress.required = true;
      } else {
        deliveryAddressGroup.style.display = 'none';
        custAddress.required = false;
      }
    });
  });

  // Promo Code Apply
  const applyPromoBtn = document.getElementById('applyPromoBtn');
  const promoCodeInput = document.getElementById('promoCodeInput');
  const promoMessage = document.getElementById('promoMessage');

  applyPromoBtn.addEventListener('click', () => {
    const code = promoCodeInput.value.trim().toUpperCase();
    if (code === 'WELCOME10') {
      appliedDiscountRatio = 0.10;
      promoMessage.style.display = 'block';
      promoMessage.style.color = 'var(--success-color)';
      promoMessage.textContent = '✓ 10% VIP Discount Applied!';
      updateCheckoutSummary();
    } else if (code === 'FRESH50') {
      appliedDiscountRatio = 0.15;
      promoMessage.style.display = 'block';
      promoMessage.style.color = 'var(--success-color)';
      promoMessage.textContent = '✓ 15% Free Delivery Special Applied!';
      updateCheckoutSummary();
    } else {
      promoMessage.style.display = 'block';
      promoMessage.style.color = '#c94a4a';
      promoMessage.textContent = 'Invalid promo code. Try WELCOME10';
    }
  });

  // Track Order Form
  const trackingForm = document.getElementById('trackingForm');
  if (trackingForm) {
    trackingForm.addEventListener('submit', handleTrackOrder);
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('vipEmail').value;
      showToast(`Welcome to VIP Club! Use code WELCOME10 for 10% off.`);
      newsletterForm.reset();
    });
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const item = e.currentTarget.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Submit Order Form
  const checkoutForm = document.getElementById('checkoutForm');
  checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const customerName = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const email = document.getElementById('custEmail').value;
    const orderType = document.querySelector('input[name="orderType"]:checked').value;
    const address = orderType === 'delivery' ? custAddress.value : '';
    const notes = document.getElementById('orderNotes').value;
    
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let total = Math.max(0, subtotal - (subtotal * appliedDiscountRatio));

    const orderPayload = {
      customerName,
      phone,
      email,
      type: orderType,
      address,
      notes,
      items: cart,
      total
    };

    let processedOrder;

    if (isBackendOnline) {
      try {
        const res = await fetch(`${API_URL}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload)
        });
        if (res.ok) processedOrder = await res.json();
      } catch (err) {
        processedOrder = submitOrderFallback(orderPayload);
      }
    } else {
      processedOrder = submitOrderFallback(orderPayload);
    }

    if (processedOrder) {
      cart = [];
      saveCart();
      toggleCheckoutModal(false);
      showSuccessModal(processedOrder);
    }
  });

  function submitOrderFallback(orderPayload) {
    const localOrders = JSON.parse(localStorage.getItem('kamis_db_orders')) || [];
    const newOrder = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000).toString(),
      ...orderPayload,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    localOrders.unshift(newOrder);
    localStorage.setItem('kamis_db_orders', JSON.stringify(localOrders));
    return newOrder;
  }

  function showSuccessModal(order) {
    const successModal = document.getElementById('successModal');
    const overlay = document.getElementById('modalOverlay');
    
    document.getElementById('successOrderId').textContent = order.id;
    document.getElementById('successCustName').textContent = order.customerName;
    document.getElementById('successTotal').textContent = `$${parseFloat(order.total).toFixed(2)}`;
    document.getElementById('successType').textContent = order.type === 'delivery' ? 'Home Delivery' : 'Store Pickup';

    successModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  const closeSuccessBtn = document.getElementById('closeSuccessBtn');
  closeSuccessBtn.addEventListener('click', () => {
    document.getElementById('successModal').classList.remove('active');
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
  });
});
