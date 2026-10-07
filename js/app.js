// Estado de la aplicación
let cart = [];
let currentCategory = 'todos';
let searchQuery = '';

// Elementos del DOM
const productsGrid = document.getElementById('products-grid');
const categoryButtons = document.querySelectorAll('.category-btn');
const searchInput = document.getElementById('search-input');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartDrawer = document.getElementById('cart-drawer');
const cartBackdrop = document.getElementById('cart-backdrop');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartBadge = document.getElementById('cart-badge');
const checkoutBtn = document.getElementById('checkout-btn');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
    updateCartUI();
});

// Configurar escuchadores de eventos
function setupEventListeners() {
    // Filtros de categoría
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryButtons.forEach(b => {
                b.classList.remove('bg-caramel', 'text-white', 'shadow-sm');
                b.classList.add('bg-white/75', 'text-darkbrown', 'hover:bg-camell/30', 'border', 'border-camell/30');
            });
            btn.classList.remove('bg-white/75', 'text-darkbrown', 'hover:bg-camell/30', 'border', 'border-camell/30');
            btn.classList.add('bg-caramel', 'text-white', 'shadow-sm');

            currentCategory = btn.getAttribute('data-category');
            renderProducts();
        });
    });

    // Búsqueda en tiempo real
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderProducts();
    });

    // Abrir/Cerrar Carrito
    cartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartBackdrop.addEventListener('click', toggleCart);

    // Botón de WhatsApp Checkout
    checkoutBtn.addEventListener('click', sendWhatsAppOrder);
}

// Renderizar productos según categoría y búsqueda
function renderProducts() {
    let filtered = products.filter(product => {
        const matchesCategory = currentCategory === 'todos' || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-span-full text-center py-16">
                <div class="w-16 h-16 bg-warmcream rounded-full flex items-center justify-center mx-auto mb-4 text-caramel text-2xl">
                    <i class="fa-solid fa-mug-saucer"></i>
                </div>
                <h3 class="text-lg font-bold text-darkbrown">No se encontraron productos</h3>
                <p class="text-sm text-darkbrown/60">Prueba con otra búsqueda o categoría.</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = filtered.map(product => {
        // Estado badge config
        let badgeBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        let badgeIcon = 'fa-circle-check';
        if (product.status === 'ultimas') {
            badgeBg = 'bg-amber-50 text-amber-700 border-amber-200';
            badgeIcon = 'fa-triangle-exclamation';
        } else if (product.status === 'agotado') {
            badgeBg = 'bg-rose-50 text-rose-700 border-rose-200';
            badgeIcon = 'fa-circle-xmark';
        }

        const isSoldOut = product.status === 'agotado';

        return `
            <div class="product-card bg-white/95 rounded-2xl overflow-hidden border border-camell/40 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                    <!-- Imagen y badge de estado -->
                    <div class="relative h-48 overflow-hidden bg-warmcream">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md flex items-center gap-1.5 shadow-sm ${badgeBg}">
                            <i class="fa-solid ${badgeIcon}"></i> ${product.statusText}
                        </div>
                    </div>
                    <!-- Contenido -->
                    <div class="p-5">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-bold text-lg text-darkbrown leading-snug">${product.name}</h3>
                            <span class="text-caramel font-bold text-lg whitespace-nowrap ml-2">S/ ${product.price.toFixed(2)}</span>
                        </div>
                        <p class="text-sm text-darkbrown/80 mb-3 font-light leading-relaxed">${product.description}</p>
                        <!-- Reseña corta -->
                        <div class="bg-warmcream/70 p-3 rounded-xl border border-camell/30 mb-4">
                            <p class="text-xs text-darkbrown/80 italic flex items-start gap-2">
                                <i class="fa-solid fa-quote-left text-caramel text-sm mt-0.5"></i>
                                <span>${product.review}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <!-- Botón de acción -->
                <div class="px-5 pb-5 pt-0">
                    <button 
                        onclick="addToCart(${product.id})"
                        class="w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                            isSoldOut 
                            ? 'bg-camell/20 text-darkbrown/40 cursor-not-allowed' 
                            : 'bg-warmcream hover:bg-caramel hover:text-white text-darkbrown border border-camell/50 shadow-sm'
                        }"
                        ${isSoldOut ? 'disabled' : ''}>
                        <i class="fa-solid ${isSoldOut ? 'fa-ban' : 'fa-cart-plus'}"></i>
                        ${isSoldOut ? 'No disponible' : 'Agregar al pedido'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Funciones del Carrito
function toggleCart() {
    cartDrawer.classList.toggle('hidden');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.status === 'agotado') return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    
    // Mostrar feedback visual abriendo el carrito o mostrando notificación
    if(cartDrawer.classList.contains('hidden')) {
        toggleCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
    }
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Badge contador
    if (totalItems > 0) {
        cartBadge.textContent = totalItems;
        cartBadge.classList.remove('hidden');
    } else {
        cartBadge.classList.add('hidden');
    }

    // Lista de elementos en carrito
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-12">
                <div class="w-16 h-16 bg-warmcream rounded-full flex items-center justify-center mx-auto mb-3 text-darkbrown/40 text-xl">
                    <i class="fa-solid fa-bag-shopping"></i>
                </div>
                <p class="text-sm font-medium text-darkbrown">Tu carrito está vacío</p>
                <p class="text-xs text-darkbrown/60 mt-1">Agrega deliciosos cafés o postres para ordenar.</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            py-4 flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                    <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover border border-camell/40">
                    <div>
                        <h4 class="font-bold text-sm text-darkbrown">${item.name}</h4>
                        <span class="text-xs text-caramel font-semibold">S/ ${item.price.toFixed(2)} c/u</span>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="flex items-center border border-camell/40 rounded-xl overflow-hidden bg-white">
                        <button onclick="updateQuantity(${item.id}, -1)" class="px-2.5 py-1 text-xs hover:bg-warmcream text-darkbrown font-bold">-</button>
                        <span class="px-2 text-xs font-semibold text-darkbrown">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" class="px-2.5 py-1 text-xs hover:bg-warmcream text-darkbrown font-bold">+</button>
                    </div>
                    <button onclick="removeFromCart(${item.id})" class="text-darkbrown/40 hover:text-rose-600 transition-colors text-sm">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
        `).map(itemHtml => `<div class="${itemHtml}</div>`).join('');
    }

    // Calcular total
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalEl.textContent = `S/ ${totalPrice.toFixed(2)}`;
}

// Enviar pedido por WhatsApp
function sendWhatsAppOrder() {
    if (cart.length === 0) return;

    let message = "☕ *¡Hola! Quisiera realizar el siguiente pedido en Aroma & Sabor:*%0A%0A";
    
    cart.forEach(item => {
        message += `• ${item.quantity}x ${item.name} - S/ ${(item.price * item.quantity).toFixed(2)}%0A`;
    });

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `%0A*Total a pagar: S/ ${totalPrice.toFixed(2)}*%0A%0A¡Muchas gracias!`;

    const phoneNumber = "51987654321"; // Número de WhatsApp de la cafetería
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(whatsappUrl, '_blank');
}
