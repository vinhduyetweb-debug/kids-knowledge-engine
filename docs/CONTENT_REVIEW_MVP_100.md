# Content Review MVP 100

## Tổng quan

- Tổng item: 100
- Reviewed item hiện tại: 60
- Draft item hiện tại: 40
- Số item cần review kỹ: 40
- Số item có rủi ro kiến thức: 12
- Số item có rủi ro an toàn đã xử lý trong Batch 1: 2
- Số item nên cải thiện câu đố còn lại: 40

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

## Task 2C — Content Fix Batch 1

### Item đã sửa

| id | title | thay đổi chính | status sau sửa |
|---|---|---|---|
| `animal_giraffe_vi_3_5` | Con hươu cao cổ | Viết lại riddle, fact, quiz, prompts, worksheet và parent guide theo đặc điểm cổ dài. | reviewed |
| `animal_dolphin_vi_3_5` | Con cá heo | Viết lại nội dung quanh bơi dưới biển, thân trơn và âm thanh. | reviewed |
| `animal_whale_vi_3_5` | Con cá voi | Viết lại nội dung quanh thân lớn, biển rộng và phun nước. | reviewed |
| `animal_shark_vi_3_5` | Con cá mập | Viết lại nội dung không gây sợ, thêm nhấn mạnh vây lưng và quan sát an toàn. | reviewed |
| `animal_starfish_vi_3_5` | Con sao biển | Viết lại nội dung quanh hình ngôi sao và cách quan sát sinh vật biển. | reviewed |
| `animal_crab_vi_3_5` | Con cua | Viết lại nội dung quanh hai càng, mai cứng và đi ngang. | reviewed |
| `animal_shrimp_vi_3_5` | Con tôm | Viết lại nội dung quanh râu dài, thân cong và sống dưới nước. | reviewed |
| `animal_squid_vi_3_5` | Con mực | Viết lại nội dung quanh thân mềm, nhiều tay nhỏ và sống ở biển. | reviewed |
| `animal_octopus_vi_3_5` | Con bạch tuộc | Viết lại nội dung quanh tám tay mềm và khả năng ẩn mình. | reviewed |
| `animal_zebra_vi_3_5` | Con ngựa vằn | Viết lại nội dung quanh sọc đen trắng. | reviewed |
| `animal_deer_vi_3_5` | Con hươu | Viết lại nội dung quanh chân thon, ăn lá và chạy nhanh. | reviewed |
| `animal_stag_vi_3_5` | Con nai | Viết lại nội dung quanh dáng nhẹ, rừng và ăn lá. | reviewed |
| `animal_bear_vi_3_5` | Con gấu | Viết lại nội dung quanh lông dày, thân to và quan sát an toàn. | reviewed |
| `animal_panda_vi_3_5` | Con gấu trúc | Viết lại nội dung quanh lông đen trắng và tre. | reviewed |
| `animal_tiger_vi_3_5` | Con hổ | Viết lại nội dung quanh vằn đen, rừng và quan sát an toàn. | reviewed |
| `animal_leopard_vi_3_5` | Con báo | Viết lại nội dung quanh đốm lông và chạy nhanh. | reviewed |
| `animal_wolf_vi_3_5` | Con sói | Viết lại nội dung quanh tai nhọn, sống theo bầy và an toàn. | reviewed |
| `animal_crocodile_vi_3_5` | Con cá sấu | Viết lại nội dung quanh da sần, đuôi dài, gần nước và an toàn. | reviewed |
| `animal_hippo_vi_3_5` | Con hà mã | Viết lại nội dung quanh thân to, miệng rộng và sông hồ. | reviewed |
| `animal_rhino_vi_3_5` | Con tê giác | Viết lại nội dung quanh sừng trên mũi, da dày và bảo vệ động vật. | reviewed |

### SafetyNotes đã bổ sung

| id | title | safetyNotes |
|---|---|---|
| `animal_bee_vi_3_5` | Con ong | Bé không nên chạm vào ong hoặc tổ ong. Nếu thấy ong, hãy đứng xa và gọi người lớn. |
| `animal_lion_vi_3_5` | Con sư tử | Sư tử là động vật hoang dã. Bé chỉ nên quan sát sư tử qua sách, video hoặc khi đi sở thú cùng người lớn. |
| `animal_shark_vi_3_5` | Con cá mập | Cá mập là động vật hoang dã dưới biển. Bé chỉ nên quan sát cá mập qua sách, video hoặc thủy cung an toàn cùng người lớn. |
| `animal_starfish_vi_3_5` | Con sao biển | Bé chỉ nên quan sát sao biển cùng người lớn, không tự ý nhặt hoặc mang sinh vật biển về nhà. |
| `animal_crab_vi_3_5` | Con cua | Bé không nên tự chạm vào càng cua vì càng có thể kẹp đau. |
| `animal_bear_vi_3_5` | Con gấu | Gấu là động vật hoang dã. Bé chỉ nên quan sát gấu qua sách, video hoặc ở sở thú cùng người lớn. |
| `animal_tiger_vi_3_5` | Con hổ | Hổ là động vật hoang dã. Bé chỉ nên quan sát hổ qua sách, video hoặc ở sở thú cùng người lớn. |
| `animal_leopard_vi_3_5` | Con báo | Báo là động vật hoang dã. Bé chỉ nên quan sát báo qua sách, video hoặc ở nơi an toàn cùng người lớn. |
| `animal_wolf_vi_3_5` | Con sói | Sói là động vật hoang dã. Bé không nên lại gần sói hoặc động vật lạ. |
| `animal_crocodile_vi_3_5` | Con cá sấu | Cá sấu là động vật hoang dã. Bé chỉ nên quan sát cá sấu ở nơi an toàn và luôn đi cùng người lớn. |
| `animal_hippo_vi_3_5` | Con hà mã | Hà mã là động vật hoang dã. Bé chỉ nên quan sát hà mã ở nơi an toàn cùng người lớn. |
| `animal_rhino_vi_3_5` | Con tê giác | Tê giác là động vật hoang dã. Bé chỉ nên quan sát tê giác qua sách, video hoặc ở sở thú cùng người lớn. |

### Item còn cần sửa ở batch sau

Sau Batch 2, còn 40 item `draft` chưa xử lý, từ `animal_dragonfly_vi_3_5` đến `animal_manta_ray_vi_3_5`. Batch sau nên tiếp tục sửa theo nhóm 20 item, ưu tiên câu đố còn template, fact còn mơ hồ và safetyNotes cho các con vật có rủi ro.

## Task 2D — Content Fix Batch 2

### Item đã sửa

| id | title | thay đổi chính | status sau sửa |
|---|---|---|---|
| `animal_camel_vi_3_5` | Con lạc đà | Viết lại riddle, fact, quiz, prompts, worksheet và parent guide quanh bướu và sa mạc. | reviewed |
| `animal_kangaroo_vi_3_5` | Con chuột túi | Viết lại nội dung quanh nhảy xa, chân sau và túi trước bụng. | reviewed |
| `animal_koala_vi_3_5` | Con gấu túi | Viết lại nội dung quanh ôm cành cây, lông mềm và sống trên cây. | reviewed |
| `animal_squirrel_vi_3_5` | Con sóc | Viết lại nội dung quanh đuôi xù, leo cây và ôm hạt. | reviewed |
| `animal_mouse_vi_3_5` | Con chuột | Viết lại nội dung quanh thân nhỏ, ria và chạy nhanh; thêm hướng dẫn an toàn. | reviewed |
| `animal_porcupine_vi_3_5` | Con nhím | Viết lại nội dung quanh gai lưng và quan sát an toàn. | reviewed |
| `animal_bat_vi_3_5` | Con dơi | Viết lại nội dung không gây sợ quanh cánh mỏng, bay đêm và ngủ ngược. | reviewed |
| `animal_owl_vi_3_5` | Con cú mèo | Viết lại nội dung quanh mắt tròn, ban đêm và tiếng kêu. | reviewed |
| `animal_eagle_vi_3_5` | Con đại bàng | Viết lại nội dung quanh cánh rộng, bay cao và mắt tinh. | reviewed |
| `animal_peacock_vi_3_5` | Con chim công | Viết lại nội dung quanh đuôi xòe nhiều màu. | reviewed |
| `animal_sparrow_vi_3_5` | Con chim sẻ | Viết lại nội dung quanh thân nhỏ, bay nhanh và líu lo. | reviewed |
| `animal_pigeon_vi_3_5` | Con chim bồ câu | Viết lại nội dung quanh gật gù, bay về mái nhà và sống gần người. | reviewed |
| `animal_flamingo_vi_3_5` | Con chim hồng hạc | Viết lại nội dung quanh chân dài, màu hồng và hồ nước. | reviewed |
| `animal_parrot_vi_3_5` | Con vẹt | Viết lại nội dung quanh lông nhiều màu, mỏ cong và bắt chước âm thanh. | reviewed |
| `animal_swan_vi_3_5` | Con thiên nga | Viết lại nội dung quanh cổ dài, lông trắng và bơi trên hồ. | reviewed |
| `animal_goose_vi_3_5` | Con ngỗng | Viết lại nội dung quanh cổ dài, kêu vang và bơi; thêm hướng dẫn an toàn. | reviewed |
| `animal_turkey_vi_3_5` | Con gà tây | Viết lại nội dung quanh đuôi xòe tròn và nông trại. | reviewed |
| `animal_ant_vi_3_5` | Con kiến | Viết lại nội dung quanh thân nhỏ, đi thành hàng và tổ kiến. | reviewed |
| `animal_mosquito_vi_3_5` | Con muỗi | Viết lại nội dung quanh vo ve, tránh muỗi đốt và phòng muỗi an toàn. | reviewed |
| `animal_fly_vi_3_5` | Con ruồi | Viết lại nội dung quanh vệ sinh, rửa tay và che đậy đồ ăn. | reviewed |

### SafetyNotes đã bổ sung

| id | title | safetyNotes |
|---|---|---|
| `animal_mouse_vi_3_5` | Con chuột | Bé không nên tự bắt hoặc chạm vào chuột. Nếu thấy chuột trong nhà, hãy gọi người lớn. |
| `animal_porcupine_vi_3_5` | Con nhím | Gai nhím có thể nhọn. Bé chỉ nên quan sát nhím từ xa cùng người lớn. |
| `animal_bat_vi_3_5` | Con dơi | Bé không nên chạm vào dơi lạ. Nếu thấy dơi trong nhà, hãy gọi người lớn. |
| `animal_goose_vi_3_5` | Con ngỗng | Bé nên quan sát ngỗng cùng người lớn, không tự ý trêu chọc hoặc lại quá gần con vật lạ. |
| `animal_ant_vi_3_5` | Con kiến | Bé không nên chạm vào tổ kiến. Nếu thấy nhiều kiến, hãy gọi người lớn giúp xử lý. |
| `animal_mosquito_vi_3_5` | Con muỗi | Bé nên tránh để muỗi đốt. Khi có nhiều muỗi, hãy nhờ người lớn mắc màn hoặc dùng cách phòng muỗi an toàn. |
| `animal_fly_vi_3_5` | Con ruồi | Bé không nên chạm vào ruồi. Hãy giữ đồ ăn sạch và rửa tay sau khi chơi. |

### Trạng thái sau Batch 2

- Reviewed: 60
- Draft còn lại: 40
- Ghi chú: Batch tiếp theo nên xử lý 20 item draft kế tiếp, từ `animal_dragonfly_vi_3_5` đến khoảng `animal_shellfish_vi_3_5`, ưu tiên câu đố còn template và safetyNotes cho sinh vật cần quan sát cùng người lớn.

## Kết luận

- Có nên dùng file 100 item cho app demo không? Có thể dùng cho demo nội bộ hoặc prototype, vì validation kỹ thuật ổn và hiện có 60 item `reviewed`.
- Có nên dùng cho sản phẩm bán chưa? Chưa nên. Vẫn còn 40 item `draft` cần rewrite/review thủ công, đặc biệt câu đố và fact.
- Bước tiếp theo đề xuất: tiếp tục Content Fix Batch 3 với 20 item draft kế tiếp, từ `animal_dragonfly_vi_3_5` đến khoảng `animal_shellfish_vi_3_5`.
