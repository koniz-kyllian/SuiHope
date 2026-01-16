import { User, Building2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onSelect: (role: 'USER' | 'ENTERPRISE') => void;
}

export default function RoleSelectionModal({ isOpen, onSelect }: RoleSelectionModalProps) {
  const [selected, setSelected] = useState<'USER' | 'ENTERPRISE' | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="max-w-3xl w-full bg-[#151720] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-10 relative z-10">
            <h2 className="text-3xl font-bold text-white mb-2">Chào mừng đến với SuiHope! 👋</h2>
            <p className="text-gray-400">Để bắt đầu, hãy cho chúng tôi biết bạn muốn sử dụng nền tảng với vai trò gì?</p>
        </div>

        {/* 2 Lựa chọn */}
        <div className="grid md:grid-cols-2 gap-6 relative z-10">
            
            {/* Lựa chọn 1: Cá nhân */}
            <div 
                onClick={() => setSelected('USER')}
                className={`cursor-pointer p-6 rounded-2xl border-2 transition-all group ${
                    selected === 'USER' 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-white/10 bg-white/5 hover:border-blue-500/50'
                }`}
            >
                <div className="w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <User size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Nhà hảo tâm (Cá nhân)</h3>
                <p className="text-sm text-gray-400 mb-4">
                    Tôi muốn tìm kiếm các dự án thiện nguyện uy tín, quyên góp và theo dõi dòng tiền minh bạch.
                </p>
                {selected === 'USER' && <div className="text-blue-400 flex items-center gap-2 text-sm font-bold"><CheckCircle2 size={16}/> Đã chọn</div>}
            </div>

            {/* Lựa chọn 2: Doanh nghiệp */}
            <div 
                onClick={() => setSelected('ENTERPRISE')}
                className={`cursor-pointer p-6 rounded-2xl border-2 transition-all group ${
                    selected === 'ENTERPRISE' 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-white/10 bg-white/5 hover:border-purple-500/50'
                }`}
            >
                <div className="w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Building2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Tổ chức / Doanh nghiệp</h3>
                <p className="text-sm text-gray-400 mb-4">
                    Tôi muốn tạo chiến dịch gây quỹ, quản lý giải ngân theo cột mốc và xuất báo cáo CSR.
                </p>
                {selected === 'ENTERPRISE' && <div className="text-purple-400 flex items-center gap-2 text-sm font-bold"><CheckCircle2 size={16}/> Đã chọn</div>}
            </div>

        </div>

        {/* Footer Button */}
        <div className="mt-8 text-center relative z-10">
            <button 
                onClick={() => selected && onSelect(selected)}
                disabled={!selected}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
            >
                Tiếp tục &rarr;
            </button>
        </div>

        {/* Background Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-blue-900/10 pointer-events-none" />
      </div>
    </div>
  );
}