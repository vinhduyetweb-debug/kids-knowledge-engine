# Content Review MVP 100

## Tổng quan

- Tổng item: 100
- Reviewed item ban đầu: 20
- Draft item: 80
- Số item cần review kỹ: 80
- Số item có rủi ro kiến thức: 12
- Số item có rủi ro an toàn: 2
- Số item nên cải thiện câu đố: 80

## Danh sách item cần review kỹ

Toàn bộ 80 item mới đang ở `status: draft` nên cần review thủ công trước khi chuyển sang `reviewed`. Lý do chính: câu đố, fact và parent guide đang dùng một mẫu lặp lại, phù hợp cho seed data nhưng chưa đủ chất lượng sản phẩm.

| # | id | title | mức độ | vấn đề | đề xuất |
|---|---|---|---|---|---|
| 21-100 | `animal_giraffe_vi_3_5` đến `animal_manta_ray_vi_3_5` | 80 item draft | Trung bình | Cấu trúc câu đố lặp lại: "Con gì có..., sống ở..."; nhiều câu nghe gượng với tiếng Việt tự nhiên. | Viết lại từng câu đố theo đặc điểm riêng, ưu tiên âm thanh/hình dáng/hành động dễ đoán. |
| 21-100 | `animal_giraffe_vi_3_5` đến `animal_manta_ray_vi_3_5` | 80 item draft | Trung bình | Fact dùng mẫu "thường được bé nhận ra ở..." nên khá mơ hồ, chưa thật sự là kiến thức nhỏ. | Viết fact cụ thể, đúng và ngắn cho từng con vật. |
| 21-100 | `animal_giraffe_vi_3_5` đến `animal_manta_ray_vi_3_5` | 80 item draft | Thấp | Parent guide lặp mẫu "có đặc điểm nào dễ nhận ra?", chưa gợi mở phong phú cho phụ huynh. | Đổi thành câu hỏi gần gũi: màu sắc, âm thanh, nơi sống, hành động. |
| 22 | `animal_dolphin_vi_3_5` | Con cá heo | Trung bình | Câu "có bơi nhanh" không tự nhiên. | Đổi hướng: "bơi nhanh, thân trơn, nhảy lên khỏi mặt nước". |
| 42 | `animal_kangaroo_vi_3_5` | Con chuột túi | Trung bình | Câu "có nhảy xa" không tự nhiên. | Đổi thành "nhảy xa bằng hai chân sau". |
| 43 | `animal_koala_vi_3_5` | Con gấu túi | Trung bình | Câu "có ôm cành cây" không tự nhiên. | Đổi thành "ôm cành cây, ngủ trên cây". |
| 52 | `animal_pigeon_vi_3_5` | Con chim bồ câu | Trung bình | Câu "có hiền lành" không phải đặc điểm hình ảnh rõ. | Đổi thành "lông xám, hay gật gù, bay quanh sân". |
| 58 | `animal_ant_vi_3_5` | Con kiến | Trung bình | Câu đố chưa nhắc đặc điểm dễ đoán nhất là đi thành hàng. | Thêm gợi ý "đi thành hàng, mang thức ăn nhỏ". |
| 65 | `animal_earthworm_vi_3_5` | Con giun đất | Trung bình | Fact chưa nói lợi ích đơn giản của giun đất. | Thêm ý "giúp đất tơi hơn" nếu xác nhận phù hợp. |
| 75 | `animal_coral_vi_3_5` | San hô | Cao | Title không có "Con", nhưng riddle hỏi "Con gì"; dễ lệch giọng kể. | Đổi riddle sang "Sinh vật gì..." hoặc đổi title/format cho nhất quán. |
| 82 | `animal_alpaca_vi_3_5` | Con alpaca | Trung bình | Con vật khá xa lạ với trẻ 3-5 ở Việt Nam, thiếu giải thích đơn giản. | Thêm giải thích "giống lạc đà nhỏ, lông mềm". |
| 83 | `animal_llama_vi_3_5` | Con lạc đà không bướu | Trung bình | Title dài, dễ khó nhớ với trẻ 3-5. | Cân nhắc giữ nhưng cần câu đố rất đơn giản và hình minh họa rõ. |
| 91 | `animal_lynx_vi_3_5` | Con linh miêu | Trung bình | Con vật xa lạ, fact chưa giải thích đủ. | Thêm đặc điểm tai có chùm lông và giống mèo rừng. |
| 93 | `animal_kiwi_vi_3_5` | Con chim kiwi | Trung bình | Có thể nhầm với quả kiwi nếu thiếu giải thích. | Nói rõ đây là một loài chim nhỏ. |
| 97 | `animal_gecko_vi_3_5` | Con tắc kè | Trung bình | Câu "có bám tường" không tự nhiên. | Đổi thành "bám trên tường rất giỏi". |

## Danh sách item nên thêm safetyNotes

| id | title | lý do | gợi ý safetyNotes |
|---|---|---|---|
| `animal_bee_vi_3_5` | Con ong | Ong có thể đốt; item 20 gốc chưa có `safetyNotes`. | Nhắc trẻ không chạm vào ong hoặc tổ ong, gọi người lớn nếu thấy tổ ong. |
| `animal_lion_vi_3_5` | Con sư tử | Sư tử là động vật hoang dã nguy hiểm; item 20 gốc chưa có `safetyNotes`. | Nhắc trẻ chỉ quan sát sư tử qua sách, phim hoặc ở sở thú an toàn với người lớn. |

## Danh sách item có fact cần kiểm tra lại

| id | title | fact hiện tại | lý do cần kiểm |
|---|---|---|---|
| `animal_giraffe_vi_3_5` đến `animal_manta_ray_vi_3_5` | 80 item draft | Mẫu chung: "`{title}` có `{feature}` và thường được bé nhận ra ở `{place}`." | Fact quá mơ hồ và lặp; nên viết lại thành kiến thức cụ thể cho từng item. |
| `animal_coral_vi_3_5` | San hô | San hô có nhiều nhánh và thường được bé nhận ra ở đáy biển. | Cần quyết định cách gọi "san hô" cho trẻ 3-5: sinh vật biển hay con vật; riddle hiện hỏi "Con gì". |
| `animal_alpaca_vi_3_5` | Con alpaca | Con alpaca có lông mềm và thường được bé nhận ra ở trang trại. | Con vật xa lạ; cần fact giải thích đơn giản hơn. |
| `animal_llama_vi_3_5` | Con lạc đà không bướu | Con lạc đà không bướu có cổ dài và thường được bé nhận ra ở vùng núi. | Title dài và con vật xa lạ; cần kiểm cách diễn đạt. |
| `animal_lynx_vi_3_5` | Con linh miêu | Con linh miêu có tai nhọn và thường được bé nhận ra ở rừng lạnh. | Con vật xa lạ; cần fact dễ hiểu hơn cho nhóm 3-5. |
| `animal_kiwi_vi_3_5` | Con chim kiwi | Con chim kiwi có mỏ dài và thường được bé nhận ra ở bụi cây. | Dễ nhầm với quả kiwi; cần nói rõ là loài chim. |
| `animal_manta_ray_vi_3_5` | Con cá đuối | Con cá đuối có vây rộng và thường được bé nhận ra ở biển. | Nên kiểm thêm safety/diễn đạt nếu dùng hình ảnh cá đuối thật. |

## Danh sách item có câu đố nên viết lại

| id | title | vấn đề | gợi ý hướng sửa |
|---|---|---|---|
| `animal_giraffe_vi_3_5` đến `animal_manta_ray_vi_3_5` | 80 item draft | Cùng một template, ít nhịp điệu và nhiều câu gượng: "có bơi nhanh", "có hiền lành", "có bám tường". | Viết lại theo từng nhóm: thú nuôi, thú hoang dã, chim, côn trùng, sinh vật biển. |
| `animal_dolphin_vi_3_5` | Con cá heo | "Con gì có bơi nhanh" sai tự nhiên tiếng Việt. | Dùng "bơi nhanh dưới biển xanh". |
| `animal_kangaroo_vi_3_5` | Con chuột túi | "Con gì có nhảy xa" gượng. | Dùng "nhảy xa bằng hai chân sau". |
| `animal_koala_vi_3_5` | Con gấu túi | "Con gì có ôm cành cây" gượng. | Dùng "ôm cành cây ngủ ngoan". |
| `animal_pigeon_vi_3_5` | Con chim bồ câu | "có hiền lành" khó hình dung. | Dùng "gật gù trên sân, bay về mái nhà". |
| `animal_ant_vi_3_5` | Con kiến | Chưa dùng gợi ý quen thuộc nhất. | Dùng "đi thành hàng, thân nhỏ xíu". |
| `animal_gecko_vi_3_5` | Con tắc kè | "có bám tường" gượng. | Dùng "bám trên tường rất giỏi". |
| `animal_coral_vi_3_5` | San hô | Riddle hỏi "Con gì" chưa khớp title. | Dùng "Sinh vật gì dưới đáy biển..." hoặc đổi cách gọi nhất quán. |

## Các sửa nhỏ đã thực hiện

Không sửa content trong task này.

## Kết luận

- Có nên dùng file 100 item cho app demo không? Có thể dùng cho demo nội bộ hoặc prototype, vì validation kỹ thuật ổn và 80 item mới đang là `draft`.
- Có nên dùng cho sản phẩm bán chưa? Chưa nên. Cần rewrite/review thủ công 80 item draft, đặc biệt câu đố và fact.
- Bước tiếp theo đề xuất: Task 2C nên là chỉnh nội dung có kiểm soát theo batch nhỏ, ví dụ 20 item/lần, bắt đầu từ nhóm có rủi ro cao: safetyNotes còn thiếu, san hô, các câu gượng, và các con vật xa lạ.
