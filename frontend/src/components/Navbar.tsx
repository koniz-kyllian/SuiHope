import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { Plus, LayoutDashboard, User } from 'lucide-react'; // Import thêm icon User, LayoutDashboard
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authService } from '../services/authService'; // Import Service kiểm tra quyền

interface NavbarProps {
  onOpenCreateModal: () => void;
}

export default function Navbar({ onOpenCreateModal }: NavbarProps) {
  const account = useCurrentAccount();
  const location = useLocation();
  
  // Kiểm tra xem có đang ở trong trang Dashboard không (để chỉnh giao diện)
  const isDashboard = location.pathname.includes('/dashboard');

  // State lưu role người dùng
  const [userRole, setUserRole] = useState<'USER' | 'ENTERPRISE' | null>(null);

  // useEffect: Chạy mỗi khi ví thay đổi để check quyền
  useEffect(() => {
    const checkRole = async () => {
        if (account?.address) {
            const role = await authService.checkUserRole(account.address);
            setUserRole(role);
        } else {
            setUserRole(null);
        }
    };
    checkRole();
  }, [account]);

  return (
    // Nếu đang ở Dashboard thì padding-left 72 (để tránh Sidebar), ngược lại thì full màn hình
    <nav className={`fixed top-0 w-full z-50 px-6 py-4 transition-all ${isDashboard ? 'pl-72' : ''}`}>
      
      <div className={`max-w-7xl mx-auto flex justify-between items-center backdrop-blur-md border rounded-2xl px-6 py-3 shadow-lg ${
          isDashboard ? 'bg-[#151720]/80 border-white/5' : 'bg-white/5 border-white/10'
      }`}>
        
        {/* Logo - Bấm vào về trang chủ */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">S</div>
          <span className="text-xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            SuiHope
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
           
           {/* 1. CASE ENTERPRISE: Hiện nút vào Dashboard */}
           {userRole === 'ENTERPRISE' && (
               <Link 
                 to="/dashboard"
                 className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-sm font-medium ${
                    isDashboard 
                    ? 'bg-blue-600 border-blue-500 text-white hidden' // Ẩn nút nếu đang ở trong Dashboard rồi
                    : 'bg-purple-500/10 border-purple-500/50 text-purple-300 hover:bg-purple-500/20'
                 }`}
               >
                    <LayoutDashboard size={16} />
                    <span>Quản trị viên</span>
               </Link>
           )}

           {/* 2. CASE USER THƯỜNG: Hiện nút vào Profile (Nếu đã kết nối ví) */}
           {account && userRole !== 'ENTERPRISE' && (
                <Link 
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium text-white"
                >
                    <User size={16} />
                    <span>Hồ sơ của tôi</span>
                </Link>
           )}

           {/* 3. Nút Tạo dự án (Chỉ hiện khi KHÔNG ở trong Dashboard) */}
           {!isDashboard && (
               <button 
                    onClick={onOpenCreateModal}
                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all text-sm font-medium text-blue-200"
               >
                    <Plus size={16} />
                    <span>Tạo dự án</span>
               </button>
           )}

           {/* Nút Connect Wallet của Sui */}
           <ConnectButton className='!bg-blue-600 !text-white !font-semibold !rounded-xl hover:!bg-blue-500 transition-all' />
        </div>
      </div>
    </nav>
  );
}