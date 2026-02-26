export function renderCategories(rootElement, categories, activeCategory) {
  rootElement.innerHTML = "";

  categories.forEach((category) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <button class="category-btn ${activeCategory === category ? "active" : ""}" data-category="${category}">
        ${category}
      </button>
    `;
    rootElement.appendChild(item);
  });
}
