function filterProducts(products, activeCategory, keyword) {
  const normalizedKeyword = keyword.trim().toLowerCase();

  return products.filter((product) => {
    const matchCategory = activeCategory === "Semua" || product.category === activeCategory;
    const matchKeyword = product.name.toLowerCase().includes(normalizedKeyword);
    return matchCategory && matchKeyword;
  });
}

export function createShopStore(products) {
  const categories = ["Semua", ...new Set(products.map((product) => product.category))];
  const listeners = new Set();

  let state = {
    products,
    categories,
    activeCategory: "Semua",
    keyword: "",
    cartCount: 0,
    filteredProducts: products,
  };

  const emitChange = () => {
    listeners.forEach((listener) => listener(state));
  };

  const recomputeFilteredProducts = () => {
    state = {
      ...state,
      filteredProducts: filterProducts(state.products, state.activeCategory, state.keyword),
    };
  };

  return {
    getState() {
      return state;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    dispatch(action) {
      switch (action.type) {
        case "SET_CATEGORY":
          state = { ...state, activeCategory: action.payload };
          recomputeFilteredProducts();
          emitChange();
          break;
        case "SET_KEYWORD":
          state = { ...state, keyword: action.payload };
          recomputeFilteredProducts();
          emitChange();
          break;
        case "ADD_TO_CART":
          state = { ...state, cartCount: state.cartCount + 1 };
          emitChange();
          break;
        default:
          break;
      }
    },
  };
}
