export function renderProducts(rootElement, products, formatRupiah) {
  rootElement.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-meta">${product.category} - ${product.sold} terjual</div>
        <div class="product-price">${formatRupiah(product.price)}</div>
        <button class="add-btn" data-id="${product.id}">+ Keranjang</button>
      </div>
    `;
    rootElement.appendChild(card);
  });
}
