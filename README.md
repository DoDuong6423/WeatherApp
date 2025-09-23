## Weather App (React + Vite)

Ứng dụng dự báo thời tiết dùng WeatherAPI, xây dựng với React và Vite.

### Truy cập bản deploy (Demo)

- Ứng dụng đã được deploy tại: https://weather-gge0kn7pq-doduongs-projects.vercel.app/

### Yêu cầu

- Node.js >= 18
- npm >= 8

### Cài đặt và chạy trên local

1. Clone dự án
   git clone https://github.com/DoDuong6423/WeatherApp.git
   cd Weather-App
2. Cài đặt dependencies
   npm install
3. Tạo file môi trường `.env` ở thư mục gốc và thêm API key từ WeatherAPI
   VITE_API_KEY=your_weatherapi_key
   - Đăng ký và lấy key tại: `https://www.weatherapi.com/`
4. Chạy development server
   npm run dev

### Quyền vị trí (Geolocation)

- Tính năng tìm theo vị trí yêu cầu quyền truy cập vị trí của trình duyệt. Nếu bị từ chối, ứng dụng sẽ hiển thị thông báo.

### Lỗi thường gặp

- Thiếu API key / sai key: Đảm bảo đã tạo `.env` và chạy lại dev server sau khi thêm `VITE_API_KEY`.
- 401/403 từ WeatherAPI: Kiểm tra hạn mức hoặc trạng thái key trên trang quản trị WeatherAPI.
- Không hiển thị icon: Kiểm tra file trong `public/icons` và đảm bảo tên khớp với các key trong `src/constants.js`.
