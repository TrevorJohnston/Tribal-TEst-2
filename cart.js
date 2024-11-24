"use strict";

document.addEventListener("DOMContentLoaded", function () {
    // Initialize the cart from localStorage or create an empty cart
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Update the cart counter in the navigation
    function updateCartCounter() {
        var cartCount = cart.length;
        var cartElement = document.querySelector(".cart");
        cartElement.textContent = "Cart (" + cartCount + ")";
    }

    // Function to add items to the cart
    window.addToCart = function (productName, productPrice) {
        // Check if product already exists in cart
        var existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            // Increase the quantity if product already exists
            existingProduct.quantity += 1;
        } else {
            // Add new product to the cart
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        // Save the updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update the cart counter
        updateCartCounter();

        // Show the "Item added to cart" popup
        var popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerText = `${productName} has been added to your cart!`;
        document.body.appendChild(popup);

        // Make the popup disappear after 3 seconds
        setTimeout(function () {
            popup.style.display = 'none';
        }, 3000);
    };

    // Function to render the cart page
    function renderCart() {
        var cartContainer = document.getElementById("cart-items");
        cartContainer.innerHTML = ''; // Clear previous cart contents

        // Loop through the cart items
        cart.forEach(function (item, index) {
            var cartItemDiv = document.createElement("div");
            cartItemDiv.classList.add("cart-item");

            // Product name and price
            cartItemDiv.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <p>Quantity: <button class="adjust-quantity" data-index="${index}" data-action="decrease">-</button> 
                ${item.quantity} 
                <button class="adjust-quantity" data-index="${index}" data-action="increase">+</button></p>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            
            cartContainer.appendChild(cartItemDiv);
        });

        // Attach event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(function (button) {
            button.addEventListener('click', function (e) {
                var index = e.target.getAttribute('data-index');
                cart.splice(index, 1); // Remove item from the cart
                localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
                renderCart(); // Re-render the cart
                updateCartCounter(); // Update the cart count
            });
        });

        // Attach event listeners to quantity adjustment buttons
        document.querySelectorAll('.adjust-quantity').forEach(function (button) {
            button.addEventListener('click', function (e) {
                var index = e.target.getAttribute('data-index');
                var action = e.target.getAttribute('data-action');

                if (action === 'increase') {
                    cart[index].quantity += 1;
                } else if (action === 'decrease' && cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                }

                localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
                renderCart(); // Re-render the cart
                updateCartCounter(); // Update the cart count
            });
        });
    }

    // Call the renderCart function to display cart items if on the cart page
    if (window.location.pathname.endsWith("cart.html")) {
        renderCart();
    }

    // Call the function to update the cart counter on page load
    updateCartCounter();
});



document.querySelectorAll(".view-details-btn").forEach(button => {
  button.addEventListener("click", () => {
    const description = button.previousElementSibling;
    description.classList.toggle("show");

    // Update button text
    button.textContent = description.classList.contains("show")
      ? "Hide Details"
      : "View Details";
  });
});







document.querySelectorAll('.product').forEach(product => {
    const detailsButton = product.querySelector('.view-details-button');
    const description = product.querySelector('.product-description');

    // Toggle the description when clicking the button
    detailsButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent triggering other mouse events
        description.classList.toggle('show');
    });

    // Hide the description when the mouse leaves the product
    product.addEventListener('mouseleave', () => {
        description.classList.remove('show');
    });
});

