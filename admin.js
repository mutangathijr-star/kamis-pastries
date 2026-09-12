// ADMIN PORTAL CONTROLLER - KAMI'S PASTRIES

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

let products = [];
let orders = [];
let storeConfig = {};
let isBackendOnline = false;
let editingProductId = null;

const API_URL = window.location.origin;

async function checkBackendStatus() {
  try {
    const res = await fetch(`${API_URL}/api/config`);
    if (res.ok) isBackendOnline = true;
  } catch (err) {
    isBackendOnline = false;
  }
}

function verifyLocalDB() {
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

  revElem.textContent = `$${totalRev.toFixed(2)}`;
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
      itemsHTML += `<li>${item.name} <strong>x${item.quantity}</strong></li>`;
    });
    itemsHTML += '</ul>';

    if (order.notes) {
      itemsHTML += `<div style="font-size: 11px; margin-top: 6px; padding: 4px; border-left: 2px solid var(--gold-accent); color:var(--text-secondary); max-width: 200px;">
        <strong>Instruction:</strong> ${order.notes}
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
      <td style="font-weight:700; font-family:var(--font-serif); font-size: 16px; color:var(--text-primary);">$${parseFloat(order.total).toFixed(2)}</td>
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
      <td style="font-family:var(--font-serif); font-weight:700; font-size:16px; color:var(--text-primary);">$${parseFloat(prod.price).toFixed(2)}</td>
      <td style="max-width: 220px; font-size:12px; color:var(--text-secondary); line-height:1.4;">
        <div><strong>Servings:</strong> ${prod.servings || 'N/A'}</div>
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
        badge: document.getElementById('prodBadge').value || 'Artisan',
        servings: document.getElementById('prodServings').value || 'Individual',
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
