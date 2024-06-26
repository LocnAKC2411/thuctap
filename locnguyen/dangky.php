<?php
include 'header.php';
session_start();
include "config.php";

// Xử lý dữ liệu từ form và chèn vào cơ sở dữ liệu
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_name = $_POST['info']['name'];
    $email = $_POST['info']['email'];
    $mobile = $_POST['info']['mobile'];
    $password = $_POST['info']['password'];
    $gender = $_POST['info']['sex'];
    $birthday = $_POST['info']['birthday'] . '/' . $_POST['info']['birthmonth'] . '/' . $_POST['info']['birthyear'];
    $address = $_POST['info']['address'];
    $province = $_POST['info']['province'];

    // Tạo câu truy vấn SQL
    $sql = "INSERT INTO users (full_name, email, mobile, password, gender, birthday, address, province) VALUES ('$full_name', '$email', '$mobile', '$password', '$gender', '$birthday', '$address', '$province')";

    // Thực thi câu truy vấn
    if (mysqli_query($mysqli, $sql)) {
        // Chuyển hướng đến trang index.php sau khi đăng ký thành công
        header("Location: dangnhapthanhcong.php");
        exit(); // Đảm bảo không có mã HTML hoặc mã PHP tiếp theo được thực thi sau khi chuyển hướng
    } else {
        echo "Lỗi: " . $sql . "<br>" . mysqli_error($conn);
    }
}
?>

<?php include 'header.php'; ?>
  <body>
    <!-- header -->
      <?php include 'body.php'; ?>
      <!-- body -->
    <div class=" body-new">
      <div id="content">
        <div class="grid wide">
            <div style="clear:both"></div>
            <div class="border-form form-regis">
                <form method="post" action="dangky.php" enctype="multipart/form-data" onsubmit="return check_field_regis();" data-gtm-form-interact-id="0">
                    <div class="row2">
                       <div class="col-lg-6 left-side">
                          <div class="new-header">
                             <h1>Đăng ký</h1>
                             <div class="new-info">
                                <p>Đăng ký tài khoản để dễ dàng mua hàng, bình luận, đánh giá sản phẩm trên website HACOM!</p>
                                <p>Bạn cũng có thể</p>
                                <p><i class="fa-solid fa-angles-down" style="font-size:24px;color:red"></i></p>
                             </div>
                          </div>
                          <div class="regist_right">
                             <a href="/dang-nhap">
                                <div class="social-login-btn btn-hnc">
                                   <div class="social-login-txt">Đăng nhập</div>
                                </div>
                             </a>
                             <a href="javascript:open_oauth('Google')">
                                <div class="social-login-btn btn-google">
                                   <div class="social-login-icon"><i class="fab fa-google"></i></div>
                                   <div class="social-login-txt">Đăng ký bằng Google</div>
                                </div>
                             </a>
                             <a href="javascript:open_oauth('Facebook')">
                                <div class="social-login-btn btn-facebook">
                                   <div class="social-login-icon"><i class="fab fa-facebook-f"></i></div>
                                   <div class="social-login-txt">Đăng ký bằng Faceook</div>
                                </div>
                             </a>
                             <a href="javascript:open_oauth('Zalo')">
                                <div class="social-login-btn btn-zalo">
                                   <div class="social-login-icon"><i class="fas fa-comment"></i></div>
                                   <div class="social-login-txt">Đăng ký bằng Zalo</div>
                                </div>
                             </a>
                          </div>
                          <!--regis-right-->
                       </div>
                       <!--col-6-->
                       <div class="col-lg-6">
                            <div class="form-group">
                                <div class="col-12">
                                    <label>Họ tên</label>
                                    <input type="text" class="inputText" size="50" name="info[name]" width="100%" id="full_name"> 
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-12">
                                    <label>Email</label>
                                    <input type="text" name="info[email]" id="email" class="boxInput" onchange="check_user_email(this.value)" width="100%" value="" data-gtm-form-interact-field-id="0">
                                </div>
                                <div class="col-12">
                                    <label></label>
                                    <span id="check_user"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-12">
                                    <label>Số điện thoại</label>
                                    <input type="text" class="inputText" size="20" name="info[mobile]" width="100%" id="mobile">
                                    <span style="color: #ff0000;" class="mobile-call"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-12">
                                    <label>Mật khẩu</label>
                                    <input type="password" class="inputText" size="50" name="info[password]" width="100%" id="password" data-gtm-form-interact-field-id="1">
                                    <span class="password-call" style="color: #ff0000;"></span>
                                </div>
                            </div>
                          <!--<div class="form-group">
                             <div class="col-12">
                               <label>Nhập lại mật khẩu</label>
                                 <input type="password" name="info[password1]" id="password1" class="inputText" width="100%" size="20" />
                                 </div>
                               <span id="check_captcha" style="color: #ff0000;"></span>
                             </div>-->
                            <div class="form-group gender">
                                <div class="col-12">
                                    <label>Giới tính</label>
                                    Nam<input type="radio" class="sex" name="info[sex]" value="male">
                                    Nữ<input type="radio" class="sex" name="info[sex]" value="female">
                                </div>
                            </div>
                            <div class="form-group birthday">
                                <div class="col-12">
                                    <label>Ngày sinh</label>
                                    <select name="info[birthday]" style="width:100px; float:left; margin-right:10px;">
                                    <option value="0">Ngày</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                    </select>
                                    <select name="info[birthmonth]" style="width:100px; float:left; margin-right:10px;">
                                    <option value="0">Tháng</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    </select>
                                    <select name="info[birthyear]" style="width:100px; float:left;">
                                    <option value="0">Năm</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                    <option value="2015">2015</option>
                                    <option value="2014">2014</option>
                                    <option value="2013">2013</option>
                                    <option value="2012">2012</option>
                                    <option value="2011">2011</option>
                                    <option value="2010">2010</option>
                                    <option value="2009">2009</option>
                                    <option value="2008">2008</option>
                                    <option value="2007">2007</option>
                                    <option value="2006">2006</option>
                                    <option value="2005">2005</option>
                                    <option value="2004">2004</option>
                                    <option value="2003">2003</option>
                                    <option value="2002">2002</option>
                                    <option value="2001">2001</option>
                                    <option value="2000">2000</option>
                                    <option value="1999">1999</option>
                                    <option value="1998">1998</option>
                                    <option value="1997">1997</option>
                                    <option value="1996">1996</option>
                                    <option value="1995">1995</option>
                                    <option value="1994">1994</option>
                                    <option value="1993">1993</option>
                                    <option value="1992">1992</option>
                                    <option value="1991">1991</option>
                                    <option value="1990">1990</option>
                                    <option value="1989">1989</option>
                                    <option value="1988">1988</option>
                                    <option value="1987">1987</option>
                                    <option value="1986">1986</option>
                                    <option value="1985">1985</option>
                                    <option value="1984">1984</option>
                                    <option value="1983">1983</option>
                                    <option value="1982">1982</option>
                                    <option value="1981">1981</option>
                                    <option value="1980">1980</option>
                                    <option value="1979">1979</option>
                                    <option value="1978">1978</option>
                                    <option value="1977">1977</option>
                                    <option value="1976">1976</option>
                                    <option value="1975">1975</option>
                                    <option value="1974">1974</option>
                                    <option value="1973">1973</option>
                                    <option value="1972">1972</option>
                                    <option value="1971">1971</option>
                                    <option value="1970">1970</option>
                                    <option value="1969">1969</option>
                                    <option value="1968">1968</option>
                                    <option value="1967">1967</option>
                                    <option value="1966">1966</option>
                                    <option value="1965">1965</option>
                                    <option value="1964">1964</option>
                                    <option value="1963">1963</option>
                                    <option value="1962">1962</option>
                                    <option value="1961">1961</option>
                                    <option value="1960">1960</option>
                                    <option value="1959">1959</option>
                                    <option value="1958">1958</option>
                                    <option value="1957">1957</option>
                                    <option value="1956">1956</option>
                                    <option value="1955">1955</option>
                                    <option value="1954">1954</option>
                                    <option value="1953">1953</option>
                                    <option value="1952">1952</option>
                                    <option value="1951">1951</option>
                                    <option value="1950">1950</option>
                                    <option value="1949">1949</option>
                                    <option value="1948">1948</option>
                                    <option value="1947">1947</option>
                                    <option value="1946">1946</option>
                                    <option value="1945">1945</option>
                                    <option value="1944">1944</option>
                                    <option value="1943">1943</option>
                                    <option value="1942">1942</option>
                                    <option value="1941">1941</option>
                                    <option value="1940">1940</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-12">
                                    <label>Địa chỉ</label>
                                    <input type="text" class="inputText" size="50" name="info[address]" id="address">
                                    <span style="color: #ff0000;" class="address-call"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-12">
                                    <label>Tỉnh/TP</label>
                                    <select name="info[province]">
                                    
                                    <option value="1">Hà Nội</option>
                                    
                                    <option value="2">TP HCM</option>
                                    
                                    <option value="5">Hải Phòng</option>
                                    
                                    <option value="4">Đà Nẵng</option>
                                    
                                    <option value="6">An Giang</option>
                                    
                                    <option value="7">Bà Rịa - Vũng Tàu</option>
                                    
                                    <option value="13">Bình Dương</option>
                                    
                                    <option value="15">Bình Phước</option>
                                    
                                    <option value="16">Bình Thuận</option>
                                    
                                    <option value="14">Bình Định</option>
                                    
                                    <option value="8">Bạc Liêu</option>
                                    
                                    <option value="10">Bắc Giang</option>
                                    
                                    <option value="9">Bắc Kạn</option>
                                    
                                    <option value="11">Bắc Ninh</option>
                                    
                                    <option value="12">Bến Tre</option>
                                    
                                    <option value="18">Cao Bằng</option>
                                    
                                    <option value="17">Cà Mau</option>
                                    
                                    <option value="3">Cần Thơ</option>
                                    
                                    <option value="24">Gia Lai</option>
                                    
                                    <option value="25">Hà Giang</option>
                                    
                                    <option value="26">Hà Nam</option>
                                    
                                    <option value="27">Hà Tĩnh</option>
                                    
                                    <option value="30">Hòa Bình</option>
                                    
                                    <option value="28">Hải Dương</option>
                                    
                                    <option value="29">Hậu Giang</option>
                                    
                                    <option value="31">Hưng Yên</option>
                                    
                                    <option value="32">Khánh Hòa</option>
                                    
                                    <option value="33">Kiên Giang</option>
                                    
                                    <option value="34">Kon Tum</option>
                                    
                                    <option value="35">Lai Châu</option>
                                    
                                    <option value="38">Lào Cai</option>
                                    
                                    <option value="36">Lâm Đồng</option>
                                    
                                    <option value="37">Lạng Sơn</option>
                                    
                                    <option value="39">Long An</option>
                                    
                                    <option value="40">Nam Định</option>
                                    
                                    <option value="41">Nghệ An</option>
                                    
                                    <option value="42">Ninh Bình</option>
                                    
                                    <option value="43">Ninh Thuận</option>
                                    
                                    <option value="44">Phú Thọ</option>
                                    
                                    <option value="45">Phú Yên</option>
                                    
                                    <option value="46">Quảng Bình</option>
                                    
                                    <option value="47">Quảng Nam</option>
                                    
                                    <option value="48">Quảng Ngãi</option>
                                    
                                    <option value="49">Quảng Ninh</option>
                                    
                                    <option value="50">Quảng Trị</option>
                                    
                                    <option value="51">Sóc Trăng</option>
                                    
                                    <option value="52">Sơn La</option>
                                    
                                    <option value="53">Tây Ninh</option>
                                    
                                    <option value="56">Thanh Hóa</option>
                                    
                                    <option value="54">Thái Bình</option>
                                    
                                    <option value="55">Thái Nguyên</option>
                                    
                                    <option value="57">Thừa Thiên Huế</option>
                                    
                                    <option value="58">Tiền Giang</option>
                                    
                                    <option value="59">Trà Vinh</option>
                                    
                                    <option value="60">Tuyên Quang</option>
                                    
                                    <option value="61">Vĩnh Long</option>
                                    
                                    <option value="62">Vĩnh Phúc</option>
                                    
                                    <option value="63">Yên Bái</option>
                                    
                                    <option value="19">Đắk Lắk</option>
                                    
                                    <option value="22">Đồng Nai</option>
                                    
                                    <option value="23">Đồng Tháp</option>
                                    
                                    <option value="21">Điện Biên</option>
                                    
                                    <option value="20">Đắk Nông</option>
                                    
                                    </select>
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
                                <p id="js-customer-error" style="white-space: pre-line;color: red;font-size: 14px;margin-top: 0;"></p>
                            </div>
                                <div class="col-12">    
                                <label></label>
                                <input id="btn_reg" type="submit" value="Đăng ký" class="reg-button">
                                </div>
                            </div>
                       </div>
                       <!--col-6-->
                    </div>
                    <!--row-->
                 </form>
            </div>
        </div>
      </div>
    </div>
    <?php include'content.php' ?>
     <?php include'footer.php' ?>
    </div>
  </body>
</html>