import { Link } from 'react-router-dom'; // 1. Import Link
import { Timer, Users, TrendingUp } from 'lucide-react';

interface CampaignProps {
  id: number; // 2. Thêm ID để biết bấm vào thì đi đâu
  title: string;
  organizer: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  daysLeft: number;
  image: string;
  category: string;
}

export default function CampaignCard({ data }: { data: CampaignProps }) {
  const percentage = Math.min((data.currentAmount / data.targetAmount) * 100, 100);

  return (
    // 3. Bọc toàn bộ Card trong thẻ Link
    <Link to={`/campaign/${data.id}`} className="block h-full">
      <div className="group relative flex flex-col h-full overflow-hidden rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-blue-500/20 hover:border-blue-500/30">
        
        {/* 1. Phần Ảnh bìa */}
        <div className="relative h-48 overflow-hidden">
          {/* Nhãn Category */}
          <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <span className="text-xs font-medium text-blue-300 uppercase tracking-wider">{data.category}</span>
          </div>
          
          {/* Ảnh có hiệu ứng zoom khi hover */}
          <img 
            src={data.image} 
            alt={data.title} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Lớp phủ gradient đen */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] to-transparent opacity-60" />
        </div>

        {/* 2. Phần Nội dung */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Tên chiến dịch */}
          <h3 className="text-xl font-bold text-white mb-1 line-clamp-1 group-hover:text-blue-400 transition-colors">
            {data.title}
          </h3>
          
          {/* Người tổ chức */}
          <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm">
              <Users size={14} />
              <span>bởi <span className="text-blue-300">{data.organizer}</span></span>
          </div>

          {/* Mô tả ngắn */}
          <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
            {data.description}
          </p>

          {/* 3. Thanh Tiến độ (Progress Bar) */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-blue-300">{data.currentAmount} SUI</span>
              <span className="text-gray-500">Mục tiêu: {data.targetAmount} SUI</span>
            </div>
            
            {/* Thanh bar nền */}
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              {/* Thanh bar màu */}
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
               <div className="flex items-center gap-1">
                  <TrendingUp size={12} className="text-green-400"/>
                  <span className="text-green-400 font-semibold">{percentage.toFixed(0)}%</span>
               </div>
               <div className="flex items-center gap-1">
                  <Timer size={12} />
                  <span>Còn {data.daysLeft} ngày</span>
               </div>
            </div>
          </div>

          {/* 4. Nút Donate (Đổi thành div để đúng chuẩn HTML khi nằm trong thẻ Link) */}
          <div className="w-full py-3 rounded-xl font-semibold bg-white/10 border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:text-white text-blue-200 transition-all flex items-center justify-center gap-2 cursor-pointer">
              Quyên góp ngay
          </div>
        </div>
      </div>
    </Link>
  );
}