import { createShopStore } from "../state/shopStore.js";
import { formatRupiah } from "../utils/format.js";
import { renderCategories } from "../views/categoryView.js";
import { renderProducts } from "../views/productView.js";
import { renderHeader } from "../views/headerView.js";

export function initShopController(products) {
  const productGrid = document.getElementById("productGrid");
  const categoryList = document.getElementById("categoryList");
  const resultInfo = document.getElementById("resultInfo");
  const cartBtn = document.getElementById("cartBtn");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  const store = createShopStore(products);

  const render = (state) => {
    renderCategories(categoryList, state.categories, state.activeCategory);
    renderProducts(productGrid, state.filteredProducts, formatRupiah);
    renderHeader(cartBtn, resultInfo, state.cartCount, state.filteredProducts.length);
  };

  store.subscribe(render);
  render(store.getState());

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    store.dispatch({ type: "SET_KEYWORD", payload: searchInput.value });
  });

  categoryList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.classList.contains("category-btn")) {
      return;
    }

    store.dispatch({ type: "SET_CATEGORY", payload: target.dataset.category });
  });

  productGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.classList.contains("add-btn")) {
      return;
    }

    store.dispatch({ type: "ADD_TO_CART" });
  });
}
