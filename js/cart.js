/* =========================================================
   Ghar Ka Achaar — Frontend Cart System (cart.js)
   ========================================================= */

const CART_KEY = 'gharkaachaar_cart';

/* ---------- Storage ---------- */

function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
}

/* ---------- Cart Operations ---------- */

function addToCart(name, quantity, price) {
    const cart = getCart();
    const id = name + '__' + quantity;
    const existing = cart.find(function (item) { return item.id === id; });
    if (existing) {
        existing.count += 1;
    } else {
        cart.push({ id: id, name: name, quantity: quantity, price: price, count: 1 });
    }
    saveCart(cart);
    showCartToast(name);
}

function removeFromCart(id) {
    saveCart(getCart().filter(function (item) { return item.id !== id; }));
    renderCartPanel();
}

function clearCart() {
    saveCart([]);
    renderCartPanel();
}

/* ---------- Badge ---------- */

function updateCartBadge() {
    var cart = getCart();
    var total = cart.reduce(function (sum, item) { return sum + item.count; }, 0);
    document.querySelectorAll('.cart-badge').forEach(function (badge) {
        badge.textContent = total;
        badge.style.display = total > 0 ? 'flex' : 'none';
    });
}

/* ---------- Cart Panel ---------- */

function openCart() {
    renderCartPanel();
    var overlay = document.getElementById('cart-overlay');
    var panel = document.getElementById('cart-panel');
    if (overlay) overlay.classList.add('active');
    if (panel) panel.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    var overlay = document.getElementById('cart-overlay');
    var panel = document.getElementById('cart-panel');
    if (overlay) overlay.classList.remove('active');
    if (panel) panel.classList.remove('active');
    document.body.style.overflow = '';
}

function renderCartPanel() {
    var cart = getCart();
    var container = document.getElementById('cart-items');
    var totalEl = document.getElementById('cart-total');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<div class="cart-empty">🥒 Your cart is empty<br><small>Add something delicious!</small></div>';
        if (totalEl) totalEl.textContent = '₹0';
        return;
    }

    var total = 0;
    var html = '';
    cart.forEach(function (item) {
        var lineTotal = (typeof item.price === 'number') ? item.price * item.count : null;
        if (lineTotal !== null) total += lineTotal;
        var priceDisplay = (lineTotal !== null) ? ('₹' + lineTotal) : 'Price TBD';
        var safeId = item.id.replace(/'/g, "\\'");
        html += '<div class="cart-item">' +
            '<div class="cart-item-info">' +
            '<div class="cart-item-name">' + item.name + '</div>' +
            '<div class="cart-item-meta">' + item.quantity + ' &times; ' + item.count + '</div>' +
            '<div class="cart-item-price">' + priceDisplay + '</div>' +
            '</div>' +
            '<button class="cart-item-remove" onclick="removeFromCart(\'' + safeId + '\')" aria-label="Remove">&#x2715;</button>' +
            '</div>';
    });
    container.innerHTML = html;

    if (totalEl) {
        totalEl.textContent = total > 0 ? '₹' + total : '—';
    }
}

/* ---------- WhatsApp Checkout ---------- */

function checkoutWhatsApp() {
    var cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty! Add some pickles first 🥒');
        return;
    }
    var lines = cart.map(function (item, i) {
        var priceStr = (typeof item.price === 'number') ? ('₹' + item.price + ' each') : 'To be discussed';
        return (i + 1) + '. ' + item.name + ' – ' + item.quantity + ' × ' + item.count + ' – ' + priceStr;
    });
    var total = cart.reduce(function (sum, item) {
        return (typeof item.price === 'number') ? sum + item.price * item.count : sum;
    }, 0);

    var message = 'Hello Ghar Ka Achaar 👋\n\nI would like to order:\n\n' +
        lines.join('\n') +
        '\n\nTotal: ₹' + total +
        '\n\nPlease confirm availability. Thank you! 🙏';

    var url = 'https://wa.me/919085281996?text=' + encodeURIComponent(message);
    window.open(url, '_blank');
}

/* ---------- Toast ---------- */

function showCartToast(name) {
    var toast = document.getElementById('cart-toast');
    if (!toast) return;
    toast.textContent = '✅ ' + name + ' added to cart!';
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 2500);
}

/* ---------- Quantity Resolution ---------- */

function getSelectedQty(card) {
    var selectedBtn = card.querySelector('.quantity-btn.selected');
    if (!selectedBtn) return null;

    var qty = selectedBtn.dataset.quantity;

    if (qty === 'custom') {
        var val = prompt('Enter quantity in grams (minimum 100g):');
        if (val === null || val === '') return null;          // cancelled
        var grams = parseInt(val, 10);
        if (isNaN(grams) || grams < 100) {
            alert('Please enter a valid quantity (minimum 100g).');
            return null;
        }
        return { quantity: 'Custom (' + grams + 'g)', price: null };
    }

    return {
        quantity: qty,
        price: parseFloat(selectedBtn.dataset.price)
    };
}

/* ---------- Card Actions ---------- */

function addToCartFromCard(productName, btn) {
    var card = btn.closest('.popular-card');
    var errorEl = card.querySelector('.error-message');
    if (errorEl) errorEl.style.display = 'none';

    var result = getSelectedQty(card);
    if (!result) {
        if (errorEl) { errorEl.textContent = 'Please select a quantity first.'; errorEl.style.display = 'block'; }
        else alert('Please select a quantity first.');
        return;
    }

    addToCart(productName, result.quantity, result.price);
}

function orderNowFromCard(productName, btn) {
    var card = btn.closest('.popular-card');
    var errorEl = card.querySelector('.error-message');
    if (errorEl) errorEl.style.display = 'none';

    var result = getSelectedQty(card);
    if (!result) {
        if (errorEl) { errorEl.textContent = 'Please select a quantity first.'; errorEl.style.display = 'block'; }
        else alert('Please select a quantity first.');
        return;
    }

    var priceStr = (result.price !== null) ? ('₹' + result.price) : 'To be discussed';
    var message = 'Hello Ghar Ka Achaar 👋\n\nI would like to order:\n\nProduct: ' + productName +
        '\nQuantity: ' + result.quantity +
        '\nPrice: ' + priceStr +
        '\n\nPlease confirm availability. Thank you! 🙏';
    var url = 'https://wa.me/919085281996?text=' + encodeURIComponent(message);
    window.open(url, '_blank');
}

/* ---------- Init ---------- */

document.addEventListener('DOMContentLoaded', function () {
    updateCartBadge();

    // Quantity button pill selection
    document.querySelectorAll('.quantity-btn:not([disabled])').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var card = this.closest('.popular-card');
            card.querySelectorAll('.quantity-btn').forEach(function (b) { b.classList.remove('selected'); });
            this.classList.add('selected');

            // Hide legacy custom input (we use prompt() now), keep it from flashing
            var customInput = card.querySelector('.custom-quantity-input');
            if (customInput) customInput.style.display = 'none';

            var errorEl = card.querySelector('.error-message');
            if (errorEl) errorEl.style.display = 'none';
        });
    });

    // Close cart panel when clicking overlay
    var overlay = document.getElementById('cart-overlay');
    if (overlay) { overlay.addEventListener('click', closeCart); }

    // Close cart with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeCart();
    });
});
