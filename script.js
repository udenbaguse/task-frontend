const products = [
  { id: 1, name: "Sneakers Urban", category: "Fashion", price: 329000, sold: 210, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500" },
  { id: 2, name: "Headphone Wireless", category: "Elektronik", price: 459000, sold: 188, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
  { id: 3, name: "Botol Minum", category: "Rumah Tangga", price: 79000, sold: 342, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500" },
  { id: 4, name: "Kaos Oversize", category: "Fashion", price: 119000, sold: 97, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" },
  { id: 5, name: "Smartwatch X1", category: "Elektronik", price: 699000, sold: 74, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
  { id: 6, name: "Lampu Meja Minimalis", category: "Rumah Tangga", price: 165000, sold: 129, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500" },
];

const productGrid = document.getElementById("productGrid");
const categoryList = document.getElementById("categoryList");
const resultInfo = document.getElementById("resultInfo");
const cartBtn = document.getElementById("cartBtn");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const categories = ["Semua", ...new Set(products.map((p) => p.category))];
let activeCategory = "Semua";
let cartCount = 0;

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function renderCategories() {
  categoryList.innerHTML = "";
  categories.forEach((category) => {
    const li = document.createElement("li");
    li.innerHTML = `<button class="category-btn">${category}</button>`;
    const btn = li.firstElementChild;
    btn.addEventListener("click", () => {
      activeCategory = category;
      applyFilters();
    });
    categoryList.appendChild(li);
  });
}

function renderProducts(list) {
  productGrid.innerHTML = "";

  list.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-meta">${product.category} • ${product.sold} terjual</div>
        <div class="product-price">${formatRupiah(product.price)}</div>
        <button class="add-btn" data-id="${product.id}">+ Keranjang</button>
      </div>
    `;

    const addButton = card.querySelector(".add-btn");
    addButton.addEventListener("click", () => {
      cartCount += 1;
      cartBtn.innerHTML = `Keranjang (${cartCount})`;
    });

    productGrid.appendChild(card);
  });

  resultInfo.innerHTML = `Menampilkan ${list.length} produk`;
}

function applyFilters() {
  const keyword = searchInput.value.trim().toLowerCase();
  const filtered = products.filter((product) => {
    const matchCategory = activeCategory === "Semua" || product.category === activeCategory;
    const matchKeyword = product.name.toLowerCase().includes(keyword);
    return matchCategory && matchKeyword;
  });
  renderProducts(filtered);
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  applyFilters();
});

renderCategories();
renderProducts(products);
