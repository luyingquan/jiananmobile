// 商品列表相关功能
function renderProducts(category = '全部') {
    const productList = document.getElementById('productList');
    if (!productList) return;
    
    const filteredProducts = category === '全部' 
        ? productData.products 
        : productData.products.filter(p => p.category === category);
    
    productList.innerHTML = filteredProducts.map(product => `
        <div class="product-item" onclick="location.href='detail.html?id=${product.id}'">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-desc">${product.description}</div>
                    <div class="product-desc">${product.spec}</div>
                    <div class="product-desc">已售${product.sales}件</div>
                </div>
                <div class="product-price">￥${product.price}</div>
            </div>
            <button class="add-to-cart" onclick="event.stopPropagation();addToCart(${product.id})">
                <img src="https://cdn-icons-png.flaticon.com/128/4903/4903482.png" alt="加入购物车" style="width:24px;height:24px;">
            </button>
        </div>
    `).join('');
}

// 添加商品到购物车
function addToCart(productId) {
    const product = productData.products.find(p => p.id === productId);
    if (!product) return;
    
    const cartItem = productData.cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        productData.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveData();
    alert('已添加到购物车');
}

// 绑定分类点击事件
function bindCategoryEvents() {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            categoryItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            renderProducts(this.textContent);
        });
    });
}

// 绑定搜索事件
function bindSearchEvent() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const keyword = this.value.toLowerCase().trim();
        const filteredProducts = productData.products.filter(product => 
            product.name.toLowerCase().includes(keyword) || 
            product.description.toLowerCase().includes(keyword)
        );
        
        const productList = document.getElementById('productList');
        productList.innerHTML = filteredProducts.map(product => `
            <div class="product-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <div>
                        <div class="product-name">${product.name}</div>
                        <div class="product-desc">${product.description}</div>
                        <div class="product-desc">${product.spec}</div>
                        <div class="product-desc">已售${product.sales}件</div>
                    </div>
                    <div class="product-price">￥${product.price}</div>
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <img src="https://cdn-icons-png.flaticon.com/128/4903/4903482.png" alt="加入购物车" style="width:24px;height:24px;">
                </button>
            </div>
        `).join('');
    });
}

// 初始化
window.addEventListener('load', function() {
    renderProducts();
    bindCategoryEvents();
    bindSearchEvent();
});
