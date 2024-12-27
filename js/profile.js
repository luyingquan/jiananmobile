// 个人中心功能
document.addEventListener('DOMContentLoaded', function() {
    // 绑定菜单项点击事件
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            switch(text) {
                case '我的订单':
                    showOrders();
                    break;
                case '切换地区':
                    alert('切换地区功能开发中...');
                    break;
                case '账户设置':
                    alert('账户设置功能开发中...');
                    break;
                case '敬请期待':
                    alert('更多功能敬请期待...');
                    break;
            }
        });
    });
});

// 显示订单列表
function showOrders() {
    if (!productData.orders || productData.orders.length === 0) {
        alert('暂无订单');
        return;
    }
    
    let orderHtml = '<div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;">' +
        '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:white;width:90%;max-height:80%;overflow-y:auto;border-radius:8px;padding:20px;">' +
        '<h3 style="text-align:center;margin-bottom:15px;">我的订单</h3>';
    
    orderHtml += productData.orders.map(order => `
        <div style="background:#f8f8f8;border-radius:4px;padding:10px;margin-bottom:10px;">
            <div style="margin-bottom:5px;font-size:12px;color:#999;">订单号：${order.id}</div>
            <div style="margin-bottom:5px;font-size:12px;color:#999;">下单时间：${order.date}</div>
            ${order.items.map(item => `
                <div style="display:flex;margin-bottom:5px;padding:5px;background:white;border-radius:4px;">
                    <img src="${item.image}" style="width:40px;height:40px;object-fit:cover;margin-right:10px;">
                    <div style="flex:1;">
                        <div style="font-size:14px;">${item.name}</div>
                        <div style="font-size:12px;color:#999;">数量：${item.quantity}</div>
                    </div>
                    <div style="color:#ff4d4d;">￥${item.price}</div>
                </div>
            `).join('')}
            <div style="text-align:right;margin-top:5px;">
                <span style="color:#ff4d4d;font-weight:bold;">总计：￥${order.total.toFixed(2)}</span>
            </div>
        </div>
    `).join('');
    
    orderHtml += '<button onclick="this.parentElement.parentElement.remove()" style="width:100%;padding:10px;background:#ff4d4d;color:white;border:none;border-radius:4px;margin-top:15px;">关闭</button>' +
        '</div></div>';
    
    document.body.insertAdjacentHTML('beforeend', orderHtml);
}
