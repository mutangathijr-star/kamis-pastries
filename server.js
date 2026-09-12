const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper to read DB
function readDatabase() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database file:', err);
    return { products: [], config: {}, orders: [] };
  }
}

// Helper to write DB
function writeDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing database file:', err);
  }
}

// --- API ROUTES ---

// GET products
app.get('/api/products', (req, res) => {
  const db = readDatabase();
  res.json(db.products);
});

// POST product (Admin)
app.post('/api/products', (req, res) => {
  const db = readDatabase();
  const newProduct = {
    id: Date.now().toString(),
    name: req.body.name,
    price: parseFloat(req.body.price) || 0,
    category: req.body.category || 'Other',
    description: req.body.description || '',
    image: req.body.image || 'assets/chocolate_cake.jpg'
  };
  db.products.push(newProduct);
  writeDatabase(db);
  res.status(201).json(newProduct);
});

// PUT product (Admin)
app.put('/api/products/:id', (req, res) => {
  const db = readDatabase();
  const id = req.params.id;
  const index = db.products.findIndex(p => p.id === id);
  if (index !== -1) {
    db.products[index] = {
      ...db.products[index],
      name: req.body.name || db.products[index].name,
      price: parseFloat(req.body.price) !== undefined ? parseFloat(req.body.price) : db.products[index].price,
      category: req.body.category || db.products[index].category,
      description: req.body.description || db.products[index].description,
      image: req.body.image || db.products[index].image
    };
    writeDatabase(db);
    res.json(db.products[index]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// DELETE product (Admin)
app.delete('/api/products/:id', (req, res) => {
  const db = readDatabase();
  const id = req.params.id;
  const index = db.products.findIndex(p => p.id === id);
  if (index !== -1) {
    const deletedProduct = db.products.splice(index, 1);
    writeDatabase(db);
    res.json(deletedProduct[0]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// GET configuration
app.get('/api/config', (req, res) => {
  const db = readDatabase();
  res.json(db.config);
});

// POST configuration (Admin)
app.post('/api/config', (req, res) => {
  const db = readDatabase();
  db.config = {
    ...db.config,
    hours: req.body.hours || db.config.hours,
    email: req.body.email || db.config.email,
    phone: req.body.phone || db.config.phone,
    address: req.body.address || db.config.address,
    facebook: req.body.facebook || db.config.facebook,
    instagram: req.body.instagram || db.config.instagram
  };
  writeDatabase(db);
  res.json(db.config);
});

// GET orders (Admin)
app.get('/api/orders', (req, res) => {
  const db = readDatabase();
  res.json(db.orders);
});

// POST orders (Customer)
app.post('/api/orders', (req, res) => {
  const db = readDatabase();
  const newOrder = {
    id: 'ORD-' + Math.floor(1000 + Math.random() * 9000).toString(),
    customerName: req.body.customerName,
    email: req.body.email,
    phone: req.body.phone,
    type: req.body.type || 'pickup', // pickup or delivery
    address: req.body.type === 'delivery' ? req.body.address : '',
    notes: req.body.notes || '',
    items: req.body.items || [],
    total: parseFloat(req.body.total) || 0,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  db.orders.unshift(newOrder); // Newest orders first
  writeDatabase(db);
  console.log(`New order placed: ${newOrder.id} by ${newOrder.customerName}`);
  res.status(201).json(newOrder);
});

// PUT orders status (Admin)
app.put('/api/orders/:id', (req, res) => {
  const db = readDatabase();
  const id = req.params.id;
  const index = db.orders.findIndex(o => o.id === id);
  if (index !== -1) {
    db.orders[index].status = req.body.status || db.orders[index].status;
    writeDatabase(db);
    res.json(db.orders[index]);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Fallback to serve index.html for undefined routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(` Kami's Pastries Server running on port ${PORT} `);
  console.log(` Visit http://localhost:${PORT} in your web browser`);
  console.log(`==================================================`);
});
