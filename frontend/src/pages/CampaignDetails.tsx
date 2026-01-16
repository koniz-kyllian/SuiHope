import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2, Circle, Share2, Wallet } from 'lucide-react';
import { CAMPAIGNS } from '../mockData';
import Navbar from '../components/Navbar';
import { toast } from 'sonner'; // Import thông báo
import { useCurrentAccount } from '@mysten/dapp-kit'; // Hook của Sui


export default function CampaignDetails() {
  const { id } = useParams();
  const campaign = CAMPAIGNS.find(c => c.id === Number(id));
  
  // State quản lý số tiền nhập vào
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Lấy thông tin ví
  const account = useCurrentAccount();

  if (!campaign) return <div className="text-white text-center pt-40">Không tìm thấy dự án!</div>;

  const percentage = Math.min((campaign.currentAmount / campaign.targetAmount) * 100, 100);

  // Hàm xử lý quyên góp
  const handleDonate = () => {
    // 1. Kiểm tra đã kết nối ví chưa
    if (!account) {
        toast.error("Vui lòng kết nối ví để quyên góp!");
        return;
    }

    // 2. Kiểm tra số tiền hợp lệ
    if (!amount || Number(amount) <= 0) {
        toast.warning("Vui lòng nhập số tiền hợp lệ!");
        return;
    }

    setIsLoading(true);
    
    // --- BẮT ĐẦU LOGIC SUI BLOCKCHAIN (MÔ PHỎNG) ---
    // Vì chưa có Smart Contract thật, ta sẽ giả lập một giao dịch thành công sau 2 giây
    // Khi có Contract, bạn sẽ dùng `tx.moveCall(...)` ở đây.
    
    setTimeout(() => {
        setIsLoading(false);
        toast.success(`Đã quyên góp thành công ${amount} SUI!`, {
            description: "Cảm ơn tấm lòng vàng của bạn. Transaction Hash: 0x123...abc",
            duration: 5000,
        });
        setAmount(''); // Reset ô nhập
    }, 2000);

    /* ĐOẠN CODE THẬT SAU NÀY SẼ DÙNG:
    const tx = new Transaction();
    const [coin] = tx.splitCoins(tx.gas, [tx.pure(Number(amount) * 1_000_000_000)]);
    tx.transferObjects([coin], campaign.organizerAddress);
    
    signAndExecuteTransaction({
        transaction: tx,
    }, {
        onSuccess: (result) => {
            toast.success("Quyên góp thành công!");
            setIsLoading(false);
        },
        onError: (err) => {
            toast.error("Giao dịch thất bại: " + err.message);
            setIsLoading(false);
        }
    });
    */
  };

  return (
    <div className="min-h-screen pb-20 bg-[#0d0e12]">
      <Navbar onOpenCreateModal={() => {}} />

      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/20 to-transparent -z-10" />

      <div className="max-w-6xl mx-auto pt-32 px-4">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={20} className="mr-2" /> Quay lại trang chủ
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* CỘT TRÁI - GIỮ NGUYÊN */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-video relative group">
               <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover"/>
               <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <span className="text-blue-300 font-medium">{campaign.category}</span>
               </div>
            </div>

            <div>
               <h1 className="text-4xl font-bold text-white mb-4 leading-tight">{campaign.title}</h1>
               <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg">
                    <ShieldCheck size={18} className="text-green-400" />
                    <span>Tổ chức bởi <span className="text-white font-medium">{campaign.organizer}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>Còn {campaign.daysLeft} ngày</span>
                  </div>
               </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
               <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Câu chuyện</h3>
               <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                 {campaign.fullDescription || campaign.description}
               </p>
               
               <h3 className="text-xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2">Lộ trình giải ngân (Minh bạch)</h3>
               <div className="space-y-4">
                  {campaign.milestones?.map((milestone, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className={`mt-1 ${milestone.status === 'completed' ? 'text-green-400' : milestone.status === 'active' ? 'text-blue-400' : 'text-gray-600'}`}>
                           {milestone.status === 'completed' ? <CheckCircle2 /> : <Circle />}
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between items-center mb-1">
                              <h4 className="font-semibold text-white">{milestone.title}</h4>
                              <span className="text-sm font-mono text-gray-400">{milestone.amount} SUI</span>
                           </div>
                           <div className="text-xs uppercase tracking-wider font-medium text-gray-500">
                             {milestone.status === 'completed' ? 'Đã giải ngân' : milestone.status === 'active' ? 'Đang kêu gọi' : 'Chờ khóa'}
                           </div>
                        </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* CỘT PHẢI - CẬP NHẬT PHẦN NÀY */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                   <div className="text-3xl font-bold text-blue-400">{campaign.currentAmount} <span className="text-lg text-gray-400">SUI</span></div>
                   <div className="text-right">
                      <div className="text-xs text-gray-500 uppercase">Mục tiêu</div>
                      <div className="font-medium text-white">{campaign.targetAmount} SUI</div>
                   </div>
                </div>
                <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden">
                   <div style={{ width: `${percentage}%` }} className="h-full bg-gradient-to-r from-blue-600 to-cyan-400" />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-400">
                   <span>{percentage.toFixed(0)}% đạt được</span>
                   <span>125 lượt quyên góp</span>
                </div>
              </div>

              {/* Form nhập tiền */}
              <div className="space-y-4">
                 <label className="block text-sm font-medium text-gray-300">Nhập số tiền muốn quyên góp</label>
                 <div className="relative">
                    <input 
                      type="number" 
                      placeholder="0.0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-4 pr-16 text-xl text-white font-bold focus:outline-none focus:border-blue-500 transition-all"
                    />
                    <span className="absolute right-4 top-4 font-bold text-gray-500">SUI</span>
                 </div>
                 
                 <div className="grid grid-cols-3 gap-2">
                    {[10, 50, 100].map(val => (
                       <button 
                        key={val} 
                        onClick={() => setAmount(val.toString())}
                        className="py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors border border-white/5"
                       >
                          {val} SUI
                       </button>
                    ))}
                 </div>

                 <button 
                    onClick={handleDonate}
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/30 text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                 >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Đang xử lý...
                        </>
                    ) : (
                        <>
                            <Wallet size={20} />
                            Quyên góp ngay
                        </>
                    )}
                 </button>

                 <p className="text-xs text-center text-gray-500 mt-4">
                    *Tiền của bạn sẽ được khóa trong Smart Contract và chỉ giải ngân khi có bằng chứng xác thực.
                 </p>
              </div>

              <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-gray-400 transition-colors">
                 <Share2 size={18} />
                 <span>Chia sẻ dự án này</span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}