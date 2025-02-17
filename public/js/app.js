// Search menu
let searchIcon = document.querySelector('.ri-search-line');
let searchInput = document.getElementById('nav-search');

searchIcon.onclick = () => {
    searchInput.classList.toggle('active');
};


// Menu mobile
let menuIcon = document.querySelector('#menu-icon');
let menu = document.querySelector('.menu');

menuIcon.onclick = () => {
    menu.classList.toggle('active');
};


// Scroll navbar
const header = document.querySelector('.primary-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // adds effect after 50px of scrolling
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// Product slider
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".product-slider");
    const navLinks = document.querySelectorAll(".slider-nav a");

    navLinks.forEach((navLink, index) => {
        navLink.addEventListener("click", function (event) {
            event.preventDefault(); // blocks url changes
            slider.scrollTo({
                left: slider.clientWidth * index,
                behavior: "smooth"
            });
        });
    });
});


// Sidecart
let openCart = document.querySelector('#cart-icon');
let closeCart = document.querySelector('#close-cart'); 
const sidecart = document.querySelector('.sidecart'); 
const cartItemsContainer = document.querySelector('.cart-items-container');
const subtotalPrice = document.getElementById('subtotal-price');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

openCart.addEventListener('click', () => {
    sidecart.classList.add('active');
});

closeCart.addEventListener('click', () => {
    sidecart.classList.remove('active');
});

// document.querySelectorAll('.add-to-cart').forEach(button => {
//     button.addEventListener('click', function() {
//         const productBox = this.closest('.product-box');
//         const productId = productBox.getAttribute('data-id');
//         const productName = productBox.getAttribute('data-name');
//         const productPrice = parseFloat(productBox.getAttribute('data-price'));
//         const productImg = productBox.querySelector('.img-default').src;

//         const existingItem = cart.find(item => item.id === productId);
//         if (existingItem) {
//             existingItem.quantity += 1;
//         } else {
//             cart.push({ id: productId, name: productName, price: productPrice, img: productImg, quantity: 1 });
//         }

//         saveCart();
//         renderCart();
//         updateCartPage();
//         sidecart.classList.add('active');
//     });
// });

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation();
        const productBox = this.closest('.product-box') || this.closest('.product-page-item');
        const productId = productBox.getAttribute('data-id');
        const productName = productBox.getAttribute('data-name');
        const productPrice = parseFloat(productBox.getAttribute('data-price'));
        const productImg = productBox.querySelector('img').src;

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, img: productImg, quantity: 1 });
        }

        saveCart();
        renderCart();
        updateCartPage();
        sidecart.classList.add('active');
    });
});

function renderCart() {
    const cartCount = document.querySelectorAll('.num');
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    let totalItems = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    } else {
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            totalItems += item.quantity;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-items');
            cartItem.innerHTML = `
                <div class="item-img"><img src="${item.img}" alt=""></div>
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${item.price}</div>
                <div class="item-quantity">
                    <span class="minus" data-id="${item.id}">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus" data-id="${item.id}">+</span>
                </div>
                <div class="item-exclude"><i class="ri-delete-bin-2-line" data-id="${item.id}"></i></div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    subtotalPrice.textContent = subtotal.toFixed(2);
    cartCount.forEach(element => element.textContent = totalItems);

    cartActions();
}

function cartActions() {
    document.querySelectorAll('.minus').forEach(button => {
        button.replaceWith(button.cloneNode(true));
    });
    document.querySelectorAll('.plus').forEach(button => {
        button.replaceWith(button.cloneNode(true));
    });
    document.querySelectorAll('.item-exclude i').forEach(button => {
        button.replaceWith(button.cloneNode(true));
    });

    document.querySelectorAll('.minus').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            const item = cart.find(item => item.id === itemId);
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart = cart.filter(item => item.id !== itemId);
            }
            saveCart();
            renderCart();
            updateCartPage();
        });
    });

    document.querySelectorAll('.plus').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            const item = cart.find(item => item.id === itemId);
            item.quantity += 1;
            saveCart();
            renderCart();
            updateCartPage();
        });
    });

    document.querySelectorAll('.item-exclude i').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            cart = cart.filter(item => item.id !== itemId);
            saveCart();
            renderCart();
            updateCartPage();
        });
    });
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartPage() {
    if (window.location.pathname.includes('cart')) {
        const checkoutItemsContainer = document.querySelector('.checkout-items');
        checkoutItemsContainer.innerHTML = '<h1>Your cart</h1>';

        if (cart.length === 0) {
            checkoutItemsContainer.innerHTML += '<div class="empty-cart">Your cart is empty</div>';
        } else {
            cart.forEach(item => {
                const checkoutItem = document.createElement('div');
                checkoutItem.classList.add('c-items');
                checkoutItem.innerHTML = `
                    <div class="c-img">
                        <img src="${item.img}" alt="">
                    </div>
                    <div class="c-name">${item.name}</div>
                    <div class="c-price">$${item.price}</div>
                    <div class="c-quantity">
                        <span class="minus" data-id="${item.id}">-</span>
                        <span>${item.quantity}</span>
                        <span class="plus" data-id="${item.id}">+</span>
                    </div>
                    <div class="item-exclude">
                        <i class="ri-delete-bin-2-line" data-id="${item.id}"></i>
                    </div>
                `;
                checkoutItemsContainer.appendChild(checkoutItem);
            });
        }

        const totalItems = document.querySelector('.c-total h2');
        if (totalItems) {
            const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            totalItems.textContent = `Total: $${total.toFixed(2)}`;
        }
    }

    cartActions();
}

window.addEventListener('load', () => {
    renderCart();
    updateCartPage();
});









