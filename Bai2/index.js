// Bài tập - cài đặt bằng Node.js

// constructor function Product
function Product(id, name, price, quantity, category, isAvailable) {
  this.id = id;
  this.name = name;
  this.price = price; // number
  this.quantity = quantity; // number
  this.category = category;
  this.isAvailable = isAvailable; // boolean
}

// tạo mảng products (ít nhất 6 sản phẩm, >=2 danh mục)
const products = [
  new Product(1, 'Điện thoại A', 12000000, 10, 'Electronics', true),
  new Product(2, 'Laptop B', 35000000, 5, 'Electronics', true),
  new Product(3, 'Tai nghe X', 1500000, 0, 'Accessories', false),
  new Product(4, 'Sạc dự phòng', 500000, 20, 'Accessories', true),
  new Product(5, 'Bàn phím cơ', 2500000, 7, 'Peripherals', true),
  new Product(6, 'Màn hình 24"', 4500000, 2, 'Peripherals', false),
];

// tạo mảng chỉ chứa name và price
const namePriceArray = products.map(p => ({ name: p.name, price: p.price }));

// lọc sản phẩm còn hàng (quantity > 0)
const inStock = products.filter(p => p.quantity > 0);

// kiểm tra có ít nhất một sản phẩm giá trên 30.000.000
const hasExpensive = products.some(p => p.price > 30000000);

// kiểm tra tất cả sản phẩm thuộc danh mục "Accessories" đang được bán (isAvailable === true)
const accessories = products.filter(p => p.category === 'Accessories');
const allAccessoriesAvailable = accessories.length > 0 && accessories.every(p => p.isAvailable === true);

// tính tổng giá trị kho (price * quantity)
const totalInventoryValue = products.reduce((acc, p) => acc + p.price * p.quantity, 0);

// dùng for...of duyệt products và in: Tên sản phẩm - Danh mục - Trạng thái
function printProductsForOf(list) {
  console.log('\n--- Câu 8: Danh sách sản phẩm (for...of) ---');
  for (const p of list) {
    const status = p.isAvailable ? 'Đang bán' : 'Ngưng bán';
    console.log(`${p.name} - ${p.category} - ${status}`);
  }
}

// dùng for...in để in ra tên thuộc tính và giá trị tương ứng (cho mỗi sản phẩm)
function printProductsForIn(list) {
  console.log('\n--- Câu 9: Thuộc tính sản phẩm (for...in) ---');
  list.forEach((p, idx) => {
    console.log(`Sản phẩm #${idx + 1}:`);
    for (const key in p) {
      if (Object.prototype.hasOwnProperty.call(p, key)) {
        console.log(`  ${key}: ${p[key]}`);
      }
    }
  });
}

// lấy danh sách tên các sản phẩm đang bán và còn hàng
const sellingAndInStockNames = products
  .filter(p => p.isAvailable === true && p.quantity > 0)
  .map(p => p.name);

// In kết quả các câu
console.log('--- Kết quả bài tập ---');
console.log('\nCâu 3: Mảng name & price:');
console.log(namePriceArray);

console.log('\nCâu 4: Sản phẩm còn hàng (quantity > 0):');
console.log(inStock);

console.log('\nCâu 5: Có ít nhất 1 sản phẩm giá > 30.000.000?:', hasExpensive);

console.log('\nCâu 6: Tất cả sản phẩm "Accessories" đang được bán?:', allAccessoriesAvailable, '(Accessories count =', accessories.length + ')');

console.log('\nCâu 7: Tổng giá trị kho (price * quantity):', totalInventoryValue);

printProductsForOf(products);
printProductsForIn(products);

console.log('\nCâu 10: Tên sản phẩm đang bán và còn hàng:');
console.log(sellingAndInStockNames);

// Export để có thể test nếu cần
module.exports = {
  Product,
  products,
  namePriceArray,
  inStock,
  hasExpensive,
  allAccessoriesAvailable,
  totalInventoryValue,
  sellingAndInStockNames,
};
