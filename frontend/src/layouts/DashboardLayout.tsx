import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PieChart, Users, Settings, LogOut, FileText, Menu, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';

// Menu items
const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Tổng quan', path: '/dashboard' },
  { icon: PieChart, label: 'Chiến dịch của tôi', path: '/dashboard/campaigns' },
  { icon: Users, label: 'Danh sách người nhận', path: '/dashboard/beneficiaries' },
  { icon: FileText, label: 'Báo cáo CSR', path: '/dashboard/reports' },
  { icon: Settings, label: 'Cài đặt tổ chức', path: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State quản lý menu mobile

  return (
    <div className="flex min-h-screen bg-[#0d0e12] text-white relative">
      
      {/* 1. MOBILE HEADER (Chỉ hiện trên mobile để bấm nút mở menu) */}
      <div className="md:hidden fixed top-0 w-full bg-[#151720] border-b border-white/10 z-30 p-4 flex justify-between items-center h-16">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">E</div>
            <span className="font-bold text-lg">Enterprise</span>
         </div>
         <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-white"
         >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
      </div>

      {/* 2. SIDEBAR (Cột trái) */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#151720] border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out
        md:translate-x-0  /* Desktop: Luôn hiện */
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} /* Mobile: Trượt ra/vào */
      `}>
        {/* Logo (Chỉ hiện trên Desktop, trên Mobile đã có ở Header rồi) */}
        <div className="hidden md:flex p-6 border-b border-white/10 items-center gap-2 h-20">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold shadow-[0_0_15px_rgba(37,99,235,0.5)]">E</div>
            <span className="font-bold text-xl tracking-wide">Enterprise</span>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto pt-20 md:pt-4">
           {MENU_ITEMS.map((item) => {
             const isActive = location.pathname === item.path;
             return (
               <Link 
                 key={item.path} 
                 to={item.path}
                 onClick={() => setIsMobileMenuOpen(false)} // Bấm xong tự đóng menu trên mobile
                 className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                 }`}
               >
                 <item.icon size={20} />
                 <span className="font-medium">{item.label}</span>
               </Link>
             )
           })}
        </nav>

        {/* User Profile Bottom */}
        <div className="p-4 border-t border-white/10 bg-[#151720]">
           <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                 <div className="text-sm font-bold truncate">Vinamilk Corp</div>
                 <div className="text-xs text-gray-400">Enterprise Plan</div>
              </div>
              <LogOut size={16} className="text-gray-500 cursor-pointer hover:text-white"/>
           </div>
        </div>
      </aside>

      {/* 3. OVERLAY (Làm tối màn hình khi mở menu trên mobile) */}
      {isMobileMenuOpen && (
        <div 
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 4. MAIN CONTENT (Cột phải) */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 min-h-screen">
         {children}
      </main>

    </div>
  );
}