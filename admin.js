// ADMIN PORTAL CONTROLLER - KAMI'S PASTRY HAVEN

const INITIAL_PRODUCTS = [
  { "id": "1", "name": "Vanila Cake", "price": 2500, "category": "Classic Cakes", "badge": "Classic 1kg", "rating": 4.9, "reviews": 112, "servings": "1 kg basis (Whipped Cream)", "description": "Soft, fluffy vanilla sponge cake enveloped in silky whipped cream frosting. Simple, elegant, and delicious.", "ingredients": "Organic Vanilla Bean, Pure Butter, Fresh Whipped Cream, Eggs, Flour", "image": "assets/hero.jpg" },
  { "id": "2", "name": "Strawberry Cake", "price": 2500, "category": "Classic Cakes", "badge": "Fresh Fruit 1kg", "rating": 4.8, "reviews": 98, "servings": "1 kg basis (Whipped Cream)", "description": "Delicate sponge layered with real strawberry compote and light whipped cream frosting.", "ingredients": "Fresh Strawberry Compote, Vanilla Sponge, Light Whipped Cream", "image": "assets/strawberry_tart.jpg" },
  { "id": "3", "name": "Orange Cake", "price": 2500, "category": "Classic Cakes", "badge": "Citrus Specialty", "rating": 4.7, "reviews": 76, "servings": "1 kg basis (Whipped Cream)", "description": "Zesty and aromatic orange-infused sponge cake finished with smooth whipped cream.", "ingredients": "Fresh Orange Zest, Citrus Glaze, Whipped Cream", "image": "assets/celebration_cake.jpg" },
  { "id": "4", "name": "Lemon Cake", "price": 2500, "category": "Classic Cakes", "badge": "Refreshing", "rating": 4.8, "reviews": 89, "servings": "1 kg basis (Whipped Cream)", "description": "Bright and tangy lemon sponge cake with lemon curd layers and fluffy cream.", "ingredients": "Fresh Lemon Juice, Lemon Curd, Whipped Cream Frosting", "image": "assets/celebration_cake.jpg" },
  { "id": "5", "name": "Raspberry Cake", "price": 2500, "category": "Classic Cakes", "badge": "Popular", "rating": 4.9, "reviews": 145, "servings": "1 kg basis (Whipped Cream)", "description": "Moist vanilla layers filled with vibrant tart raspberry puree and smooth cream.", "ingredients": "Organic Raspberries, Vanilla Sponge, Fresh Whipped Cream", "image": "assets/raspberry_cake.jpg" },
  { "id": "6", "name": "Passion Cake", "price": 2500, "category": "Classic Cakes", "badge": "Tropical", "rating": 4.9, "reviews": 104, "servings": "1 kg basis (Whipped Cream)", "description": "Exotic passionfruit infused sponge layered with sweet and tangy passion reduction cream.", "ingredients": "Fresh Passion Fruit Nectar, Vanilla Sponge, Whipped Cream", "image": "assets/strawberry_tart.jpg" },
  { "id": "7", "name": "Pineapple Cake", "price": 2500, "category": "Classic Cakes", "badge": "Tropical Classic", "rating": 4.8, "reviews": 82, "servings": "1 kg basis (Whipped Cream)", "description": "Sweet pineapple pieces layered inside light whipped cream and sponge cake.", "ingredients": "Crushed Pineapple, Vanilla Sponge, Fresh Whipped Cream", "image": "assets/strawberry_tart.jpg" },
  { "id": "8", "name": "Blueberry Cake", "price": 2700, "category": "Gourmet Cakes", "badge": "Customer Favorite", "rating": 4.9, "reviews": 160, "servings": "1 kg basis (Whipped Cream)", "description": "Lush blueberry compote folded into vanilla sponge layers and blueberry whipped cream.", "ingredients": "Fresh Blueberries, Blueberry Filling, Light Whipped Cream", "image": "assets/raspberry_cake.jpg" },
  { "id": "9", "name": "Lemon Blueberry Cake", "price": 2700, "category": "Gourmet Cakes", "badge": "Signature Duo", "rating": 5.0, "reviews": 188, "servings": "1 kg basis (Whipped Cream)", "description": "The perfect balance of zesty lemon sponge and sweet blueberry reduction with whipped frosting.", "ingredients": "Fresh Lemon Zest, Organic Blueberries, Cream Cheese Whipped Frosting", "image": "assets/raspberry_cake.jpg" },
  { "id": "10", "name": "Carrot Cake", "price": 2700, "category": "Gourmet Cakes", "badge": "Spiced Perfection", "rating": 4.9, "reviews": 135, "servings": "1 kg basis (Whipped Cream)", "description": "Moist spiced carrot sponge cake with cinnamon, walnuts, and silky cream frosting.", "ingredients": "Grated Carrots, Cinnamon, Walnuts, Cream Cheese Whipped Icing", "image": "assets/caramel_croissant.jpg" },
  { "id": "11", "name": "Pinacolada Cake", "price": 2700, "category": "Gourmet Cakes", "badge": "Island Flavor", "rating": 4.8, "reviews": 92, "servings": "1 kg basis (Whipped Cream)", "description": "Tropical coconut and sweet pineapple folded into moist sponge cake with whipped cream.", "ingredients": "Desiccated Coconut, Pineapple Compote, Coconut Cream", "image": "assets/macarons.jpg" },
  { "id": "12", "name": "Cookies & Cream Cake", "price": 2700, "category": "Gourmet Cakes", "badge": "Bestseller", "rating": 5.0, "reviews": 210, "servings": "1 kg basis (Whipped Cream)", "description": "Rich vanilla sponge loaded with crushed Oreo cookies and creamy cookie frosting.", "ingredients": "Crushed Chocolate Cookies, Vanilla Sponge, Oreo Whipped Cream", "image": "assets/chocolate_cake.jpg" },
  { "id": "13", "name": "Bubblegum Cake", "price": 2700, "category": "Gourmet Cakes", "badge": "Kids Special", "rating": 4.7, "reviews": 68, "servings": "1 kg basis (Whipped Cream)", "description": "Fun, vibrant pastel blue and pink bubblegum-flavored sponge cake for joyful celebrations.", "ingredients": "Bubblegum Flavor, Pastel Whipped Cream, Rainbow Sprinkles", "image": "assets/macarons.jpg" },
  { "id": "14", "name": "Funfetti Cake", "price": 2700, "category": "Gourmet Cakes", "badge": "Party Choice", "rating": 4.9, "reviews": 118, "servings": "1 kg basis (Whipped Cream)", "description": "Fluffy vanilla sponge studded with colorful sprinkles and sweet whipped cream frosting.", "ingredients": "Confetti Sprinkles, Vanilla Bean, Light Whipped Cream", "image": "assets/celebration_cake.jpg" },
  { "id": "15", "name": "Tutti Frutti Vanilla Cake", "price": 2700, "category": "Gourmet Cakes", "badge": "Fruity Delight", "rating": 4.8, "reviews": 84, "servings": "1 kg basis (Whipped Cream)", "description": "Vanilla cake loaded with candied fruit bits and topped with velvety whipped cream.", "ingredients": "Candied Tutti Frutti, Vanilla Sponge, Whipped Cream", "image": "assets/celebration_cake.jpg" },
  { "id": "16", "name": "Chocolate Fudge Cake", "price": 2800, "category": "Chocolate Cakes", "badge": "Top Seller 🍫", "rating": 5.0, "reviews": 245, "servings": "1 kg basis (Whipped Cream)", "description": "Deep, rich cocoa sponge layered with gooey dark chocolate fudge ganache.", "ingredients": "Dark Cocoa, Belgian Fudge, Chocolate Whipped Cream", "image": "assets/chocolate_cake.jpg" },
  { "id": "17", "name": "Chocolate Mint Cake", "price": 2800, "category": "Chocolate Cakes", "badge": "Decadent", "rating": 4.9, "reviews": 116, "servings": "1 kg basis (Whipped Cream)", "description": "Rich chocolate layers complemented by cool, refreshing peppermint cream frosting.", "ingredients": "Dutch Processed Cocoa, Natural Peppermint Oil, Chocolate Ganache", "image": "assets/hazelnut_eclair.jpg" },
  { "id": "18", "name": "Chocolate Orange Cake", "price": 2800, "category": "Chocolate Cakes", "badge": "Gourmet Twist", "rating": 4.8, "reviews": 95, "servings": "1 kg basis (Whipped Cream)", "description": "Velvety chocolate sponge infused with citrus orange notes and chocolate cream.", "ingredients": "Dark Chocolate, Orange Essence, Citrus Chocolate Icing", "image": "assets/chocolate_cake.jpg" },
  { "id": "19", "name": "Classic Chocolate Cake", "price": 2800, "category": "Chocolate Cakes", "badge": "Pure Cocoa", "rating": 4.9, "reviews": 172, "servings": "1 kg basis (Whipped Cream)", "description": "Timeless moist chocolate cake frosted with smooth whipped chocolate cream.", "ingredients": "Pure Cocoa Powder, Chocolate Whipped Frosting, Vanilla", "image": "assets/chocolate_cake.jpg" },
  { "id": "20", "name": "Red Velvet Cake", "price": 3000, "category": "Special Cakes", "badge": "Luxury Classic 🌟", "rating": 5.0, "reviews": 280, "servings": "1 kg basis (Whipped Cream)", "description": "Classic crimson cocoa sponge cake finished with luscious cream cheese whipped frosting.", "ingredients": "Crimson Cocoa Sponge, Cream Cheese, Pure Vanilla", "image": "assets/red_velvet.jpg" },
  { "id": "21", "name": "Blackforest Cake", "price": 3000, "category": "Special Cakes", "badge": "Bestseller 🍒", "rating": 5.0, "reviews": 290, "servings": "1 kg basis (Whipped Cream)", "description": "Traditional dark chocolate sponge layered with sweet cherries and fluffy whipped cream.", "ingredients": "Dark Chocolate Sponge, Glazed Cherries, Chocolate Shavings", "image": "assets/blackforest.jpg" },
  { "id": "22", "name": "White Forest Cake", "price": 3000, "category": "Special Cakes", "badge": "Elegant", "rating": 4.9, "reviews": 164, "servings": "1 kg basis (Whipped Cream)", "description": "Soft white vanilla sponge filled with juicy cherries and topped with white chocolate curls.", "ingredients": "Vanilla Sponge, Red Cherries, White Chocolate Shavings, Whipped Cream", "image": "assets/wedding_cake.jpg" },
  { "id": "23", "name": "Oreo Mint Cake", "price": 3000, "category": "Special Cakes", "badge": "Chef Special", "rating": 4.9, "reviews": 122, "servings": "1 kg basis (Whipped Cream)", "description": "Chocolate cake layered with cool mint whipped cream and crushed Oreo cookie crunch.", "ingredients": "Oreo Cookies, Cool Peppermint Cream, Dark Chocolate Cake", "image": "assets/hazelnut_eclair.jpg" },
  { "id": "24", "name": "Fruit Cake", "price": 3200, "category": "Special Cakes", "badge": "Rich & Fruity", "rating": 4.9, "reviews": 96, "servings": "1 kg basis (Whipped Cream)", "description": "Dense, luxurious cake loaded with premium dried fruits, nuts, and aromatic spices.", "ingredients": "Soaked Dried Fruits, Citrus Peel, Spiced Sponge, Whipped Cream", "image": "assets/celebration_cake.jpg" },
  { "id": "25", "name": "Fruit Cake with Rum", "price": 3700, "category": "Special Cakes", "badge": "Premium Rum 🍾", "rating": 5.0, "reviews": 150, "servings": "1 kg basis (Whipped Cream)", "description": "Aged dark fruit cake infused with authentic dark rum, rich spices, and premium dried fruits.", "ingredients": "Dark Rum Infusion, Soaked Raisins & Cherries, Spiced Sponge, Whipped Cream", "image": "assets/celebration_cake.jpg" }
];

const INITIAL_CONFIG = {
  "hours": "Mon-Sat: 8:00 AM - 8:00 PM, Sun: 9:00 AM - 6:00 PM",
  "email": "hello@kamispastries.com",
  "phone": "+1 (555) 902-1324",
  "address": "124 Bakers Court, Pastry Lane, Sweetwood",
  "facebook": "https://facebook.com/kamispastries",
  "instagram": "https://instagram.com/kamispastries"
};

let products = [];
let orders = [];
let storeConfig = {};
let isBackendOnline = false;
let editingProductId = null;

const API_URL = window.location.origin;

function formatPrice(val) {
  return `Ksh ${parseInt(val).toLocaleString()}`;
}

async function checkBackendStatus() {
  try {
    const res = await fetch(`${API_URL}/api/config`);
    if (res.ok) isBackendOnline = true;
  } catch (err) {
    isBackendOnline = false;
  }
}

function verifyLocalDB() {
  localStorage.setItem('kamis_db_products', JSON.stringify(INITIAL_PRODUCTS));
  if (!localStorage.getItem('kamis_db_config')) {
    localStorage.setItem('kamis_db_config', JSON.stringify(INITIAL_CONFIG));
  }
  if (!localStorage.getItem('kamis_db_orders')) {
    localStorage.setItem('kamis_db_orders', JSON.stringify([]));
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
  renderProductsTable();
  updateKPIs();
}

function loadProductsFallback() {
  products = JSON.parse(localStorage.getItem('kamis_db_products')) || INITIAL_PRODUCTS;
}

async function loadOrders() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_URL}/api/orders`);
      orders = await res.json();
    } catch (e) {
      loadOrdersFallback();
    }
  } else {
    loadOrdersFallback();
  }
  renderOrdersTable();
  updateKPIs();
}

function loadOrdersFallback() {
  orders = JSON.parse(localStorage.getItem('kamis_db_orders')) || [];
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
  populateConfigForm();
}

function loadConfigFallback() {
  storeConfig = JSON.parse(localStorage.getItem('kamis_db_config')) || INITIAL_CONFIG;
}

function updateKPIs() {
  const revElem = document.getElementById('kpiRevenue');
  const countElem = document.getElementById('kpiTotalOrders');
  const pendingElem = document.getElementById('kpiPendingOrders');
  const catElem = document.getElementById('kpiCatalogCount');

  if (!revElem) return;

  const totalRev = orders.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);
  const pendingCount = orders.filter(o => o.status === 'pending').length;

  revElem.textContent = formatPrice(totalRev);
  countElem.textContent = orders.length;
  pendingElem.textContent = pendingCount;
  catElem.textContent = products.length;
}

function renderOrdersTable() {
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  
  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; font-style: italic; padding: 40px;">No customer orders found yet.</td></tr>`;
    return;
  }

  orders.forEach(order => {
    let itemsHTML = '<ul class="order-items-list">';
    order.items.forEach(item => {
      itemsHTML += `<li>${item.name} <strong>x${item.quantity} (1kg)</strong></li>`;
    });
    itemsHTML += '</ul>';

    if (order.notes) {
      itemsHTML += `<div style="font-size: 11px; margin-top: 6px; padding: 4px; border-left: 2px solid var(--gold-accent); color:var(--text-secondary); max-width: 200px;">
        <strong>Note:</strong> ${order.notes}
      </div>`;
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight:700; font-family: monospace; font-size:14px; color:var(--gold-accent);">${order.id}</td>
      <td style="font-weight:600; color:var(--text-primary);">${order.customerName}</td>
      <td>
        <div style="font-weight: 500; font-size:13px;">${order.phone}</div>
        <div style="font-size: 12px; color:var(--text-secondary);">${order.email}</div>
      </td>
      <td>
        <span style="font-weight:600; font-size:13px;">${order.type === 'delivery' ? 'Home Delivery' : 'Store Pickup'}</span>
        ${order.type === 'delivery' ? `<div style="font-size:12px; color:var(--text-secondary); max-width: 150px; line-height: 1.3; margin-top:4px;">${order.address}</div>` : ''}
      </td>
      <td>${itemsHTML}</td>
      <td style="font-weight:700; font-family:var(--font-serif); font-size: 16px; color:var(--text-primary);">${formatPrice(order.total)}</td>
      <td>
        <span class="status-badge ${order.status}">${order.status}</span>
      </td>
      <td>
        <div class="row-actions">
          ${order.status === 'pending' 
            ? `<button class="action-btn-small" onclick="updateOrderStatus('${order.id}', 'completed')">Mark Complete</button>`
            : `<button class="action-btn-small" onclick="updateOrderStatus('${order.id}', 'pending')">Re-open</button>`
          }
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.updateOrderStatus = async function(orderId, nextStatus) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        const updated = await res.json();
        const index = orders.findIndex(o => o.id === orderId);
        if (index !== -1) orders[index] = updated;
      }
    } catch (e) {
      updateOrderStatusLocal(orderId, nextStatus);
    }
  } else {
    updateOrderStatusLocal(orderId, nextStatus);
  }
  renderOrdersTable();
  updateKPIs();
};

function updateOrderStatusLocal(orderId, nextStatus) {
  const localOrders = JSON.parse(localStorage.getItem('kamis_db_orders')) || [];
  const idx = localOrders.findIndex(o => o.id === orderId);
  if (idx !== -1) {
    localOrders[idx].status = nextStatus;
    localStorage.setItem('kamis_db_orders', JSON.stringify(localOrders));
    orders = localOrders;
  }
}

function renderProductsTable() {
  const tbody = document.getElementById('productsTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  
  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; font-style: italic; padding: 40px;">No products in catalog.</td></tr>`;
    return;
  }

  products.forEach(prod => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${prod.image}" alt="${prod.name}" class="prod-thumb" onerror="this.src='assets/chocolate_cake.jpg'"></td>
      <td style="font-weight: 600; color:var(--text-primary); font-size:15px;">${prod.name}</td>
      <td><span class="product-badge" style="position:static; padding:4px 8px; font-size:10px;">${prod.category}</span></td>
      <td style="font-family:var(--font-serif); font-weight:700; font-size:16px; color:var(--text-primary);">${formatPrice(prod.price)}</td>
      <td style="max-width: 220px; font-size:12px; color:var(--text-secondary); line-height:1.4;">
        <div><strong>Servings:</strong> ${prod.servings || '1kg basis'}</div>
        <div><strong>Ingredients:</strong> ${prod.ingredients || prod.description}</div>
      </td>
      <td>
        <div class="row-actions">
          <button class="action-btn-small" onclick="openProductEditModal('${prod.id}')">Edit</button>
          <button class="action-btn-small delete-btn" onclick="deleteProduct('${prod.id}')">Delete</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function toggleProductModal(isOpen, title = "Add New Specialty") {
  const modal = document.getElementById('productModal');
  const overlay = document.getElementById('adminModalOverlay');
  const modalTitle = document.getElementById('modalProductTitle');
  const saveBtn = document.getElementById('saveProductSubmitBtn');

  if (isOpen) {
    modalTitle.textContent = title;
    saveBtn.textContent = editingProductId ? "Save Changes" : "Save to Catalog";
    modal.classList.add('active');
    overlay.classList.add('active');
  } else {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.getElementById('productForm').reset();
    editingProductId = null;
  }
}

window.openProductEditModal = function(id) {
  const prod = products.find(p => p.id === id);
  if (!prod) return;

  editingProductId = id;
  document.getElementById('prodId').value = prod.id;
  document.getElementById('prodName').value = prod.name;
  document.getElementById('prodPrice').value = prod.price;
  document.getElementById('prodCategory').value = prod.category;
  document.getElementById('prodImage').value = prod.image;
  document.getElementById('prodBadge').value = prod.badge || '';
  document.getElementById('prodServings').value = prod.servings || '';
  document.getElementById('prodDesc').value = prod.description;
  document.getElementById('prodIngredients').value = prod.ingredients || '';

  toggleProductModal(true, `Edit: ${prod.name}`);
};

window.deleteProduct = async function(id) {
  const prod = products.find(p => p.id === id);
  if (!prod) return;

  if (confirm(`Are you sure you want to delete "${prod.name}"?`)) {
    if (isBackendOnline) {
      try {
        const res = await fetch(`${API_URL}/api/products/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          products = products.filter(p => p.id !== id);
        }
      } catch (e) {
        deleteProductLocal(id);
      }
    } else {
      deleteProductLocal(id);
    }
    renderProductsTable();
    updateKPIs();
  }
};

function deleteProductLocal(id) {
  const localProducts = JSON.parse(localStorage.getItem('kamis_db_products')) || INITIAL_PRODUCTS;
  const filtered = localProducts.filter(p => p.id !== id);
  localStorage.setItem('kamis_db_products', JSON.stringify(filtered));
  products = filtered;
}

function populateConfigForm() {
  document.getElementById('confHours').value = storeConfig.hours || '';
  document.getElementById('confEmail').value = storeConfig.email || '';
  document.getElementById('confPhone').value = storeConfig.phone || '';
  document.getElementById('confAddress').value = storeConfig.address || '';
  document.getElementById('confInstagram').value = storeConfig.instagram || '';
  document.getElementById('confFacebook').value = storeConfig.facebook || '';
}

document.addEventListener('DOMContentLoaded', async () => {
  verifyLocalDB();

  const authenticated = sessionStorage.getItem('kamis_authenticated');
  if (authenticated === 'true') {
    document.getElementById('loginGate').style.display = 'none';
    initializeDashboard();
  } else {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const code = document.getElementById('passcode').value;
      if (code === 'admin123') {
        sessionStorage.setItem('kamis_authenticated', 'true');
        document.getElementById('loginGate').style.opacity = '0';
        setTimeout(() => {
          document.getElementById('loginGate').style.display = 'none';
        }, 300);
        initializeDashboard();
      } else {
        const err = document.getElementById('loginError');
        err.style.display = 'block';
        document.getElementById('passcode').value = '';
        document.getElementById('passcode').focus();
      }
    });
  }

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

  async function initializeDashboard() {
    await checkBackendStatus();
    await loadProducts();
    await loadOrders();
    await loadStoreConfig();

    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.dashboard-panel').forEach(p => p.classList.remove('active'));

        const targetBtn = e.currentTarget;
        targetBtn.classList.add('active');
        const targetTab = targetBtn.getAttribute('data-tab');
        document.getElementById(`${targetTab}Panel`).classList.add('active');
      });
    });

    document.getElementById('refreshOrdersBtn').addEventListener('click', async () => {
      await loadOrders();
      alert("Order list & analytics refreshed successfully.");
    });

    document.getElementById('addProductBtn').addEventListener('click', () => toggleProductModal(true, "Add Commodity"));
    document.getElementById('closeProductModal').addEventListener('click', () => toggleProductModal(false));
    document.getElementById('adminModalOverlay').addEventListener('click', () => toggleProductModal(false));

    const productForm = document.getElementById('productForm');
    productForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const payload = {
        name: document.getElementById('prodName').value,
        price: parseFloat(document.getElementById('prodPrice').value),
        category: document.getElementById('prodCategory').value,
        image: document.getElementById('prodImage').value,
        badge: document.getElementById('prodBadge').value || '1kg Basis',
        servings: document.getElementById('prodServings').value || '1 kg basis (Whipped Cream)',
        description: document.getElementById('prodDesc').value,
        ingredients: document.getElementById('prodIngredients').value || '',
        rating: 5.0,
        reviews: 12
      };

      if (editingProductId) {
        if (isBackendOnline) {
          try {
            const res = await fetch(`${API_URL}/api/products/${editingProductId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            if (res.ok) {
              const updated = await res.json();
              const idx = products.findIndex(p => p.id === editingProductId);
              if (idx !== -1) products[idx] = updated;
            }
          } catch (err) {
            saveProductLocal(editingProductId, payload);
          }
        } else {
          saveProductLocal(editingProductId, payload);
        }
      } else {
        if (isBackendOnline) {
          try {
            const res = await fetch(`${API_URL}/api/products`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            if (res.ok) {
              const created = await res.json();
              products.push(created);
            }
          } catch (err) {
            saveProductLocal(null, payload);
          }
        } else {
          saveProductLocal(null, payload);
        }
      }

      toggleProductModal(false);
      renderProductsTable();
      updateKPIs();
    });

    function saveProductLocal(id, payload) {
      const localProducts = JSON.parse(localStorage.getItem('kamis_db_products')) || INITIAL_PRODUCTS;
      if (id) {
        const idx = localProducts.findIndex(p => p.id === id);
        if (idx !== -1) localProducts[idx] = { id, ...payload };
      } else {
        const newProduct = {
          id: Date.now().toString(),
          ...payload
        };
        localProducts.push(newProduct);
      }
      localStorage.setItem('kamis_db_products', JSON.stringify(localProducts));
      products = localProducts;
    }

    const settingsForm = document.getElementById('settingsForm');
    settingsForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const payload = {
        hours: document.getElementById('confHours').value,
        email: document.getElementById('confEmail').value,
        phone: document.getElementById('confPhone').value,
        address: document.getElementById('confAddress').value,
        instagram: document.getElementById('confInstagram').value,
        facebook: document.getElementById('confFacebook').value
      };

      if (isBackendOnline) {
        try {
          const res = await fetch(`${API_URL}/api/config`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            storeConfig = await res.json();
            alert("Boutique settings updated successfully on server.");
          }
        } catch (err) {
          saveConfigLocal(payload);
        }
      } else {
        saveConfigLocal(payload);
      }
    });

    function saveConfigLocal(payload) {
      localStorage.setItem('kamis_db_config', JSON.stringify(payload));
      storeConfig = payload;
      alert("Boutique settings saved in browser memory.");
    }
  }
});
