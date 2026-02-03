// Ghar Ka Achaar - Main JavaScript File
// WhatsApp ordering functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeWhatsAppOrdering();
});

function initializeWhatsAppOrdering() {
    // Add click event listeners to all WhatsApp order buttons
    const orderButtons = document.querySelectorAll('.whatsapp-order-btn');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleWhatsAppOrder(this);
        });
    });
}

function handleWhatsAppOrder(button) {
    try {
        // Find parent product card
        const productCard = button.closest('.product-card');
        
        if (!productCard) {
            console.error('Product card not found');
            return;
        }
        
        // Read product data
        const productName = getProductData(productCard);
        const { quantity, price } = getSelectedQuantityAndPrice(productCard);
        
        // Validate data
        if (!productName || !quantity || !price) {
            console.error('Missing product data');
            return;
        }
        
        // Create WhatsApp message
        const message = createWhatsAppMessage(productName, quantity, price);
        
        // Open WhatsApp
        openWhatsApp(message);
        
    } catch (error) {
        console.error('Error handling WhatsApp order:', error);
    }
}

function getProductData(productCard) {
    // Read product name from data attribute
    const productName = productCard.dataset.product;
    
    if (!productName) {
        console.error('Product name not found');
        return null;
    }
    
    return productName;
}

function getSelectedQuantityAndPrice(productCard) {
    // Find quantity select element
    const quantitySelect = productCard.querySelector('.quantity-select');
    
    if (!quantitySelect) {
        console.error('Quantity selector not found');
        return { quantity: null, price: null };
    }
    
    // Get selected option
    const selectedOption = quantitySelect.options[quantitySelect.selectedIndex];
    
    if (!selectedOption) {
        console.error('No option selected');
        return { quantity: null, price: null };
    }
    
    // Extract quantity and price
    const quantity = selectedOption.value;
    const price = selectedOption.dataset.price;
    
    if (!quantity || !price) {
        console.error('Quantity or price not found');
        return { quantity: null, price: null };
    }
    
    return { quantity, price };
}

function createWhatsAppMessage(productName, quantity, price) {
    const message = `Hello Ghar Ka Achaar 👋

I would like to place an order:

Product: ${productName}
Quantity: ${quantity}
Price: ₹${price}

Please confirm availability.
Thank you!`;
    
    return message;
}

function openWhatsApp(message) {
    // WhatsApp phone number (without + and spaces)
    const phoneNumber = '919085281996';
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
}

// Handle hero section order button
document.addEventListener('DOMContentLoaded', function() {
    const heroOrderBtn = document.getElementById('hero-order-btn');
    
    if (heroOrderBtn) {
        heroOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleSampleOrder();
        });
    }
});

function handleSampleOrder() {
    try {
        const message = `Hello Ghar Ka Achaar 👋
I would like to order the Early Launch Sample Pack
100g @ ₹20.
Please confirm availability.
Thank you!`;
        
        openWhatsApp(message);
        
    } catch (error) {
        console.error('Error handling sample order:', error);
    }
}

// Update price display when quantity changes
document.addEventListener('DOMContentLoaded', function() {
    const quantitySelects = document.querySelectorAll('.quantity-select');
    
    quantitySelects.forEach(select => {
        select.addEventListener('change', function() {
            updatePriceDisplay(this);
        });
    });
});

function updatePriceDisplay(selectElement) {
    try {
        const productCard = selectElement.closest('.product-card');
        const priceDisplay = productCard.querySelector('.product-price');
        
        if (!priceDisplay) {
            return;
        }
        
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const price = selectedOption.dataset.price;
        
        if (price) {
            priceDisplay.textContent = `₹${price}`;
        }
        
    } catch (error) {
        console.error('Error updating price display:', error);
    }
}

// Error handling for missing elements
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// Image lazy loading optimization
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(function(img) {
            img.classList.add('loaded');
        });
    }
});

// Floating WhatsApp Button
document.addEventListener('DOMContentLoaded', function() {
    const whatsappFloatBtn = document.getElementById('whatsapp-float-btn');
    
    if (whatsappFloatBtn) {
        whatsappFloatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleFloatingWhatsAppChat();
        });
    }
});

function handleFloatingWhatsAppChat() {
    try {
        const message = `Hello Ghar Ka Achaar 👋
I would like to know more about your pickles.
Please share details.
Thank you!`;
        
        openWhatsApp(message);
        
    } catch (error) {
        console.error('Error handling floating WhatsApp chat:', error);
    }
}

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// WhatsApp Order Button Handler
document.addEventListener('DOMContentLoaded', function() {
    const orderButtons = document.querySelectorAll('.whatsapp-order-btn');
    
    orderButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.dataset.product;
            const quantitySelect = productCard.querySelector('.quantity-select');
            const selectedOption = quantitySelect.options[quantitySelect.selectedIndex];
            const quantity = selectedOption.value;
            const price = selectedOption.dataset.price;
            
            const message = `Hello Ghar Ka Achaar 👋
            
I would like to order:
🥗 Product: ${productName}
⚖️ Quantity: ${quantity}
💰 Price: ₹${price}

Please confirm availability and delivery details.
Thank you! 🙏`;
            
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/919085281996?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    });
    
    // Update price display when quantity changes
    const quantitySelects = document.querySelectorAll('.quantity-select');
    quantitySelects.forEach(function(select) {
        select.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const price = selectedOption.dataset.price;
            const productCard = this.closest('.product-card');
            const priceDisplay = productCard.querySelector('.product-price');
            
            if (priceDisplay) {
                priceDisplay.textContent = `₹${price}`;
            }
        });
    });
});

// Hero CTA Button Handler
document.addEventListener('DOMContentLoaded', function() {
    const heroCtaButton = document.querySelector('.cta-button');
    
    if (heroCtaButton) {
        heroCtaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const message = `Hello Ghar Ka Achaar 👋
            
I'm interested in your homemade pickles!
Please share details about your products and special offers.
Thank you! 🙏`;
            
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/919085281996?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    }
});

// Homepage Order Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle quantity button clicks for homepage-style cards
    document.querySelectorAll('.quantity-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const card = this.closest('.popular-card');
            const allBtns = card.querySelectorAll('.quantity-btn');
            const customInput = card.querySelector('.custom-quantity-input');
            const errorMsg = card.querySelector('.error-message');
            
            if (!card) return;
            
            // Hide error message
            if (errorMsg) errorMsg.style.display = 'none';
            
            // Remove selected class from all buttons
            allBtns.forEach(function(b) {
                b.classList.remove('selected');
            });
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Show/hide custom input
            if (customInput) {
                if (this.dataset.quantity === 'custom') {
                    customInput.style.display = 'block';
                } else {
                    customInput.style.display = 'none';
                }
            }
        });
    });
});

// Homepage Order Handler (used by both homepage and products page)
function handleHomepageOrder(productName, buttonElement) {
    const card = buttonElement.closest('.popular-card');
    const selectedBtn = card.querySelector('.quantity-btn.selected');
    const errorMsg = card.querySelector('.error-message');
    
    // Hide any previous error
    if (errorMsg) errorMsg.style.display = 'none';
    
    if (!selectedBtn) {
        if (errorMsg) {
            errorMsg.textContent = 'Please select a quantity';
            errorMsg.style.display = 'block';
        }
        return;
    }
    
    const quantity = selectedBtn.dataset.quantity;
    const price = selectedBtn.dataset.price;
    
    let message = `Hello Ghar Ka Achaar 👋
    
I would like to order:
🥗 Product: ${productName}
⚖️ Quantity: ${quantity}
💰 Price: ₹${price}

Please confirm availability and delivery details.
Thank you! 🙏`;
    
    if (quantity === 'custom') {
        const customQtyInput = card.querySelector('.custom-quantity-input input');
        const customQty = customQtyInput ? customQtyInput.value : '';
        
        if (!customQty || customQty < 100) {
            if (errorMsg) {
                errorMsg.textContent = 'Please enter at least 100g for custom quantity';
                errorMsg.style.display = 'block';
            }
            return;
        }
        
        message = `Hello Ghar Ka Achaar 👋
        
I would like to order:
🥗 Product: ${productName}
⚖️ Quantity: ${customQty}g (Custom)
💰 Price: To be discussed

Please confirm availability and delivery details.
Thank you! 🙏`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919085281996?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Ingredients Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Attach event listeners to ALL ingredient toggles on both pages
    const ingredientToggles = document.querySelectorAll('.ingredients-toggle');
    
    ingredientToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            const wrapper = this.parentElement;
            const list = wrapper.querySelector('.ingredients-list');
            const arrow = this.querySelector('.arrow');
            
            // Toggle the show class
            list.classList.toggle('show');
            
            // Update arrow based on state
            if (list.classList.contains('show')) {
                arrow.textContent = '▲';
                this.classList.add('active');
            } else {
                arrow.textContent = '▼';
                this.classList.remove('active');
            }
        });
    });
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});
