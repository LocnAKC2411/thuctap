let sanphamData = [
    {
        id:76572,
        img:"./assets/img/laptop/250_76572_laptop_acer_aspire_5_a514_56p_55k5__nx_khrsv_003___1_.jpg",
        sku:"LTAC854",
        name:"LAPTOP ACER ASPIRE A514-56P-55K5",
        mprice:18999000,
        discount:16,
        price:15999000,
    },
    {
        id:71806,
        img:"./assets/img/laptop/250_71806_nj069w.jpg",
        sku:"LTAU794",
        name:"LAPTOP ACER ASPIRE A514-56P-55K5",
        mprice:13699000,
        discount:25,
        price:10299000,
    }
]

///
let sanpham = document.getElementById("featured-cate-1106");

let datasp = JSON.parse(localStorage.getItem("data")) || [];
