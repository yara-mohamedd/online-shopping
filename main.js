//  حماية الصفحة
let isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn !== "true") {
  window.location.href = "login.html";
}

// Logout
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

let API = "https://dummyjson.com/products";

//  تحميل المنتجات
async function getProducts() {
  let res = await fetch(API);
  let data = await res.json();

  localStorage.setItem("allProducts", JSON.stringify(data.products));
  displayProducts(data.products);
}

//  عرض المنتجات
function displayProducts(products) {
  let container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  products.forEach((p) => {
    container.innerHTML += `
      <div class="bg-pink-100 p-4 rounded shadow">
        <img src="${p.thumbnail}" class="h-40 w-full object-cover rounded"/>
        <h3 class="mt-2 font-bold">${p.title}</h3>
        <p class="text-gray-700">$${p.price}</p>

        <button onclick="addToCart(${p.id})"
          class="bg-purple-500 text-white p-2 w-full mt-2 rounded-lg hover:bg-purple-600 transition">
          Add to Cart
        </button>  
      </div>
    `;
  });
}

//  Search
let searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    let all = JSON.parse(localStorage.getItem("allProducts")) || [];

    let filtered = all.filter((p) =>
      p.title.toLowerCase().includes(searchInput.value.toLowerCase()),
    );

    displayProducts(filtered);
  });
}

//  Add to Cart
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(id);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart(); // مهم عشان يحدث الكارت فورًا
  alert("Added to cart 🛒");
  window.location.href = "cart.html";
}

//  Remove from Cart
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // نشيل أول عنصر مطابق للـ id
  cart = cart.filter((itemId) => itemId !== id);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart(); // تحديث الفورمة
}

//  تحميل الكارت
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let all = JSON.parse(localStorage.getItem("allProducts")) || [];

  let container = document.getElementById("cart");
  let totalBox = document.getElementById("totalBox");

  if (!container) return;

  let items = all.filter((p) => cart.includes(p.id));

  container.innerHTML = "";

  let total = 0;

  items.forEach((p) => {
    total += p.price;

    container.innerHTML += `
      <div class="bg-purple-200 rounded-2xl shadow-md hover:shadow-xl transition p-4">
        <img src="${p.thumbnail}" class="h-40 w-full object-cover rounded-xl"/>

        <div class="mt-3">
          <h3 class="font-bold text-gray-800">${p.title}</h3>
          <p class="text-sm text-gray-500">${p.category}</p>

          <div class="flex justify-between items-center mt-3">
            <p class="text-purple-600 font-bold">$${p.price}</p>

            <button onclick="removeFromCart(${p.id})"
              class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition">
              Remove
            </button>
          </div>
        </div>
      </div>
    `;
  });

  totalBox.innerHTML = `
    <div class="bg-pink-200 rounded-2xl shadow-md p-5 flex justify-between items-center">
      <div>
        <p class="text-gray-500 text-sm">Total Price</p>
        <h2 class="text-2xl font-bold text-purple-700">$${total.toFixed(2)}</h2>
      </div>

      <button class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition">
        Checkout
      </button>
    </div>
  `;
}

//  Categories
async function getCategories() {
  let all = JSON.parse(localStorage.getItem("allProducts")) || [];

  let uniqueCategories = [...new Set(all.map((p) => p.category))];

  displayCategories(uniqueCategories);
}

//  عرض الكاتيجوري
function displayCategories(categories) {
  let container = document.getElementById("categories");

  container.innerHTML = `
    <li onclick="filterByCategory('all')" class="cursor-pointer p-2 rounded-lg hover:bg-purple-200">
      All
    </li>
  `;

  categories.forEach((cat) => {
    container.innerHTML += `
      <li onclick="filterByCategory('${cat}')" class="cursor-pointer p-2 rounded-lg hover:bg-purple-200">
        ${cat}
      </li>
    `;
  });
}

//  فلترة
function filterByCategory(category) {
  let all = JSON.parse(localStorage.getItem("allProducts")) || [];

  if (category === "all") {
    displayProducts(all);
  } else {
    let filtered = all.filter((p) => p.category === category);
    displayProducts(filtered);
  }
}

//  تشغيل
getProducts();
getCategories();
loadCart();
