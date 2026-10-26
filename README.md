Hệ Thống Quản Lý Nhân Sự (HRM System) & Giám Sát Tự Động

Kho lưu trữ này chứa mã nguồn và cấu hình triển khai cho dự án Hệ thống Quản lý Nhân sự (HRM) tích hợp ngăn xếp giám sát hiệu năng container thời gian thực trên hệ điều hành Ubuntu Server thông qua Docker Compose.

🚀 Các Thành Phần Chính Của Hệ Thống

Ứng dụng HRM (Core Application):

Giao diện người dùng / Backend: Cung cấp các chức năng quản lý nhân sự, thông tin nhân viên, phòng ban.

Cơ sở dữ liệu (MySQL & phpMyAdmin): Lưu trữ dữ liệu hệ thống và quản trị cơ sở dữ liệu trực quan qua nền tảng web.

Nginx / Web Server: Định tuyến và phân phối tải cho ứng dụng.

Ngăn Xếp Giám Sát (Monitoring Stack):

Prometheus: Thu thập và lưu trữ các số liệu (metrics) hiệu năng từ hệ thống và các container.

cAdvisor (Container Advisor): Phân tích tài nguyên sử dụng (CPU, RAM, Network, I/O) của từng container Docker.

Grafana: Trực quan hóa dữ liệu thông qua các Dashboard chuyên nghiệp với các biểu đồ theo dõi trạng thái, mức tiêu thụ tài nguyên phần cứng.

🛠️ Cấu Trúc Thư Mục Dự Án

├── phần phụ trợ/          # Source code backend / module phụ trợ HRM
├── giao diện người dùng/  # Source code frontend / giao diện quản trị
├── Prometheus/            # Tài liệu hoặc cấu hình mở rộng liên quan đến giám sát
├── docker-compose.yml     # Tệp cấu hình điều phối toàn bộ các container
├── prometheus.yml         # Tệp cấu hình mục tiêu cào dữ liệu (scrape targets) của Prometheus
└── loki-config.yaml       # Cấu hình quản lý nhật ký hệ thống (Logs)


⚙️ Hướng Dẫn Triển Khai Nhanh (Quick Start)

1. Yêu cầu hệ thống

Ubuntu Server (hoặc hệ điều hành Linux tương thích)

Docker & Docker Compose đã được cài đặt sẵn

2. Các bước chạy dự án

Clone mã nguồn về máy:

git clone <URL_REPOSITORY_CUA_BAN>
~/hrm-project


Khởi động toàn bộ các dịch vụ bằng Docker Compose:

docker compose up -d


Kiểm tra trạng thái các container đang hoạt động:

docker compose ps


📊 Truy Cập Các Dịch Vụ

Ứng dụng HRM: http://<IP_SERVER>:80 (hoặc cổng cấu hình tương ứng)

Grafana Dashboard (Giám sát hệ thống): http://<IP_SERVER>:3000

Prometheus UI: http://<IP_SERVER>:9090

phpMyAdmin (Quản trị MySQL): http://<IP_SERVER>:<cổng_phpmyadmin>

👥 Tác Giả & Phát Triển

Học phần: Chuyên Đề Học Phần HRM - ICTU

Môi trường triển khai: Ubuntu Server (192.168.23.128)
