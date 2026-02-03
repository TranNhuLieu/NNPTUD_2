// Constructor function Product
function Product(id, name, price, quantity, category, isAvailable) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
  this.category = category;
  this.isAvailable = isAvailable;
}

// Mảng sản phẩm
const products = [
  new Product(1, 'Điện thoại A', 12000000, 10, 'Electronics', true),
  new Product(2, 'Laptop B', 35000000, 5, 'Electronics', true),
  new Product(3, 'Tai nghe X', 1500000, 0, 'Accessories', false),
  new Product(4, 'Sạc dự phòng', 500000, 20, 'Accessories', true),
  new Product(5, 'Bàn phím cơ', 2500000, 7, 'Peripherals', true),
  new Product(6, 'Màn hình 24"', 4500000, 2, 'Peripherals', false),
];

// Hàm hiển thị kết quả
function displayResult(title, content) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `<div class="result-box active"><h3>${title}</h3>${content}</div>`;
}

// Câu 1: Constructor (đã khai báo ở trên)
// Câu 2: Mảng products (đã khai báo ở trên)

// Câu 3: Tạo mảng name & price
function showNamePriceArray() {
  const namePriceArray = products.map(p => ({ name: p.name, price: p.price }));
  
  let html = '<table><tr><th>STT</th><th>Tên sản phẩm</th><th>Giá (đ)</th></tr>';
  namePriceArray.forEach((item, idx) => {
    html += `<tr><td>${idx + 1}</td><td>${item.name}</td><td>${item.price.toLocaleString('vi-VN')}</td></tr>`;
  });
  html += '</table>';
  
  displayResult('Câu 3: Mảng Tên & Giá', html);
}

// Câu 4: Lọc sản phẩm còn hàng
function showInStock() {
  const inStock = products.filter(p => p.quantity > 0);
  
  let html = `<div class="stats"><div class="stat-card"><div class="label">Tổng sản phẩm còn hàng</div><div class="value">${inStock.length}</div></div></div>`;
  html += '<table><tr><th>STT</th><th>Tên</th><th>Danh mục</th><th>Số lượng</th><th>Giá</th></tr>';
  
  inStock.forEach((p, idx) => {
    html += `<tr><td>${idx + 1}</td><td>${p.name}</td><td>${p.category}</td><td>${p.quantity}</td><td>${p.price.toLocaleString('vi-VN')}</td></tr>`;
  });
  html += '</table>';
  
  displayResult('Câu 4: Sản phẩm Còn hàng (quantity > 0)', html);
}

// Câu 5: Kiểm tra có sản phẩm giá > 30 triệu
function showExpensive() {
  const hasExpensive = products.some(p => p.price > 30000000);
  const expensive = products.filter(p => p.price > 30000000);
  
  let html = `<div class="stats"><div class="stat-card"><div class="label">Có sản phẩm giá > 30M?</div><div class="value">${hasExpensive ? '✓ Có' : '✗ Không'}</div></div></div>`;
  
  if (expensive.length > 0) {
    html += '<table><tr><th>STT</th><th>Tên</th><th>Giá</th></tr>';
    expensive.forEach((p, idx) => {
      html += `<tr><td>${idx + 1}</td><td>${p.name}</td><td>${p.price.toLocaleString('vi-VN')}</td></tr>`;
    });
    html += '</table>';
  }
  
  displayResult('Câu 5: Kiểm tra Giá > 30,000,000', html);
}

// Câu 6: Kiểm tra tất cả Accessories đang bán
function showAccessories() {
  const accessories = products.filter(p => p.category === 'Accessories');
  const allAccessoriesAvailable = accessories.length > 0 && accessories.every(p => p.isAvailable === true);
  
  let html = `<div class="stats">`;
  html += `<div class="stat-card"><div class="label">Tổng Accessories</div><div class="value">${accessories.length}</div></div>`;
  html += `<div class="stat-card"><div class="label">Tất cả đang bán?</div><div class="value">${allAccessoriesAvailable ? '✓ Có' : '✗ Không'}</div></div>`;
  html += `</div>`;
  
  html += '<table><tr><th>Tên</th><th>Giá</th><th>Số lượng</th><th>Trạng thái</th></tr>';
  accessories.forEach(p => {
    const status = p.isAvailable ? '✓ Đang bán' : '✗ Ngưng bán';
    html += `<tr><td>${p.name}</td><td>${p.price.toLocaleString('vi-VN')}</td><td>${p.quantity}</td><td>${status}</td></tr>`;
  });
  html += '</table>';
  
  displayResult('Câu 6: Kiểm tra Accessories', html);
}

// Câu 7: Tính tổng giá trị kho
function showInventoryValue() {
  const totalInventoryValue = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  
  let html = `<div class="stats"><div class="stat-card"><div class="label">Tổng giá trị kho (price × quantity)</div><div class="value">${totalInventoryValue.toLocaleString('vi-VN')} đ</div></div></div>`;
  
  html += '<table><tr><th>Sản phẩm</th><th>Giá</th><th>Số lượng</th><th>Giá trị</th></tr>';
  products.forEach(p => {
    const value = p.price * p.quantity;
    html += `<tr><td>${p.name}</td><td>${p.price.toLocaleString('vi-VN')}</td><td>${p.quantity}</td><td>${value.toLocaleString('vi-VN')}</td></tr>`;
  });
  html += '</table>';
  
  displayResult('Câu 7: Tổng Giá trị Kho', html);
}

// Câu 8: for...of iteration
function showForOfIteration() {
  let html = '<ul class="product-list">';
  
  for (const p of products) {
    const status = p.isAvailable ? 'Đang bán' : 'Ngưng bán';
    html += `<li><strong>${p.name}</strong> - ${p.category} - ${status}</li>`;
  }
  
  html += '</ul>';
  displayResult('Câu 8: Duyệt for...of (Tên - Danh mục - Trạng thái)', html);
}

// Câu 9: for...in iteration
function showForInIteration() {
  let html = '<div style="background: white; padding: 15px; border-radius: 5px;">';
  
  products.forEach((p, idx) => {
    html += `<div style="margin-bottom: 20px; border: 1px solid #ddd; padding: 15px; border-radius: 5px;"><strong>Sản phẩm #${idx + 1}:</strong><br>`;
    
    for (const key in p) {
      if (Object.prototype.hasOwnProperty.call(p, key)) {
        let value = p[key];
        if (typeof value === 'number' && key === 'price') {
          value = value.toLocaleString('vi-VN') + ' đ';
        }
        html += `&nbsp;&nbsp;${key}: <strong>${value}</strong><br>`;
      }
    }
    
    html += '</div>';
  });
  
  html += '</div>';
  displayResult('Câu 9: Duyệt for...in (Tên thuộc tính & Giá trị)', html);
}

// Câu 10: Tên sản phẩm đang bán và còn hàng
function showSellingInStock() {
  const sellingAndInStockNames = products
    .filter(p => p.isAvailable === true && p.quantity > 0)
    .map(p => p.name);
  
  let html = `<div class="stats"><div class="stat-card"><div class="label">Số sản phẩm đang bán & còn hàng</div><div class="value">${sellingAndInStockNames.length}</div></div></div>`;
  
  html += '<ul class="product-list">';
  sellingAndInStockNames.forEach(name => {
    html += `<li>✓ ${name}</li>`;
  });
  html += '</ul>';
  
  displayResult('Câu 10: Sản phẩm Đang bán & Còn hàng', html);
}

// Hiển thị tất cả sản phẩm
function showAllProducts() {
  let html = `<div class="stats"><div class="stat-card"><div class="label">Tổng sản phẩm</div><div class="value">${products.length}</div></div></div>`;
  
  html += '<table><tr><th>STT</th><th>ID</th><th>Tên</th><th>Giá</th><th>Số lượng</th><th>Danh mục</th><th>Trạng thái</th></tr>';
  
  products.forEach((p, idx) => {
    const status = p.isAvailable ? '✓ Đang bán' : '✗ Ngưng bán';
    html += `<tr>
      <td>${idx + 1}</td>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.price.toLocaleString('vi-VN')} đ</td>
      <td>${p.quantity}</td>
      <td>${p.category}</td>
      <td>${status}</td>
    </tr>`;
  });
  
  html += '</table>';
  
  displayResult('Tất cả Sản phẩm', html);
}

// Xóa kết quả
function clearResults() {
  document.getElementById('results').innerHTML = '';
}

// Hiển thị danh sách sản phẩm khi load trang
window.addEventListener('load', () => {
  showAllProducts();
});
