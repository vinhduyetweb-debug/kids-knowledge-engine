# KIDS KNOWLEDGE ENGINE MVP

Định vị: Đây là bộ khung MVP cho hệ thống tạo nội dung giáo dục trẻ em từ một nguồn dữ liệu gốc.

MVP đầu tiên:
- Chủ đề: Động vật thân quen
- Độ tuổi: 3-5
- Số item mẫu: 20
- Đầu ra thử nghiệm:
  - Mini app đoán con vật
  - Dữ liệu JSON chuẩn
  - Prompt video shorts
  - Prompt tranh tô màu
  - Prompt ảnh minh họa
  - Worksheet instruction
  - Parent guide

Nguyên tắc:
- Dữ liệu gốc là tài sản.
- Ebook chỉ là một định dạng xuất bản.
- Không làm backend ở MVP.
- Không thu thập dữ liệu trẻ em.
- Không dùng hình/nhạc có bản quyền không rõ nguồn.
- Làm ít nhưng chạy được trước.

Cách chạy mini app:
1. Mở thư mục `apps/guess-animal`.
2. Mở file `index.html` bằng trình duyệt.
3. Bấm "Câu tiếp theo" để chơi thử.

## Chạy mini app 100 câu đố

Mở file:

```txt
apps/guess-animal/index.html
```

App chạy static, không cần backend.
Mini app dùng `animals_vi_3_5_mvp_100.js` cho local file mode và có JSON fallback cho public static deploy.
Trên public deploy, mini app dùng absolute asset path `/apps/guess-animal/...` để tránh lỗi route khi URL có hoặc không có dấu `/` cuối.

## Chạy landing page

Mở file:

```txt
index.html
```

## Chơi mini app

Mở file:

```txt
apps/guess-animal/index.html
```

## Deploy Vercel static

Có thể deploy trực tiếp thư mục dự án lên Vercel dưới dạng static project.
Không cần build command.
Không cần install command.

## Deploy lên Vercel

Dự án là static project.

Thiết lập gợi ý:
- Framework Preset: Other
- Build Command: để trống
- Output Directory: để trống hoặc `.`
- Install Command: để trống

Sau khi deploy, kiểm tra:
- Landing page mở được.
- Link mini app mở được.
- Mini app quiz chạy được.
- Printable HTML mở được.

## Export nội dung

Chạy lệnh:

```bat
node tools\export-content.js
```

Kết quả được tạo trong:

```txt
exports/generated/
```

### Export bộ 100 item

```bat
node tools\export-content.js --source content\animals\animals_vi_3_5_mvp_100.json --suffix mvp_100
```

Kết quả được tạo trong:

```txt
exports/generated/
```

## Printable Product Pack

Chạy lệnh:

```bat
node tools\export-content.js --source content\animals\animals_vi_3_5_mvp_100.json --suffix mvp_100 --printable
```

Kết quả:

```txt
exports/printable/
```

Có thể mở file `.html` bằng trình duyệt rồi dùng Print -> Save as PDF.

Cấu trúc:
```txt
content/        Dữ liệu gốc
apps/           Mini app thử nghiệm
tools/          Script xuất nội dung
templates/      Template xuất nội dung
docs/           Tài liệu sản phẩm
prompts/        Prompt giao AI/Codex
exports/        File xuất thử
```

Lộ trình:
1. Kiểm 20 item mẫu.
2. Tạo thêm 80 item để đủ bộ 100.
3. Xuất PDF Ebook.
4. Xuất flashcard.
5. Xuất coloring book.
6. Tạo 30 video shorts đầu tiên.
7. Làm landing page.
8. Test với phụ huynh/trẻ thật.
