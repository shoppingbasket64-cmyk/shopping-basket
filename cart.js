let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({name, price});
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("تم إضافة المنتج للسلة ✅");
}

function displayCart() {
    let container = document.getElementById("cart-items");
    if(!container) return;

    container.innerHTML = "";

    if(cart.length === 0){
        container.innerHTML = "<p>السلة فارغة</p>";
        return;
    }

    cart.forEach((item, index) => {
        container.innerHTML += `
            <div class="item">
                ${item.name} - ${item.price} جنيه
                <br>
                <button onclick="removeItem(${index})">حذف</button>
            </div>
        `;
    });
}

function removeItem(index){
    cart.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function clearCart(){
    localStorage.removeItem("cart");
    cart = [];
    displayCart();
}

function sendOrder(){
    if(cart.length === 0){
        alert("السلة فارغة");
        return;
    }

    let message = "طلب جديد%0A----------------%0A";

    cart.forEach(item=>{
        message += item.name + " - " + item.price + " جنيه%0A";
    });

    window.open("https://wa.me/201551489292?text=" + message);
}

displayCart();
