# CONTENT_SCHEMA

Mỗi item là một hạt kiến thức. Một item phải đủ dữ liệu để xuất ra nhiều định dạng.

## Field chính

- `id`: mã duy nhất.
- `topic`: chủ đề.
- `ageGroup`: nhóm tuổi: 3-5, 6-8, 9-12.
- `title`: tên bài/con vật/khái niệm.
- `riddle`: câu đố dạng thơ hoặc văn vần.
- `answer`: đáp án.
- `fact`: kiến thức nhỏ, đúng, ngắn.
- `vocabulary`: từ vựng cần học.
- `quiz`: câu hỏi trắc nghiệm.
- `coloringPrompt`: prompt tạo tranh tô màu.
- `imagePrompt`: prompt tạo ảnh minh họa.
- `shortVideoScript`: kịch bản video ngắn.
- `worksheetInstruction`: hướng dẫn bài tập in ra.
- `parentGuide`: gợi ý cho phụ huynh hỏi/chơi cùng bé.
- `safetyNotes`: cảnh báo an toàn nếu có.
- `difficulty`: 1-5.
- `status`: draft/reviewed/published.

## Quy tắc
- Không đưa kiến thức chưa chắc chắn.
- Không dùng nội dung gây sợ hãi cho trẻ nhỏ.
- Không khuyến khích trẻ tiếp xúc động vật lạ.
- Mỗi item chỉ dạy 1 ý chính.
- Ngôn ngữ 3-5 tuổi phải ngắn, dễ đọc, có nhịp.
