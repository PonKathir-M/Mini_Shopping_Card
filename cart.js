const cart = {};

function addToCart(itemName) {
  if (cart[itemName]) {
    cart[itemName].qty += 1;
  } else {
    const price = getItemPrice(itemName);
    cart[itemName] = { name: itemName, qty: 1, price };
  }
  animateAddToCart(itemName);
  renderCart();
}

function getItemPrice(name) {
  switch (name) {
    case "Cool Shirt": return 499;
    case "Running Shoes": return 999;
    case "Stylish Cap": return 199;
    case "Travel Bag": return 799;
    default: return 0;
  }
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  let total = 0;

  for (const key in cart) {
    const item = cart[key];
    const itemTotal = item.qty * item.price;
    total += itemTotal;

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.name}</strong> - 
      ₹${item.price} x ${item.qty} = ₹${itemTotal}
      <button style="margin-left:10px;color:red;background:none;border:none;cursor:pointer;" 
        onclick="removeItem('${item.name}')">❌</button>
    `;
    cartItems.appendChild(li);
  }

  if (total > 0) {
    const li = document.createElement("li");
    li.style.fontWeight = "bold";
    li.style.marginTop = "10px";
    li.innerHTML = `Total: ₹${total}`;
    cartItems.appendChild(li);
  } else {
    cartItems.innerHTML = "<li>Your cart is empty.</li>";
  }
}

function removeItem(name) {
  delete cart[name];
  renderCart();
}

function animateAddToCart(itemName) {
  const cartBox = document.querySelector(".cart");
  cartBox.style.animation = "bounce 0.3s";
  setTimeout(() => cartBox.style.animation = "", 300);
}

// Optional: animation keyframes (injecting directly if needed)
const style = document.createElement("style");
style.innerHTML = `
@keyframes bounce {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.05); }
  100% { transform: scale(1); }
}`;
document.head.appendChild(style);
