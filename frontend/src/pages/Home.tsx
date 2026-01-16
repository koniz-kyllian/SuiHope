import { useState } from 'react';
import Navbar from '../components/Navbar'; // Lưu ý dấu ..
import CampaignCard from '../components/CampaignCard';
import CreateCampaignModal from '../components/CreateCampaignModal';
import { CAMPAIGNS } from '../mockData'; // Import data từ file chung

export default function Home() { // Đổi tên App -> Home
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen pb-20 px-4 overflow-x-hidden">
      <Navbar onOpenCreateModal={() => setIsModalOpen(true)} />

      <main className="max-w-6xl mx-auto pt-32 text-center space-y-8">
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          Minh bạch từ thiện <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(100,100,255,0.3)]">
            trên nền tảng Sui
          </span>
        </h1>
        
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Nền tảng quản trị nguồn vốn thiện nguyện phi tập trung. 
        </p>

        {/* Nút Mobile */}
        <button 
            onClick={() => setIsModalOpen(true)}
            className="md:hidden mt-6 px-6 py-3 bg-blue-600 rounded-xl font-bold text-white shadow-lg shadow-blue-500/30"
        >
            Bắt đầu gây quỹ ngay
        </button>
        
        {/* List Campaigns */}
        <div className="mt-20 text-left">
           <div className="flex justify-between items-end mb-8 px-2">
              <div>
                <h2 className="text-3xl font-bold text-white">Chiến dịch nổi bật</h2>
                <p className="text-gray-400 mt-2">Các dự án đang cần sự chung tay của cộng đồng.</p>
              </div>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CAMPAIGNS.map((camp) => (
                <div key={camp.id} className="h-full">
                  <CampaignCard data={camp} />
                </div>
              ))}
           </div>
        </div>
      </main>

      <CreateCampaignModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <div className="fixed top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] -z-10 pointer-events-none mix-blend-screen" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-screen" />
    </div>
  )
}