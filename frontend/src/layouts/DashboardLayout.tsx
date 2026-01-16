import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PieChart, Users, Settings, LogOut, FileText } from 'lucide-react';
import type { ReactNode } from 'react';

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

  return (
    <div className="flex min-h-screen bg-[#0d0e12] text-white">
      
      {/* SIDEBAR (Cột trái) */}
      <aside className="w-64 border-r border-white/10 bg-[#151720] flex flex-col fixed h-full z-20">
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold shadow-[0_0_15px_rgba(37,99,235,0.5)]">E</div>
            <span className="font-bold text-xl tracking-wide">Enterprise</span>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
           {MENU_ITEMS.map((item) => {
             const isActive = location.pathname === item.path;
             return (
               <Link 
                 key={item.path} 
                 to={item.path}
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
        <div className="p-4 border-t border-white/10">
           <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500" />
              <div className="flex-1 min-w-0">
                 <div className="text-sm font-bold truncate">Vinamilk Corp</div>
                 <div className="text-xs text-gray-400">Enterprise Plan</div>
              </div>
              <LogOut size={16} className="text-gray-500 cursor-pointer hover:text-white"/>
           </div>
        </div>
      </aside>

      {/* MAIN CONTENT (Cột phải) */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
         {children}
      </main>

    </div>
  );
}