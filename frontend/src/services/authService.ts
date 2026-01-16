// src/services/authService.ts

export const authService = {
  // 1. Kiểm tra Role (Đọc từ LocalStorage)
  checkUserRole: (address: string): 'USER' | 'ENTERPRISE' | null => {
    // Tạo key riêng cho từng ví (để ví này không trùng role ví kia)
    const storageKey = `suihope_role_${address}`;
    const savedRole = localStorage.getItem(storageKey);
    
    return savedRole as 'USER' | 'ENTERPRISE' | null;
  },

  // 2. Lưu Role (Khi người dùng chọn xong)
  saveUserRole: (address: string, role: 'USER' | 'ENTERPRISE') => {
    const storageKey = `suihope_role_${address}`;
    localStorage.setItem(storageKey, role);
  },

  // 3. Xóa Role (Dùng khi muốn test lại từ đầu - logout)
  clearRole: (address: string) => {
    const storageKey = `suihope_role_${address}`;
    localStorage.removeItem(storageKey);
  }
};