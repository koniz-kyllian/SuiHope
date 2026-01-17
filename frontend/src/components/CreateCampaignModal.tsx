import { X, Upload, Coins, Type, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
// 1. Import các thư viện của Sui
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { PACKAGE_ID, MODULE_NAME, FUNCTION_NAME } from '../../constants'; // Import ID từ file constants

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

  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  // 2. Hook để ký và gửi giao dịch (Thay thế cho setTimeout)
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const handleCreate = async () => {
    // Validate dữ liệu
    if (!formData.title || !formData.target || !formData.description) {
        toast.error("Thiếu thông tin!", { description: "Vui lòng nhập đầy đủ các trường." });
        return;
    }

    if (Number(formData.target) <= 0) {
        toast.warning("Mục tiêu không hợp lệ");
        return;
    }

    setIsLoading(true);

    try {
        // 3. Tạo Transaction Block (Gói lệnh gửi lên blockchain)
        const tx = new Transaction();

        // Gọi hàm create_campaign trong Smart Contract
        tx.moveCall({
            target: `${PACKAGE_ID}::${MODULE_NAME}::${FUNCTION_NAME}`,
            arguments: [
                tx.pure.string(formData.title),        // Tên chiến dịch (String)
                tx.pure.u64(Number(formData.target)),  // Mục tiêu (u64)
            ],
        });

        // 4. Gửi lệnh đi và chờ xác nhận
        signAndExecuteTransaction(
            { transaction: tx },
            {
                onSuccess: (result) => {
                    console.log('Thành công:', result);
                    toast.success("Đã tạo chiến dịch trên Blockchain!", {
                        description: `Mã giao dịch: ${result.digest.slice(0, 10)}...`
                    });
                    
                    setIsLoading(false);
                    onClose();
                    // Reset form
                    setFormData({ title: '', description: '', target: '', image: '', category: 'Education' });
                    setImageError(false);
                },
                onError: (error) => {
                    console.error('Lỗi:', error);
                    toast.error("Giao dịch thất bại", {
                        description: error.message || "Vui lòng thử lại sau."
                    });
                    setIsLoading(false);
                },
            }
        );

    } catch (err) {
        console.error(err);
        setIsLoading(false);
        toast.error("Lỗi khởi tạo giao dịch");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({...formData, image: e.target.value});
      setImageError(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container: w-[95%] để không dính lề trên Mobile */}
      <div className="relative w-[95%] md:w-full max-w-2xl bg-[#1a1c29] border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-white/10 bg-white/5 shrink-0">
          <h2 className="text-xl md:text-2xl font-bold text-white">Khởi tạo Chiến dịch (On-chain)</h2>
          <button onClick={onClose} disabled={isLoading} className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white disabled:opacity-50">
            <X size={24} />
          </button>
        </div>

        {/* Body Form - Scrollable */}
        <div className="p-4 md:p-8 space-y-4 md:space-y-6 overflow-y-auto custom-scrollbar flex-1">
          
          {/* Input Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Tên chiến dịch</label>
            <div className="relative">
              <Type className="absolute left-4 top-3.5 text-gray-500" size={20} />
              <input type="text" disabled={isLoading} placeholder="VD: Xây trường cho em..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all disabled:opacity-50"
                value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Mục tiêu (SUI)</label>
              <div className="relative">
                <Coins className="absolute left-4 top-3.5 text-gray-500" size={20} />
                <input type="number" min="0" disabled={isLoading} placeholder="0.00" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all disabled:opacity-50"
                  value={formData.target} onChange={(e) => setFormData({...formData, target: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Danh mục</label>
              <select disabled={isLoading} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-all appearance-none disabled:opacity-50 cursor-pointer"
                value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="Education" className="bg-[#1a1c29]">Giáo dục</option>
                <option value="Emergency" className="bg-[#1a1c29]">Khẩn cấp</option>
                <option value="Medical" className="bg-[#1a1c29]">Y tế</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Link ảnh bìa (URL)</label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-3.5 text-gray-500" size={20} />
              <input type="text" disabled={isLoading} placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all disabled:opacity-50"
                value={formData.image} onChange={handleImageChange}
              />
            </div>
            {formData.image && !imageError && (
                <div className="mt-2 h-40 w-full rounded-xl overflow-hidden border border-white/10 relative group">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={() => setImageError(true)} />
                </div>
            )}
            {imageError && <p className="text-xs text-red-400 ml-1 mt-1">Link ảnh lỗi.</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Câu chuyện của bạn</label>
            <textarea rows={4} disabled={isLoading} placeholder="Kể chi tiết về hoàn cảnh..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none disabled:opacity-50"
              value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-6 border-t border-white/10 bg-white/5 flex gap-4 shrink-0">
          <button onClick={onClose} disabled={isLoading} className="flex-1 py-3 px-6 rounded-xl font-medium text-gray-300 hover:bg-white/5 transition-colors disabled:opacity-50">Hủy bỏ</button>
          
          <button onClick={handleCreate} disabled={isLoading} className="flex-[2] py-3 px-6 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {isLoading ? (
                <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Đang ký ví...</span>
                </>
            ) : (
                <>
                    <Upload size={20} />
                    <span>Tạo & Ký (On-chain)</span>
                </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}