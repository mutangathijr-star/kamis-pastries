# 🍰 Kami's Pastry Haven

> A luxury web application for an artisanal boutique bakery featuring a customer storefront, real-time order tracking, product quick view, and a passcode-protected staff management portal.

![Kami's Pastries Banner](public/assets/hero.jpg)

---

## ✨ Features

### 🛍️ Customer Storefront (`public/index.html`)
- **Gourmet UI & Design System**: Responsive layout with dark/light mode theme toggle, glassmorphism, and Playfair Display typography.
- **Product Catalog**: 8 artisanal pastry specialties across Luxury Cakes, Pastries, and Custom Celebrations with ratings, reviews, serving advice, and key ingredients.
- **Live Search & Multi-Criteria Sorting**: Search by pastry name or ingredient; sort by Price (Low/High), Rating (5.0 ★), and Alphabetical.
- **Product Quick View Modal**: Inspect pastry details, portion advice, allergen/ingredient lists, and set quantities before adding to bag.
- **Interactive Shopping Bag Drawer**: Slide-out cart drawer with real-time subtotal computation and badge indicators.
- **Checkout & Order Flow**: Supports Store Pickup vs. Home Delivery, delivery address input, special instructions / cake lettering, and discount promo code engine (`FRESH50`, `WELCOME10`).
- **Real-Time Order Receipt Tracking**: Customers can enter their receipt code (e.g. `ORD-4821`) to view live 4-step preparation progress.
- **Connoisseur Reviews & FAQ Accordion**: 5-star customer testimonials and collapsible answers for ordering lead times and dietary options.
- **VIP Sweet Club Newsletter**: Email subscription form with instant 10% discount promo code generator.

### 🔐 Staff Management Portal (`public/admin.html`)
- **Passcode Authentication**: Secured gate (Default Passcode: **`admin123`**).
- **KPI Analytics Cards**: Real-time sales revenue ($), total orders count, pending orders count, and active catalog count.
- **Order Management**: Review customer contact details, delivery addresses, cake inscription notes, and toggle order status (`Pending` ↔ `Completed`).
- **Catalog Management**: Add new specialties, edit existing item details/prices, or remove products.
- **Boutique Configurator**: Live editor for bakery operating hours, contact email, phone, location address, and social links.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS3 (CSS Variables, Flexbox, Grid, Animations), Vanilla JavaScript (ES6+).
- **Storage**: Hybrid LocalStorage fallback (works 100% client-side without a server) + Express REST API sync.
- **Backend (Optional)**: Node.js, Express.js CORS middleware.

---

## 🚀 Getting Started

### Option 1: Direct Browser Access (Static / GitHub Pages)
No installation or server setup needed! Simply open `public/index.html` in any web browser.

- **Storefront**: Open `public/index.html`
- **Staff Portal**: Open `public/admin.html` *(Passcode: `admin123`)*

### Option 2: Node.js Express Server
To run with the backend API enabled:

1. Clone or extract the repository:
   ```bash
   git clone https://github.com/your-username/kamis-pastry-haven.git
   cd kamis-pastry-haven
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📂 Project Structure

```
kamis-pastry-haven/
├── package.json          # Node.js project configuration & scripts
├── server.js            # Express REST API backend server
├── database.json        # Persistent JSON database for products, config, & orders
├── README.md            # Project documentation
├── .gitignore           # Git ignore file
└── public/
    ├── index.html       # Customer storefront UI
    ├── admin.html       # Staff management portal UI
    ├── styles.css       # Design system, dark mode variables & responsive styles
    ├── app.js           # Storefront client controller & cart logic
    ├── admin.js         # Staff portal controller & catalog CRUD
    └── assets/          # High-resolution food photography assets
        ├── hero.jpg
        ├── chocolate_cake.jpg
        ├── strawberry_tart.jpg
        ├── celebration_cake.jpg
        ├── macarons.jpg
        ├── raspberry_cake.jpg
        ├── caramel_croissant.jpg
        ├── hazelnut_eclair.jpg
        └── wedding_cake.jpg
```

---

## 🌐 Deploying to GitHub & Hosting

### How to Upload to GitHub:
1. Create a new repository on [GitHub](https://github.com/new).
2. Initialize git and push the files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Kami's Pastry Haven"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/kamis-pastry-haven.git
   git push -u origin main
   ```

### Free Hosting Options:
- **GitHub Pages**: Go to `Settings -> Pages -> Source: main / (root or public)` to publish your site for free!
- **Vercel / Netlify**: Connect your GitHub repository for instant 1-click deployment.

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
