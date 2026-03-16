export const PRODUCTS = [
  { id: 1,  name: "Sony WH-1000XM5 Wireless Headphones",    price: 279.99, originalPrice: 349.99,  rating: 4.8, reviews: 12483, category: "Electronics", image: "🎧", badge: "Best Seller", stock: 42 },
  { id: 2,  name: "Apple AirPods Pro (2nd Gen)",             price: 189.99, originalPrice: 249.00,  rating: 4.7, reviews: 8921,  category: "Electronics", image: "🎵", badge: "Prime",       stock: 15 },
  { id: 3,  name: "Samsung 65\" 4K QLED Smart TV",           price: 799.99, originalPrice: 1099.99, rating: 4.6, reviews: 3241,  category: "Electronics", image: "📺", badge: "Deal",        stock: 8  },
  { id: 4,  name: "Nike Air Max 270 Running Shoes",          price: 109.99, originalPrice: 150.00,  rating: 4.5, reviews: 6782,  category: "Clothing",    image: "👟", badge: "Best Seller", stock: 24 },
  { id: 5,  name: "The North Face Insulated Jacket",         price: 149.99, originalPrice: 220.00,  rating: 4.7, reviews: 2341,  category: "Clothing",    image: "🧥", badge: "Prime",       stock: 11 },
  { id: 6,  name: "Instant Pot Duo 7-in-1 Pressure Cooker", price: 69.99,  originalPrice: 99.99,   rating: 4.8, reviews: 18234, category: "Kitchen",     image: "🍲", badge: "Best Seller", stock: 63 },
  { id: 7,  name: "Dyson V15 Detect Cordless Vacuum",        price: 449.99, originalPrice: 649.99,  rating: 4.7, reviews: 4521,  category: "Home",        image: "🔋", badge: "Deal",        stock: 5  },
  { id: 8,  name: "LEGO Technic Bugatti Chiron",             price: 249.99, originalPrice: 369.99,  rating: 4.9, reviews: 7832,  category: "Toys",        image: "🧱", badge: "Prime",       stock: 18 },
  { id: 9,  name: "Kindle Paperwhite 11th Gen",              price: 99.99,  originalPrice: 139.99,  rating: 4.6, reviews: 9210,  category: "Electronics", image: "📚", badge: "Best Seller", stock: 35 },
  { id: 10, name: "Weber Spirit II E-310 Gas Grill",         price: 459.00, originalPrice: 579.00,  rating: 4.5, reviews: 1823,  category: "Outdoor",     image: "🔥", badge: "Deal",        stock: 7  },
  { id: 11, name: "Vitamix 5200 Blender",                    price: 349.99, originalPrice: 449.99,  rating: 4.8, reviews: 5432,  category: "Kitchen",     image: "🥤", badge: "Prime",       stock: 22 },
  { id: 12, name: "GoPro HERO12 Black Action Camera",        price: 299.99, originalPrice: 399.99,  rating: 4.6, reviews: 3201,  category: "Electronics", image: "📷", badge: "New",         stock: 31 },
  { id: 13, name: "Patagonia Down Sweater Hoody",            price: 199.00, originalPrice: 279.00,  rating: 4.7, reviews: 1092,  category: "Clothing",    image: "🏔️", badge: "Prime",      stock: 14 },
  { id: 14, name: "Philips Hue Smart Bulb Starter Kit",      price: 69.99,  originalPrice: 99.99,   rating: 4.5, reviews: 4567,  category: "Home",        image: "💡", badge: "Deal",        stock: 49 },
  { id: 15, name: "Yeti Rambler 30 oz Tumbler",              price: 34.99,  originalPrice: 44.99,   rating: 4.8, reviews: 21045, category: "Kitchen",     image: "☕", badge: "Best Seller", stock: 88 },
  { id: 16, name: "PlayStation 5 Console",                   price: 449.99, originalPrice: 499.99,  rating: 4.9, reviews: 34521, category: "Gaming",      image: "🎮", badge: "Hot",         stock: 3  },
];
export const CATEGORIES = ["All","Electronics","Clothing","Kitchen","Home","Toys","Outdoor","Gaming"];

export const INPUT_STYLE = {
  width: "100%", padding: "10px 12px", border: "1px solid #a6a6a6",
  borderRadius: 4, fontSize: 14, boxSizing: "border-box", outline: "none",
};
export const BTN_PRIMARY = {
  width: "100%", background: "#ffd814", border: "1px solid #fcd200",
  borderRadius: 6, padding: "10px", fontWeight: 700, fontSize: 15, cursor: "pointer",
};
export const BTN_SECONDARY = {
  width: "100%", background: "#fff", border: "1px solid #d5d9d9",
  borderRadius: 6, padding: "10px", fontWeight: 600, fontSize: 14,
  cursor: "pointer", color: "#0f1111",
};