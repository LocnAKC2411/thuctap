// fixed 
window.onscroll = function() {myFunction()};

var navbar = document.getElementById("fixed");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    fixed.classList.add("sticky")
  } else {
    fixed.classList.remove("sticky");
  }
}
  
/// hcap cha
document.addEventListener("DOMContentLoaded", function(event) {
  var hcaptchaElement = document.querySelector('.h-captcha');

  if (hcaptchaElement) {
      var your_site_key = hcaptchaElement.getAttribute("data-sitekey");

      var loadCapchaLogin = function () {
          // Clear any existing content in the element
          hcaptchaElement.innerHTML = '';

          // Render the hCaptcha widget
          var hCaptchaOptions = {
              'sitekey': your_site_key,
              'size': 'normal', // Adjust the size if needed
              'callback': function (response) {
                  // Callback function when the user completes the captcha
                  // You can use 'response' to verify the user's response
              },
          };

          hcaptcha.render(hCaptchaOptions, hcaptchaElement);
      };

      // Call the function to load the hCaptcha widget
      loadCapchaLogin();
  } else {
      console.error("Element with class 'h-captcha' not found.");
  }
});


//  ///chức năng của phone chưa sửa dụng
//  function loginWidthPhone() {
//   // Get the phone number input value
//   var phoneNumber = $("#js-phone-login-number").val();

//   // Clear previous error messages
//   $("#js-note-phone-b1").text("");

//   // Validate phone number
//   if (phoneNumber === "") {
//       $("#js-note-phone-b1").text("Bạn chưa nhập số điện thoại");
//   } else if (!isValidPhoneNumber(phoneNumber)) {
//       $("#js-note-phone-b1").text("Số điện thoại chưa chính xác");
//   } else {
//       // Validation passed, redirect to another form (replace 'your-other-form.html' with the actual URL)
//       window.location.href = 'your-other-form.html';
//   }
// }

// // Function to check if the phone number is valid (you can customize this function based on your validation criteria)
// function isValidPhoneNumber(phoneNumber) {
//   // Sample validation: Check if it contains only numeric characters and has a specific length
//   return /^\d+$/.test(phoneNumber) && phoneNumber.length === 10;
// }

//show pas
function toggleShowHidePass(passwordInputId, toggleButton) {
  var passwordInput = document.getElementById(passwordInputId);

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleButton.innerHTML = 'Ẩn';
  } else {
    passwordInput.type = 'password';
    toggleButton.innerHTML = 'Hiện';
  }
}

///chức năng 
function submitFormPlpB3() {
    var error = "";
    var full_name = $("#js-plp-name").val();
    var password = $("#js-plp-pass-2").val();
    var email = $("#js-plp-email").val();
    var mobile = $("#js-phone-ln-save").val();
    var address = '';

    if(full_name == ''){
        $("#js-note-error-plp-b3-name").html("Bạn chưa nhập tên");
        error += "Bạn chưa nhập tên";
    }
    if(password == ''){
        $("#js-note-error-plp-b3-pass").html("Bạn chưa nhập mật khẩu");
        error += "Bạn chưa nhập mật khẩu";
    }
    if(password.length < 6) {
        $("#js-note-error-plp-b3-pass").html("Mật khẩu yếu, mật khẩu phải trên 6 ký tự");
        error += "Mật khẩu yếu, mật khẩu phải trên 6 ký tự";
    }
    if(email.length < 6){
        $("#js-note-error-plp-b3-email").html("Mời bạn nhập địa chỉ email");
        error += "Mời bạn nhập địa chỉ email";
    }

    if (error == "") {
        var hCaptchaResponse = hcaptcha.getResponse();
        var sex = '';
        var birthday = '';
        var birthmonth = '';
        var birthyear = '';
        var province = '';

        $.post("/ajax/customer_register.php", {
            'info[name]': full_name,
            'info[email]': email,
            'info[password]': password,
            'info[mobile]': mobile,
            'info[sex]': 'male',
            'info[birthday]': birthday,
            'info[birthmonth]': birthmonth,
            'info[birthyear]': birthyear,
            'info[address]': address,
            'info[province]': province,
            ajax: 'yes',
            'h-captcha-response': hCaptchaResponse,
            //..khac..
        }, function (data) {
            console.log("Inside $.post callback");
            console.log(data);

            if (data != 'success') {
                $("#check_user2").html("lỗi: " + data);
            } else {
                $("#check_user2").html("Đăng ký thành công, chuyển đến tab đăng nhập");
                setTimeout(function(){
                    $('#js-content-plp-left').removeClass("load-login-pop");
                    console.log("Before redirection");
                    window.location.href = 'http://127.0.0.1:5500/de-tai-thuc-tap/dangnhap.htm';
                    console.log("After redirection");
                },2000);
            }
        }).fail(function(xhr, textStatus, errorThrown) {
            console.log("Ajax request failed: " + textStatus);
        });

        console.log("After $.post");

        // Gọi hàm kiểm tra email
        checkUserEmail(email);

        // Gọi hàm kiểm tra captcha
        checkUserCaptcha(hCaptchaResponse);
    }
}



function checkUserEmail(email) {
  var emailErrorElement = $('#js-note-error-plp-b3-email');

  // Clear any existing error messages
  emailErrorElement.html("");

  // Basic email format validation using a regular expression
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      emailErrorElement.html("Email không hợp lệ");
      return;
  } else {
      emailErrorElement.html("Email hợp lệ");
  }

  // If the email is valid, proceed with the Ajax request
  emailErrorElement.html("... đang kiểm tra");

  $.post("/ajax/check_user.php", { action: 'check-email', email: email }, function (data) {
      emailErrorElement.html(data);
  });
}

function checkUserCaptcha(captcha) {
  $('#check_user2').html("... đang kiểm tra");
          $.post("/ajax/check_user.php", { action: 'check-captcha', captcha: captcha }, function (data) {
              $('#check_user2').html(data);
          });
}

///chức năng không biết copy trên web

$(document).ready(function(){
  $("#password").change(function(){
    var password = document.getElementById('password').value;
    if (password.length < 6)
    $(".password-call").text("Mật khẩu yếu ! Vui lòng nhập ít nhất 6 ký tự");
    else{
      $(".password-call").text("");
    } 
  });
  $("#repassword").change(function(){
    var repassword = document.getElementById('repassword').value;
    var password = document.getElementById('password').value;
    if (repassword != password)
    $(".repassword-call").text("Mật khẩu không khớp !");
    else{
      $(".repassword-call").text("");
    } 
  });
  $("#full_name").change(function(){
    var full_name = document.getElementById('full_name').value;
    if (full_name.length < 5)
    $(".full_name-call").text("Tên quá ngắn. Bạn cần nhập đầy đủ Họ tên !");
    else{
      $(".full_name-call").text("");
    } 
  });
$("#tel").change(function(){
    var tel = document.getElementById('tel').value;
    if(!$.isNumeric(tel))
    $(".tel-call").text("Mời bạn nhập đúng số điện thoại riêng !");
    else{
      $(".tel-call").text("");
    } 
  });
$("#mobile").change(function(){
    var mobile = document.getElementById('mobile').value;
    if(!$.isNumeric(mobile))
    $(".mobile-call").text("Mời bạn nhập đúng số điện thoại di động!");
    else{
      $(".mobile-call").text("");
    } 
  });
  $("#address").change(function(){
    var address = document.getElementById('address').value;
    if (address.length < 6)
    $(".address-call").text("Mời bạn nhập đúng địa chỉ !");
    else{
      $(".address-call").text("");
    } 
  });

});

// tìm kiếm sảm phẩm
$(document).ready(function () {
  // Xử lý sự kiện khi người dùng nhập vào ô tìm kiếm
  $("#text-search").on("input", function() {
    // Lấy từ khóa tìm kiếm từ ô input
    var keyword = $(this).val().trim().toLowerCase();

    // Kiểm tra nếu từ khóa có ít nhất 2 ký tự
    if (keyword.length >= 2) {
      // Gửi yêu cầu AJAX để lấy dữ liệu từ tệp JSON
      $.getJSON("./assets/data/data.json").done((data) => {
        // Lọc dữ liệu sản phẩm dựa trên từ khóa tìm kiếm
        let searchResults = data.dataProducts.filter(product => 
          product.name.toLowerCase().includes(keyword)
        );

        // Hiển thị kết quả tìm kiếm
        renderSearchResults(searchResults);
      }).fail((error) => {
        console.error("Error loading data:", error);
      });
    } else {
      // Nếu từ khóa có ít hơn 2 ký tự, ẩn kết quả tìm kiếm
      $("#js-seach-result").hide();
    }
  });

  // Hàm hiển thị kết quả tìm kiếm
  function renderSearchResults(results) {
    let searchResultsContainer = $('#js-seach-result');
    searchResultsContainer.empty(); // Xóa dữ liệu cũ trước khi thêm mới

    results.forEach((item) => {
      searchResultsContainer.append(
        `<div class="list" data-id="${item.id}">
          <a href="/card-mang-khong-day-pci-express-asus-pce-ax3000-bulk-tray-vo-carton">
            <img src="${item.img}" alt="${item.name}">
            <span class="info">
              <span class="name">${item.name}</span>
              <span class="price">${item.price.toLocaleString('vi', { style: 'currency', currency: 'vnd' })}</span>
            </span>
          </a>
        </div>`
      );
    });

    // Hiển thị phần tử chứa kết quả tìm kiếm
    searchResultsContainer.show();
  }
});

///thêm sản phẩm từ json
// Sử dụng jQuery hoặc Vanilla JavaScript một cách nhất quán:
$(document).ready(function() {
  let dataProducts = [];

  // Hàm tạo slider cho một class cụ thể
  function createSlider(className) {
      const slides = $(`.${className} .owl-stage`);
      const slide = $(`.${className} .owl-item`);
      const prevBtn = $(`.${className} .owl-prev`);
      const nextBtn = $(`.${className} .owl-next`);

      let slideIndex = 0;
      const slideLength = slide.length;

      let totalWidth = 0; // Tổng chiều rộng của các phần trước slide hiện tại

      // Tính tổng chiều rộng của các phần trước slide hiện tại
      for (let i = 0; i < slideIndex; i++) {
          totalWidth += slide.eq(i).width(); // Không cộng thêm margin-right
      }

      function showSlides() {
          // Check if the slide array is not empty
          if (slide && slide.length > 0) {
              if (slideIndex < 0) {
                  slideIndex = slideLength - 1;
                  totalWidth = 0;
                  for (let i = 0; i < slideLength - 1; i++) {
                      totalWidth += slide.eq(i).width(); // Không cộng thêm margin-right
                  }
              } else if (slideIndex >= slideLength) {
                  slideIndex = 0;
                  totalWidth = 0;
              }

              // Ẩn tất cả các ảnh
              slide.removeClass('active');

              // Hiển thị ảnh tiếp theo
              slide.eq(slideIndex).addClass('active');

              // Thay đổi transform của slides
              slides.css('transform', `translate3d(-${totalWidth}px, 0px, 0px)`);
          }
      }

      function prevSlide() {
          slideIndex--;
          if (slideIndex < 0) {
              slideIndex = slideLength - 1;
              totalWidth = 0;
              for (let i = 0; i < slideLength - 1; i++) {
                  totalWidth += slide.eq(i).width(); // Không cộng thêm margin-right
              }
          } else {
              totalWidth -= slide.eq(slideIndex).width();
          }
          showSlides();
      }

      function nextSlide() {
          slideIndex++;
          if (slideIndex >= slideLength) {
              slideIndex = 0;
              totalWidth = 0;
          } else {
              totalWidth += slide.eq(slideIndex - 1).width();
          }
          showSlides();
      }

      prevBtn.on('click', prevSlide);
      nextBtn.on('click', nextSlide);

      showSlides();

      // Hàm để chuyển đến slide tiếp theo
      function autoNextSlide() {
          nextSlide();
      }

      // Thiết lập interval cho autoNextSlide
      let autoSlideInterval = setInterval(autoNextSlide, 3000); // Chuyển slide mỗi 3 giây (3000 miliseconds)

      // Khi click vào prev hoặc next, bạn muốn dừng auto slide
      prevBtn.on('click', () => {
          clearInterval(autoSlideInterval); // Dừng auto slide
          autoSlideInterval = setInterval(autoNextSlide, 3000); // Bắt đầu lại auto slide
      });

      nextBtn.on('click', () => {
          clearInterval(autoSlideInterval); // Dừng auto slide
          autoSlideInterval = setInterval(autoNextSlide, 3000); // Bắt đầu lại auto slide
      });
  }

  // Lấy dữ liệu sản phẩm từ tệp JSON và gọi hàm renderProduct để hiển thị
  $.getJSON("./assets/data/data.json").done((data) => {
      dataProducts = [...data.dataProducts];
      renderProduct(dataProducts);
  });

  // Hàm hiển thị dữ liệu sản phẩm
  function renderProduct(products) {
      let productsSub = [...products];
      if (localStorage.getItem('sort') !== null) {
          productsSub = returnSort(productsSub, localStorage.getItem('sort'));
      }

      productsSub.forEach((item) => {
          // Tạo một .hover_content_pro riêng cho mỗi sản phẩm
          let hoverContentPro = createHoverContentPro(item);

          $('#featured-cate-1106').append(
              `<div class="owl-item" style="width: 240px;">
                  <div class="p-component item loaded" data-id="${item.id}">
                      <div class="p-icon${item.sku}"></div>
                      <div class="p-img">
                          <a href="./chitietsp.html">
                              <img class="lazy" src="${item.img}" alt="PC Hacom" width="250px" height="230px">
                          </a>
                      </div>
                      <div class="align-items-center d-flex flex-wrap my-2">
                          <a href="" class="align-item-center d-flex">
                              <img src="./assets/img/img-star/star_0.png" alt="rate" class="p-rating loading" style="width: 76px; height: 12px;" data-was-processed="true">
                              <span class="p-count-rating">(0)</span>
                          </a>
                          <p class="p-sku">Mã: ${item.sku}</p>
                      </div>
                      <div class="p-info">
                          <h3 class="p-name">
                              <a href="">${item.name}</a>
                          </h3>
                          <span class="p-mprice">${item.mprice.toLocaleString('vi', { style: 'currency', currency:'vnd'})}</span>
                          <span class="p-discount">(Tiết kiệm:${item.discount}%)</span>
                          <span class="p-price">${item.price.toLocaleString('vi', { style: 'currency', currency:'vnd'})}</span>
                          <span class="p-haskmai">
                              <i class="icons icon-gift"></i>
                          </span>
                      </div>
                      <div class="p-action">
                          <span class="p-qty">
                              <i class="fa fa-check" aria-hidden="true"></i> Sẵn hàng
                          </span>
                          <a href="javascript:void(0)" onclick="listenBuyPro(${item.id}, '${item.img}', '${item.sku}', ${item.price}, ${item.mprice}, '${item.name}', 1);" data-id="${item.id}" class="p-buy js-buyNowAjax"><i class="fa-solid fa-cart-shopping"></i></a>
                      </div>
                  </div>
              </div>`
          );

          // Gắn sự kiện hover vào .p-img của sản phẩm
          attachHoverEvent(item.id, hoverContentPro);
      });
      // Call createSlider after rendering products
      createSlider('product-home');
  }

  // Hàm tạo .hover_content_pro cho từng sản phẩm
  function createHoverContentPro(item) {
      let hoverContentPro = document.createElement('p-component');
      hoverContentPro.classList.add('hover_content_pro');
      hoverContentPro.classList.add('tooltip-2019');

      hoverContentPro.innerHTML = `
          <a href="/pc-hacom-business-mini-p41-r5-4600g-a320-8gb-ram-240gb-ssd" class="hover_name">${item.name}</a>
          <table>
              <tbody>
                  <tr>
                      <td>- Giá bán:</td>
                      <td>
                          <span class="img_price_full">${item.mprice.toLocaleString('vi', { style: 'currency', currency: 'vnd' })}</span>
                      </td>
                  </tr>
                  <tr class="p-extend-minprice">
                      <td>- Giá HACOM:</td>
                      <td class="p-extend-minprice-text">
                          <span class="min_price">${item.price.toLocaleString('vi', { style: 'currency', currency: 'vnd' })}</span>
                          <span class="hover_vat">
                              [Đã bao gồm VAT]
                          </span>
                      </td>
                  </tr>
                  <tr>
                      <td>- Bảo hành:</td>
                      <td>${item.guarantee}</td>
                  </tr>
                  <tr>
                      <td>- Kho hàng:</td>
                      <td>
                          <span class="dongbotonkho js-dongbotonkho dongbotonkho-77020" data-id="${item.id}">
                              <span class="detail " style="color: red; white-space:pre-line;"></span>
                          </span>
                      </td>
                  </tr>
              </tbody>
          </table>
          <span class="tooltip-title"><i class="fa-solid fa-layer-group"></i> Thông số sản phẩm</span>
          <div class="hover_offer ">
              ${item.parameter1}<br>
              ${item.parameter2}<br>
              ${item.parameter3}<br>
              ${item.parameter4}<br>
              ${item.parameter5}<br>
          </div>
      `;

      // Ẩn .hover_content_pro ban đầu
      hoverContentPro.style.display = 'none';

      // Di chuyển .hover_content_pro vào trong body
      document.body.appendChild(hoverContentPro);

      // Khoảng cách giữa con trỏ và .hover_content_pro
      var distance = 10; // Khoảng cách này có thể được điều chỉnh tùy thích

      // Lắng nghe sự kiện mousemove trên cả trang để di chuyển .hover_content_pro theo con trỏ
      document.addEventListener('mousemove', function(event) {
          var hoverContentWidth = hoverContentPro.offsetWidth; // Lấy chiều rộng của .hover_content_pro
          var hoverContentHeight = hoverContentPro.offsetHeight; // Lấy chiều cao của .hover_content_pro
          var windowWidth = window.innerWidth; // Lấy chiều rộng của cửa sổ trình duyệt

          // Tính toán vị trí left mới của .hover_content_pro
          var newLeft = event.clientX;

          // Xác định xem con trỏ ở nửa màn hình bên nào
          if (newLeft < windowWidth / 2) {
              // Nếu con trỏ ở nửa bên trái, hiển thị .hover_content_pro bên phải con trỏ
              hoverContentPro.style.left = event.clientX + distance + 'px';
          } else {
              // Nếu con trỏ ở nửa bên phải, hiển thị .hover_content_pro bên trái con trỏ
              hoverContentPro.style.left = event.clientX - hoverContentWidth - distance + 'px';
          }

          // Tính toán vị trí top mới của .hover_content_pro để nằm ngang hàng với con trỏ và giữa hình ảnh
          var newTop = event.clientY - hoverContentHeight; // Đặt .hover_content_pro ở giữa hình ảnh

          // Đảm bảo rằng .hover_content_pro không vượt ra ngoài phần visible của trang
          if (newTop < 0) {
              newTop = 0; // Nếu vị trí top nhỏ hơn 0, đặt lại thành 0 để nằm ở đầu trang
          }

          // Thiết lập vị trí top mới của .hover_content_pro
          hoverContentPro.style.top = newTop + 'px';
      });

      return hoverContentPro;
  }

  // Hàm gắn sự kiện hover cho .p-img của từng sản phẩm
  function attachHoverEvent(productId, hoverContentPro) {
      var pImgElement = $(`[data-id="${productId}"] .p-img`);

      pImgElement.on('mouseenter', function(event) {
          // Hiển thị .hover_content_pro khi hover vào phần tử .p-img của sản phẩm
          hoverContentPro.style.display = 'block';

          // Thiết lập vị trí ban đầu của .hover_content_pro với khoảng cách giữa con trỏ
          var initialLeft = event.clientX;
          var initialTop = event.clientY;

          hoverContentPro.style.left = initialLeft + 'px';
          hoverContentPro.style.top = initialTop + 'px';
      });

      pImgElement.on('mouseleave', function(event) {
          // Ẩn .hover_content_pro khi rời khỏi phần tử .p-img của sản phẩm
          hoverContentPro.style.display = 'none';
      });
  }

  //slide-home/////////////////////////////////////////////
  // Hàm tạo slider cho một class cụ thể
  function createSlider(className) {
      const slides = $(`.${className} .owl-stage`);
      const slide = $(`.${className} .owl-item`);
      const prevBtn = $(`.${className} .owl-prev`);
      const nextBtn = $(`.${className} .owl-next`);

      let slideIndex = 0;
      const slideLength = slide.length;

      let totalWidth = 0; // Tổng chiều rộng của các phần trước slide hiện tại

      // Tính tổng chiều rộng của các phần trước slide hiện tại
      for (let i = 0; i < slideIndex; i++) {
          totalWidth += slide.eq(i).width(); // Không cộng thêm margin-right
      }

      function showSlides() {
          // Check if the slide array is not empty
          if (slide && slide.length > 0) {
              if (slideIndex < 0) {
                  slideIndex = slideLength - 1;
                  totalWidth = 0;
                  for (let i = 0; i < slideLength - 1; i++) {
                      totalWidth += slide.eq(i).width(); // Không cộng thêm margin-right
                  }
              } else if (slideIndex >= slideLength) {
                  slideIndex = 0;
                  totalWidth = 0;
              }

              // Ẩn tất cả các ảnh
              slide.removeClass('active');

              // Hiển thị ảnh tiếp theo
              slide.eq(slideIndex).addClass('active');

              // Thay đổi transform của slides
              slides.css('transform', `translate3d(-${totalWidth}px, 0px, 0px)`);
          }
      }

      function prevSlide() {
          slideIndex--;
          if (slideIndex < 0) {
              slideIndex = slideLength - 1;
              totalWidth = 0;
              for (let i = 0; i < slideLength - 1; i++) {
                  totalWidth += slide.eq(i).width(); // Không cộng thêm margin-right
              }
          } else {
              totalWidth -= slide.eq(slideIndex).width();
          }
          showSlides();
      }

      function nextSlide() {
          slideIndex++;
          if (slideIndex >= slideLength) {
              slideIndex = 0;
              totalWidth = 0;
          } else {
              totalWidth += slide.eq(slideIndex - 1).width();
          }
          showSlides();
      }

      prevBtn.on('click', prevSlide);
      nextBtn.on('click', nextSlide);

      showSlides();

      // Hàm để chuyển đến slide tiếp theo
      function autoNextSlide() {
          nextSlide();
      }

      // Thiết lập interval cho autoNextSlide
      let autoSlideInterval = setInterval(autoNextSlide, 3000); // Chuyển slide mỗi 3 giây (3000 miliseconds)

      // Khi click vào prev hoặc next, bạn muốn dừng auto slide
      prevBtn.on('click', () => {
          clearInterval(autoSlideInterval); // Dừng auto slide
          autoSlideInterval = setInterval(autoNextSlide, 3000); // Bắt đầu lại auto slide
      });

      nextBtn.on('click', () => {
          clearInterval(autoSlideInterval); // Dừng auto slide
          autoSlideInterval = setInterval(autoNextSlide, 3000); // Bắt đầu lại auto slide
      });
  }
});

// Khai báo một mảng để lưu thông tin sản phẩm đã mua
let cartItems = [];
let totalQuantity = 0; // Khai báo và khởi tạo biến totalQuantity
// Định nghĩa hàm listenBuyPro
function listenBuyPro(id, img, sku, price, mprice, name, quantity) {
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    var existingItem = cartItems.find(item => item.id === id);

    if (existingItem) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng của sản phẩm đó lên
        existingItem.quantity += quantity;

        // Hiển thị thông báo trong console
        console.log("Đã nhấn vào nút mua hàng với ID:", id, "Tên sản phẩm:", name, "Số lượng:", existingItem.quantity);
    } else {
        // Nếu sản phẩm chưa tồn tại, thêm một mục mới vào giỏ hàng
        cartItems.push({
            id: id,
            img: img,
            sku: sku,
            price: price,
            mprice: mprice,
            name: name,
            quantity: quantity
        });

        // Hiển thị thông báo trong console
        console.log("Đã nhấn vào nút mua hàng với ID:", id, "Tên sản phẩm:", name, "Số lượng:", quantity);
    }

    // Tăng tổng số lượng lên
    totalQuantity += quantity;

    // Tăng số lượng hiển thị lên
    var quantityElement = document.querySelector('.buy-quantity'); // Lấy phần tử chứa số lượng
    if (quantityElement) {
        var currentQuantity = parseInt(quantityElement.value); // Lấy số lượng hiện tại và chuyển đổi sang số nguyên
        if (!isNaN(currentQuantity)) { // Kiểm tra nếu số lượng hiện tại là một số
            var newQuantity = currentQuantity + quantity; // Tăng số lượng
            quantityElement.value = newQuantity; // Gán số lượng mới vào phần tử
            quantityElement.setAttribute('value', newQuantity); // Cập nhật giá trị hiển thị của số lượng
        }
    }

    // Lưu mảng cartItems vào LocalStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}



