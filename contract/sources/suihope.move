module suihope::donation {
    use sui::sui::SUI;
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use std::string::{String};

    // 1. Định nghĩa "Chiến Dịch" (Campaign Object)
    // Đây là Object sẽ được lưu trữ trên Blockchain
    struct Campaign has key, store {
        id: UID,                // ID duy nhất của chiến dịch
        owner: address,         // Ai là chủ chiến dịch này?
        title: String,          // Tên chiến dịch
        target: u64,            // Mục tiêu (số tiền muốn gọi)
        raised: u64,            // Số tiền đã gọi được
        fund: Balance<SUI>      // "Két sắt" chứa tiền thật
    }

    // 2. Hàm Tạo Chiến Dịch (Create Campaign)
    // Người dùng gọi hàm này để tạo ra một Object Campaign mới
    public entry fun create_campaign(
        title: String, 
        target: u64, 
        ctx: &mut TxContext
    ) {
        let id = object::new(ctx);
        let owner = tx_context::sender(ctx); // Lấy địa chỉ người gọi

        // Khởi tạo Object
        let campaign = Campaign {
            id,
            owner,
            title,
            target,
            raised: 0,
            fund: balance::zero() // Ban đầu két sắt rỗng
        };

        // Chia sẻ Object này để AI CŨNG CÓ THỂ DONATE (Shared Object)
        transfer::share_object(campaign);
    }

    // 3. Hàm Quyên Góp (Donate)
    // Người dùng gửi một đồng Coin vào đây
    public entry fun donate(
        campaign: &mut Campaign, 
        payment: Coin<SUI>, 
        ctx: &mut TxContext
    ) {
        let amount = coin::value(&payment);
        
        // Bỏ tiền vào "két sắt" (fund) của chiến dịch
        let coin_balance = coin::into_balance(payment);
        balance::join(&mut campaign.fund, coin_balance);

        // Cập nhật số tiền đã gọi được
        campaign.raised = campaign.raised + amount;
    }

    // 4. Hàm Rút Tiền (Withdraw)
    // Chỉ chủ sở hữu (Owner) mới được rút
    public entry fun withdraw(
        campaign: &mut Campaign,
        amount: u64,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // Kiểm tra xem người gọi có phải chủ không?
        assert!(sender == campaign.owner, 100); // Lỗi 100: Không phải chủ

        // Kiểm tra xem két còn đủ tiền không?
        assert!(balance::value(&campaign.fund) >= amount, 101); // Lỗi 101: Không đủ tiền

        // Lấy tiền từ két ra
        let amount_to_withdraw = balance::split(&mut campaign.fund, amount);
        
        // Chuyển tiền về ví của chủ
        let payment = coin::from_balance(amount_to_withdraw, ctx);
        transfer::public_transfer(payment, sender);
    }
}