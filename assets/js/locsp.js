document.addEventListener("DOMContentLoaded", function() {
    // Đếm số lượng phần tử có class là "p-component"
    var totalComponents = document.querySelectorAll('.p-component').length;
    // Hiển thị kết quả
    document.getElementById('totalComponents').textContent = totalComponents;
});


$(function() {
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 100,
        values: [0, 100],
        slide: function(event, ui) {
            var handleLeft = $(this).find('.ui-slider-handle').eq(0);
            var handleRight = $(this).find('.ui-slider-handle').eq(1);

            var leftValue = ui.values[0];
            var rightValue = ui.values[1];
            var leftPosition = leftValue / 100;
            var rightPosition = rightValue / 100;

            // Di chuyển handle khi kéo slider sang trái hoặc phải
            handleLeft.css("left", leftPosition + "%");
            handleRight.css("left", rightPosition + "%");

            // Tính toán vị trí và chiều rộng của phần dải màu
            var rangeLeft = leftPosition;
            var rangeWidth = rightPosition - leftPosition;

            // Cập nhật style cho phần dải màu
            $(".ui-slider-range").css("left", rangeLeft + "%");
            $(".ui-slider-range").css("width", rangeWidth + "%");
        }
    });
});
