
///các chức năng cơ bản của giỏ hàng

// Cập nhật số lượng sản phẩm trong giỏ hàng
function updateCartCount() {
    var itemCount = $(".new-cart-items-row").length;
    $("#count_shopping_cart_store").text(itemCount);
}

// Gọi hàm cập nhật số lượng sản phẩm khi trang được tải
updateCartCount();


// Xử lý sự kiện khi người dùng nhấn vào nút mua hàng

$(".p-buy").click(function(e) {
    e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a

    // Lấy số lượng trong giỏ hàng hiện tại
    var currentCount = parseInt($("#count_shopping_cart_store").text());

    // Tăng số lượng trong giỏ hàng lên 1
    var newCount = currentCount + 1;

    // Cập nhật số lượng trong giỏ hàng
    $("#count_shopping_cart_store").text(newCount);

    // Hiển thị phần thông báo khi thêm vào giỏ hàng thành công
    $("#add-cart-complete").fadeIn();

    // Ẩn phần thông báo sau 3 giây
    setTimeout(function() {
        $("#add-cart-complete").fadeOut();
    }, 3000);

    // Lấy giá của sản phẩm vừa thêm vào giỏ hàng
    var itemPrice = parseInt($(this).closest(".new-cart-items-row").find(".buy-price").val());

    // Cập nhật tổng tạm tính
    var currentTotalPrice = parseInt($(".total-cart-price").text().replace("₫", "").replace(/\./g, ""));
    var newTotalPrice = currentTotalPrice + itemPrice;
    $(".total-cart-price").text(newTotalPrice.toLocaleString() + "₫");

    // Cập nhật tổng thành tiền
    var currentTotalPayment = parseInt($(".total-cart-payment").text().replace("₫", "").replace(/\./g, ""));
    var newTotalPayment = currentTotalPayment + itemPrice;
    $(".total-cart-payment").text(newTotalPayment.toLocaleString() + "₫");
});

$(document).ready(function() {
    // Xử lý sự kiện khi người dùng nhấn vào nút mua hàng
    $(".p-buy").click(function(e) {
        e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a

        // Lấy số lượng trong giỏ hàng hiện tại
        var currentCount = parseInt($("#count_shopping_cart_store").text());

        // Tăng số lượng trong giỏ hàng lên 1
        var newCount = currentCount + 1;

        // Cập nhật số lượng trong giỏ hàng
        $("#count_shopping_cart_store").text(newCount);

        // Hiển thị phần thông báo khi thêm vào giỏ hàng thành công
        $("#add-cart-complete").fadeIn();

        // Ẩn phần thông báo sau 3 giây
        setTimeout(function() {
            $("#add-cart-complete").fadeOut();
        }, 3000);
    });
    
    $(document).ready(function() {
                    // Xử lý sự kiện khi người dùng nhấn vào nút xóa từng sản phẩm
        $(".delete-from-cart").click(function(e) {
            e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a

            // Lấy số lượng sản phẩm trong giỏ hàng
            var currentCount = parseInt($("#count_shopping_cart_store").text());

            // Giảm số lượng sản phẩm trong giỏ hàng đi 1
            var newCount = currentCount - 1;

            // Cập nhật số lượng sản phẩm trong giỏ hàng
            $("#count_shopping_cart_store").text(newCount);

            // Lấy giá của sản phẩm được xóa
            var itemPrice = parseInt($(this).closest(".new-cart-items-row").find(".buy-price").val());

            // Cập nhật tổng số tiền của các sản phẩm
            var currentTotalPrice = parseInt($(".total-cart-price").text().replace("₫", "").replace(/\./g, ""));
            var newTotalPrice = currentTotalPrice - itemPrice;
            $(".total-cart-price").text(newTotalPrice.toLocaleString() + "₫");

            // Cập nhật tổng số tiền thành tiền của các sản phẩm
            var currentTotalPayment = parseInt($(".total-cart-payment").text().replace("₫", "").replace(/\./g, ""));
            var newTotalPayment = currentTotalPayment - itemPrice;
            $(".total-cart-payment").text(newTotalPayment.toLocaleString() + "₫");

            // Xóa sản phẩm khỏi giỏ hàng
            $(this).closest(".new-cart-items-row").remove();

            // Cập nhật giao diện giỏ hàng
            updateCartUI();
        });
            // Xử lý sự kiện khi người dùng nhấn vào nút xóa toàn bộ giỏ hàng
        $(".new-cart-del-shopping-btn").click(function(e) {
            e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a

            // Kiểm tra xem checkbox "Chọn tất cả sản phẩm" có được chọn không
            var isChecked = $("#js-check-cart-all-item").hasClass("active");

            // Nếu checkbox "Chọn tất cả sản phẩm" được chọn, thực hiện xóa toàn bộ giỏ hàng
            if (isChecked) {
                // Cập nhật số lượng sản phẩm trong giỏ hàng thành 0
                $("#count_shopping_cart_store").text('0');

                // Xóa danh sách sản phẩm trong giỏ hàng (nếu cần)
                $(".cart-list-item").empty();

                // Cập nhật tổng tiền thành 0 hoặc giá trị mong muốn (nếu cần)
                $(".total-cart-price").text('0₫');
                $(".total-cart-payment").text('0₫');
                updateCartUI();
            } else {
                // Hiển thị thông báo yêu cầu chọn tất cả sản phẩm trước khi xóa
                alert("Vui lòng chọn tất cả sản phẩm trước khi xóa!");
            }
        });
    });

    $(document).ready(function() {
                // Sự kiện click áp dụng mã giảm giá
        $(".js-apply-discount-code").click(function() {
            var discountCode = $("#discount_code").val();
            // Kiểm tra nếu ô nhập mã giảm giá không trống
            if (discountCode.trim() !== "") {
                // Thực hiện xử lý áp dụng mã giảm giá ở đây
                // Sau khi xử lý, cập nhật giá giảm giá và tổng tiền
                var discountAmount = 100000; // Giả sử giảm giá 100,000₫
                $("#price-discount").text(discountAmount.toLocaleString() + "₫"); // Hiển thị giá giảm giá
                discountTotal = discountAmount; // Lưu trữ tổng số tiền giảm giá
                updateTotalPayment(); // Cập nhật lại tổng tiền thanh toán khi áp dụng mã giảm giá
                // Xóa thông báo nếu có
                $("#js-voucher-message").text("");
            } else {
                // Hiển thị thông báo khi chưa nhập mã giảm giá
                $("#js-voucher-message").text("Bạn chưa nhập mã giảm giá.");
            }
        });

        // Hàm cập nhật tổng tiền thanh toán khi áp dụng mã giảm giá
        function updateTotalPayment() {
            var totalItemsPrice = 0; // Tổng số tiền của các sản phẩm được chọn
            $(".new-cart-items-row").each(function() {
                var quantity = parseInt($(this).find(".buy-quantity").val());
                var price = parseInt($(this).find(".buy-price").val());
                var isChecked = $(this).find(".js-check-cart-item").hasClass("active");
                if (isChecked) {
                    var totalPrice = quantity * price;
                    totalItemsPrice += totalPrice; // Cập nhật tổng số tiền của các sản phẩm được chọn
                }
            });

            // Trừ đi tổng số tiền giảm giá nếu có
            var totalPayment = totalItemsPrice - discountTotal;

            $(".total-cart-payment").text(totalPayment.toLocaleString() + "₫"); // Hiển thị tổng tiền thanh toán sau khi áp dụng mã giảm giá
        }
        // Gọi hàm cập nhật giao diện giỏ hàng khi trang được tải
        updateCartUI();
    });

    $(document).ready(function() {
        // Sự kiện thay đổi số lượng sản phẩm khi người dùng nhập số vào trường input
        $(".buy-quantity").on("input", function() {
            var newValue = parseInt($(this).val());

            // Kiểm tra nếu newValue là số và lớn hơn 0
            if (!isNaN(newValue) && newValue > 0) {
                updateTotalPrice(); // Cập nhật tổng tiền và giá cho từng sản phẩm
            } else {
                // Nếu newValue không phải là số hoặc nhỏ hơn hoặc bằng 0, đặt giá trị của input là 1
                $(this).val();
                updateTotalPrice(); // Cập nhật tổng tiền và giá cho từng sản phẩm
            }
        });

        // Sự kiện thay đổi số lượng sản phẩm khi người dùng nhấn vào nút +/- để thay đổi số lượng
        $(".quantity-change").click(function() {
            var $input = $(this).siblings(".buy-quantity");
            var oldValue = parseInt($input.val());
            var newValue = oldValue + parseInt($(this).data("value"));

            // Kiểm tra nếu newValue là số và lớn hơn 0
            if (!isNaN(newValue) && newValue > 0) {
                $input.val(newValue);
                updateTotalPrice(); // Cập nhật tổng tiền và giá cho từng sản phẩm
            } else {
                // Nếu newValue không phải là số hoặc nhỏ hơn hoặc bằng 0, đặt giá trị của input là 1
                $input.val(1);
                updateTotalPrice(); // Cập nhật tổng tiền và giá cho từng sản phẩm
            }
        });

        // Gọi hàm cập nhật giao diện giỏ hàng khi trang được tải
        updateCartUI();
    });

    // Hàm kiểm tra và cập nhật giao diện giỏ hàng
    function updateCartUI() {
    var itemCount = $(".new-cart-items-row").length;
    var totalItemsPrice = 0; // Tổng số tiền của các sản phẩm
    $(".new-cart-items-row").each(function() {
        var quantity = parseInt($(this).find(".buy-quantity").val());
        var price = parseInt($(this).find(".buy-price").val());
        totalItemsPrice += quantity * price;
    });
    $(".cart_counter_new").text(itemCount); // Cập nhật số lượng sản phẩm

    // Hiển thị tổng số tiền của các sản phẩm trong giỏ hàng
    $(".total-cart-price").text(totalItemsPrice.toLocaleString() + "₫");

    // Hiển thị tổng số tiền thành tiền
    $(".total-cart-payment").text(totalItemsPrice.toLocaleString() + "₫");

    if (itemCount === 0) {
        $(".title-n span").show(); // Ẩn số lượng sản phẩm trong tiêu đề "Giỏ hàng"
        $(".not-item-in-cart").show(); // Hiển thị phần thông báo "Không có sản phẩm nào trong giỏ hàng của bạn"
        $(".cart-content-2021").hide(); // Ẩn nội dung giỏ hàng
    } else {
        $(".title-n span").hide(); // Cập nhật số lượng sản phẩm trong tiêu đề "Giỏ hàng" và hiển thị
        $(".not-item-in-cart").hide(); // Ẩn phần thông báo "Không có sản phẩm nào trong giỏ hàng của bạn"
        $(".cart-content-2021").show(); // Hiển thị nội dung giỏ hàng
    }
    }

    // Sự kiện click cho checkbox chọn tất cả sản phẩm
    $("#js-check-cart-all-item").click(function() {
        var isChecked = $(this).hasClass("active");
        $(".js-check-cart-item").toggleClass("active", !isChecked);
        updateCartUI();

        // Cập nhật trạng thái của checkbox chọn tất cả sản phẩm
        if (isChecked) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }

        // Tính toán tổng tiền của các sản phẩm được chọn
        var totalSelectedPrice = 0;
        $(".js-check-cart-item.active").each(function() {
            var quantity = parseInt($(this).closest(".new-cart-items-row").find(".buy-quantity").val());
            var price = parseInt($(this).closest(".new-cart-items-row").find(".buy-price").val());
            var itemTotalPrice = quantity * price;
            totalSelectedPrice += itemTotalPrice;
        });

        // Hiển thị tổng tiền của các sản phẩm được chọn
        $(".total-cart-price").text(totalSelectedPrice.toLocaleString() + "₫");
        $(".total-cart-payment").text(totalSelectedPrice.toLocaleString() + "₫"); // Hiển thị tổng tiền thành tiền
    });

});
    // Sự kiện click cho checkbox chọn từng sản phẩm
    $(document).on("click", ".js-check-cart-item", function() {
        $(this).toggleClass("active");
        var totalItemsPrice = 0; // Tổng số tiền của các sản phẩm được chọn
        $(".js-check-cart-item.active").each(function() {
            // Lấy số lượng và giá của sản phẩm được chọn
            var quantity = parseInt($(this).closest(".new-cart-items-row").find(".buy-quantity").val());
            var price = parseInt($(this).closest(".new-cart-items-row").find(".buy-price").val());
            var itemTotalPrice = quantity * price; // Tính tổng tiền của sản phẩm
            totalItemsPrice += itemTotalPrice; // Cộng vào tổng số tiền của các sản phẩm được chọn
        });
        
        // Hiển thị tổng số tiền của các sản phẩm được chọn
        $(".total-cart-price").text(totalItemsPrice.toLocaleString() + "₫");

        // Hiển thị tổng số tiền thành tiền của các sản phẩm được chọn
        $(".total-cart-payment").text(totalItemsPrice.toLocaleString() + "₫");
        
        // Hiển thị hoặc ẩn tạm tính tùy thuộc vào có sản phẩm nào được chọn hay không
        if (totalItemsPrice > 0) {
            $(".cart-temporary-total").show();
        } else {
            $(".cart-temporary-total").hide();
        }
        
        // Cập nhật trạng thái của checkbox chọn tất cả sản phẩm
        var allChecked = $(".js-check-cart-item.active").length === $(".js-check-cart-item").length;
        $("#js-check-cart-all-item").toggleClass("active", allChecked);

        // Cập nhật giao diện giỏ hàng
        updateCartUI();
    });
    // Hàm cập nhật tổng giá tiền
function updateTotalPrice() {
    var totalItemsPrice = 0; // Khởi tạo tổng giá tiền của các sản phẩm là 0
    $(".new-cart-items-row").each(function() {
        var quantity = parseInt($(this).find(".buy-quantity").val()); // Lấy số lượng sản phẩm
        var price = parseInt($(this).find(".buy-price").val()); // Lấy giá của sản phẩm
        var totalPrice = quantity * price; // Tính tổng giá tiền cho sản phẩm hiện tại
        totalItemsPrice += totalPrice; // Cộng tổng giá tiền cho sản phẩm hiện tại vào tổng giá tiền của tất cả sản phẩm
    });
    
    // Hiển thị tổng giá tiền trong giao diện người dùng
    $(".total-item-price").text(totalItemsPrice.toLocaleString() + "₫");
    $(".total-cart-price").text(totalItemsPrice.toLocaleString() + "₫");
    $(".total-cart-payment").text(totalItemsPrice.toLocaleString() + "₫");
}

// Cập nhật tổng giá tiền khi số lượng của một sản phẩm thay đổi
$(".buy-quantity").on("input", function() {
    updateTotalPrice(); // Gọi hàm updateTotalPrice khi số lượng thay đổi
});

// Cập nhật tổng giá tiền khi số lượng thay đổi sử dụng các nút +/- 
$(".quantity-change").click(function() {
    updateTotalPrice(); // Gọi hàm updateTotalPrice khi số lượng thay đổi
});


///thêm sản phẩm

// Hàm để thêm sản phẩm vào HTML
function addToHTML(productData) {
    // Tạo một đối tượng div mới
    var newItem = document.createElement("div");
    // Tạo các phần tử con cho mục sản phẩm
    newItem.innerHTML = `
    <div class="new-cart-items-row js-item-row active" data-price="2489000" data-variant_id="0" data-currency="VND" data-cat="Màn Hình Máy Tính" data-category="Màn Hình Máy Tính" data-brand="LG" data-item_id="77685" data-item_type="product" data-quantity="1" data-totalprice="2489000" data-name="Màn hình LG 24MR400-B (23.8 inch/FHD/IPS/100Hz/5ms)" data-url="/man-hinh-lg-24mr400-b-23.8-inch-fhd-ips-100hz-5ms" data-image="https://hanoicomputercdn.com/media/product/250_77685_man_hinh_lg_24mr400_b_850x850_2.jpg" data-priceok="2489000">
                                <div class="cart-col-product">
                                    <div onclick="checkItemProductCart(this)" class="fake-checkbox js-check-cart-item active"></div>
                                    <a href="/man-hinh-lg-24mr400-b-23.8-inch-fhd-ips-100hz-5ms" class="cart-n-p-img"><img src="https://hanoicomputercdn.com/media/product/250_77685_man_hinh_lg_24mr400_b_850x850_2.jpg" alt="Màn hình LG 24MR400-B (23.8 inch/FHD/IPS/100Hz/5ms)"></a>
                                    <div class="cart-n-p-info">
                                        <a href="/man-hinh-lg-24mr400-b-23.8-inch-fhd-ips-100hz-5ms" class="cart-n-p-name">Màn hình LG 24MR400-B (23.8 inch/FHD/IPS/100Hz/5ms)
                                        </a>
                                      <span class="cart-n-p-sku">Mã SP: <b>MOLG253</b></span>
                                        <a href="javascript:;" class="cart-n-p-buy-later" onclick="addToAccBuy(77685)">
                                            <i class="fa-solid fa-angles-down"></i> 
                                            Lưu lại mua sau
                                        </a>
                                        <div class="complete-h-pop-2" id="js-mua-sau"></div>
                                    </div>
                                </div>
                                <div class="cart-col-price">
                                    <input type="hidden" class="bulk_price_config" value="[]">
                                    <input type="hidden" class="buy-price" value="2489000">
                                    <span class="new-cart-items-price js-show-buy-price">
                                        2.489.000₫
                                    </span>
                                    <span class="new-cart-items-old-price"><span>3.599.000</span>₫
                                    </span>
                                </div>
                                <div class="cart-col-quantity">
                                    <span class="new-cart-quantity">
                                        <a href="javascript:void(0);" class="minor quantity-change" data-value="-1" title="tru"><svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" class="hnc-svg-icon"><polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon></svg></a>
                                        <input class="buy-quantity quantity-change" value="1" size="5" data-stock="998">
                                        <a href="javascript:void(0);" class="add quantity-change" data-value="1" title="them"><svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" class="hnc-svg-icon"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg></a>
                                    </span>
                                </div>
                                <div class="cart-col-total-price">
                                    <b class="total-item-price">2.489.000</b>
                                </div>
                                <div class="cart-col-delete">
                                    <a href="javascript:void(0)" data-price="2489000" data-currency="VND" data-cat="Màn Hình Máy Tính" data-brand="LG" data-item_id="77685" data-item_type="product" data-quantity="1" data-totalprice="2489000" data-name="Màn hình LG 24MR400-B (23.8 inch/FHD/IPS/100Hz/5ms)" class="delete-from-cart red">
                                        <img src="https://hacom.vn/template/july_2021/images/trash.svg">
                                        <span class="canh-bao-het-hang">Xóa khỏi giỏ hàng</span>
                                    </a>  
                              </div>
                            </div>
        `;
}