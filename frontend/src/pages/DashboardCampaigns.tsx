import DashboardLayout from '../layouts/DashboardLayout';
import { Search, Filter, MoreHorizontal, CheckCircle, XCircle, FileText, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardCampaigns() {
  
  // Hàm giả lập duyệt yêu cầu
  const handleApprove = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
        loading: 'Đang tương tác Smart Contract...',
        success: 'Đã mở khóa giai đoạn 2 thành công! Tiền đang chuyển tới Organizer.',
        error: 'Lỗi mạng',
    });
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-bold text-white">Quản lý Chiến dịch</h1>
         <div className="flex gap-3">
            <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                <input 
                    type="text" 
                    placeholder="Tìm kiếm dự án..." 
                    className="bg-[#151720] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500"
                />
            </div>
            <button className="p-2 bg-[#151720] border border-white/10 rounded-xl hover:bg-white/5">
                <Filter size={18} className="text-gray-400" />
            </button>
         </div>
      </div>

      {/* 1. Phần quan trọng nhất: REQUEST APPROVAL (Duyệt giải ngân) */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"/>
            Yêu cầu giải ngân cần duyệt (1)
        </h2>
        
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="text-blue-400 font-bold text-lg mb-1">Dự án: Xây trường vùng cao Hà Giang</div>
                    <p className="text-gray-300 text-sm">Organizer <span className="text-white font-medium">Quỹ Trò Nghèo</span> muốn mở khóa <span className="text-white font-bold">Giai đoạn 2: Thi công phần thô</span>.</p>
                    <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1 text-xs bg-white/5 px-2 py-1 rounded border border-white/10 text-gray-400">
                            <FileText size={12} />
                            <span>Số tiền: 2,000 SUI</span>
                        </div>
                         <a href="#" className="flex items-center gap-1 text-xs text-blue-400 hover:underline">
                            <ExternalLink size={12} />
                            Xem bằng chứng (Hóa đơn/Ảnh)
                        </a>
                    </div>
                </div>
                
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors font-medium text-sm">
                        <XCircle size={16} /> Từ chối
                    </button>
                    <button 
                        onClick={() => handleApprove()}
                        className="flex items-center gap-2 px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all font-bold text-sm"
                    >
                        <CheckCircle size={16} /> Duyệt & Mở khóa tiền
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* 2. Danh sách các chiến dịch đang chạy (Table) */}
      <h2 className="text-xl font-bold text-white mb-4">Danh sách chiến dịch của tôi</h2>
      <div className="bg-[#151720] border border-white/10 rounded-2xl overflow-hidden">
         <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400 text-xs uppercase font-medium">
                <tr>
                    <th className="p-4">Tên dự án</th>
                    <th className="p-4">Tiến độ gây quỹ</th>
                    <th className="p-4">Trạng thái</th>
                    <th className="p-4">Đã giải ngân</th>
                    <th className="p-4 text-right">Hành động</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {[1, 2, 3].map((item) => (
                    <tr key={item} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                            <div className="font-medium text-white">Cứu trợ lũ lụt Miền Trung</div>
                            <div className="text-xs text-gray-500">ID: #00{item}83</div>
                        </td>
                        <td className="p-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-300">65%</span>
                                <div className="w-24 h-1.5 bg-white/10 rounded-full">
                                    <div className="h-full bg-green-500 rounded-full" style={{width: '65%'}}/>
                                </div>
                            </div>
                        </td>
                        <td className="p-4">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                Đang hoạt động
                            </span>
                        </td>
                        <td className="p-4 text-gray-300">1,500 / 5,000 SUI</td>
                        <td className="p-4 text-right">
                            <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                                <MoreHorizontal size={18} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
         </table>
      </div>

    </DashboardLayout>
  );
}