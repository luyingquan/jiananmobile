// 渲染购物车
function renderCart() {
    const cartContainer = document.getElementById('cartContainer');
    if (!cartContainer) return;
    
    if (productData.cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <img src="https://cdn-icons-png.flaticon.com/128/4903/4903482.png" alt="空购物车">
                <p>购物车是空的</p>
            </div>
        `;
        document.getElementById('cartFooter').style.display = 'none';
        return;
    }
    
    document.getElementById('cartFooter').style.display = 'flex';
    
    cartContainer.innerHTML = productData.cart.map(item => `
        <div class="cart-item">
            <input type="checkbox" class="cart-item-checkbox" checked onchange="updateTotal()">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div>
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">￥${item.price}</div>
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left:10px">×</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    updateTotal();
}

// 更新商品数量
function updateQuantity(productId, change) {
    const cartItem = productData.cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity = Math.max(1, cartItem.quantity + change);
        saveData();
        renderCart();
    }
}

// 从购物车移除商品
function removeFromCart(productId) {
    if (confirm('确定要删除这个商品吗？')) {
        productData.cart = productData.cart.filter(item => item.id !== productId);
        saveData();
        renderCart();
    }
}

// 更新总价
function updateTotal() {
    const checkboxes = document.querySelectorAll('.cart-item-checkbox');
    const totalPriceElement = document.querySelector('.total-price');
    
    let total = 0;
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const item = productData.cart[index];
            total += item.price * item.quantity;
        }
    });
    
    totalPriceElement.textContent = `￥${total.toFixed(2)}`;
}

// 全选/取消全选
document.getElementById('selectAll')?.addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.cart-item-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });
    updateTotal();
});

// 显示订单确认弹窗
function showOrderConfirm() {
    const selectedItems = Array.from(document.querySelectorAll('.cart-item-checkbox'))
        .map((checkbox, index) => checkbox.checked ? productData.cart[index] : null)
        .filter(item => item !== null);
    
    if (selectedItems.length === 0) {
        alert('请选择要结算的商品');
        return;
    }
    
    const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const orderConfirm = document.getElementById('orderConfirm');
    const orderItems = document.getElementById('orderItems');
    
    orderItems.innerHTML = selectedItems.map(item => `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="order-item-info">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-quantity">数量：${item.quantity}</div>
                <div class="order-item-price">￥${item.price}</div>
            </div>
        </div>
    `).join('');
    
    document.querySelector('.confirm-total-price').textContent = `￥${total.toFixed(2)}`;
    orderConfirm.style.display = 'flex';
}

// 隐藏订单确认弹窗
function hideOrderConfirm() {
    document.getElementById('orderConfirm').style.display = 'none';
}

// 提交订单
function submitOrder() {
    const selectedItems = Array.from(document.querySelectorAll('.cart-item-checkbox'))
        .map((checkbox, index) => checkbox.checked ? productData.cart[index] : null)
        .filter(item => item !== null);
    
    const order = {
        id: Date.now(),
        items: selectedItems,
        total: selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        date: new Date().toLocaleString()
    };
    
    productData.orders.push(order);
    productData.cart = productData.cart.filter(item => 
        !selectedItems.some(selectedItem => selectedItem.id === item.id)
    );
    
    saveData();
    hideOrderConfirm();
    renderCart();
    alert('订单提交成功！');
}

// 初始化
window.addEventListener('load', renderCart);
