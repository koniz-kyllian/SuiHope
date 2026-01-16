import { useCurrentAccount } from '@mysten/dapp-kit';
import { Wallet, History, Heart, ExternalLink, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { toast } from 'sonner';

// Mock Data: Lịch sử quyên góp của User
const DONATION_HISTORY = [
    { id: 1, campaign: "Xây trường vùng cao Hà Giang", amount: 50, date: "15/01/2026", txHash: "0x123...abc", status: "Thành công" },
    { id: 2, campaign: "Cứu trợ lũ lụt Miền Trung", amount: 100, date: "10/01/2026", txHash: "0x456...def", status: "Thành công" },
    { id: 3, campaign: "Nước sạch cho Buôn Đôn", amount: 20, date: "05/01/2026", txHash: "0x789...ghi", status: "Đang xử lý" },
];

export default function UserProfile() {
  const account = useCurrentAccount();
  const [activeTab, setActiveTab] = useState<'history' | 'campaigns'>('history');

  // Hàm copy địa chỉ ví
  const copyAddress = () => {
    if (account?.address) {
        navigator.clipboard.writeText(account.address);
        toast.success("Đã sao chép địa chỉ ví!");
    }
  };

  if (!account) {
    return (
        <div className="min-h-screen bg-[#0d0e12] flex items-center justify-center text-white">
            <div className="text-center">
                <Wallet size={48} className="mx-auto mb-4 text-gray-500"/>
                <h2 className="text-xl font-bold">Vui lòng kết nối ví để xem hồ sơ</h2>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0e12] pb-20">
      <Navbar onOpenCreateModal={() => {}} />

      {/* Cover Image & Avatar */}
      <div className="relative h-64 bg-gradient-to-r from-blue-900/40 to-purple-900/40">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-20 relative z-10">
         {/* Profile Card */}
         <div className="bg-[#151720]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-2xl">
            
            {/* Avatar Gradient theo địa chỉ ví */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 p-1 shadow-lg shadow-purple-500/30">
                <div className="w-full h-full rounded-full bg-[#151720] flex items-center justify-center">
                    <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
                        {account.address.slice(2, 4).toUpperCase()}
                    </span>
                </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left space-y-2">
                <h1 className="text-3xl font-bold text-white">Người dùng ẩn danh</h1>
                
                <div 
                    onClick={copyAddress}
                    className="flex items-center justify-center md:justify-start gap-2 text-gray-400 hover:text-white cursor-pointer transition-colors"
                >
                    <span className="font-mono bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                        {account.address.slice(0, 6)}...{account.address.slice(-4)}
                    </span>
                    <Copy size={14} />
                </div>

                <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                    <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 flex items-center gap-2">
                        <Heart size={16} />
                        <span className="font-bold">170 SUI</span> đã quyên góp
                    </div>
                    <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 flex items-center gap-2">
                        <CheckCircle2 size={16} />
                        <span className="font-bold">3</span> chiến dịch tham gia
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 w-full md:w-auto">
                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-colors">
                    Chỉnh sửa hồ sơ
                </button>
            </div>
         </div>

         {/* Content Tabs */}
         <div className="mt-12 grid lg:grid-cols-3 gap-8">
            
            {/* Sidebar Tabs */}
            <div className="lg:col-span-1 space-y-4">
                <button 
                    onClick={() => setActiveTab('history')}
                    className={`w-full text-left p-4 rounded-xl flex items-center gap-3 transition-all ${
                        activeTab === 'history' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                >
                    <History size={20} />
                    <span className="font-medium">Lịch sử quyên góp</span>
                </button>
                <button 
                    onClick={() => setActiveTab('campaigns')}
                    className={`w-full text-left p-4 rounded-xl flex items-center gap-3 transition-all ${
                        activeTab === 'campaigns' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                >
                    <Heart size={20} />
                    <span className="font-medium">Dự án đã tạo</span>
                </button>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2 bg-[#151720] border border-white/10 rounded-2xl p-6 min-h-[400px]">
                {activeTab === 'history' ? (
                    <div>
                        <h2 className="text-xl font-bold text-white mb-6">Giao dịch gần đây</h2>
                        <div className="space-y-4">
                            {DONATION_HISTORY.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
                                            <Heart size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{item.campaign}</div>
                                            <div className="text-sm text-gray-400">{item.date}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-white">-{item.amount} SUI</div>
                                        <a href="#" className="text-xs text-blue-400 flex items-center justify-end gap-1 hover:underline">
                                            {item.txHash} <ExternalLink size={10} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        <Heart size={48} className="mx-auto mb-4 opacity-20" />
                        <p>Bạn chưa tạo chiến dịch nào.</p>
                        <button className="mt-4 text-blue-400 hover:text-blue-300">Tạo chiến dịch ngay &rarr;</button>
                    </div>
                )}
            </div>

         </div>
      </div>
    </div>
  );
}