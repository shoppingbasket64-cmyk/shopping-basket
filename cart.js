let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  let count = 0;

  cart.forEach(function(item) {
    count += item.quantity;
  });

  let cartCount = document.getElementById("cartCount");

  if (cartCount) {
    cartCount.innerText = count;
  }
}

function addToCart(name, price, quantity) {

  let existing = cart.find(function(item) {
    return item.name === name;
  });

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: quantity
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", function() {
  updateCartCount();
});
