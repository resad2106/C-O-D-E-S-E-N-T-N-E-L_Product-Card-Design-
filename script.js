document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const darkToggle = document.getElementById('darkModeToggle');
  const toast = document.getElementById('toast');
  const buyButtons = document.querySelectorAll('.buy-btn');
  const categoryFilter = document.getElementById('categoryFilter');
  const priceFilter = document.getElementById('priceFilter');
  const productGrid = document.getElementById('productGrid');
  const products = productGrid.querySelectorAll('.product-card');

  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
  }

  darkToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.removeItem('darkMode');
    }
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  buyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productName = btn.closest('.product-card').querySelector('h2, h3').textContent;
      showToast(`${productName} added to cart!`);
    });
  });

  function filterProducts() {
    const categoryValue = categoryFilter.value;
    const priceValue = priceFilter.value;

    products.forEach(product => {
      const productCategory = product.getAttribute('data-category');
      const productPrice = parseFloat(product.querySelector('.price').textContent.replace('$', ''));

      const categoryMatch = categoryValue === 'all' || productCategory === categoryValue;

      let priceMatch = false;
      if (priceValue === 'all') {
        priceMatch = true;
      } else if (priceValue === 'low') {
        priceMatch = productPrice < 50;
      } else if (priceValue === 'mid') {
        priceMatch = productPrice >= 50 && productPrice <= 100;
      } else if (priceValue === 'high') {
        priceMatch = productPrice > 100;
      }

      if (categoryMatch && priceMatch) {
        product.style.display = '';
      } else {
        product.style.display = 'none';
      }
    });
  }

  categoryFilter.addEventListener('change', filterProducts);
  priceFilter.addEventListener('change', filterProducts);

  filterProducts();

  const images = productGrid.querySelectorAll('img');
  images.forEach(img => {
    img.parentElement.classList.add('loading');

    img.addEventListener('load', () => {
      img.parentElement.classList.remove('loading');
    });

    if (img.complete) {
      img.parentElement.classList.remove('loading');
    }
  });
});