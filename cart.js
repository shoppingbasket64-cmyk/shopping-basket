let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price){
let existing = cart.find(item => item.name === name);
if(existing){
existing.qty += 1;
}else{
cart.push({name, price, qty:1});
}
saveCart();
renderCart();
}

function removeItem(index){
cart.splice(index,1);
saveCart();
renderCart();
}

function saveCart(){
localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart(){
let cartDiv = document.getElementById("cartItems");
if(!cartDiv) return;

cartDiv.innerHTML="";
let total=0;

cart.forEach((item,index)=>{
let itemTotal=item.price*item.qty;
total+=itemTotal;

cartDiv.innerHTML+=`
<div style="display:flex;justify-content:space-between;margin-bottom:5px;">
<span>${item.name} × ${item.qty}</span>
<span>${itemTotal} ج</span>
<button class="delete-btn" onclick="removeItem(${index})">حذف</button>
</div>
`;
});

let totalDiv=document.getElementById("total");
if(totalDiv){
totalDiv.innerText="الإجمالي: "+total+" جنيه";
}
}

function sendOrder(){
let name=document.getElementById("name").value;
let phone=document.getElementById("phone").value;
let address=document.getElementById("address").value;

if(cart.length===0||!name||!phone||!address){
alert("املأ البيانات وأضف منتجات");
return;
}

let message="طلب جديد:%0A";
cart.forEach(item=>{
message+=item.name+" × "+item.qty+"%0A";
});

message+="%0Aالاسم: "+name;
message+="%0Aالهاتف: "+phone;
message+="%0Aالعنوان: "+address;

window.open("https://wa.me/201551489292?text="+message);
}

window.onload=renderCart;
