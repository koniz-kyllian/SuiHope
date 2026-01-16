import DashboardLayout from '../layouts/DashboardLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Users, TrendingUp, Activity, Download } from 'lucide-react';

// Dữ liệu giả cho biểu đồ (Mock Data)
const CHART_DATA = [
  { month: 'T1', amount: 4000 },
  { month: 'T2', amount: 3000 },
  { month: 'T3', amount: 2000 },
  { month: 'T4', amount: 2780 },
  { month: 'T5', amount: 1890 },
  { month: 'T6', amount: 2390 },
  { month: 'T7', amount: 3490 },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      
      {/* Header Dashboard */}
      <div className="flex justify-between items-center mb-8">
         <div>
            <h1 className="text-3xl font-bold text-white">Tổng quan CSR</h1>
            <p className="text-gray-400 mt-1">Chào mừng trở lại, đây là báo cáo tác động xã hội của doanh nghiệp bạn.</p>
         </div>
         <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
            <Download size={16} />
            Xuất báo cáo PDF
         </button>
      </div>

      {/* 1. Stats Cards (Thẻ chỉ số) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         <StatCard 
            title="Tổng ngân sách đã tài trợ" 
            value="125,000 SUI" 
            trend="+12.5%" 
            icon={DollarSign} 
            color="text-blue-400"
         />
         <StatCard 
            title="Người thụ hưởng" 
            value="3,420" 
            trend="+5.2%" 
            icon={Users} 
            color="text-green-400"
         />
         <StatCard 
            title="Chiến dịch hoạt động" 
            value="8" 
            trend="Đang chạy" 
            icon={Activity} 
            color="text-purple-400"
         />
         <StatCard 
            title="Điểm tín nhiệm (On-chain)" 
            value="98/100" 
            trend="Rất cao" 
            icon={TrendingUp} 
            color="text-yellow-400"
         />
      </div>

      {/* 2. Biểu đồ dòng tiền (Chart) */}
      <div className="grid lg:grid-cols-3 gap-8">
         
         {/* Cột trái: Chart lớn */}
         <div className="lg:col-span-2 bg-[#151720] border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">Dòng tiền giải ngân (6 tháng qua)</h3>
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA}>
                     <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                     <XAxis dataKey="month" stroke="#666" />
                     <YAxis stroke="#666" />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#1a1c29', borderColor: '#333', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                     />
                     <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Cột phải: Recent Activity */}
         <div className="lg:col-span-1 bg-[#151720] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col">
            <h3 className="text-lg font-bold text-white mb-4">Hoạt động gần đây</h3>
            <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2">
               {[1,2,3,4,5].map((_, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                     <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                     <div>
                        <p className="text-sm text-white">Đã giải ngân <span className="font-bold text-blue-400">500 SUI</span> cho dự án "Trường học Hà Giang".</p>
                        <p className="text-xs text-gray-500 mt-1">2 giờ trước • 0x8a...3f1</p>
                     </div>
                  </div>
               ))}
            </div>
            <button className="w-full mt-auto pt-4 text-sm text-blue-400 hover:text-blue-300">Xem tất cả lịch sử &rarr;</button>
         </div>
      </div>

    </DashboardLayout>
  );
}

// Component con để hiển thị thẻ chỉ số cho gọn code
function StatCard({ title, value, trend, icon: Icon, color }: any) {
   return (
      <div className="bg-[#151720] border border-white/10 p-6 rounded-2xl shadow-lg hover:border-blue-500/30 transition-all">
         <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-white/5 ${color}`}>
               <Icon size={24} />
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
               {trend}
            </span>
         </div>
         <div className="text-3xl font-bold text-white mb-1">{value}</div>
         <div className="text-sm text-gray-500">{title}</div>
      </div>
   )
}