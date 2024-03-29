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
//slide-home/////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    // Hàm tạo slider cho một class cụ thể
    function createSlider(className) {
      const slides = document.querySelector(`.${className} .owl-stage`);
      const slide = document.querySelectorAll(`.${className} .owl-item`);
      const prevBtn = document.querySelector(`.${className} .owl-prev`);
      const nextBtn = document.querySelector(`.${className} .owl-next`);
  
      let slideIndex = 0;
      const slideLength = slide.length;
  
      let totalWidth = 0; // Tổng chiều rộng của các phần trước slide hiện tại
  
      // Tính tổng chiều rộng của các phần trước slide hiện tại
      for (let i = 0; i < slideIndex; i++) {
        totalWidth += slide[i].offsetWidth; // Không cộng thêm margin-right
      }
  
      function showSlides() {
        if (slideIndex < 0) {
          slideIndex = slideLength - 1;
          totalWidth = 0;
          for (let i = 0; i < slideLength - 1; i++) {
            totalWidth += slide[i].offsetWidth; // Không cộng thêm margin-right
          }
        } else if (slideIndex >= slideLength) {
          slideIndex = 0;
          totalWidth = 0;
        }
  
        // Ẩn tất cả các ảnh
        slide.forEach((item) => {
          item.classList.remove('active');
        });
  
        // Hiển thị ảnh tiếp theo
        slide[slideIndex].classList.add('active');
  
        // Thay đổi transform của slides
        slides.style.transform = `translate3d(-${totalWidth}px, 0px, 0px)`;
      }
  
      function prevSlide() {
        slideIndex--;
        if (slideIndex < 0) {
          slideIndex = slideLength - 1;
          totalWidth = 0;
          for (let i = 0; i < slideLength - 1; i++) {
            totalWidth += slide[i].offsetWidth; // Không cộng thêm margin-right
          }
        } else {
          totalWidth -= slide[slideIndex].offsetWidth;
        }
        showSlides();
      }
  
      function nextSlide() {
        slideIndex++;
        if (slideIndex >= slideLength) {
          slideIndex = 0;
          totalWidth = 0;
        } else {
          totalWidth += slide[slideIndex - 1].offsetWidth;
        }
        showSlides();
      }
  
      prevBtn.addEventListener('click', prevSlide);
      nextBtn.addEventListener('click', nextSlide);
  
      showSlides();
  
      // Hàm để chuyển đến slide tiếp theo
      function autoNextSlide() {
        nextSlide();
      }
  
      // Thiết lập interval cho autoNextSlide
      let autoSlideInterval = setInterval(autoNextSlide, 3000); // Chuyển slide mỗi 3 giây (3000 miliseconds)
  
      // Khi click vào prev hoặc next, bạn muốn dừng auto slide
      prevBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval); // Dừng auto slide
        autoSlideInterval = setInterval(autoNextSlide, 3000); // Bắt đầu lại auto slide
      });
  
      nextBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval); // Dừng auto slide
        autoSlideInterval = setInterval(autoNextSlide, 3000); // Bắt đầu lại auto slide
      });
    }
  
    // Tạo slider cho mỗi class cụ thể
    createSlider('slider-product');
    createSlider('slider-product1');
    createSlider('slider-product2');
    createSlider('slider-product3');
    createSlider('product-home');
    createSlider('homepage-slider-big');
    // createSlider('cate-content');
    createSlider('hacom-customer-slider');
    // Thêm các slider khác nếu cần
  });
  


// tìm kiếm sảm phẩm

$(document).ready(function() {
  // Xử lý sự kiện khi người dùng nhập vào ô tìm kiếm
  $("#text-search").on("input", function() {
      // Lấy từ khóa tìm kiếm từ ô input
      var keyword = $(this).val().trim();

      // Kiểm tra nếu từ khóa có ít nhất 2 ký tự
      if (keyword.length >= 2) {
          // Hiển thị kết quả tìm kiếm
          $("#js-seach-result").show();
          // Tạm thời ẩn tất cả các sản phẩm hiện có trong ô kết quả
          $("#js-seach-result .list").hide();
          // Tìm kiếm các sản phẩm có tên chứa từ khóa và hiển thị chúng
          $("#js-seach-result .list").filter(function() {
              return $(this).text().toLowerCase().indexOf(keyword.toLowerCase()) > -1;
          }).show();
      } else {
          // Nếu từ khóa có ít hơn 2 ký tự, ẩn kết quả tìm kiếm
          $("#js-seach-result").hide();
      }
  });

  // Ẩn kết quả tìm kiếm khi tải trang
  $("#js-seach-result").hide();
});

///hover-pro
document.addEventListener("DOMContentLoaded", function() {
  var pImgElements = document.querySelectorAll('.p-img'); // Chọn tất cả các phần tử .p-img

  var hoverContentPro = document.querySelector('.hover_content_pro'); // Chọn .hover_content_pro

  // Di chuyển .hover_content_pro vào trong body
  document.body.appendChild(hoverContentPro);

  // Ẩn .hover_content_pro ban đầu
  hoverContentPro.style.display = 'none';

  // Lưu trữ vị trí top ban đầu của .hover_content_pro
  var initialTop = hoverContentPro.offsetTop;

  // Lưu trữ vị trí left ban đầu của .hover_content_pro
  var initialLeft = hoverContentPro.offsetLeft;

  // Khoảng cách giữa con trỏ và .hover_content_pro
  var distance = -8;

  // Lắng nghe sự kiện mousemove trên cả trang để di chuyển .hover_content_pro theo con trỏ
  document.addEventListener('mousemove', function(event) {
      var hoverContentWidth = hoverContentPro.offsetWidth; // Lấy chiều rộng của .hover_content_pro
      var hoverContentHeight = hoverContentPro.offsetHeight; // Lấy chiều cao của .hover_content_pro
      var windowWidth = window.innerWidth; // Lấy chiều rộng của cửa sổ trình duyệt

      // Tính toán vị trí left mới của .hover_content_pro
      var newLeft = event.clientX;

      // Kiểm tra nếu vị trí left mới vượt quá biên phải của cửa sổ trình duyệt, thì đặt lại vị trí left cho .hover_content_pro
      if (newLeft + hoverContentWidth > windowWidth) {
          newLeft = windowWidth - hoverContentWidth;
      } else if (newLeft < 0) { // Kiểm tra nếu vị trí left mới vượt quá biên trái của cửa sổ trình duyệt, thì đặt lại vị trí left cho .hover_content_pro
          newLeft = 0;
      } else if (windowWidth - newLeft < windowWidth / 2) { // Kiểm tra nếu vị trí left mới cách nửa màn hình bên phải của cửa sổ trình duyệt
          // Đặt lại vị trí left của .hover_content_pro để nó di chuyển sang bên phải của con trỏ
          newLeft = event.clientX + distance;
      }

      // Thiết lập vị trí left của .hover_content_pro với khoảng cách giữa con trỏ
      hoverContentPro.style.left = newLeft - initialLeft - distance + 'px';

      // Tính toán vị trí right mới của .hover_content_pro
      var newRight = windowWidth - (newLeft - initialLeft) - hoverContentWidth;

      // Kiểm tra nếu vị trí right mới vượt quá biên phải của cửa sổ trình duyệt, thì điều chỉnh vị trí left
      if (newRight > windowWidth) {
          hoverContentPro.style.left = windowWidth - hoverContentWidth - initialLeft + 'px';
      }

      // Thiết lập vị trí top của .hover_content_pro với giá trị top ban đầu và khoảng cách giữa con trỏ
      hoverContentPro.style.top = initialTop - distance + 'px';
  });

  pImgElements.forEach(function(element) {
      element.addEventListener('mouseenter', function(event) {
          // Hiển thị .hover_content_pro khi hover vào phần tử .p-img
          hoverContentPro.style.display = 'block';

          // Thiết lập vị trí ban đầu của .hover_content_pro với khoảng cách giữa con trỏ
          hoverContentPro.style.left = event.clientX - initialLeft - distance + 'px';
          hoverContentPro.style.top = initialTop - distance + 'px';
      });

      element.addEventListener('mouseleave', function(event) {
          // Ẩn .hover_content_pro khi rời khỏi phần tử .p-img
          hoverContentPro.style.display = 'none';
      });
  });
});

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


























