function changeQty(name, price, amount){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let item = cart.find(p => p.name === name);

if(item){
item.quantity += amount;
if(item.quantity <= 0){
cart = cart.filter(p => p.name !== name);
}
}else{
if(amount > 0){
cart.push({name:name, price:price, quantity:1});
}
}

localStorage.setItem("cart", JSON.stringify(cart));
updateCartCount();
updateDisplay(name);
}

function updateDisplay(name){
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let item = cart.find(p => p.name === name);
let qty = item ? item.quantity : 0;

let el = document.getElementById(name + "-qty");
if(el) el.innerText = qty;
}

function updateCartCount(){
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;
cart.forEach(i => total += i.quantity);

let el = document.getElementById("cartCount");
if(el) el.innerText = total;
}

window.onload = function(){
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cart.forEach(item => updateDisplay(item.name));
updateCartCount();
}
