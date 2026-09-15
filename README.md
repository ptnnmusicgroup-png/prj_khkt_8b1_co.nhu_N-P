# KatLearn | English Learning Platform

## Chạy ứng dụng

1. Cài Node.js 18+.
2. Chạy `npm install` và sao chép `.env.example` thành `.env`.
3. Dán OpenAI API key vào `OPENAI_API_KEY` trong `.env`.
4. Chạy `npm start`, rồi mở `http://localhost:3000`.

## Kết nối Firebase

Trong giao diện, mở nút bánh răng ở góc trên phải và dán Firebase Web app config (JSON) từ Firebase Console. Firebase Web config là cấu hình công khai; bảo mật dữ liệu phải được thực hiện bằng Firebase Authentication và Firestore Security Rules trước khi phát hành.

Trong Firebase Console, bật **Authentication → Sign-in method → Google** và **Apple**. Với Apple, thêm Service ID, Apple Team ID, Key ID và private key theo phần cấu hình của Firebase; đồng thời thêm domain triển khai vào **Authorized domains**. Sao chép nội dung tệp `firestore.rules` vào Firestore Rules rồi Publish.

## Dữ liệu được lưu

- `users/{userId}`: xu, năng lượng, streak, tiến độ và lần học gần nhất.
- `users/{userId}/items/{itemId}`: vật phẩm đã mua.
- `users/{userId}/attempts/*`: từng câu làm, đúng/sai, dạng bài, từ vựng và thời điểm làm — đây là nền tảng cho đề review sau 30 ngày.

Không dán OpenAI API key vào Firebase config hoặc JavaScript chạy trên trình duyệt. Theo [hướng dẫn OpenAI](https://platform.openai.com/docs/quickstart/make-your-first-api-request), khóa phải được giữ ở biến môi trường phía máy chủ.

## Kích hoạt tài khoản Admin

1. Trong `admin-config.js`, thay mảng rỗng bằng email Google của admin, ví dụ `['you@gmail.com']`.
2. Tạo service-account JSON trong Firebase Console → Project settings → Service accounts. Không đưa tệp JSON này lên mạng hay commit vào Git.
3. Chạy `npm install`, sau đó: `node scripts/grant-admin.js you@gmail.com path/to/service-account.json`.
4. Đăng xuất và đăng nhập lại để token nhận quyền admin, rồi publish lại `firestore.rules`.
