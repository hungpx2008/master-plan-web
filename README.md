# 📊 Tích hợp API ContainerGo – SNP ePort | Project Tracker

Công cụ theo dõi tiến độ dự án tích hợp API ContainerGo – SNP ePort bằng **Gantt Chart tương tác**, chạy hoàn toàn trên trình duyệt (không cần backend).

## 🖼️ Tổng quan

| Thông tin | Chi tiết |
|---|---|
| **Phạm vi** | Cảng Cát Lái – Hàng nhập - Hàng Xuất |
| **Timeline** | 11/02/2026 → 31/03/2026 |
| **Nghỉ Tết** | 14/02 → 22/02/2026 (không tính trễ) |
| **Milestones** | M0 → M4 (5 cột mốc chính) |
| **Tech Stack** | HTML + CSS + JavaScript thuần (không framework) |
| **Lưu trữ** | `localStorage` (dữ liệu giữ trên trình duyệt) |

## 🚀 Cách chạy

```bash
# Cách 1: Dùng serve
npx -y serve

# Cách 2: Mở trực tiếp
# Mở file index.html bằng trình duyệt
```

Truy cập: **http://localhost:3000**

## 📁 Cấu trúc file

```
├── index.html    # Cấu trúc trang (HTML)
├── style.css     # Giao diện light-mode
├── script.js     # Logic: Gantt, Admin, Drag/Resize, Import/Export
└── README.md     # File này
```

## 👤 Chế độ người dùng

### 🔒 Chế độ xem (mặc định)
- Xem Gantt Chart, milestones, timeline
- Hover task → xem tooltip chi tiết
- Click task → xem modal thông tin (chỉ đọc)
- Lọc task theo: Tất cả / CoGo / SNP / Phối hợp / Critical Path

### 🔓 Chế độ Admin
> Click nút **「🔒 Chế độ xem」** ở header → nhập mật khẩu → đăng nhập

**Admin có thể:**

| Tính năng | Mô tả |
|---|---|
| **Kéo thả task** | Kéo task bar trái/phải để thay đổi thời gian |
| **Resize task** | Kéo biên trái/phải của bar để thay đổi độ dài |
| **Chỉnh sửa modal** | Click task → sửa tên, owner, ngày, deliverable, dependency, status, progress, critical |
| **Thêm task** | Nút ➕ → điền thông tin → tạo task mới |
| **Xóa task** | Trong modal → nút 🗑️ → xác nhận xóa |
| **Tải template** | Nút 📥 → tải file `task_template.json` mẫu |
| **Import JSON** | Nút 📤 → chọn file JSON → import hàng loạt |

## 📥 Import / Export Tasks

### Tải template
Click **📥 Tải template** → nhận file `task_template.json`:

```json
[
  {
    "id": "P1-SNP-07",
    "name": "Tên task mẫu",
    "owner": "CoGo",
    "start": "2026-03-01",
    "end": "2026-03-05",
    "deliverable": "Đầu ra của task",
    "dependency": "P1-SNP-06",
    "critical": false
  }
]
```

### Format JSON

| Field | Bắt buộc | Giá trị |
|---|---|---|
| `id` | ✅ | Mã task duy nhất (VD: `P1-SNP-07`, `P2-05`) |
| `name` | ✅ | Tên công việc |
| `owner` | ✅ | `CoGo` \| `SNP` \| `Joint` |
| `start` | ✅ | Ngày bắt đầu `YYYY-MM-DD` |
| `end` | ✅ | Ngày kết thúc `YYYY-MM-DD` |
| `deliverable` | ❌ | Đầu ra (mặc định: —) |
| `dependency` | ❌ | Task phụ thuộc (VD: `P0-01`) |
| `critical` | ❌ | `true` / `false` (mặc định: false) |

### Import
Click **📤 Import JSON** → chọn file → hệ thống sẽ:
- Validate các trường bắt buộc
- Bỏ qua task trùng ID
- Tự động sắp xếp đúng vị trí theo prefix ID
- Báo lỗi nếu dữ liệu thiếu

## 🎨 Giao diện

- **Light mode** – nền sáng, dễ đọc
- **Color coding**: 🔵 CoGo | 🟢 SNP | 🟣 Phối hợp | 🔴 Critical
- **Holiday block**: Vùng xám cho kỳ nghỉ Tết
- **Today marker**: Đường đỏ đánh dấu ngày hiện tại
- **Milestone diamonds**: 5 cột mốc M0→M4 trên timeline
- **Zebra-striped rows**: Xen kẽ màu cho dễ đọc

## 💾 Lưu trữ dữ liệu

Mọi thay đổi (status, progress, thêm/sửa/xóa task, kéo thả) đều lưu vào **`localStorage`** với key `cogo_snp_gantt_v3`.

**Lưu ý:**
- Dữ liệu chỉ tồn tại trên trình duyệt đang dùng
- Xóa cache/localStorage sẽ reset về dữ liệu mặc định
- Để reset: DevTools (F12) → Application → Local Storage → xóa key `cogo_snp_gantt_v3`

## 🏗️ Phases & Milestones

| Phase | Thời gian | Nội dung |
|---|---|---|
| **Phase 0** | 11/02 → 13/02 | Trước Tết – Chốt scope, API list, security |
| **Nghỉ Tết** | 14/02 → 22/02 | Nghỉ Tết Âm lịch |
| **Phase 1A** | 23/02 → 13/03 | SNP phát triển API |
| **Phase 1B** | 23/02 → 13/03 | CoGo tích hợp |
| **Phase 2** | 16/03 → 20/03 | Integration Test |
| **Phase 3** | 23/03 → 27/03 | UAT Nội bộ CoGo |
| **Phase 4** | 30/03 → 31/03 | Go-Live |

| Milestone | Ngày | Ý nghĩa |
|---|---|---|
| **M0** | 13/02 | Spec & Security Freeze |
| **M1** | 13/03 | Dev Complete |
| **M2** | 20/03 | Integration Sign-off |
| **M3** | 27/03 | UAT Sign-off |
| **M4** | 31/03 | Go-live |

## 📋 Keyboard Shortcuts

| Phím | Hành động |
|---|---|
| `Esc` | Đóng tất cả modal đang mở |
| `Enter` | Submit mật khẩu admin |

---

**Repository:** https://github.com/hungpx2008/Commodity
