# Cẩm nang An Toàn Thông Tin — trang đọc lật trang

Trang web tĩnh, mô phỏng trình đọc tại khongmotminh.vn/cam-nang: thanh tiêu đề, trình lật trang (2 trang trên màn hình rộng ≥1024px, 1 trang trên điện thoại), nút Trang trước / Trang sau, Mục lục và Tải PDF.

## Cấu trúc
```
index.html
assets/style.css            giao diện (màu nền tối + cam FPT)
assets/app.js               cấu hình sách, mục lục, điều hướng
assets/page-flip.browser.js thư viện StPageFlip 2.0.7 (MIT)
assets/logo.png, favicon.png
files/pages/p-01…p-50.webp  50 trang (1240×1754) xuất từ bản in 300dpi
files/cam-nang-an-toan-thong-tin.pdf  bản PDF nén (~20MB) để tải
```

## Dùng
- Mở `index.html` bằng trình duyệt, hoặc tải nguyên thư mục lên hosting tĩnh (GitHub Pages, Netlify, Vercel, Nginx…).
- Liên kết thẳng tới một trang: `index.html#trang-23`.
- Phím tắt: ← → (lật trang), Home / End, Esc (đóng mục lục).

## Cập nhật nội dung
Khi PDF thay đổi: xuất lại ảnh từng trang (`pdftoppm -r 150 -png`), chuyển sang WebP với tên `p-XX.webp`, và sửa `pageCount` / mục lục trong `assets/app.js` nếu số trang thay đổi.
