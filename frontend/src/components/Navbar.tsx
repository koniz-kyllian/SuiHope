import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { Plus, LayoutDashboard, User } from 'lucide-react'; 
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authService } from '../services/authService'; 

interface NavbarProps {
  onOpenCreateModal: () => void;
}

export default function Navbar({ onOpenCreateModal }: NavbarProps) {
  const account = useCurrentAccount();
  const location = useLocation();
  
  // Kiểm tra xem có đang ở trong trang Dashboard không
  const isDashboard = location.pathname.includes('/dashboard');

  const [userRole, setUserRole] = useState<'USER' | 'ENTERPRISE' | null>(null);

  useEffect(() => {
    const checkRole = async () => {
        if (account?.address) {
            const role = authService.checkUserRole(account.address);
            setUserRole(role);
        } else {
            setUserRole(null);
        }
    };
    checkRole();
  }, [account]);

  return (
    // Responsive Logic:
    // Mobile: Padding left = 0 (Full width)
    // Desktop (md): Padding left = 72 (để né Sidebar nếu đang ở Dashboard)
    <nav className={`fixed top-0 w-full z-50 px-4 md:px-6 py-4 transition-all ${isDashboard ? 'md:pl-72' : ''}`}>
      
      <div className={`max-w-7xl mx-auto flex justify-between items-center backdrop-blur-md border rounded-2xl px-4 md:px-6 py-3 shadow-lg ${
          isDashboard ? 'bg-[#151720]/90 border-white/5' : 'bg-white/5 border-white/10'
      }`}>
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">S</div>
          {/* Ẩn tên SuiHope trên màn hình siêu nhỏ nếu cần, hiện tại vẫn để */}
          <span className="text-lg md:text-xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            SuiHope
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-4">
           
           {/* 1. CASE ENTERPRISE */}
           {userRole === 'ENTERPRISE' && (
               <Link 
                 to="/dashboard"
                 className={`flex items-center gap-2 px-3 py-2 md:px-4 rounded-xl border transition-all text-xs md:text-sm font-medium ${
                    isDashboard 
                    ? 'hidden' // Nếu đang ở Dashboard rồi thì ẩn nút này đi cho đỡ rối
                    : 'bg-purple-500/10 border-purple-500/50 text-purple-300 hover:bg-purple-500/20'
                 }`}
               >
                    <LayoutDashboard size={16} />
                    {/* Trên mobile ẩn chữ, chỉ hiện icon */}
                    <span className="hidden sm:inline">Quản trị viên</span>
               </Link>
           )}

           {/* 2. CASE USER */}
           {account && userRole !== 'ENTERPRISE' && (
                <Link 
                    to="/profile"
                    className="flex items-center gap-2 px-3 py-2 md:px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs md:text-sm font-medium text-white"
                >
                    <User size={16} />
                    {/* Trên mobile ẩn chữ, chỉ hiện icon */}
                    <span className="hidden sm:inline">Hồ sơ</span>
                </Link>
           )}

           {/* 3. Nút Tạo dự án (Chỉ hiện ở Desktop Home) */}
           {!isDashboard && (
               <button 
                    onClick={onOpenCreateModal}
                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all text-sm font-medium text-blue-200"
               >
                    <Plus size={16} />
                    <span>Tạo dự án</span>
               </button>
           )}

           {/* Connect Wallet: CSS đè để nhỏ gọn hơn trên mobile */}
           <ConnectButton className='!bg-blue-600 !text-white !font-semibold !rounded-xl hover:!bg-blue-500 transition-all !text-xs md:!text-sm !px-3 !py-2' />
        </div>
      </div>
    </nav>
  );
}