# 🪷 Khơi Nguồn Dân Tộc - Việt Phục Remix

**Dự án tham dự Đề thi Audition: Việt phục Remix - Phối trang phục truyền thống theo phong cách Gen Z**

---

## 📖 Bối cảnh & Thử thách (Từ đề bài)

- **Bối cảnh:** Việt phục (Áo dài, tứ thân, giao lĩnh, ngũ thân...) đang dần trở lại mạnh mẽ trong giới trẻ. Tuy nhiên, việc tìm hiểu các đặc điểm cấu trúc hay tự do sáng tạo phối đồ sao cho vừa hiện đại (chuẩn Gen Z) mà vẫn tôn trọng giá trị nguyên bản của văn hóa lại chưa thật sự dễ dàng.
- **Thử thách:** Xây dựng một ứng dụng giúp học sinh, sinh viên khám phá trang phục truyền thống, thử nghiệm phối đồ với phụ kiện, phong cách cá nhân một cách sáng tạo nhưng vẫn bảo đảm thông tin văn hóa được thể hiện chuẩn mực.

---

## 💡 Giải pháp của chúng tôi

Dự án **Khơi Nguồn Dân Tộc** là một web app tương tác, kết hợp giữa yếu tố tìm hiểu lịch sử trực quan và ứng dụng công nghệ Trí Tuệ Nhân Tạo (AI) để giải quyết trọn vẹn yêu cầu bài toán:

### 1. Khám Phá Nhóm Trang Phục & Bối Cảnh Văn Hóa
- **Trải nghiệm Timeline (Filmstrip Carousel):** Giới thiệu trực quan về trang phục qua các triều đại lịch sử (Thời Hùng Vương, Lý, Trần, Lê Sơ, Nguyễn) và sự tiến hóa của chiếc Áo dài qua thời gian.
- **Chi tiết chuyên sâu (Modal):** Khi người dùng muốn tìm hiểu sâu, hệ thống cung cấp thông tin chi tiết về đặc điểm cấu trúc, chất liệu, kiểu dáng và ý nghĩa văn hóa lịch sử của từng bộ trang phục.

### 2. Xác Định Nhu Cầu & Phác Thảo Trải Nghiệm Phối Đồ
- **Khu vực Phối Đồ (Styling Studio):** Giao diện được thiết kế hiện đại, phù hợp thị hiếu Gen Z.
- Người dùng có thể tự do **tùy biến Prompt AI** bằng cách lựa chọn các thẻ (pills) kết hợp:
  - 🏺 **Triều đại** (Lý, Trần, Lê Sơ, Nguyễn, v.v.)
  - 🎨 **Phong cách** (Cổ phục nguyên bản, Cyberpunk, Streetwear, Dạ hội, v.v.)
  - ✨ **Cảm hứng/Họa tiết** (Hoa sen, Rồng thời Lý, Gốm sứ, Neon, v.v.)
  - 📅 **Dịp mặc** (Dạo phố, Lễ Tết, Trình diễn, v.v.)
  - ✍️ **Ý tưởng tự do** để cá nhân hóa hoàn toàn.
- Hệ thống sẽ sinh ra hình ảnh phối đồ "Việt phục Remix" độc bản, mang đậm dấu ấn cá nhân thông qua công nghệ Text-to-Image AI.

### 3. Bảo Đảm Thông Tin Văn Hóa Thể Hiện Chuẩn Mực
Để đảm bảo sự sáng tạo không đi quá giới hạn và làm sai lệch bản sắc, dự án tích hợp tính năng **Trợ lý Văn hóa - "Bà Nội AI"**.
- 👵 **Mascot Bà Nội AI** luôn túc trực trên giao diện dưới góc màn hình.
- Khi người dùng đưa ra các lựa chọn phối đồ (ví dụ như kết hợp sai lịch sử), Bà Nội AI sẽ đưa ra các **cảnh báo nhẹ nhàng hoặc gợi ý (Suggestions)** về mặt văn hóa lịch sử (Ví dụ: "Cháu ơi, áo Giao lĩnh là của thời Trần, nếu phối với Bổ tử quan nhà Lê thì hơi "xuyên không" đấy!").
- Điều này giúp các bạn trẻ vừa được tự do sáng tạo, vừa được uốn nắn và tiếp thu kiến thức văn hóa một cách tự nhiên, gần gũi như được bà kể chuyện.

---

## ✨ Các Tính Năng Kỹ Thuật Nổi Bật

- **Thiết kế UI/UX đậm chất di sản:** Sử dụng hình ảnh hoa sen dạng nét vẽ line-art (hiệu ứng tự vẽ SVG), nền mây và sóng nước (họa tiết cổ), hiệu ứng cánh hoa rơi tinh tế. Tích hợp các hình mờ (watermark) như Bản đồ Việt Nam, Trống đồng Đông Sơn.
- **Hoạt ảnh (Animations):** CSS animations mượt mà, cuộn phim (carousel filmstrip) tự động.
- **Interactive Modals:** Giao diện popup chi tiết trang phục với đầy đủ cấu trúc (Chất liệu, Kiểu dáng, Lịch sử).
- **Prompt Generator UI:** Giao diện trực quan để ráp nối từ khóa (keywords) thành prompt mượt mà, cập nhật trực tiếp (Live Preview).
- **Thiết kế Responsive:** Tương thích tốt trên cả Desktop, Tablet và Mobile.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla - Không sử dụng framework để tối ưu hóa hiệu năng và dung lượng).
- **UI Design:** Flexbox, CSS Grid, Glassmorphism (Kính mờ), Custom SVG animations.

---
*Dự án ra đời với mong muốn mang văn hóa truyền thống đến gần hơn với nhịp sống của người trẻ hiện đại.* 🇻🇳
~ Hy vọng trang web sẽ là công cụ hỗ trợ độc đáo trong quá trình tìm hiểu về trang phục truyền thống cho mỗi người
