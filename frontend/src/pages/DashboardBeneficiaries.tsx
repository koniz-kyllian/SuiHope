import DashboardLayout from '../layouts/DashboardLayout';
import { Search, MapPin, CheckCircle2, MoreHorizontal, Image as ImageIcon, Download } from 'lucide-react';

// Dữ liệu giả định (Mock Data)
const BENEFICIARIES = [
    { id: 1, name: "Lê Văn A", location: "Hà Giang", amount: "500 SUI", campaign: "Xây trường học", status: "Verified", date: "15/01/2026", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Nguyễn Thị B", location: "Quảng Bình", amount: "200 SUI", campaign: "Cứu trợ lũ lụt", status: "Verified", date: "14/01/2026", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Trần Văn C", location: "Buôn Đôn", amount: "150 SUI", campaign: "Nước sạch", status: "Pending", date: "12/01/2026", avatar: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Trường THCS Lũng Cú", location: "Hà Giang", amount: "2000 SUI", campaign: "Xây trường học", status: "Verified", date: "10/01/2026", avatar: "https://ui-avatars.com/api/?name=School&background=random" },
];

export default function DashboardBeneficiaries() {
  return (
    <DashboardLayout>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
         <div>
            <h1 className="text-3xl font-bold text-white">Danh sách Người thụ hưởng</h1>
            <p className="text-gray-400 mt-1">Quản lý và xác minh danh tính những người nhận hỗ trợ.</p>
         </div>
         <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-xl text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
            <Download size={18} />
            Xuất danh sách (CSV)
         </button>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="bg-[#151720] border border-white/10 rounded-2xl p-4 mb-6 flex gap-4">
         <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-500" size={20} />
            <input 
                type="text" 
                placeholder="Tìm kiếm theo tên, CCCD hoặc địa điểm..." 
                className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:border-blue-500 outline-none"
            />
         </div>
         <select className="bg-black/20 border border-white/10 rounded-xl px-4 text-gray-300 outline-none">
            <option>Tất cả trạng thái</option>
            <option>Đã xác minh (Verified)</option>
            <option>Chờ duyệt (Pending)</option>
         </select>
      </div>

      {/* Table */}
      <div className="bg-[#151720] border border-white/10 rounded-2xl overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead className="bg-white/5 text-gray-400 text-xs uppercase font-medium">
                <tr>
                    <th className="p-4">Người nhận</th>
                    <th className="p-4">Dự án thụ hưởng</th>
                    <th className="p-4">Số tiền / Quà</th>
                    <th className="p-4">Trạng thái KYC</th>
                    <th className="p-4">Bằng chứng</th>
                    <th className="p-4 text-right"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {BENEFICIARIES.map((person) => (
                    <tr key={person.id} className="hover:bg-white/5 transition-colors group">
                        <td className="p-4">
                            <div className="flex items-center gap-3">
                                <img src={person.avatar} alt="" className="w-10 h-10 rounded-full bg-gray-700 object-cover" />
                                <div>
                                    <div className="font-bold text-white">{person.name}</div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <MapPin size={10} /> {person.location}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="p-4 text-gray-300">{person.campaign}</td>
                        <td className="p-4 font-mono text-blue-300">{person.amount}</td>
                        <td className="p-4">
                            {person.status === 'Verified' ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                    <CheckCircle2 size={12} /> Đã xác minh
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                    Chờ duyệt
                                </span>
                            )}
                        </td>
                        <td className="p-4">
                            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-400 transition-colors border border-white/10 px-2 py-1 rounded-lg hover:border-blue-500/30">
                                <ImageIcon size={12} /> Xem ảnh
                            </button>
                        </td>
                        <td className="p-4 text-right">
                            <button className="p-2 text-gray-500 hover:text-white transition-colors">
                                <MoreHorizontal size={18} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
         </table>
         
         {/* Pagination Mock */}
         <div className="p-4 border-t border-white/10 flex justify-between items-center text-sm text-gray-500">
            <span>Hiển thị 4 trong tổng số 128 kết quả</span>
            <div className="flex gap-2">
                <button className="px-3 py-1 border border-white/10 rounded-lg hover:bg-white/5 disabled:opacity-50">Trước</button>
                <button className="px-3 py-1 border border-white/10 rounded-lg hover:bg-white/5 text-white bg-white/5">1</button>
                <button className="px-3 py-1 border border-white/10 rounded-lg hover:bg-white/5">2</button>
                <button className="px-3 py-1 border border-white/10 rounded-lg hover:bg-white/5">3</button>
                <button className="px-3 py-1 border border-white/10 rounded-lg hover:bg-white/5">Sau</button>
            </div>
         </div>
      </div>

    </DashboardLayout>
  );
}