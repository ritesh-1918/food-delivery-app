/* ================================================
   app.js – Crave Food Delivery App
   ================================================ */

'use strict';

/* ---- Data ---- */
const restaurants = [
    {
        id: 'r1',
        name: 'The Burger Joint',
        rating: 4.8,
        cuisine: 'American · Fast Food',
        deliveryTime: '20–30 min',
        image: 'assets/burger.png',
        menu: [
            { id: 'm1', name: 'Classic Cheeseburger', price: 12.99, image: 'assets/burger.png', desc: 'Juicy beef patty with aged cheddar, lettuce & pickles.' },
            { id: 'm2', name: 'Double Bacon Burger',  price: 16.99, image: 'assets/burger.png', desc: 'Two smashed patties, crispy bacon, smoky sauce.' },
            { id: 'm3', name: 'Truffle Fries',        price: 6.99,  image: 'assets/burger.png', desc: 'Shoestring fries tossed in black truffle oil & parmesan.' },
            { id: 'm4', name: 'BBQ Chicken Burger',   price: 14.49, image: 'assets/burger.png', desc: 'Crispy fried chicken, BBQ glaze, coleslaw.' }
        ]
    },
    {
        id: 'r2',
        name: "Luigi's Pizza Place",
        rating: 4.5,
        cuisine: 'Italian · Pizza',
        deliveryTime: '25–40 min',
        image: 'assets/pizza.png',
        menu: [
            { id: 'm5', name: 'Margherita Pizza', price: 14.99, image: 'assets/pizza.png', desc: 'Classic tomato, fresh mozzarella & basil.' },
            { id: 'm6', name: 'Pepperoni Pizza',  price: 16.99, image: 'assets/pizza.png', desc: 'Loaded with crispy pepperoni and mozzarella.' },
            { id: 'm7', name: 'Garlic Knots',     price: 5.99,  image: 'assets/pizza.png', desc: 'Freshly baked knots with garlic-herb butter dip.' },
            { id: 'm8', name: 'Tiramisu',         price: 7.49,  image: 'assets/pizza.png', desc: 'Italian dessert with espresso-soaked ladyfingers.' }
        ]
    },
    {
        id: 'r3',
        name: 'Zen Sushi Bar',
        rating: 4.9,
        cuisine: 'Japanese · Sushi',
        deliveryTime: '30–45 min',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?fit=max&w=600&q=80',
        menu: [
            { id: 'm9',  name: 'Spicy Tuna Roll',   price: 13.99, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?fit=max&w=400&q=80', desc: 'Fresh tuna with spicy mayo & cucumber.' },
            { id: 'm10', name: 'Dragon Roll',        price: 18.99, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?fit=max&w=400&q=80', desc: 'Eel & cucumber topped with avocado slices.' },
            { id: 'm11', name: 'Salmon Sashimi (8)', price: 21.99, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?fit=max&w=400&q=80', desc: 'Premium Norwegian salmon, thinly sliced.' }
        ]
    },
    {
        id: 'r4',
        name: 'Spice Route',
        rating: 4.6,
        cuisine: 'Indian · Curry',
        deliveryTime: '35–50 min',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?fit=max&w=600&q=80',
        menu: [
            { id: 'm12', name: 'Butter Chicken',    price: 15.99, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?fit=max&w=400&q=80', desc: 'Tender chicken in rich, creamy tomato sauce.' },
            { id: 'm13', name: 'Garlic Naan (4)',    price: 4.99,  image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?fit=max&w=400&q=80', desc: 'Tandoor-baked flatbread with garlic & butter.' },
            { id: 'm14', name: 'Mango Lassi',        price: 4.49,  image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?fit=max&w=400&q=80', desc: 'Chilled yogurt drink with ripe mango.' },
            { id: 'm15', name: 'Lamb Biryani',       price: 18.49, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?fit=max&w=400&q=80', desc: 'Fragrant basmati rice layered with spiced lamb.' }
        ]
    }
];

/* ---- State ---- */
let cart       = JSON.parse(localStorage.getItem('craveCart'))  || [];
let promoApplied = false;
const PROMO_CODE    = 'CRAVE10';
const PROMO_DISCOUNT = 0.10; // 10%

/* ===================================================
   DOM References
   =================================================== */
// Nav
const homeBtn        = document.getElementById('home-btn');
const searchInput    = document.getElementById('search-input');
const navLoginBtn    = document.getElementById('nav-login-btn');
const userMenu       = document.getElementById('user-menu');
const userNameDisplay= document.getElementById('user-name-display');
const logoutBtn      = document.getElementById('logout-btn');

// Sections
const heroSection        = document.getElementById('hero-section');
const restaurantsSection = document.getElementById('restaurants-section');
const menuSection        = document.getElementById('menu-section');
const restaurantsGrid    = document.getElementById('restaurants-grid');
const menuGrid           = document.getElementById('menu-grid');
const restHeader         = document.getElementById('restaurant-header');
const backBtn            = document.getElementById('back-btn');

// Cart
const cartToggleBtn      = document.getElementById('cart-toggle-btn');
const closeCartBtn       = document.getElementById('close-cart-btn');
const cartSidebar        = document.getElementById('cart-sidebar');
const overlay            = document.getElementById('sidebar-overlay');
const cartEmpty          = document.getElementById('cart-empty');
const cartItemsContainer = document.getElementById('cart-items');
const cartFooter         = document.getElementById('cart-footer');
const cartBadge          = document.getElementById('cart-badge');
const cartRestLabel      = document.getElementById('cart-restaurant-label');
const cartSubtotalEl     = document.getElementById('cart-subtotal');
const cartDeliveryEl     = document.getElementById('cart-delivery');
const cartTaxEl          = document.getElementById('cart-tax');
const cartDiscountEl     = document.getElementById('cart-discount');
const cartTotalEl        = document.getElementById('cart-total');
const promoRow           = document.getElementById('promo-row');
const promoInput         = document.getElementById('promo-code-input');
const applyPromoBtn      = document.getElementById('apply-promo-btn');
const promoMsg           = document.getElementById('promo-msg');
const checkoutBtn        = document.getElementById('checkout-btn');
const clearCartBtn       = document.getElementById('clear-cart-btn');
const browseBtn          = document.getElementById('browse-btn');

// Auth
const authOverlay        = document.getElementById('auth-overlay');
const loginForm          = document.getElementById('login-form');
const registerForm       = document.getElementById('register-form');
const loginEmail         = document.getElementById('login-email');
const loginPassword      = document.getElementById('login-password');
const loginError         = document.getElementById('login-error');
const loginSubmitBtn     = document.getElementById('login-submit-btn');
const regName            = document.getElementById('reg-name');
const regEmail           = document.getElementById('reg-email');
const regPassword        = document.getElementById('reg-password');
const registerError      = document.getElementById('register-error');
const registerSuccess    = document.getElementById('register-success');
const registerSubmitBtn  = document.getElementById('register-submit-btn');
const goRegister         = document.getElementById('go-register');
const goLogin            = document.getElementById('go-login');

// Toast
const toast = document.getElementById('toast');

/* ===================================================
   INIT
   =================================================== */
function init() {
    renderRestaurants(restaurants);
    updateCartUI();
    updateAuthUI();
}

/* ===================================================
   RESTAURANT RENDERING
   =================================================== */
function renderRestaurants(data) {
    restaurantsGrid.innerHTML = '';

    if (data.length === 0) {
        restaurantsGrid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-light)">
                <div style="font-size:48px;margin-bottom:12px">🔍</div>
                <h3>No restaurants found</h3>
                <p style="margin-top:6px">Try a different search term</p>
            </div>`;
        return;
    }

    data.forEach(rest => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-id', rest.id);
        card.innerHTML = `
            <div class="card-img-container">
                <img src="${rest.image}" alt="${rest.name}" loading="lazy">
            </div>
            <div class="card-content">
                <h3 class="card-title">${rest.name}</h3>
                <div class="card-meta">
                    <span>${rest.cuisine}</span>
                    <span class="rating">★ ${rest.rating}</span>
                </div>
                <span style="font-size:12px;color:var(--text-light)">🕐 ${rest.deliveryTime}</span>
            </div>
        `;
        card.addEventListener('click', () => showMenu(rest));
        restaurantsGrid.appendChild(card);
    });
}

/* ===================================================
   MENU (per restaurant)
   =================================================== */
function showMenu(rest) {
    restaurantsSection.classList.add('hidden');
    heroSection.classList.add('hidden');
    menuSection.classList.remove('hidden');

    restHeader.innerHTML = `
        <img src="${rest.image}" alt="${rest.name}" class="rest-header-img">
        <div class="rest-header-info">
            <h2>${rest.name}</h2>
            <p>${rest.cuisine}</p>
            <span class="rest-header-badge">★ ${rest.rating} &nbsp;|&nbsp; 🕐 ${rest.deliveryTime}</span>
        </div>
    `;

    menuGrid.innerHTML = '';
    rest.menu.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img-container" style="height:150px">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.name}</h3>
                <p class="card-desc">${item.desc}</p>
                <div class="card-footer">
                    <span class="card-price">$${item.price.toFixed(2)}</span>
                    <button class="btn btn-primary add-to-cart-btn" data-id="${item.id}">+ Add</button>
                </div>
            </div>
        `;
        menuGrid.appendChild(card);
    });

    // Delegate click events
    menuGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (!btn) return;
        e.stopPropagation();
        const itemId   = btn.getAttribute('data-id');
        const menuItem = rest.menu.find(m => m.id === itemId);
        if (menuItem) addToCart(menuItem, rest.name);
    });
}

/* ===================================================
   SEARCH
   =================================================== */
searchInput.addEventListener('input', e => {
    const term = e.target.value.trim().toLowerCase();

    if (!menuSection.classList.contains('hidden')) {
        menuSection.classList.add('hidden');
        restaurantsSection.classList.remove('hidden');
        heroSection.classList.remove('hidden');
    }

    const filtered = restaurants.filter(r =>
        r.name.toLowerCase().includes(term) ||
        r.cuisine.toLowerCase().includes(term)
    );
    renderRestaurants(filtered);
});

/* ===================================================
   NAVIGATION
   =================================================== */
homeBtn.addEventListener('click', () => {
    menuSection.classList.add('hidden');
    heroSection.classList.remove('hidden');
    restaurantsSection.classList.remove('hidden');
    searchInput.value = '';
    renderRestaurants(restaurants);
});

backBtn.addEventListener('click', () => {
    menuSection.classList.add('hidden');
    heroSection.classList.remove('hidden');
    restaurantsSection.classList.remove('hidden');
});

browseBtn.addEventListener('click', () => {
    closeCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===================================================
   CART — add / quantity / remove
   =================================================== */
function addToCart(item, restaurantName) {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1, restaurantName });
    }
    saveCart();
    updateCartUI();
    openCart();
    showToast(`🛒 "${item.name}" added to cart`);
}

function updateQuantity(id, delta) {
    const index = cart.findIndex(c => c.id === id);
    if (index === -1) return;
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function clearCart() {
    cart = [];
    promoApplied = false;
    saveCart();
    updateCartUI();
    showToast('🗑 Cart cleared');
}

function saveCart() {
    localStorage.setItem('craveCart', JSON.stringify(cart));
}

/* ===================================================
   CART UI
   =================================================== */
function updateCartUI() {
    cartItemsContainer.innerHTML = '';

    const isEmpty = cart.length === 0;

    cartEmpty.classList.toggle('hidden', !isEmpty);
    cartItemsContainer.classList.toggle('hidden', isEmpty);
    cartFooter.classList.toggle('hidden', isEmpty);

    if (isEmpty) {
        cartBadge.classList.add('hidden');
        cartBadge.innerText = '0';
        return;
    }

    let subtotal = 0;
    let count    = 0;

    // Identify unique restaurants in cart
    const restNames = [...new Set(cart.map(c => c.restaurantName))];
    cartRestLabel.innerText = restNames.join(', ');

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        count    += item.quantity;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-from">${item.restaurantName}</div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <div class="cart-controls">
                <button class="qty-btn remove" data-id="${item.id}" data-delta="-1">−</button>
                <span class="qty-display">${item.quantity}</span>
                <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(div);
    });

    // Event delegation for qty buttons
    cartItemsContainer.onclick = (e) => {
        const btn = e.target.closest('.qty-btn');
        if (!btn) return;
        updateQuantity(btn.dataset.id, parseInt(btn.dataset.delta));
    };

    // Bill calc
    const deliveryFee = 3.99;
    const discount    = promoApplied ? subtotal * PROMO_DISCOUNT : 0;
    const taxable     = subtotal - discount;
    const taxes       = taxable * 0.08;
    const total       = taxable + deliveryFee + taxes;

    cartSubtotalEl.innerText  = `$${subtotal.toFixed(2)}`;
    cartDeliveryEl.innerText  = `$${deliveryFee.toFixed(2)}`;
    cartTaxEl.innerText       = `$${taxes.toFixed(2)}`;
    cartDiscountEl.innerText  = `-$${discount.toFixed(2)}`;
    cartTotalEl.innerText     = `$${total.toFixed(2)}`;

    promoRow.classList.toggle('hidden', !promoApplied);

    cartBadge.classList.remove('hidden');
    cartBadge.innerText = count;
}

/* ===================================================
   PROMO CODE
   =================================================== */
applyPromoBtn.addEventListener('click', () => {
    const code = promoInput.value.trim().toUpperCase();

    promoMsg.className = 'promo-msg';
    promoMsg.classList.remove('hidden');

    if (promoApplied) {
        promoMsg.classList.add('error');
        promoMsg.innerText = 'A promo code is already applied.';
        return;
    }

    if (code === PROMO_CODE) {
        promoApplied = true;
        promoMsg.classList.add('success');
        promoMsg.innerText = '✅ 10% discount applied!';
        updateCartUI();
    } else {
        promoMsg.classList.add('error');
        promoMsg.innerText = '❌ Invalid promo code. Try CRAVE10';
    }
});

/* ===================================================
   CHECKOUT → opens Order Review Modal
   =================================================== */
checkoutBtn.addEventListener('click', () => {
    const user = getCurrentUser();
    if (!user) {
        showToast('🔒 Please sign in to place an order');
        closeCart();
        openAuthModal('login');
        return;
    }
    closeCart();
    openOrderModal();
});

clearCartBtn.addEventListener('click', clearCart);

/* ===================================================
   ORDER REVIEW MODAL
   =================================================== */
const orderOverlay   = document.getElementById('order-overlay');
const orderItemsList = document.getElementById('order-items-list');
const orderBillRecap = document.getElementById('order-bill-recap');
const orderAddress   = document.getElementById('order-address');
const orderCity      = document.getElementById('order-city');
const orderZip       = document.getElementById('order-zip');
const orderError     = document.getElementById('order-error');
const placeOrderBtn  = document.getElementById('place-order-btn');
const closeOrderBtn  = document.getElementById('close-order-btn');

const confirmOverlay  = document.getElementById('confirm-overlay');
const confirmDetails  = document.getElementById('confirm-details');
const confirmClose    = document.getElementById('confirm-close-btn');
const confirmEtaText  = document.getElementById('confirm-eta-text');

function openOrderModal() {
    // Populate items
    orderItemsList.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const row = document.createElement('div');
        row.className = 'order-line-item';
        row.innerHTML = `
            <span class="name">${item.name}</span>
            <span class="qty">x${item.quantity}</span>
            <span class="price">$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        orderItemsList.appendChild(row);
    });

    // Bill recap
    const discount    = promoApplied ? subtotal * PROMO_DISCOUNT : 0;
    const taxable     = subtotal - discount;
    const deliveryFee = 3.99;
    const taxes       = taxable * 0.08;
    const total       = taxable + deliveryFee + taxes;

    orderBillRecap.innerHTML = `
        <div class="recap-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
        ${promoApplied ? `<div class="recap-row"><span>Promo (CRAVE10)</span><span class="discount-text">-$${discount.toFixed(2)}</span></div>` : ''}
        <div class="recap-row"><span>Delivery Fee</span><span>$${deliveryFee.toFixed(2)}</span></div>
        <div class="recap-row"><span>Taxes (8%)</span><span>$${taxes.toFixed(2)}</span></div>
        <div class="recap-row total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
    `;

    orderError.classList.add('hidden');
    orderOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    orderOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

closeOrderBtn.addEventListener('click', closeOrderModal);
orderOverlay.addEventListener('click', e => { if (e.target === orderOverlay) closeOrderModal(); });

/* ===================================================
   PLACE ORDER
   =================================================== */
placeOrderBtn.addEventListener('click', () => {
    const address = orderAddress.value.trim();
    const city    = orderCity.value.trim();
    const zip     = orderZip.value.trim();
    const payment = document.querySelector('input[name="payment"]:checked')?.value || 'cod';

    orderError.classList.add('hidden');

    if (!address || !city || !zip) {
        orderError.innerText = '📍 Please fill in your complete delivery address.';
        orderError.classList.remove('hidden');
        orderAddress.focus();
        return;
    }

    // Build order record
    const user       = getCurrentUser();
    const orderItems = cart.map(c => ({ name: c.name, qty: c.quantity, price: c.price }));
    const subtotal   = cart.reduce((s, c) => s + c.price * c.quantity, 0);
    const discount   = promoApplied ? subtotal * PROMO_DISCOUNT : 0;
    const total      = (subtotal - discount) * 1.08 + 3.99;
    const paymentLabels = { cod: 'Cash on Delivery', card: 'Credit / Debit Card', upi: 'UPI / Wallet' };
    const orderId    = '#ORD-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    const etaMins    = Math.floor(Math.random() * 15) + 30; // 30–45 min

    const orderRecord = {
        id: orderId,
        date: new Date().toLocaleString(),
        items: orderItems,
        address: `${address}, ${city} ${zip}`,
        payment: paymentLabels[payment],
        total: total.toFixed(2),
        user: user?.email
    };

    // Save to order history
    const history = JSON.parse(localStorage.getItem('craveOrders') || '[]');
    history.unshift(orderRecord);
    localStorage.setItem('craveOrders', JSON.stringify(history));

    // Clear cart & close modal
    clearCart();
    closeOrderModal();

    // Show confirmation
    showConfirmation(orderRecord, etaMins);
});

/* ===================================================
   ORDER CONFIRMATION
   =================================================== */
function showConfirmation(order, etaMins) {
    confirmDetails.innerHTML = `
        <strong>Order ID:</strong> ${order.id}<br>
        <strong>Deliver to:</strong> ${order.address}<br>
        <strong>Payment:</strong> ${order.payment}<br>
        <strong>Total Paid:</strong> $${order.total}
    `;
    confirmEtaText.innerHTML = `Estimated delivery: <strong>${etaMins}–${etaMins + 10} min</strong>`;

    // Reset steps
    ['step1','step2','step3','step4'].forEach(id => {
        const el = document.getElementById(id);
        el.classList.remove('active','done');
    });
    document.getElementById('step1').classList.add('active');

    confirmOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Animate steps sequentially
    const delays = [1500, 3500, 6000];
    const steps  = ['step2','step3','step4'];
    steps.forEach((id, i) => {
        setTimeout(() => {
            document.getElementById(steps[i - 1] || 'step1').classList.replace('active','done');
            const el = document.getElementById(id);
            el.classList.add('active');
        }, delays[i]);
    });
}

confirmClose.addEventListener('click', () => {
    confirmOverlay.classList.add('hidden');
    document.body.style.overflow = '';
});

/* ===================================================
   SIDEBAR TOGGLE
   =================================================== */
function openCart() {
    cartSidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

cartToggleBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

/* ===================================================
   TOAST
   =================================================== */
let toastTimer = null;

function showToast(message) {
    toast.innerText = message;
    toast.classList.remove('hidden');
    // force reflow
    void toast.offsetWidth;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.classList.add('hidden'), 400);
    }, 2800);
}

/* ===================================================
   AUTH — localStorage helpers
   =================================================== */
function getUsers()      { return JSON.parse(localStorage.getItem('craveUsers'))  || []; }
function getCurrentUser(){ return JSON.parse(localStorage.getItem('craveUser'))   || null; }
function saveCurrentUser(u){ localStorage.setItem('craveUser', JSON.stringify(u)); }

function updateAuthUI() {
    const user = getCurrentUser();
    if (user) {
        navLoginBtn.classList.add('hidden');
        userMenu.classList.remove('hidden');
        userNameDisplay.innerText = user.name.split(' ')[0]; // first name
    } else {
        navLoginBtn.classList.remove('hidden');
        userMenu.classList.add('hidden');
    }
}

/* ===================================================
   AUTH MODAL — open / close / switch
   =================================================== */
function openAuthModal(tab = 'login') {
    authOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    showAuthTab(tab);
}

function closeAuthModal() {
    authOverlay.classList.remove('show');
    document.body.style.overflow = '';
    clearAuthForms();
}

function showAuthTab(tab) {
    loginForm.classList.toggle('hidden', tab !== 'login');
    registerForm.classList.toggle('hidden', tab !== 'register');
}

function clearAuthForms() {
    [loginEmail, loginPassword, regName, regEmail, regPassword].forEach(el => el.value = '');
    [loginError, registerError, registerSuccess].forEach(el => el.classList.add('hidden'));
    promoInput.value = '';
}

navLoginBtn.addEventListener('click', () => openAuthModal('login'));
goRegister.addEventListener('click', () => showAuthTab('register'));
goLogin.addEventListener('click',    () => showAuthTab('login'));

document.getElementById('close-auth-btn').addEventListener('click',   closeAuthModal);
document.getElementById('close-auth-btn-2').addEventListener('click', closeAuthModal);
authOverlay.addEventListener('click', e => { if (e.target === authOverlay) closeAuthModal(); });

/* ===================================================
   REGISTER
   =================================================== */
registerSubmitBtn.addEventListener('click', () => {
    const name  = regName.value.trim();
    const email = regEmail.value.trim().toLowerCase();
    const pwd   = regPassword.value;

    registerError.classList.add('hidden');
    registerSuccess.classList.add('hidden');

    if (!name || !email || !pwd) {
        showFormError(registerError, 'Please fill in all fields.');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFormError(registerError, 'Please enter a valid email address.');
        return;
    }
    if (pwd.length < 6) {
        showFormError(registerError, 'Password must be at least 6 characters.');
        return;
    }

    const users = getUsers();
    if (users.find(u => u.email === email)) {
        showFormError(registerError, 'An account with this email already exists.');
        return;
    }

    const newUser = { name, email, pwd }; // In production use hashed pwd
    users.push(newUser);
    localStorage.setItem('craveUsers', JSON.stringify(users));

    registerSuccess.classList.remove('hidden');
    registerSuccess.innerText = '✅ Account created! Signing you in…';

    setTimeout(() => {
        saveCurrentUser(newUser);
        updateAuthUI();
        closeAuthModal();
        showToast(`👋 Welcome, ${name.split(' ')[0]}!`);
    }, 1200);
});

/* ===================================================
   LOGIN
   =================================================== */
loginSubmitBtn.addEventListener('click', () => {
    const email = loginEmail.value.trim().toLowerCase();
    const pwd   = loginPassword.value;

    loginError.classList.add('hidden');

    if (!email || !pwd) {
        showFormError(loginError, 'Please enter your email and password.');
        return;
    }

    const users = getUsers();
    const user  = users.find(u => u.email === email && u.pwd === pwd);

    if (!user) {
        showFormError(loginError, 'Incorrect email or password. Please try again.');
        return;
    }

    saveCurrentUser(user);
    updateAuthUI();
    closeAuthModal();
    showToast(`👋 Welcome back, ${user.name.split(' ')[0]}!`);
});

/* ===================================================
   LOGOUT
   =================================================== */
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('craveUser');
    updateAuthUI();
    showToast('👋 Signed out successfully');
});

/* ===================================================
   PASSWORD TOGGLE
   =================================================== */
document.querySelectorAll('.toggle-pwd').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = document.getElementById(btn.dataset.target);
        input.type  = input.type === 'password' ? 'text' : 'password';
        btn.innerText = input.type === 'password' ? '👁' : '🙈';
    });
});

/* ===================================================
   FORM ERROR HELPER
   =================================================== */
function showFormError(el, msg) {
    el.innerText = msg;
    el.classList.remove('hidden');
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
}

/* ===================================================
   KEYBOARD SUPPORT (Escape to close modals)
   =================================================== */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeCart();
        closeAuthModal();
    }
    if (e.key === 'Enter') {
        if (!authOverlay.classList.contains('show')) return;
        if (!loginForm.classList.contains('hidden'))    loginSubmitBtn.click();
        if (!registerForm.classList.contains('hidden')) registerSubmitBtn.click();
    }
});

/* ===================================================
   START
   =================================================== */
init();
