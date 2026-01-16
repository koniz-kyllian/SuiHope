import DashboardLayout from '../layouts/DashboardLayout';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardSettings() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-white mb-8">Cài đặt Tổ chức</h1>

      <div className="max-w-2xl space-y-6">
        {/* Form Thông tin */}
        <div className="bg-[#151720] border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Hồ sơ Doanh nghiệp</h2>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Tên công ty</label>
                    <input type="text" defaultValue="Vinamilk Corp" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Mã số thuế</label>
                    <input type="text" defaultValue="0300588569" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm text-gray-400">Email liên hệ CSR</label>
                <input type="email" defaultValue="csr@vinamilk.com.vn" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none" />
            </div>

            <div className="space-y-2">
                <label className="text-sm text-gray-400">Địa chỉ ví quản trị (Admin Wallet)</label>
                <input type="text" disabled defaultValue="0x7d2...8f1a" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-gray-500 cursor-not-allowed" />
            </div>
        </div>

        {/* Nút Save */}
        <button 
            onClick={() => toast.success("Đã lưu cài đặt thành công!")}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-xl text-white font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
        >
            <Save size={18} /> Lưu thay đổi
        </button>
      </div>
    </DashboardLayout>
  );
}