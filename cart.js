function addToCart(name, price){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let existing = cart.find(item => item.name === name);

if(existing){
    existing.quantity += 1;
}else{
    cart.push({name:name, price:price, quantity:1});
}

localStorage.setItem("cart", JSON.stringify(cart));
loadCart();
}

function loadCart(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartDiv = document.getElementById("cartItems");

if(!cartDiv) return;

cartDiv.innerHTML = "";

if(cart.length === 0){
cartDiv.innerHTML = "<p>السلة فارغة</p>";
return;
}

cart.forEach((item,index)=>{

let total = item.price * item.quantity;

cartDiv.innerHTML += `
<div class="cart-item">
<b>${item.name}</b>
<br>
الكمية: 
<button onclick="decreaseQuantity(${index})">−</button>
${item.quantity}
<button onclick="increaseQuantity(${index})">+</button>
<br>
الإجمالي: ${total} جنيه
</div>
`;

});

}

function increaseQuantity(index){
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cart[index].quantity += 1;
localStorage.setItem("cart", JSON.stringify(cart));
loadCart();
}

function decreaseQuantity(index){
let cart = JSON.parse(localStorage.getItem("cart")) || [];

if(cart[index].quantity > 1){
    cart[index].quantity -= 1;
}else{
    cart.splice(index,1);
}

localStorage.setItem("cart", JSON.stringify(cart));
loadCart();
}

function clearCart(){
localStorage.removeItem("cart");
loadCart();
}

function sendOrder(){

let name = document.getElementById("customerName").value;
let phone = document.getElementById("customerPhone").value;
let address = document.getElementById("customerAddress").value;
let payment = document.getElementById("paymentMethod").value;

if(name==="" || phone==="" || address==="" || payment===""){
alert("من فضلك اكتب كل البيانات");
return;
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

if(cart.length === 0){
alert("السلة فاضية");
return;
}

let message = "طلب جديد 🛒%0A%0A";

cart.forEach(item=>{
message += item.name + " × " + item.quantity + 
" = " + (item.price * item.quantity) + " جنيه%0A";
});

message += "%0Aالاسم: " + name;
message += "%0Aرقم التليفون: " + phone;
message += "%0Aالعنوان: " + address;
message += "%0Aطريقة الدفع: " + payment;

window.open("https://wa.me/201551489292?text=" + message);

localStorage.removeItem("cart");
}

loadCart();
