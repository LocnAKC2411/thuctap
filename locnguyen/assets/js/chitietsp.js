// JavaScript slider code
const slides = document.querySelector(' .owl-stage2');
const slide = document.querySelectorAll(' .owl-item2');
const prevBtn = document.querySelector(' .owl-prev2');
const nextBtn = document.querySelector(' .owl-next2');
const thumbItems = document.querySelectorAll('#img_thumb li'); // Lấy danh sách các thẻ li trong ul có id là img_thumb

let slideIndex = 0;
const slideLength = slide.length;

function showSlides() {
  if (slideIndex < 0) {
    slideIndex = slideLength - 1;
  } else if (slideIndex >= slideLength) {
    slideIndex = 0;
  }

  // Ẩn tất cả các ảnh
  slide.forEach((item) => {
    item.classList.remove('active');
  });

  // Hiển thị ảnh tiếp theo
  slide[slideIndex].classList.add('active');

  // Thay đổi transform của slides
  slides.style.transform = `translate3d(-${slideIndex * 417}px, ${slideIndex * 0}px, ${slideIndex * 0}px)`;

  // Loại bỏ lớp active từ tất cả các thumbItems
  thumbItems.forEach((item) => {
    item.classList.remove('active');
  });

  // Thêm lớp active vào thumbItem tương ứng
  thumbItems[slideIndex].classList.add('active');
}

function prevSlide() {
  slideIndex--;
  showSlides();
}

function nextSlide() {
  slideIndex++;
  showSlides();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Lặp qua từng thẻ li và thêm sự kiện click cho mỗi thẻ
thumbItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    // Gán giá trị slideIndex tương ứng với vị trí của thẻ li trong danh sách
    slideIndex = index;
    // Hiển thị slide tương ứng với slideIndex
    showSlides();
  });
});

showSlides();


// chức năng số lượng
document.addEventListener("DOMContentLoaded", function() {
  // Lấy các phần tử cần thiết
  var quantityInput = document.querySelector('.buy-quantity');
  var decreaseButton = document.querySelector('.minor');
  var increaseButton = document.querySelector('.add');
  var stock = parseInt(quantityInput.getAttribute('data-stock'));

  // Chức năng giảm số lượng
  decreaseButton.addEventListener('click', function() {
      var currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
          quantityInput.value = currentValue - 1;
      }
  });

  // Chức năng tăng số lượng
  increaseButton.addEventListener('click', function() {
      var currentValue = parseInt(quantityInput.value);
      if (currentValue < stock) {
          quantityInput.value = currentValue + 1;
      }
  });
});

// thêm giỏ hàng
function listenBuyProDetail(productId, userId, quantity, someParam1, someParam2) {
  // Thêm logic xử lý khi nhấn vào nút "Thêm vào giỏ hàng" ở đây
  // Ví dụ: Thêm sản phẩm vào giỏ hàng bằng AJAX request
  
  // Gọi hàm để hiển thị thông báo "Thêm vào giỏ hàng thành công"
  showAddToCartSuccessMessage();
  
  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartItemCount(quantity);
}

function updateCartItemCount(quantity) {
  var cartItemCountElement = document.getElementById('count-shopping-cart-store');
  cartItemCountElement.textContent = quantity; // Cập nhật số lượng
}

function showAddToCartSuccessMessage() {
  // Hiển thị thông báo "Thêm vào giỏ hàng thành công"
  var successMessage = document.getElementById('add-cart-complete');
  successMessage.style.display = 'block';

  // Tự động ẩn đi sau 3 giây (3000 milliseconds)
  setTimeout(function() {
      successMessage.style.display = 'none';
  }, 3000);
}

// Gọi hàm để xử lý việc thêm sản phẩm vào giỏ hàng khi nhấn vào nút "Thêm vào giỏ hàng"
document.addEventListener("DOMContentLoaded", function() {
  var addToCartButton = document.querySelector('.them-vao-gio-nao');
  addToCartButton.addEventListener('click', function(event) {
      event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
      listenBuyProDetail('76572', 0, 1, '', ''); // Gọi hàm xử lý khi nhấn vào nút "Thêm vào giỏ hàng"
  });
});



// ẩn/hiện
document.addEventListener("DOMContentLoaded", function() {
  var viewMoreLinks = document.querySelectorAll('.viewmoretskt');

  viewMoreLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
          event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a

          var contentId = this.getAttribute('data-content');
          var contentElement = document.querySelector(contentId);

          contentElement.classList.toggle('expanded');
      });
  });
});

// chon tp
document.addEventListener("DOMContentLoaded", function() {
  var provinceSelect = document.getElementById('js-province');
  var storeListItems = document.querySelectorAll('.store-list .item');

  provinceSelect.addEventListener('change', function() {
      var selectedProvince = this.value;

      storeListItems.forEach(function(item) {
          var dataErp = item.getAttribute('data-erp');
          var provinceInItem = dataErp.substring(0, 3);

          if (selectedProvince === '0' || provinceInItem === selectedProvince) {
              item.style.display = 'block';
          } else {
              item.style.display = 'none';
          }
      });
  });
});





