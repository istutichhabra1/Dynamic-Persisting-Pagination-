const productList = document.getElementById('product-list');
const sortSelect = document.getElementById('sort-select');
async function fetchProducts(sortBy = '') {
  try {
    productList.innerHTML = '<p>Loading products...</p>';
    let url = 'https://jsonplaceholder.typicode.com/users';
    if (sortBy) {
      url += `?_sort=${sortBy}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    productList.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    console.error('Error fetching products:', error);
  }
}
function displayProducts(products) {
  productList.innerHTML = '';
  if (products.length === 0) {
    productList.innerHTML = '<p>No products found.</p>';
    return;
  }
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <h2>${product.name}</h2>
      <p><strong>Email:</strong> ${product.email}</p>
      <p><strong>Phone:</strong> ${product.phone}</p>
      <p><strong>Company:</strong> ${product.company.name}</p>
    `;
    productList.appendChild(div);
  });
}
sortSelect.addEventListener('change', (e) => {
  const sortBy = e.target.value;
  fetchProducts(sortBy);
});
window.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});
