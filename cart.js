// تحميل السلة من التخزين
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartContainer = document.getElementById("cartItems");
let total = 0;

// عرض المنتجات
cart.forEach(item => {
    let itemDiv = document.createElement("p");
    itemDiv.textContent = item.name + " × " + item.quantity + " = " + (item.price * item.quantity) + " جنيه";
    cartContainer.appendChild(itemDiv);

    total += item.price * item.quantity;
});

// عرض إجمالي المنتجات
document.getElementById("productsTotal").innerText = total;

// اختيار المنطقة
let areaSelect = document.getElementById("area");
let deliverySpan = document.getElementById("deliveryFee");
let finalTotalSpan = document.getElementById("finalTotal");

let deliveryFee = 0;

areaSelect.addEventListener("change", function () {
    deliveryFee = parseInt(this.value) || 0;
    deliverySpan.innerText = deliveryFee;
    finalTotalSpan.innerText = total + deliveryFee;
});

// إرسال الطلب
document.getElementById("sendOrder").addEventListener("click", function () {

    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();

    if (name === "" || phone === "" || address === "") {
        alert("من فضلك املى كل البيانات");
        return;
    }

    if (areaSelect.value === "") {
        alert("من فضلك اختر المنطقة");
        return;
    }

    if (cart.length === 0) {
        alert("السلة فاضية");
        return;
    }

    let selectedArea = areaSelect.options[areaSelect.selectedIndex].text;
    let finalTotal = total + deliveryFee;

    let cartText = "";
    cart.forEach(item => {
        cartText += item.name + " × " + item.quantity + "\n";
    });

    let message =
        "طلب جديد:\n\n" +
        cartText + "\n" +
        "الاسم: " + name + "\n" +
        "الهاتف: " + phone + "\n" +
        "العنوان: " + address + "\n" +
        "المنطقة: " + selectedArea + "\n\n" +
        "إجمالي المنتجات: " + total + " جنيه\n" +
        "خدمة التوصيل: " + deliveryFee + " جنيه\n" +
        "الإجمالي النهائي: " + finalTotal + " جنيه";

    let whatsappURL = "https://wa.me/201551489292?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
});

// مسح السلة
document.getElementById("clear").addEventListener("click", function () {
    localStorage.removeItem("cart");
    location.reload();
});
