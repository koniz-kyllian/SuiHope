// src/mockData.ts

export const CAMPAIGNS = [
  {
    id: 1,
    title: "Test Hackathon (Chạy thật)", // Đổi tên chút để dễ nhận biết
    organizer: "Kyllian",
    description: "Dự án Demo kết nối Sui Blockchain Testnet.",
    fullDescription: "Đây là dự án mẫu để kiểm thử tính năng Donate On-chain. Mọi giao dịch quyên góp vào đây sẽ được ghi nhận trực tiếp trên Sui Testnet.",
    // 👇 ID THẬT CỦA BẠN (Lấy từ SuiScan)
    objectId: "0xaf01af097dac9d2a0ec77675903c361af61185795ddae63d3438027482f0c211",
    targetAmount: 1000,
    currentAmount: 0,
    daysLeft: 12,
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2531&auto=format&fit=crop",
    category: "Giáo dục",
    milestones: [
      { title: "Mua vật liệu xây dựng", amount: 1500, status: "completed" },
      { title: "Thi công phần thô", amount: 2000, status: "active" },
      { title: "Hoàn thiện và nội thất", amount: 1500, status: "pending" }
    ]
  },
  {
    id: 2,
    title: "Cứu trợ lũ lụt Miền Trung",
    organizer: "Team SuiHope",
    description: "Hỗ trợ lương thực, thuốc men và áo phao khẩn cấp cho bà con vùng ngập lụt tại Quảng Bình.",
    fullDescription: "Cơn bão số 4 đã gây thiệt hại nặng nề. Chúng tôi cần 10,000 SUI để mua 500 thùng mì tôm, 200 áo phao và thuốc men cơ bản.",
    objectId: "", // Để rỗng vì chưa deploy
    targetAmount: 10000,
    currentAmount: 1200,
    daysLeft: 25,
    image: "https://images.unsplash.com/photo-1547638375-ebf04735d792?q=80&w=2574&auto=format&fit=crop",
    category: "Khẩn cấp",
    milestones: [
      { title: "Mua lương thực", amount: 3000, status: "active" },
      { title: "Vận chuyển", amount: 1000, status: "pending" }
    ]
  },
  {
    id: 3,
    title: "Nước sạch cho Buôn Đôn",
    organizer: "Green Life VN",
    description: "Lắp đặt hệ thống lọc nước phèn chua, cung cấp nước uống đạt chuẩn cho 500 hộ dân tộc thiểu số.",
    fullDescription: "Dự án nhằm mục đích cải thiện sức khỏe cộng đồng thông qua việc cung cấp nguồn nước sạch bền vững.",
    objectId: "", // Để rỗng vì chưa deploy
    targetAmount: 2000,
    currentAmount: 1950,
    daysLeft: 3,
    image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=2574&auto=format&fit=crop",
    category: "Môi trường",
    milestones: []
  }
];