import DashboardLayout from '../layouts/DashboardLayout';
import { FileText, Download, Calendar, Share2, Printer } from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardReports() {
  
  const handleExport = (type: string) => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
        loading: `Đang tạo báo cáo ${type}...`,
        success: `Đã tải xuống Báo cáo ${type} thành công!`,
        error: 'Lỗi hệ thống',
    });
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-bold text-white">Báo cáo & Minh bạch</h1>
         <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#151720] border border-white/10 rounded-xl text-sm font-medium hover:bg-white/5">
                <Calendar size={16} />
                <span>Năm 2025</span>
            </button>
         </div>
      </div>

      {/* Grid Báo cáo */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Card 1: Báo cáo dòng tiền (Financial Report) */}
        <div className="bg-[#151720] border border-white/10 rounded-2xl p-6 group hover:border-blue-500/30 transition-all">
            <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                    <FileText size={32} />
                </div>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded font-bold uppercase">Sẵn sàng</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Báo cáo Kiểm toán Dòng tiền</h3>
            <p className="text-gray-400 text-sm mb-6">
                Chi tiết toàn bộ lịch sử giao dịch (TxHash), bằng chứng giải ngân và số dư ví thời gian thực trên mạng lưới Sui.
            </p>
            <div className="flex gap-3">
                <button 
                    onClick={() => handleExport('PDF')}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
                >
                    <Download size={16} /> PDF
                </button>
                <button 
                    onClick={() => handleExport('Excel')}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-gray-300 font-medium hover:bg-white/10 transition-colors"
                >
                    <FileText size={16} /> Excel
                </button>
            </div>
        </div>

        {/* Card 2: Báo cáo Tác động xã hội (Impact Report) */}
        <div className="bg-[#151720] border border-white/10 rounded-2xl p-6 group hover:border-purple-500/30 transition-all">
            <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                    <Share2 size={32} />
                </div>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded font-bold uppercase">Sẵn sàng</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Báo cáo Tác động Xã hội (ESG)</h3>
            <p className="text-gray-400 text-sm mb-6">
                Tổng hợp số lượng người thụ hưởng, hình ảnh thực địa và các chỉ số phát triển bền vững (SDGs) để làm hồ sơ năng lực.
            </p>
            <div className="flex gap-3">
                <button 
                    onClick={() => handleExport('ESG-PDF')}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-500 transition-colors"
                >
                    <Download size={16} /> PDF
                </button>
                <button className="px-3 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10">
                    <Printer size={16} />
                </button>
            </div>
        </div>

      </div>

      {/* Preview Báo cáo (Làm màu cho đẹp) */}
      <div className="mt-8 p-8 bg-white rounded-xl shadow-2xl opacity-90 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
         <div className="flex justify-between mb-8">
            <div className="text-black font-bold text-2xl">SuiHope CSR Report</div>
            <div className="text-gray-500">Tháng 01/2026</div>
         </div>
         <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
         </div>
         {/* Overlay mờ che đi */}
         <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent flex items-end justify-center pb-8">
            <span className="text-gray-500 italic text-sm">Bản xem trước tài liệu...</span>
         </div>
      </div>

    </DashboardLayout>
  );
}