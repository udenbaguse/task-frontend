export function renderHeader(cartElement, resultElement, cartCount, totalProducts) {
  cartElement.innerHTML = `<i class="fa-solid fa-cart-arrow-down" aria-hidden="true"></i> (${cartCount})`;
  resultElement.textContent = `Menampilkan ${totalProducts} produk`;
}
