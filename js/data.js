// 商品数据
const productData = {
    products: [
        {
            id: 1,
            name: "3寸25发花灯吉祥",
            price: 25,
            description: "花之大，一个屏幕装不下",
            image: "https://images.pexels.com/photos/1368382/pexels-photo-1368382.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "礼花类",
            sales: 90,
            spec: "25发/盒"
        },
        {
            id: 2,
            name: "颐和臻品-大丽金菊",
            price: 38,
            description: "小而精美，节奏紧凑，看过的都说好",
            image: "https://images.pexels.com/photos/839462/pexels-photo-839462.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "礼花类",
            sales: 63,
            spec: "36发/盒"
        },
        {
            id: 3,
            name: "颐和臻品-红光牡丹",
            price: 42,
            description: "小而精美，节奏紧凑，看过的都说好",
            image: "https://images.pexels.com/photos/949592/pexels-photo-949592.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "礼花类",
            sales: 31,
            spec: "36发/盒"
        },
        {
            id: 4,
            name: "南风 海市蜃景",
            price: 58,
            description: "2寸49发，目眩天花板，无出其右！",
            image: "https://images.pexels.com/photos/1573324/pexels-photo-1573324.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "礼花类",
            sales: 9,
            spec: "49发/盒"
        },
        {
            id: 5,
            name: "亚太 3寸25发",
            price: 45,
            description: "花之大，一个屏幕装不下",
            image: "https://images.pexels.com/photos/635279/pexels-photo-635279.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "礼花类",
            sales: 32,
            spec: "25发/盒"
        },
        {
            id: 6,
            name: "加特林烟花-108发",
            price: 68,
            description: "快速连发，震撼效果",
            image: "https://images.pexels.com/photos/769525/pexels-photo-769525.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "火箭类",
            sales: 71,
            spec: "108发/盒"
        },
        {
            id: 7,
            name: "方方得利 100发",
            price: 88,
            description: "持续燃放时间达三分钟",
            image: "https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "礼花类",
            sales: 32,
            spec: "100发/盒"
        },
        {
            id: 8,
            name: "小仙女棒",
            price: 15,
            description: "经典不衰，老少皆宜",
            image: "https://images.pexels.com/photos/3614167/pexels-photo-3614167.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "小产品",
            sales: 120,
            spec: "20支/盒"
        },
        {
            id: 9,
            name: "金钱豹礼花",
            price: 66,
            description: "绚丽多彩，璀璨夺目",
            image: "https://images.pexels.com/photos/1569192/pexels-photo-1569192.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "礼花类",
            sales: 45,
            spec: "49发/盒"
        },
        {
            id: 10,
            name: "彩色地雷",
            price: 28,
            description: "地面开花，绚丽多彩",
            image: "https://images.pexels.com/photos/1387577/pexels-photo-1387577.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "雷",
            sales: 88,
            spec: "12个/盒"
        },
        {
            id: 11,
            name: "黑蜘蛛",
            price: 35,
            description: "独特的蜘蛛网状效果",
            image: "https://images.pexels.com/photos/618134/pexels-photo-618134.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "蜘",
            sales: 56,
            spec: "20发/盒"
        },
        {
            id: 12,
            name: "银光闪闪",
            price: 42,
            description: "银色流光，璀璨夺目",
            image: "https://images.pexels.com/photos/1494302/pexels-photo-1494302.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "礼花类",
            sales: 67,
            spec: "36发/盒"
        },
        {
            id: 13,
            name: "旋转木马",
            price: 18,
            description: "旋转升空，绚丽多彩",
            image: "https://images.pexels.com/photos/2395968/pexels-photo-2395968.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "其它",
            sales: 94,
            spec: "10个/盒"
        },
        {
            id: 14,
            name: "金蛋喷花",
            price: 25,
            description: "喷射绚丽，持久耐看",
            image: "https://images.pexels.com/photos/1097203/pexels-photo-1097203.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "小产品",
            sales: 78,
            spec: "20个/盒"
        },
        {
            id: 15,
            name: "超级大地雷",
            price: 55,
            description: "超大当量，震撼效果",
            image: "https://images.pexels.com/photos/1553962/pexels-photo-1553962.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "雷",
            sales: 42,
            spec: "6个/盒"
        }
    ],
    cart: [],
    orders: []
};

// 从localStorage加载数据
function loadData() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        productData.cart = JSON.parse(savedCart);
    }
    
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
        productData.orders = JSON.parse(savedOrders);
    }
}

// 保存数据到localStorage
function saveData() {
    localStorage.setItem('cart', JSON.stringify(productData.cart));
    localStorage.setItem('orders', JSON.stringify(productData.orders));
}

// 初始化加载数据
loadData();
