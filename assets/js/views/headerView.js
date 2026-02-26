export function renderHeader(cartElement, resultElement, cartCount, totalProducts) {
  cartElement.textContent = `Keranjang (${cartCount})`;
  resultElement.textContent = `Menampilkan ${totalProducts} produk`;
}
