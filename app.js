// FRONTEND STOREFRONT CONTROLLER - KAMI'S PASTRY HAVEN

const CURRENT_DB_VERSION = "v10_guaranteed_cake_photos_no_cats_no_cache";

const SVG_FALLBACK_CAKE = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23F6F0EC'/%3E%3Cpath d='M100 220 L300 220 L280 150 L120 150 Z' fill='%23C39B62'/%3E%3Cpath d='M120 150 L280 150 L260 100 L140 100 Z' fill='%23E5C397'/%3E%3Ccircle cx='200' cy='85' r='15' fill='%23C94A4A'/%3E%3Ctext x='200' y='260' font-family='serif' font-size='20' fill='%232B1D19' text-anchor='middle'%3EKami's Pastry Haven%3C/text%3E%3C/svg%3E";

const UNIQUE_FALLBACK_URLS = {
  "1": "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&auto=format&fit=crop",
  "2": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop",
  "3": "https://images.unsplash.com/photo-1519869325930-281384150729?w=600&auto=format&fit=crop",
  "4": "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&auto=format&fit=crop",
  "5": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop",
  "6": "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600&auto=format&fit=crop",
  "7": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop",
  "8": "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&auto=format&fit=crop",
  "9": "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&auto=format&fit=crop",
  "10": "https://images.unsplash.com/photo-1622896784083-cc051313dbab?w=600&auto=format&fit=crop",
  "11": "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&auto=format&fit=crop",
  "12": "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&auto=format&fit=crop",
  "13": "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=600&auto=format&fit=crop",
  "14": "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&auto=format&fit=crop",
  "15": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop",
  "16": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop",
  "17": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop",
  "18": "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=600&auto=format&fit=crop",
  "19": "https://images.unsplash.com/photo-1511018556340-d16986a1c194?w=600&auto=format&fit=crop",
  "20": "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
  "21": "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&auto=format&fit=crop",
  "22": "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&auto=format&fit=crop",
  "23": "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&auto=format&fit=crop",
  "24": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop",
  "25": "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=600&auto=format&fit=crop"
};

function handleCakeImgError(imgElem, productId) {
  if (!imgElem.getAttribute('data-tried-online')) {
    imgElem.setAttribute('data-tried-online', 'true');
    imgElem.src = UNIQUE_FALLBACK_URLS[productId] || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop";
  } else {
    imgElem.onerror = null;
    imgElem.src = SVG_FALLBACK_CAKE;
  }
}

const INITIAL_PRODUCTS = [
  { "id": "1", "name": "Vanila Cake", "price": 2500, "category": "Classic Cakes", "badge": "Classic 1kg", "rating": 4.9, "reviews": 112, "servings": "1 kg basis (Whipped Cream)", "description": "Soft, fluffy vanilla sponge cake enveloped in silky whipped cream frosting. Simple, elegant, and delicious.", "ingredients": "Organic Vanilla Bean, Pure Butter, Fresh Whipped Cream, Eggs, Flour", "image": "assets/vanilla_cake.jpg" },
  { "id": "2", "name": "Strawberry Cake", "price": 2500, "category": "Classic Cakes", "badge": "Fresh Fruit 1kg", "rating": 4.8, "reviews": 98, "servings": "1 kg basis (Whipped Cream)", "description": "Delicate sponge layered with real strawberry compote and light whipped cream frosting.", "ingredients": "Fresh Strawberry Compote, Vanilla Sponge, Light Whipped Cream", "image": "assets/strawberry_cake.jpg" },
  { "id": "3", "name": "Orange Cake", "price": 2500, "category": "Classic Cakes", "badge": "Citrus Specialty", "rating": 4.7, "reviews": 76, "servings": "1 kg basis (Whipped Cream)", "description": "Zesty and aromatic orange-infused sponge cake finished with smooth whipped cream.", "ingredients": "Fresh Orange Zest, Citrus Glaze, Whipped Cream", "image": "assets/orange_cake.jpg" },
  { "id": "4", "name": "Lemon Cake", "price": 2500, "category": "Classic Cakes", "badge": "Refreshing", "rating": 4.8, "reviews": 89, "servings": "1 kg basis (Whipped Cream)", "description": "Bright and tangy lemon sponge cake with lemon curd layers and fluffy cream.", "ingredients": "Fresh Lemon Juice, Lemon Curd, Whipped Cream Frosting", "image": "assets/lemon_cake.jpg" },
  { "id": "5", "name": "Raspberry Cake", "price": 2500, "category": "Classic Cakes", "badge": "Popular", "rating": 4.9, "reviews": 145, "servings": "1 kg basis (Whipped Cream)", "description": "Moist vanilla layers filled with vibrant tart raspberry puree and smooth cream.", "ingredients": "Organic Raspberries, Vanilla Sponge, Fresh Whipped Cream", "image": "assets/raspberry_cake.jpg" },
  { "id": "6", "name": "Passion Cake", "price": 2500, "category": "Classic Cakes", "badge": "Tropical", "rating": 4.9, "reviews": 104, "servings": "1 kg basis (Whipped Cream)", "description": "Exotic passionfruit infused sponge layered with sweet and tangy passion reduction cream.", "ingredients": "Fresh Passion Fruit Nectar, Vanilla Sponge, Whipped Cream", "image": "assets/passion_cake.jpg" },
  { "id": "7", "name": "Pineapple Cake", "price": 2500, "category": "Classic Cakes", "badge": "Tropical Classic", "rating": 4.8, "reviews": 82, "servings": "1 kg basis (Whipped Cream)", "description": "Sweet pineapple pieces layered inside light whipped cream and sponge cake.", "ingredients": "Crushed Pineapple, Vanilla Sponge, Fresh Whipped Cream", "image": "assets/pineapple_cake.jpg" },
  { "id": "8", "name": "Blueberry Cake", "price": 2700, "category": "Gourmet Cakes", "badge": "Customer Favorite", "rating": 4.9, "reviews": 160, "servings": "1 kg basis (Whipped Cream)", "description": "Lush blueberry compote folded into vanilla sponge layers and blueberry whipped cream.", "ingredients": "Fresh Blueberries, Blueberry Filling, Light Whipped Cream", "image": "assets/blueberry_cake.jpg" },
  { "id": "9", "name": "Lemon Blueberry Cake", "price": 2700, "category": "Gourmet Cakes", "badge": "Signature Duo", "rating": 5.0, "reviews": 188, "servings": "1 kg basis (Whipped Cream)", "description": "The perfect balance of zesty lemon sponge and sweet blueberry reduction with whipped frosting.", "ingredients": "Fresh Lemon Zest, Organic Blueberries, Cream Cheese Whipped Frosting", "image": "assets/lemon_blueberry_cake.jpg" },
  { "id": "10", "name": "Carrot Cake", "price": 2700, "category": "Gourmet Cakes", "badge": "Spiced Perfection", "rating": 4.9, "reviews": 135, "servings": "1 kg basis (Whipped Cream)", "description": "Moist spiced carrot sponge cake with cinnamon, walnuts, and silky cream frosting.", "ingredients": "Grated Carrots, Cinnamon, Walnuts, Cream Cheese Whipped Icing", "image": "assets/carrot_cake.jpg" },
  { "id": "11", "name": "Pinacolada Cake", "price": 2700, "category": "Gourmet Cakes", "badge": "Island Flavor", "rating": 4.8, "reviews": 92, "servings": "1 kg basis (Whipped Cream)", "description": "Tropical coconut and sweet pineapple folded into moist sponge cake with whipped cream.", "ingredients": "Desiccated Coconut, Pineapple Compote, Coconut Cream", "image": "assets/pinacolada_cake.jpg" },
  { "id": "12", "name": "Cookies & Cream Cake", "price": 2700, "category": "Gourmet Cakes", "badge": "Bestseller", "rating": 5.0, "reviews": 210, "servings": "1 kg basis (Whipped Cream)", "description": "Rich vanilla sponge loaded with crushed Oreo cookies and creamy cookie frosting.", "ingredients": "Crushed Chocolate Cookies, Vanilla Sponge, Oreo Whipped Cream", "image": "assets/cookies_cream_cake.jpg" },
  { "id": "13", "name": "Bubblegum Cake", "price": 2700, "category": "Gourmet Cakes", "badge": "Kids Special", "rating": 4.7, "reviews": 68, "servings": "1 kg basis (Whipped Cream)", "description": "Fun, vibrant pastel blue and pink bubblegum-flavored sponge cake for joyful celebrations.", "ingredients": "Bubblegum Flavor, Pastel Whipped Cream, Rainbow Sprinkles", "image": "assets/bubblegum_cake.jpg" },
  { "id": "14", "name": "Funfetti Cake", "price": 2700, "category": "Gourmet Cakes", "badge": "Party Choice", "rating": 4.9, "reviews": 118, "servings": "1 kg basis (Whipped Cream)", "description": "Fluffy vanilla sponge studded with colorful sprinkles and sweet whipped cream frosting.", "ingredients": "Confetti Sprinkles, Vanilla Bean, Light Whipped Cream", "image": "assets/funfetti_cake.jpg" },
  { "id": "15", "name": "Tutti Frutti Vanilla Cake", "price": 2700, "category": "Gourmet Cakes", "badge": "Fruity Delight", "rating": 4.8, "reviews": 84, "servings": "1 kg basis (Whipped Cream)", "description": "Vanilla cake loaded with candied fruit bits and topped with velvety whipped cream.", "ingredients": "Candied Tutti Frutti, Vanilla Sponge, Whipped Cream", "image": "assets/tutti_frutti_cake.jpg" },
  { "id": "16", "name": "Chocolate Fudge Cake", "price": 2800, "category": "Chocolate Cakes", "badge": "Top Seller 🍫", "rating": 5.0, "reviews": 245, "servings": "1 kg basis (Whipped Cream)", "description": "Deep, rich cocoa sponge layered with gooey dark chocolate fudge ganache.", "ingredients": "Dark Cocoa, Belgian Fudge, Chocolate Whipped Cream", "image": "assets/chocolate_fudge_cake.jpg" },
  { "id": "17", "name": "Chocolate Mint Cake", "price": 2800, "category": "Chocolate Cakes", "badge": "Decadent", "rating": 4.9, "reviews": 116, "servings": "1 kg basis (Whipped Cream)", "description": "Rich chocolate layers complemented by cool, refreshing peppermint cream frosting.", "ingredients": "Dutch Processed Cocoa, Natural Peppermint Oil, Chocolate Ganache", "image": "assets/chocolate_mint_cake.jpg" },
  { "id": "18", "name": "Chocolate Orange Cake", "price": 2800, "category": "Chocolate Cakes", "badge": "Gourmet Twist", "rating": 4.8, "reviews": 95, "servings": "1 kg basis (Whipped Cream)", "description": "Velvety chocolate sponge infused with citrus orange notes and chocolate cream.", "ingredients": "Dark Chocolate, Orange Essence, Citrus Chocolate Icing", "image": "assets/chocolate_orange_cake.jpg" },
  { "id": "19", "name": "Classic Chocolate Cake", "price": 2800, "category": "Chocolate Cakes", "badge": "Pure Cocoa", "rating": 4.9, "reviews": 172, "servings": "1 kg basis (Whipped Cream)", "description": "Timeless moist chocolate cake frosted with smooth whipped chocolate cream.", "ingredients": "Pure Cocoa Powder, Chocolate Whipped Frosting, Vanilla", "image": "assets/classic_chocolate_cake.jpg" },
  { "id": "20", "name": "Red Velvet Cake", "price": 3000, "category": "Special Cakes", "badge": "Luxury Classic 🌟", "rating": 5.0, "reviews": 280, "servings": "1 kg basis (Whipped Cream)", "description": "Classic crimson cocoa sponge cake finished with luscious cream cheese whipped frosting.", "ingredients": "Crimson Cocoa Sponge, Cream Cheese, Pure Vanilla", "image": "assets/red_velvet.jpg" },
  { "id": "21", "name": "Blackforest Cake", "price": 3000, "category": "Special Cakes", "badge": "Bestseller 🍒", "rating": 5.0, "reviews": 290, "servings": "1 kg basis (Whipped Cream)", "description": "Traditional dark chocolate sponge layered with sweet cherries and fluffy whipped cream.", "ingredients": "Dark Chocolate Sponge, Glazed Cherries, Chocolate Shavings", "image": "assets/blackforest.jpg" },
  { "id": "22", "name": "White Forest Cake", "price": 3000, "category": "Special Cakes", "badge": "Elegant", "rating": 4.9, "reviews": 164, "servings": "1 kg basis (Whipped Cream)", "description": "Soft white vanilla sponge filled with juicy cherries and topped with white chocolate curls.", "ingredients": "Vanilla Sponge, Red Cherries, White Chocolate Shavings, Whipped Cream", "image": "assets/white_forest_cake.jpg" },
  { "id": "23", "name": "Oreo Mint Cake", "price": 3000, "category": "Special Cakes", "badge": "Chef Special", "rating": 4.9, "reviews": 122, "servings": "1 kg basis (Whipped Cream)", "description": "Chocolate cake layered with cool mint whipped cream and crushed Oreo cookie crunch.", "ingredients": "Oreo Cookies, Cool Peppermint Cream, Dark Chocolate Cake", "image": "assets/oreo_mint_cake.jpg" },
  { "id": "24", "name": "Fruit Cake", "price": 3200, "category": "Special Cakes", "badge": "Rich & Fruity", "rating": 4.9, "reviews": 96, "servings": "1 kg basis (Whipped Cream)", "description": "Dense, luxurious cake loaded with premium dried fruits, nuts, and aromatic spices.", "ingredients": "Soaked Dried Fruits, Citrus Peel, Spiced Sponge, Whipped Cream", "image": "assets/fruit_cake.jpg" },
  { "id": "25", "name": "Fruit Cake with Rum", "price": 3700, "category": "Special Cakes", "badge": "Premium Rum 🍾", "rating": 5.0, "reviews": 150, "servings": "1 kg basis (Whipped Cream)", "description": "Aged dark fruit cake infused with authentic dark rum, rich spices, and premium dried fruits.", "ingredients": "Dark Rum Infusion, Soaked Raisins & Cherries, Spiced Sponge, Whipped Cream", "image": "assets/fruit_cake_rum.jpg" }
];

const INITIAL_CONFIG = {
  "hours": "Mon-Sat: 8:00 AM - 8:00 PM, Sun: 9:00 AM - 6:00 PM",
  "email": "hello@kamispastries.com",
  "phone": "0119796605",
  "whatsapp": "254119796605",
  "address": "Kami's Pastry Haven Boutique",
  "facebook": "https://facebook.com/kamispastries",
  "instagram": "https://instagram.com/kami_s_pastry_haven"
};

let products = [];
let storeConfig = {};
let cart = JSON.parse(localStorage.getItem('kamis_cart')) || [];
let activeCategory = 'all';
let searchQuery = '';
let currentSort = 'featured';
let isBackendOnline = false;
let qvProduct = null;
let qvQuantity = 1;

const API_URL = window.location.origin;

function initializeLocalStorageDB() {
  const version = localStorage.getItem('kamis_db_version');
  if (version !== CURRENT_DB_VERSION) {
    localStorage.removeItem('kamis_db_products');
    localStorage.setItem('kamis_db_version', CURRENT_DB_VERSION);
  }
  
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
    if (res.ok) isBackendOnline = true;
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
  localStorage.setItem('kamis_db_products', JSON.stringify(INITIAL_PRODUCTS));
  localStorage.setItem('kamis_db_version', CURRENT_DB_VERSION);
  products = INITIAL_PRODUCTS;
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

  if (contactEmail) {
    contactEmail.textContent = storeConfig.email;
    contactEmail.href = `mailto:${storeConfig.email}`;
  }
  if (contactPhone) {
    contactPhone.textContent = storeConfig.phone || '0119796605';
    contactPhone.href = `tel:${(storeConfig.phone || '0119796605').replace(/\s+/g, '')}`;
  }
  if (mapAddress) {
    mapAddress.textContent = storeConfig.address || "Kami's Pastry Haven Boutique";
  }
  if (contactInsta) {
    contactInsta.href = storeConfig.instagram || "https://instagram.com/kami_s_pastry_haven";
  }
}

function saveCart() {
  localStorage.setItem('kamis_cart', JSON.stringify(cart));
  updateCartUI();
}

function formatPrice(val) {
  return `Ksh ${parseInt(val).toLocaleString()}`;
}

function getWhatsAppUrl(text) {
  const phone = (storeConfig.whatsapp || '254119796605').replace(/[^0-9]/g, '');
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

// Render Products Grid
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  grid.innerHTML = '';

  let filtered = activeCategory === 'all'
    ? [...products]
    : products.filter(p => p.category === activeCategory);

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      (p.ingredients && p.ingredients.toLowerCase().includes(q))
    );
  }

  if (currentSort === 'price-asc') {
    filtered.sort((a, b) => parseInt(a.price) - parseInt(b.price));
  } else if (currentSort === 'price-desc') {
    filtered.sort((a, b) => parseInt(b.price) - parseInt(a.price));
  } else if (currentSort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="loading-spinner"><p>No cakes match your search query.</p></div>';
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';
    
    const ratingStars = '★'.repeat(Math.round(product.rating || 5));
    const waMessage = `Hello Kami's Pastry Haven! I would like to order: ${product.name} (1kg basis - ${formatPrice(product.price)})`;
    const waUrl = getWhatsAppUrl(waMessage);

    card.innerHTML = `
      <div class="product-img-wrapper" data-qv="${product.id}">
        <span class="product-badge">${product.badge || '1kg Basis'}</span>
        <img src="${product.image}" alt="${product.name}" onerror="handleCakeImgError(this, '${product.id}')">
        <button class="quick-view-btn" data-qv="${product.id}">Quick View</button>
      </div>
      <div class="product-info">
        <div class="product-rating-row">
          <span class="stars">${ratingStars}</span>
          <span>${product.servings || '1kg Whipped Cream'}</span>
        </div>
        <h3 class="product-title" data-qv="${product.id}">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <div class="product-price-row">
            <span class="product-price">${formatPrice(product.price)}</span>
          </div>
          <div class="card-actions-row">
            <button class="btn btn-primary add-cart-btn" data-id="${product.id}">🛒 Add to Bag</button>
            <a href="${waUrl}" target="_blank" class="btn btn-whatsapp-card">💬 WhatsApp</a>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  document.querySelectorAll('[data-qv]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      openQuickViewModal(elem.getAttribute('data-qv'));
    });
  });

  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(e.currentTarget.getAttribute('data-id'));
    });
  });
}

function openQuickViewModal(productId) {
  qvProduct = products.find(p => p.id === productId);
  if (!qvProduct) return;

  qvQuantity = 1;

  const qvImg = document.getElementById('qvImage');
  qvImg.src = qvProduct.image;
  qvImg.removeAttribute('data-tried-online');
  qvImg.onerror = function() {
    handleCakeImgError(this, qvProduct.id);
  };

  document.getElementById('qvBadge').textContent = qvProduct.badge || '1kg Whipped Cream';
  document.getElementById('qvCategory').textContent = qvProduct.category;
  document.getElementById('qvTitle').textContent = qvProduct.name;
  document.getElementById('qvPrice').textContent = formatPrice(qvProduct.price);
  document.getElementById('qvDescription').textContent = qvProduct.description;
  document.getElementById('qvServings').textContent = qvProduct.servings || '1 kg basis (Whipped Cream)';
  document.getElementById('qvIngredients').textContent = qvProduct.ingredients || 'Whipped cream, eggs, flour, real fruit compote';
  document.getElementById('qvRatingScore').textContent = qvProduct.rating || '5.0';
  document.getElementById('qvReviews').textContent = qvProduct.reviews || '42';
  document.getElementById('qvQtyDisplay').textContent = qvQuantity;

  const waBtn = document.getElementById('qvWhatsAppBtn');
  if (waBtn) {
    const waMsg = `Hello Kami's Pastry Haven! I would like to order: ${qvProduct.name} (Qty: ${qvQuantity}, 1kg basis - ${formatPrice(qvProduct.price)})`;
    waBtn.onclick = () => window.open(getWhatsAppUrl(waMsg), '_blank');
  }

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
  const cartWhatsAppBtn = document.getElementById('cartWhatsAppBtn');
  
  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = '<div class="empty-cart-message">Your bag is empty. Select your favorite cake flavor!</div>';
    checkoutBtn.disabled = true;
    cartTotalSum.textContent = 'Ksh 0';
    if (cartWhatsAppBtn) cartWhatsAppBtn.style.display = 'none';
    return;
  }

  checkoutBtn.disabled = false;
  itemsContainer.innerHTML = '';
  
  let totalPrice = 0;
  let itemsListText = '';

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;
    itemsListText += `- ${item.name} x${item.quantity} (${formatPrice(itemTotal)})\n`;

    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.onerror=null; this.src='${SVG_FALLBACK_CAKE}';">
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
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

  cartTotalSum.textContent = formatPrice(totalPrice);

  if (cartWhatsAppBtn) {
    cartWhatsAppBtn.style.display = 'inline-flex';
    const msg = `Hello Kami's Pastry Haven! I would like to order the following items from my bag:\n${itemsListText}\nTotal: ${formatPrice(totalPrice)}`;
    cartWhatsAppBtn.href = getWhatsAppUrl(msg);
  }

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
  const depositAmount = document.getElementById('depositAmount');
  if (!container) return;

  container.innerHTML = '';
  let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'summary-item-line';
    div.style.cssText = 'display:flex; justify-content:space-between; margin-bottom:6px; font-size:14px;';
    div.innerHTML = `
      <span>${item.name} <strong>x${item.quantity} (1kg)</strong></span>
      <span>${formatPrice(itemTotal)}</span>
    `;
    container.appendChild(div);
  });

  let deposit = total * 0.5;

  depositAmount.textContent = formatPrice(deposit);
  sumTotal.textContent = formatPrice(total);
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

function handleTrackOrder(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('trackingIdInput').value.trim().toUpperCase();
  if (!input) return;

  const localOrders = JSON.parse(localStorage.getItem('kamis_db_orders')) || [];
  let order = localOrders.find(o => o.id === input);

  const resultBox = document.getElementById('trackingResult');

  if (!order) {
    order = {
      id: input,
      customerName: "Valued Guest",
      type: "pickup",
      total: 2800,
      status: "pending",
      items: [{ name: "Chocolate Fudge Cake (1kg)", quantity: 1 }]
    };
  }

  document.getElementById('trackResultId').textContent = order.id;
  document.getElementById('trackResultName').textContent = order.customerName;
  document.getElementById('trackResultType').textContent = order.type === 'delivery' ? 'Home Delivery' : 'Store Pickup';
  document.getElementById('trackResultTotal').textContent = formatPrice(order.total);

  let itemsHTML = '';
  order.items.forEach(i => {
    itemsHTML += `<span>${i.name} (x${i.quantity})</span> `;
  });
  document.getElementById('trackResultItemsList').innerHTML = itemsHTML;

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
    line1.classList.add('active');
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

document.addEventListener('DOMContentLoaded', async () => {
  initializeLocalStorageDB();
  
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

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      activeCategory = e.target.getAttribute('data-category');
      renderProducts();
    });
  });

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

  document.getElementById('cartTrigger').addEventListener('click', () => toggleCartDrawer(true));
  document.getElementById('closeCart').addEventListener('click', () => toggleCartDrawer(false));
  document.getElementById('cartOverlay').addEventListener('click', () => toggleCartDrawer(false));

  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
  });

  document.getElementById('checkoutBtn').addEventListener('click', () => {
    toggleCartDrawer(false);
    toggleCheckoutModal(true);
  });
  
  document.getElementById('closeCheckout').addEventListener('click', () => toggleCheckoutModal(false));
  document.getElementById('modalOverlay').addEventListener('click', () => {
    toggleCheckoutModal(false);
    closeQuickViewModal();
  });

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

  const trackingForm = document.getElementById('trackingForm');
  if (trackingForm) {
    trackingForm.addEventListener('submit', handleTrackOrder);
  }

  const sendWhatsAppOrderBtn = document.getElementById('sendWhatsAppOrderBtn');
  if (sendWhatsAppOrderBtn) {
    sendWhatsAppOrderBtn.addEventListener('click', () => {
      const name = document.getElementById('custName').value || 'Guest';
      const phone = document.getElementById('custPhone').value || 'N/A';
      const orderType = document.querySelector('input[name="orderType"]:checked').value;
      const address = document.getElementById('custAddress').value || 'N/A';
      const notes = document.getElementById('orderNotes').value || 'None';

      let itemsText = '';
      let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      cart.forEach(i => {
        itemsText += `- ${i.name} x${i.quantity} (${formatPrice(i.price * i.quantity)})\n`;
      });

      const message = `Hello Kami's Pastry Haven! I would like to place an order:\n\n*Customer:* ${name}\n*Phone:* ${phone}\n*Fulfillment:* ${orderType}\n${orderType === 'delivery' ? `*Address:* ${address}\n` : ''}*Special Request:* ${notes}\n\n*Order Items:*\n${itemsText}\n*Total:* ${formatPrice(total)}\n*50% Deposit:* ${formatPrice(total * 0.5)}`;

      window.open(getWhatsAppUrl(message), '_blank');
    });
  }

  const checkoutForm = document.getElementById('checkoutForm');
  checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const customerName = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const email = document.getElementById('custEmail').value;
    const orderType = document.querySelector('input[name="orderType"]:checked').value;
    const address = orderType === 'delivery' ? custAddress.value : '';
    const notes = document.getElementById('orderNotes').value;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
      const waShareMsg = `Hello Kami's Pastry Haven! Here is my confirmed order receipt:\n\n*Order ID:* ${processedOrder.id}\n*Customer:* ${processedOrder.customerName}\n*Total:* ${formatPrice(processedOrder.total)}\n*50% Deposit:* ${formatPrice(processedOrder.total * 0.5)}`;
      document.getElementById('successWhatsAppShareBtn').href = getWhatsAppUrl(waShareMsg);

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
    document.getElementById('successTotal').textContent = formatPrice(order.total);
    document.getElementById('successDeposit').textContent = formatPrice(order.total * 0.5);
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
