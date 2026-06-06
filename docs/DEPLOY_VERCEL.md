# Deploy Vercel Guide

## Mục tiêu

Deploy Kids Knowledge Engine như một static website.

## Trước khi deploy

Checklist:
- Git commit sạch.
- Root `index.html` tồn tại.
- Mini app chạy local.
- Printable pack tồn tại.
- Không có dữ liệu nhạy cảm.
- Không có backend/API key.

## Cách deploy qua GitHub + Vercel

1. Push project lên GitHub.
2. Vào Vercel.
3. Import GitHub repository.
4. Chọn framework preset: Other.
5. Build Command: để trống.
6. Output Directory: để trống hoặc `.`.
7. Deploy.

## Sau khi deploy

Kiểm:
- Trang chủ mở được.
- Nút chơi thử mở được mini app.
- Quiz chọn đáp án được.
- Điểm số hoạt động.
- Printable HTML mở được.
- Không lỗi console rõ ràng.

## Lưu ý

- Không thu thập dữ liệu trẻ em trong MVP.
- Không cần backend.
- Không cần database.
- Không cần environment variables.
