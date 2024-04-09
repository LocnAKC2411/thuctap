$(document).ready(function () {
    // Cập nhật số lượng sản phẩm từ localStorage khi trang được tải
    updateCartItemCount();

    // Xử lý sự kiện khi người dùng nhấn vào nút mua hàng
    $(document).on("click", ".p-buy", function(e) {
        e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a

        // Lấy số lượng sản phẩm hiện tại trong giỏ hàng từ localStorage
        var storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        var currentCount = storedCartItems ? storedCartItems.length : 0;

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        var itemExists = false;
        if (storedCartItems) {
            var productId = $(this).data('product-id');
            itemExists = storedCartItems.some(item => item.id === productId);
        }

        // Nếu sản phẩm chưa tồn tại trong giỏ hàng, tăng số lượng sản phẩm trong giỏ hàng lên 1
        if (!itemExists) {
            currentCount += 1;
        }

        // Cập nhật số lượng sản phẩm trong giỏ hàng
        $("#count_shopping_cart_store").text(currentCount);

        // Hiển thị phần thông báo khi thêm vào giỏ hàng thành công
        $("#add-cart-complete").fadeIn();

        // Ẩn phần thông báo sau 3 giây
        setTimeout(function() {
            $("#add-cart-complete").fadeOut();
        }, 3000);

        // Lấy giá của sản phẩm vừa thêm vào giỏ hàng
        var itemPrice = parseInt($(this).closest(".new-cart-items-row").find(".buy-price").val());

        // Cập nhật tổng tạm tính và tổng thành tiền
        var currentTotalPrice = parseInt($(".total-cart-price").text().replace("₫", "").replace(/\./g, ""));
        var newTotalPrice = currentTotalPrice + itemPrice;
        $(".total-cart-price").text(newTotalPrice.toLocaleString() + "₫");
        $(".total-cart-payment").text(newTotalPrice.toLocaleString() + "₫");
    });
});

// Cập nhật số lượng sản phẩm trong giỏ hàng từ localStorage
function updateCartItemCount() {
    var storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    var currentCount = storedCartItems ? storedCartItems.length : 0;
    $("#count_shopping_cart_store").text(currentCount);
}


// ///các chức năng cơ bản của giỏ hàng

// // Cập nhật số lượng sản phẩm trong giỏ hàng
// function updateCartCount() {
//     var itemCount = $(".new-cart-items-row").length;
//     $("#count_shopping_cart_store").text(itemCount);
// }

// // Gọi hàm cập nhật số lượng sản phẩm khi trang được tải
// updateCartCount();


// // Xử lý sự kiện khi người dùng nhấn vào nút mua hàng

// $(".p-buy").click(function(e) {
//     e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a

//     // Lấy số lượng trong giỏ hàng hiện tại
//     var currentCount = parseInt($("#count_shopping_cart_store").text());

//     // Tăng số lượng trong giỏ hàng lên 1
//     var newCount = currentCount + 1;

//     // Cập nhật số lượng trong giỏ hàng
//     $("#count_shopping_cart_store").text(newCount);

//     // Hiển thị phần thông báo khi thêm vào giỏ hàng thành công
//     $("#add-cart-complete").fadeIn();

//     // Ẩn phần thông báo sau 3 giây
//     setTimeout(function() {
//         $("#add-cart-complete").fadeOut();
//     }, 3000);

//     // Lấy giá của sản phẩm vừa thêm vào giỏ hàng
//     var itemPrice = parseInt($(this).closest(".new-cart-items-row").find(".buy-price").val());

//     // Cập nhật tổng tạm tính
//     var currentTotalPrice = parseInt($(".total-cart-price").text().replace("₫", "").replace(/\./g, ""));
//     var newTotalPrice = currentTotalPrice + itemPrice;
//     $(".total-cart-price").text(newTotalPrice.toLocaleString() + "₫");

//     // Cập nhật tổng thành tiền
//     var currentTotalPayment = parseInt($(".total-cart-payment").text().replace("₫", "").replace(/\./g, ""));
//     var newTotalPayment = currentTotalPayment + itemPrice;
//     $(".total-cart-payment").text(newTotalPayment.toLocaleString() + "₫");
// });

$(document).ready(function() {
    
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
    
            // Cập nhật dữ liệu trong localStorage
            updateLocalStorage();
    
            // Cập nhật giao diện giỏ hàng
            updateCartUI();
        });
    
        // Xử lý sự kiện khi người dùng nhấn vào nút xóa tất cả sản phẩm
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
    
                // Xóa dữ liệu trong localStorage
                localStorage.removeItem('cartItems');
    
                // Cập nhật giao diện giỏ hàng
                updateCartUI();
            } else {
                // Hiển thị thông báo yêu cầu chọn tất cả sản phẩm trước khi xóa
                alert("Vui lòng chọn tất cả sản phẩm trước khi xóa!");
            }
        });
    
        // Hàm để cập nhật dữ liệu trong localStorage sau khi xóa sản phẩm
        function updateLocalStorage() {
            // Lấy dữ liệu từ localStorage
            var storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    
            // Kiểm tra nếu có dữ liệu trong localStorage
            if (storedCartItems) {
                // Lấy ID của sản phẩm bị xóa
                var deletedItemId = parseInt($(".delete-from-cart").closest(".new-cart-items-row").data("item_id"));
    
                // Loại bỏ sản phẩm có ID tương ứng khỏi mảng storedCartItems
                var updatedCartItems = storedCartItems.filter(function(item) {
                    return item.id !== deletedItemId;
                });
    
                // Lưu lại mảng updatedCartItems vào localStorage
                localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            }
        }
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

    // Hàm để cập nhật tổng số lượng giá tiền của tất cả sản phẩm trong giỏ hàng
    $(document).ready(function() {
        // Hàm để cập nhật tổng giá tiền và giá cho từng sản phẩm
        function updateTotalPrice() {
            var totalCartPrice = 0;
    
            // Duyệt qua từng sản phẩm trong giỏ hàng
            $(".new-cart-items-row").each(function() {
                var quantity = parseInt($(this).find(".buy-quantity").val());
                var price = parseInt($(this).find(".buy-price").val());
                var totalPrice = quantity * price;
    
                // Cập nhật giá và tổng giá tiền của từng sản phẩm
                $(this).find(".total-item-price").text(formatPrice(totalPrice));
                totalCartPrice += totalPrice;
            });
    
            // Cập nhật tổng giá tiền của giỏ hàng
            $(".total-cart-price").text(formatPrice(totalCartPrice));
            $(".total-cart-payment").text(formatPrice(totalCartPrice));
        }
    
        // Sự kiện thay đổi số lượng sản phẩm khi người dùng nhập số vào trường input
        $(".buy-quantity").on("input", function() {
            var newValue = parseInt($(this).val());
            var productId = $(this).closest(".new-cart-items-row").data("item_id");
    
            // Kiểm tra nếu newValue là số và lớn hơn 0
            if (!isNaN(newValue) && newValue > 0) {
                // Cập nhật giá trị trong localStorage
                updateLocalStorageQuantity(productId, newValue);
            } else {
                // Nếu newValue không phải là số hoặc nhỏ hơn hoặc bằng 0, đặt giá trị của input là 1
                $(this).val("");
                newValue = 1;
                updateLocalStorageQuantity(productId, newValue);
            }
    
            // Cập nhật tổng giá tiền
            updateTotalPrice();
        });
    
        // Sự kiện thay đổi số lượng sản phẩm khi người dùng nhấn vào nút +/- để thay đổi số lượng
        $(".quantity-change").click(function() {
            var $input = $(this).siblings(".buy-quantity");
            var oldValue = parseInt($input.val());
            var newValue = oldValue + parseInt($(this).data("value"));
            var productId = $(this).closest(".new-cart-items-row").data("item_id");
    
            // Kiểm tra nếu newValue là số và lớn hơn 0
            if (!isNaN(newValue) && newValue > 0) {
                $input.val(newValue);
    
                // Cập nhật giá trị trong localStorage
                updateLocalStorageQuantity(productId, newValue);
            } else {
                // Nếu newValue không phải là số hoặc nhỏ hơn hoặc bằng 0, đặt giá trị của input là 1
                $input.val("");
                newValue = 1;
                updateLocalStorageQuantity(productId, newValue);
            }
    
            // Cập nhật tổng giá tiền
            updateTotalPrice();
        });
    
        // Hàm để cập nhật quantity của sản phẩm trong localStorage
        function updateLocalStorageQuantity(productId, newQuantity) {
            var storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    
            if (storedCartItems) {
                // Tìm sản phẩm trong mảng cartItems
                var productIndex = storedCartItems.findIndex(function(item) {
                    return item.id === productId;
                });
    
                // Nếu tìm thấy sản phẩm, cập nhật quantity
                if (productIndex !== -1) {
                    storedCartItems[productIndex].quantity = newQuantity;
                    localStorage.setItem('cartItems', JSON.stringify(storedCartItems));
                }
            }
        }
    
        // Gọi hàm cập nhật tổng giá tiền khi trang được tải
        updateTotalPrice();
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
// Hàm để định dạng giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}
// Hàm để hiển thị dữ liệu từ localStorage vào HTML
function displayCartItemsFromLocalStorage() {
    // Lấy dữ liệu từ localStorage
    var storedCartItems = JSON.parse(localStorage.getItem('cartItems'));

    // Kiểm tra nếu có dữ liệu trong localStorage
    if (storedCartItems) {
        // Duyệt qua mảng storedCartItems
        storedCartItems.forEach(function(item) {
            // Tạo các phần tử HTML tương ứng với từng sản phẩm
            var cartItemHTML = `
                <div class="new-cart-items-row js-item-row active" data-price="${item.price}" data-variant_id="0" data-currency="VND" data-cat="Màn Hình Máy Tính" data-category="Màn Hình Máy Tính" data-brand="LG" data-item_id="${item.id}" data-item_type="product" data-quantity="${item.quantity}" data-totalprice="${item.price * item.quantity}" data-name="${item.name}" data-url="/man-hinh-lg-24mr400-b-23.8-inch-fhd-ips-100hz-5ms" data-image="${item.img}" data-priceok="${item.price}">
                    <div class="cart-col-product">
                        <div onclick="checkItemProductCart(this)" class="fake-checkbox js-check-cart-item active"></div>
                        <a href="/man-hinh-lg-24mr400-b-23.8-inch-fhd-ips-100hz-5ms" class="cart-n-p-img"><img src="${item.img}" alt="${item.name}"></a>
                        <div class="cart-n-p-info">
                            <a href="/man-hinh-lg-24mr400-b-23.8-inch-fhd-ips-100hz-5ms" class="cart-n-p-name">${item.name}</a>
                            <span class="cart-n-p-sku">Mã SP: <b>${item.sku}</b></span>
                            <a href="javascript:;" class="cart-n-p-buy-later" onclick="addToAccBuy(${item.id})">
                                <i class="fa-solid fa-angles-down"></i> 
                                Lưu lại mua sau
                            </a>
                            <div class="complete-h-pop-2" id="js-mua-sau"></div>
                        </div>
                    </div>
                    <div class="cart-col-price">
                        <input type="hidden" class="bulk_price_config" value="[]">
                        <input type="hidden" class="buy-price" value="${item.price}">
                        <span class="new-cart-items-price js-show-buy-price">${formatPrice(item.price)}</span>
                        <span class="new-cart-items-old-price"><span>${formatPrice(item.mprice)}</span></span>
                    </div>
                    <div class="cart-col-quantity">
                        <span class="new-cart-quantity">
                            <a href="javascript:void(0);" class="minor quantity-change" data-value="-1" title="tru"><svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" class="hnc-svg-icon"><polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon></svg></a>
                            <input class="buy-quantity quantity-change" value="${item.quantity}" size="5" data-stock="998">
                            <a href="javascript:void(0);" class="add quantity-change" data-value="1" title="them"><svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" class="hnc-svg-icon"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg></a>
                        </span>
                    </div>
                    <div class="cart-col-total-price">
                        <b class="total-item-price">${formatPrice(item.price * item.quantity)}</b>
                    </div>
                    <div class="cart-col-delete">
                        <a href="javascript:void(0)" data-price="${item.price}" data-currency="VND" data-cat="Màn Hình Máy Tính" data-brand="LG" data-item_id="${item.id}" data-item_type="product" data-quantity="${item.quantity}" data-totalprice="${item.price * item.quantity}" data-name="${item.name}" class="delete-from-cart red">
                            <img src="https://hacom.vn/template/july_2021/images/trash.svg">
                            <span class="canh-bao-het-hang">Xóa khỏi giỏ hàng</span>
                        </a>  
                    </div>
                </div>
            `;

            // Thêm phần tử HTML vào DOM
            document.getElementById('cart-container').innerHTML += cartItemHTML;
        });
    }
}
// Gọi hàm để hiển thị dữ liệu từ localStorage vào HTML khi trang web được tải
displayCartItemsFromLocalStorage();



















