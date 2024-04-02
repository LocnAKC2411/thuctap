create schema webbanhang;
use webbanhang;
create table quanly (
maquanly varchar(11)  Primary key,
tenquanly varchar(50) Not Null,
ngaytao datetime Not Null,
ngaycapnhat datetime Not Null
);
create table nhanvien (
manhanvien varchar(11) Primary Key,
maquanly varchar(11) Not Null,
tennv varchar(50) Not Null,
sodt int(15) Not Null,
email varchar(100) Not Null,
ngaysinh datetime NOt Null,
diachi varchar(100) Not Null,
ngaytao datetime Not Null,
ngaycapnhat datetime Not Null,
Foreign key(maquanly) references quanly(maquanly)
);
create table khackhang (
makh varchar(11) Primary Key,
manhanvien varchar(11) NOt Null,
tenkh varchar(50) Not Null,
sodt int(15) Not Null,
email varchar(100) Not Null,
ngaysinh datetime NOt Null,
diachi varchar(100) Not Null,
ngaytao datetime Not Null,
ngaycapnhat datetime Not Null,
Foreign key(manhanvien) references nhanvien(manhanvien)
);
create table danhmucsp (
madanhmuc varchar(11) Primary Key,
tendm varchar(100) Not Null,
ngaytao datetime Not Null,
ngaycapnhat datetime Not Null
);
create table sanpham (
masp varchar(11) Primary Key,
tensp varchar(100) Not Null,
madanhmuc varchar(11) Not Null,
hang varchar(50) Not Null,
hinhanh varchar(300) Not Null,
giatien int Not Null,
giamgia int Not Null,
ngaytao datetime Not Null,
ngaycapnhat datetime Not Null,
Foreign key(madanhmuc) references danhmucsp(madanhmuc)
);

select * from webbanhang.thongke;

create table khohang (
makho varchar(11) Primary Key,
madanhmuc varchar(11) Not Null,
masp varchar(11) Not Null,
tensp varchar(100) Not Null,
soluong int Not Null,
ngaytao datetime Not Null,
ngaycapnhat datetime Not Null,
Foreign key(madanhmuc) references danhmucsp(madanhmuc),
Foreign key(masp) references sanpham(masp)
);
create table hoadon (
mahd varchar(11) Primary Key,
manhanvien varchar(11) Not Null,
makh varchar(11) Not Null,
tenkh varchar(50) Not Null,
sodt int(15) Not Null,
email varchar(100) Not Null,
diachi varchar(100) Not Null,
ngaytao datetime Not Null,
ngaycapnhat datetime Not Null,
Foreign key(manhanvien) references nhanvien(manhanvien),
Foreign key(makh) references khackhang(makh)
);
create table hoadonchitiet (
mahd varchar(11) Primary Key,
masp varchar(11) Not Null,
tensp varchar(100) Not Null,
giatien float Not Null,
soluongsp int Not Null,
tongtien float Not Null,
Foreign key(mahd) references hoadon(mahd),
Foreign key(masp) references sanpham(masp)
);

create table phanhoi (
maph varchar(11) Primary Key,
masp varchar(11) Not Null,
tensp varchar(100) Not Null,
danhgia int(10) Not Null,mieuta varchar(300) Not Null,
ngaytao datetime Not Null,
ngaycapnhat datetime Not Null,
Foreign key(masp) references sanpham(masp)
);

SELECT 
    sp.masp,
    sp.tensp,
    IFNULL(kh.soluong, 0) AS soluongban,
    IFNULL(kh.soluong * sp.giatien, 0) AS tongdoanhthu
FROM
    sanpham sp
LEFT JOIN
    khohang kh ON sp.masp = kh.masp;
    select * from webbanhang.sanpham;



