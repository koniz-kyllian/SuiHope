import { useState } from 'react';
import Navbar from '../components/Navbar';
import CampaignCard from '../components/CampaignCard';
import CreateCampaignModal from '../components/CreateCampaignModal';
import { CAMPAIGNS } from '../mockData'; 

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0d0e12] text-white pb-20 overflow-x-hidden font-sans">
      <Navbar onOpenCreateModal={() => setIsModalOpen(true)} />

      {/* Main Content Container */}
      {/* px-4 cho mobile, md:px-8 cho tablet/desktop */}
      <main className="max-w-7xl mx-auto pt-24 md:pt-32 px-4 md:px-8 text-center space-y-8 relative z-10">
        
        {/* HERO SECTION */}
        <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs md:text-sm font-medium mb-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                ✨ Nền tảng gây quỹ minh bạch trên Sui Blockchain
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1]">
              Minh bạch từ thiện <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(100,100,255,0.3)]">
                trên nền tảng Sui
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Giải pháp quản trị nguồn vốn thiện nguyện phi tập trung. 
              Theo dõi dòng tiền minh bạch từ lúc quyên góp đến khi giải ngân.
            </p>

            {/* Nút Mobile CTA */}
            <button 
                onClick={() => setIsModalOpen(true)}
                className="md:hidden mt-6 w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-bold text-white shadow-lg shadow-blue-500/30 active:scale-95 transition-transform"
            >
                Bắt đầu gây quỹ ngay
            </button>
        </div>
        
        {/* LIST CAMPAIGNS SECTION */}
        <div className="mt-16 md:mt-24 text-left">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Chiến dịch nổi bật</h2>
                <p className="text-gray-400 mt-2 text-sm md:text-base">Các dự án đang cần sự chung tay của cộng đồng.</p>
              </div>
              {/* Filter giả lập (làm cảnh cho đẹp) */}
              <div className="hidden md:flex gap-2">
                 <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors">Tất cả</button>
                 <button className="px-4 py-2 rounded-lg bg-transparent border border-white/10 text-gray-400 text-sm font-medium hover:text-white transition-colors">Giáo dục</button>
                 <button className="px-4 py-2 rounded-lg bg-transparent border border-white/10 text-gray-400 text-sm font-medium hover:text-white transition-colors">Y tế</button>
              </div>
           </div>
           
           {/* GRID SYSTEM: Responsive quan trọng ở đây */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {CAMPAIGNS.map((camp) => (
                <div key={camp.id} className="h-full transform hover:-translate-y-1 transition-transform duration-300">
                  <CampaignCard data={camp} />
                </div>
              ))}
           </div>
        </div>
      </main>

      {/* Modal */}
      <CreateCampaignModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Background Blobs (Hiệu ứng nền) */}
      <div className="fixed top-20 left-0 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-blue-600/20 rounded-full blur-[80px] md:blur-[100px] -z-10 pointer-events-none mix-blend-screen animate-pulse" />
      <div className="fixed bottom-20 right-0 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-purple-600/10 rounded-full blur-[100px] md:blur-[120px] -z-10 pointer-events-none mix-blend-screen" />
    </div>
  )
}