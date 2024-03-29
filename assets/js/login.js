///hiện thị đangki/ddangnhap 
document.addEventListener("DOMContentLoaded", function() {
    // Lấy tham chiếu đến phần tử a có id "show-login"
    var showLoginLink = document.getElementById("show-login");
  
    // Lấy tham chiếu đến phần tử a có id "show-register"
    var showRegisterLink = document.getElementById("show-register");
  
    // Lấy tham chiếu đến phần tử overlay
    var overlay = document.getElementById("overlay");
  
    // Lấy tham chiếu đến phần tử đóng cửa sổ
    var closePopup = document.querySelectorAll(".popup-login-phone .close-pop-plp");

    // Lấy tham chiếu đến phần tử liên kết "Đăng nhập bằng email"
    var loginWithEmailLink = document.querySelector(".login-with-email-plp a");

    // Lấy tham chiếu đến các phần tử popup đăng nhập
    var loginPopup = document.querySelector(".popup-login-phone.js-popup-login-phone.popup-login-phone-b1");
    var loginByEmailPopup = document.querySelector(".popup-login-phone.popup-login-phone1.js-popup-login-phone.popup-login-phone-b1");

    // Sự kiện click vào liên kết "Đăng nhập"
    showLoginLink.addEventListener("click", function() {
        // Hiển thị overlay
        overlay.style.display = "block";

        // Lấy tham chiếu đến phần tử popup login
        var popupLogin = document.querySelector(".js-popup-login-phone");

        // Thêm class "active" để hiển thị popup login
        popupLogin.classList.add("active");
    });

    // Sự kiện click vào liên kết "Đăng ký"
    showRegisterLink.addEventListener("click", function() {
        // Hiển thị overlay
        overlay.style.display = "block";

        // Lấy tham chiếu đến phần tử popup đăng ký
        var popupRegister = document.querySelector(".popup-login-phone.js-popup-register-phone");

        // Thêm class "active" để hiển thị popup đăng ký
        popupRegister.classList.add("active");
    });

    // Sự kiện click vào nút đóng cửa sổ
    closePopup.forEach(function(closeBtn) {
        closeBtn.addEventListener("click", function() {
            // Ẩn overlay
            overlay.style.display = "none";
        
            // Lấy tham chiếu đến phần tử popup login
            var popupLogin = document.querySelector(".js-popup-login-phone");
            var popupRegister = document.querySelector(".popup-login-phone.js-popup-register-phone");
        
            // Loại bỏ class "active" để ẩn popup login và popup đăng ký
            popupLogin.classList.remove("active");
            popupRegister.classList.remove("active");
        });
    });

    // Sự kiện click vào liên kết "Đăng nhập bằng email"
    loginWithEmailLink.addEventListener("click", function(event) {
        // Ngăn chặn hành động mặc định của liên kết
        event.preventDefault();

        // Hiển thị popup đăng nhập bằng email
        loginByEmailPopup.classList.add("active");

        // Ẩn popup đăng nhập thông thường
        loginPopup.classList.remove("active");
    });

    // Sự kiện click vào nút "Quay lại"
    var backButton = document.querySelector(".popup-login-phone-pd.b3.b7 .back-page-plp a");

    // Lắng nghe sự kiện click vào nút "Quay lại"
    backButton.addEventListener("click", function(event) {
        // Ngăn chặn hành động mặc định của nút
        event.preventDefault();

        // Ẩn popup đăng nhập bằng email
        loginByEmailPopup.classList.remove("active");

        // Hiển thị lại popup đăng nhập thông thường
        loginPopup.classList.add("active");
    });
    
    // Sự kiện click vào nút đóng cửa sổ trong popup-login-phone1
    var closePopup1 = document.querySelector(".popup-login-phone1 .close-pop-plp");
    closePopup1.addEventListener("click", function() {
        // Ẩn overlay
        overlay.style.display = "none";
    
        // Loại bỏ class "active" để ẩn popup đăng nhập bằng email
        loginByEmailPopup.classList.remove("active");
    });

    // Sự kiện click vào liên kết "Quên mật khẩu?"
    var forgotPasswordLink = document.querySelector(".forgot-password-plp a");
    forgotPasswordLink.addEventListener("click", function(event) {
        // Ngăn chặn hành động mặc định của liên kết
        event.preventDefault();

        // Hiển thị popup quên mật khẩu
        var forgotPasswordPopup = document.querySelector(".popup-login-phone2.js-popup-login-phone.popup-login-phone-b1");
        forgotPasswordPopup.classList.add("active");

        // Lấy tham chiếu đến nút đóng trong popup-login-phone2
        var closePopup2 = document.querySelector(".popup-login-phone2 .close-pop-plp");
        closePopup2.addEventListener("click", function() {
            // Ẩn overlay
            overlay.style.display = "none";

            // Loại bỏ class "active" để ẩn popup quên mật khẩu
            forgotPasswordPopup.classList.remove("active");
        });
    });

    // Sự kiện click vào nút "Quay lại" trong popup-login-phone2
    var backButtonForgotPopup = document.querySelector(".popup-login-phone2 .back-page-plp a");
    backButtonForgotPopup.addEventListener("click", function(event) {
        // Ngăn chặn hành động mặc định của nút
        event.preventDefault();

        // Ẩn popup quên mật khẩu
        var forgotPasswordPopup = document.querySelector(".popup-login-phone2.js-popup-login-phone.popup-login-phone-b1");
        forgotPasswordPopup.classList.remove("active");
    });
});


///// Hàm xử lý khi người dùng nhấn nút "Tiếp tục" trong popup-login-phone-b1
function loginWidthPhone() {
    // Get the phone number input value
    var phoneNumber = $("#js-phone-login-number").val();

    // Clear previous error messages
    $("#js-note-phone-b1").text("");

    // Validate phone number
    if (phoneNumber === "") {
        $("#js-note-phone-b1").text("Bạn chưa nhập số điện thoại");
    } else if (!isValidPhoneNumber(phoneNumber)) {
        $("#js-note-phone-b1").text("Số điện thoại chưa chính xác");
    } else {
        // Validation passed, hide popup-login-phone0 and show popup-login-phone3
        $(".popup-login-phone0").removeClass("active");
        $(".popup-login-phone3").addClass("active");

        // Display phone number in popup-login-phone3
        $("#js-phone-send-code").text(phoneNumber);
    }
}

// Function to check if the phone number is valid (you can customize this function based on your validation criteria)
function isValidPhoneNumber(phoneNumber) {
    // Sample validation: Check if it contains only numeric characters and has a specific length
    return /^\d+$/.test(phoneNumber) && phoneNumber.length === 10;
}

// Hàm xử lý khi người dùng nhấn vào nút "Quay lại" trong popup-login-phone3
function plpBackPage(page) {
    // Kiểm tra nếu đang ở trang popup-login-phone3
    if (page === 'b1.1') {
        // Ẩn popup-login-phone3 và hiển thị popup-login-phone0
        $(".popup-login-phone3").removeClass("active");
        $(".popup-login-phone0").addClass("active");
    }
}

// Hàm xử lý khi người dùng nhấn vào nút đóng trong popup-login-phone3
function closePopup3() {
    // Ẩn popup-login-phone3
    $(".popup-login-phone3").removeClass("active");
}


//chuc nang email
function submitFormPlp() {
    // Lấy giá trị email và mật khẩu từ các input
    var email = document.querySelector(".input-plp-2").value;
    var password = document.getElementById("js-plp-pass-1").value;
    
    // Lấy giá trị h-captcha
    var captchaResponse = hcaptcha.getResponse();
    
    // Lấy tham chiếu đến các thẻ span chứa thông báo lỗi
    var errorEmail = document.getElementById("js-note-error-plp-email");
    var errorPassword = document.getElementById("js-note-error-plp-pass");
    var errorCaptcha = document.getElementById("check_user2");
    
    // Biến kiểm tra xem người dùng đã nhấn nút đăng nhập hay chưa
    var isSubmitted = false;

    // Xóa thông báo lỗi trước khi kiểm tra lại
    errorEmail.textContent = "";
    errorPassword.textContent = "";
    errorCaptcha.textContent = "";

    // Kiểm tra xem người dùng đã điền đầy đủ thông tin và nhấn nút đăng nhập hay chưa
    if (email !== "" && isValidEmail(email) && password !== "") {
        isSubmitted = true;
    }

    // Kiểm tra xem email, mật khẩu và h-captcha có được nhập hay không
    if (email === "") {
        // Hiển thị thông báo lỗi nếu email không được nhập
        errorEmail.textContent = "Bạn chưa nhập email.";
    } else if (!isValidEmail(email)) { // Thêm điều kiện kiểm tra định dạng email
        // Hiển thị thông báo lỗi nếu email không hợp lệ
        errorEmail.textContent = "Email không hợp lệ.";
    }
    
    if (password === "") {
        // Hiển thị thông báo lỗi nếu mật khẩu không được nhập
        errorPassword.textContent = "Bạn chưa nhập mật khẩu.";
    }

    // Nếu người dùng chưa nhập đủ thông tin và nhấn nút đăng nhập
    if (!isSubmitted) {
        // Dừng và không thực hiện tiếp tục
        return;
    }
    
    // Nếu người dùng đã điền đầy đủ thông tin và nhấn nút đăng nhập
    if (isSubmitted) {
        // Nếu cả email, mật khẩu và h-captcha đều được nhập, có thể tiến hành đăng nhập
        if (captchaResponse !== "") {
            // Thực hiện đăng nhập, ví dụ: gửi request đến server để xác thực thông tin đăng nhập
            console.log("Đăng nhập thành công với email:", email, "và mật khẩu:", password);
        } else {
            // Hiển thị thông báo lỗi nếu h-captcha chưa được điền
            errorCaptcha.textContent = "Thông tin chưa chính xác.";
        }
    }
}




 // Hàm kiểm tra định dạng email
function isValidEmail(email) {
    // Sử dụng biểu thức chính quy để kiểm tra định dạng email
    var emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
}

///chuc nang quen mat khau
function submitForgotPassEmail() {
    var email = document.getElementById("js-plp-forgot-pass").value;
    var errorEmail = document.getElementById("js-note-error-plp-forgotpass");

    // Kiểm tra xem email có đúng không
    if (!isValidEmail(email)) {
        errorEmail.textContent = "Bạn chưa nhập Email";
    } else {
        errorEmail.textContent = "";
    }
    // Thêm các điều kiện kiểm tra khác (như captcha) ở đây
}












