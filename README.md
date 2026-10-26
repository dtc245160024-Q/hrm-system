# 🚀 Hệ Thống Quản Lý Nhân Sự (HRM System) & Giám Sát Hiệu Năng

Kho lưu trữ này chứa toàn bộ mã nguồn và cấu hình triển khai cho dự án **Hệ thống Quản lý Nhân sự (HRM)**, tích hợp ngăn xếp giám sát hệ thống thời gian thực trên Ubuntu Server thông qua Docker Compose.

---

## 🏗️ Tổng Quan Kiến Trúc Hệ Thống

1. **Phần Mềm Quản Lý Nhân Sự (HRM App):**
   - **Frontend / Backend:** Xây dựng các module quản lý nhân sự, thông tin nhân viên, chấm công và phòng ban.
   - **Database:** Sử dụng MySQL kết hợp phpMyAdmin để quản trị cơ sở dữ liệu trực quan qua nền tảng web.
   - **Web Server:** Nginx đảm nhiệm việc định tuyến và phân phối tải.

2. **Ngăn Xếp Giám Sát (Monitoring Stack):**
   - **Prometheus:** Thu thập và lưu trữ các số liệu (metrics) hiệu năng của hệ thống.
   - **cAdvisor:** Theo dõi mức tiêu thụ tài nguyên chi tiết (CPU, RAM, Network) của từng container Docker.
   - **Grafana:** Trực quan hóa dữ liệu qua **Dashboard 4 ô chuyên nghiệp** (Trạng thái Prometheus, CPU Docker, RAM Docker, Trạng thái Database).

---

## 📂 Cấu Trúc Thư Mục Dự Án

```text
├── phần phụ trợ/            # Mã nguồn backend / API của hệ thống HRM
├── giao diện người dùng/    # Mã nguồn frontend / giao diện quản trị
├── Prometheus/              # Tài liệu hoặc file cấu hình mở rộng cho Prometheus
├── docker-compose.yml       # File điều phối toàn bộ các container Docker
├── prometheus.yml           # File cấu hình cào dữ liệu (scrape targets)
└── loki-config.yaml         # Cấu hình quản lý nhật ký hệ thống (Logs)
```

---

## ⚙️ Hướng Dẫn Triển Khai Nhanh

### 1. Yêu cầu hệ thống
- Ubuntu Server (`192.168.23.128`)
- Docker & Docker Compose đã được cài đặt sẵn.

### 2. Các bước chạy dự án
Clone kho lưu trữ về máy và khởi động các dịch vụ:
```bash
git clone https://github.com/tovanquyen-blip/hrm-project.git
cd hrm-project
docker compose up -d
```

Kiểm tra trạng thái các container đang hoạt động:
```bash
docker compose ps
```

---

## 📊 Thông Tin Truy Cập Dịch Vụ

* **Ứng dụng HRM:** `http://192.168.23.128`
* **Grafana Dashboard (Giám sát):** `http://192.168.23.128:3000`
* **Prometheus UI:** `http://192.168.23.128:9090`
* **phpMyAdmin (Quản trị MySQL):** `http://192.168.23.128:<cổng_phpmyadmin>`

---

## 🛠️ Tác Giả
* **Học phần:** Chuyên Đề Tốt Nghiệp / Quản Trị Hệ Thống HRM
* **Môi trường:** Ubuntu Server & Docker Compose
