import { X, Upload, Coins, Type, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner'; // Import toast

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCampaignModal({ isOpen, onClose }: CreateCampaignModalProps) {
  // State lưu dữ liệu form
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    image: '',
    category: 'Education'
  });

  // State quản lý trạng thái đang tải (Loading)
  const [isLoading, setIsLoading] = useState(false);

  // Hàm xử lý khi bấm nút Tạo
  const handleCreate = async () => {
    // 1. Validate: Kiểm tra dữ liệu đầu vào
    if (!formData.title || !formData.target || !formData.description) {
        toast.error("Vui lòng điền đầy đủ thông tin!", {
            description: "Tên chiến dịch, mục tiêu và mô tả không được để trống."
        });
        return;
    }

    if (Number(formData.target) <= 0) {
        toast.warning("Mục tiêu gây quỹ phải lớn hơn 0");
        return;
    }

    // 2. Bắt đầu xử lý (Loading)
    setIsLoading(true);

    // 3. Giả lập gọi Smart Contract (Sau này thay bằng code blockchain thật)
    // Dùng Promise để giả lập độ trễ 2 giây
    const createPromise = new Promise((resolve) => setTimeout(resolve, 2000));

    toast.promise(createPromise, {
        loading: 'Đang khởi tạo Smart Contract...',
        success: () => {
            setIsLoading(false);
            onClose(); // Đóng modal
            // Reset form về mặc định
            setFormData({
                title: '',
                description: '',
                target: '',
                image: '',
                category: 'Education'
            });
            return `Chiến dịch "${formData.title}" đã được tạo thành công!`;
        },
        error: () => {
            setIsLoading(false);
            return 'Có lỗi xảy ra, vui lòng thử lại';
        },
    });
  };

  if (!isOpen) return null;

  return (
    // 1. Lớp nền tối mờ (Overlay)
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* 2. Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#1a1c29] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
          <h2 className="text-2xl font-bold text-white">Khởi tạo Chiến dịch</h2>
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body Form */}
        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          
          {/* Input Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Tên chiến dịch</label>
            <div className="relative">
              <Type className="absolute left-4 top-3.5 text-gray-500" size={20} />
              <input 
                type="text"
                disabled={isLoading}
                placeholder="VD: Xây trường cho em..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Target Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Mục tiêu (SUI)</label>
              <div className="relative">
                <Coins className="absolute left-4 top-3.5 text-gray-500" size={20} />
                <input 
                  type="number"
                  disabled={isLoading}
                  placeholder="0.00"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
                  value={formData.target}
                  onChange={(e) => setFormData({...formData, target: e.target.value})}
                />
              </div>
            </div>

            {/* Select Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Danh mục</label>
              <select 
                disabled={isLoading}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none disabled:opacity-50"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="Education" className="bg-[#1a1c29]">Giáo dục</option>
                <option value="Emergency" className="bg-[#1a1c29]">Khẩn cấp</option>
                <option value="Environment" className="bg-[#1a1c29]">Môi trường</option>
                <option value="Medical" className="bg-[#1a1c29]">Y tế</option>
              </select>
            </div>
          </div>

          {/* Input Image URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Link ảnh bìa (URL)</label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-3.5 text-gray-500" size={20} />
              <input 
                type="text"
                disabled={isLoading}
                placeholder="https://..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
              />
            </div>
            {/* Image Preview - Nếu có link thì hiện ảnh */}
            {formData.image && (
                <div className="mt-2 h-40 w-full rounded-xl overflow-hidden border border-white/10">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
            )}
          </div>

          {/* Textarea Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Câu chuyện của bạn</label>
            <textarea 
              rows={4}
              disabled={isLoading}
              placeholder="Kể chi tiết về hoàn cảnh và kế hoạch sử dụng vốn..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none disabled:opacity-50"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 bg-white/5 flex gap-4">
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-3 px-6 rounded-xl font-medium text-gray-300 hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            Hủy bỏ
          </button>
          
          <button 
            onClick={handleCreate} // Gắn hàm xử lý vào đây
            disabled={isLoading} // Disable nút khi đang loading
            className="flex-[2] py-3 px-6 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
                <>
                    {/* Icon Loading xoay tròn */}
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang xử lý...
                </>
            ) : (
                <>
                    <Upload size={20} />
                    Tạo Chiến Dịch
                </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}