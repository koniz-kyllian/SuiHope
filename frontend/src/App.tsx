import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner'; 
import { useCurrentAccount } from '@mysten/dapp-kit'; // Import Hook ví
import { useState, useEffect } from 'react';
import { authService } from './services/authService'; // Import Service
import RoleSelectionModal from './components/RoleSelectionModal'; // Import Modal mới

import Home from './pages/Home';
import CampaignDetails from './pages/CampaignDetails';
import UserProfile from './pages/UserProfile';
import Dashboard from './pages/Dashboard';
import DashboardCampaigns from './pages/DashboardCampaigns';
import DashboardReports from './pages/DashboardReports'; 
import DashboardSettings from './pages/DashboardSettings'; 
import DashboardBeneficiaries from './pages/DashboardBeneficiaries';

// Tạo một Component con để bọc logic kiểm tra role (tránh làm rối App chính)
function AppContent() {
  const account = useCurrentAccount();
  const [showRoleModal, setShowRoleModal] = useState(false);

  useEffect(() => {
    // Logic: Nếu đã kết nối ví VÀ ví này chưa có role trong storage -> Hiện Modal
    if (account?.address) {
        const role = authService.checkUserRole(account.address);
        if (!role) {
            setShowRoleModal(true);
        }
    } else {
        setShowRoleModal(false);
    }
  }, [account]);

  const handleRoleSelect = (role: 'USER' | 'ENTERPRISE') => {
    if (account?.address) {
        // 1. Lưu lựa chọn
        authService.saveUserRole(account.address, role);
        // 2. Tắt modal
        setShowRoleModal(false);
        // 3. Reload nhẹ trang để Navbar cập nhật lại giao diện theo role mới
        window.location.reload(); 
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} />
        <Route path="/profile" element={<UserProfile />} />

        {/* DASHBOARD ROUTES */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/campaigns" element={<DashboardCampaigns />} />
        <Route path="/dashboard/reports" element={<DashboardReports />} />
        <Route path="/dashboard/settings" element={<DashboardSettings />} />
        <Route path="/dashboard/beneficiaries" element={<DashboardBeneficiaries />} />
      </Routes>
      
      {/* Modal chọn Role */}
      <RoleSelectionModal 
        isOpen={showRoleModal} 
        onSelect={handleRoleSelect} 
      />
    </>
  );
}

function App() {
  return (
    <Router>
        <AppContent />
        <Toaster position="top-center" theme="dark" richColors />
    </Router>
  );
}

export default App;