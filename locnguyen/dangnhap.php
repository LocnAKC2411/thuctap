<?php
session_start();
include "config.php";
if(isset($_POST['dangnhap'])) {
    $username = $_POST['hoten'];
    $password = $_POST['matkhau'];
    
    // Truy vấn kiểm tra trong bảng 'taikhoan'
    $sql_taikhoan = "SELECT * FROM taikhoan WHERE hovaten=? AND matkhau=? LIMIT 1";
    $stmt_taikhoan = mysqli_prepare($mysqli, $sql_taikhoan);
    
    mysqli_stmt_bind_param($stmt_taikhoan, "ss", $username, $password);
    
    mysqli_stmt_execute($stmt_taikhoan);
    
    $result_taikhoan = mysqli_stmt_get_result($stmt_taikhoan);
    
    // Truy vấn kiểm tra trong bảng 'users'
    $sql_users = "SELECT * FROM users WHERE full_name=? AND password=? LIMIT 1";
    $stmt_users = mysqli_prepare($mysqli, $sql_users);
    
    mysqli_stmt_bind_param($stmt_users, "ss", $username, $password);
    
    mysqli_stmt_execute($stmt_users);
    
    $result_users = mysqli_stmt_get_result($stmt_users);
    
    // Kiểm tra kết quả từ hai truy vấn
    if(mysqli_num_rows($result_taikhoan) > 0 || mysqli_num_rows($result_users) > 0) {
        $_SESSION['dangnhap'] = $username;
        header("Location: dangnhapthanhcong.php");
        exit();
    } else {
        header("Location: dangnhap.php");
        exit();
    }
}
?>

<?php include 'header.php'; ?>
  <body>
    <!-- header -->
      <?php include 'body.php'; ?>
      <!-- body -->
    <div class=" body-new">
      <div class="cate-top border-0">
        <div class="grid wide">
            <div class="border-form form-regis form-regis2">
                <form action="dangnhap.php" method="post" name="loginForm" enctype="multipart/form-data" data-gtm-form-interact-id="0">
                    <!--important-->
                    <input type="hidden" id="return_url" name="return_url" value="/taikhoan?view=account-info">
                    <div class="login-row">
                        <div class="new-header">
                            <h1>Đăng nhập</h1>
                        </div>
                       <div id="login_col">
                            <!-- khi đăng nhập sai -->
                            <div class="form-group">
                                <div class="col-12">
                                <label></label>
                                <p style="color:#F00; font-size:14px"></p>
                                </div>
                            </div>
                            <input type="hidden" name="login" id="login" value="yes">
                            <div class="form-group">
                                <div class="col-12">
                                    <label>Họ và tên </label>
                                    <input type="text" size="25" name="hoten" id="hoten" data-gtm-form-interact-field-id="0">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-12">
                                    <label>Mật khẩu</label>
                                    <input type="password" size="25" name="matkhau" id="password" data-gtm-form-interact-field-id="1">
                                </div>
                            </div>
                          </div>
                          <div class="form-group">
                              <div class="col-12">
                                  <label></label>
                                  <div class="d-inline">
                                      <div class="h-captcha" data-sitekey="bc1811fd-524f-40e9-b919-1b815fa96d72"></div>
                                  </div>
                              </div>
                          </div>
                            <div class="form-group">
                                <div class="col-12">
                                    <label></label>
                                    <input id="btn_reg" type="submit"  name= "dangnhap" value="Đăng nhập" class="reg-button">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-12">
                                    <label></label>
                                    <div class="login_right_button">
                                        <a href="./dangky.php" class="button_reg">Đăng ký</a>
                                        <a href="./quenmk.php" class="button_reg">Quên mật khẩu?</a>
                                    </div>
                                </div>
                            </div>
                            <script>
                                let CURRENT_DOMAIN = 'https://hacom.vn';
                                    function open_oauth(service){
                                        window.open("/oauth/login.php?service="+service+"&return_url="+CURRENT_DOMAIN, "Dang nhap", "width=600, height=500");
                                    }
                            </script>
                            <div class="form-group">
                                <div class="col-12">
                                    <label></label>
                                    <div class="login_right">
                                <a href="javascript:open_oauth('Google')">
                                    <div class="social-login-btn btn-google">
                                    <div class="social-login-icon"><i class="fab fa-google"></i></div>
                                    <div class="social-login-txt">Đăng nhập bằng Google</div>
                                    </div>
                                </a>
                                <a href="javascript:open_oauth('Facebook')">
                                    <div class="social-login-btn btn-facebook">
                                    <div class="social-login-icon"><i class="fab fa-facebook-f"></i></div>
                                    <div class="social-login-txt">Đăng nhập bằng Faceook</div>
                                    </div>
                                </a>
                                <!--<a href="javascript:open_oauth('Zalo')">
                                    <div class="social-login-btn btn-zalo">
                                    <div class="social-login-icon"><i class="fas fa-comment"></i></div>
                                    <div class="social-login-txt">Đăng nhập bằng Zalo</div>
                                    </div>
                                </a>-->
                            </div>
                                </div>
                            </div>
                       </div>
                       <!--login_col-->
                    </div>
                    <!--row-->
                </form>
            </div>
        </div>
      </div>
      <div></div>
    </div>
    <div class="space2"></div>
      <div class="ft-content">
        <!--Cắt file để cho gọn và gọi nó vào đây-->
        <?php include'content.php' ?>
        <?php include'footer.php' ?>