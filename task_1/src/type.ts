export interface DataProps{
    "stt": number;
    "Ngày": string;
    "Giờ": string;
    "Trạm": string;
    "Trụ bơm": string;
    "Mặt hàng": string;
    "Số lượng": number;
    "Đơn giá": number;
    "Thành tiền (VNĐ)": number; 
    "Trạng thái thanh toán": string; 
    "Mã khách hàng": string;
    "Tên khách hàng"?: string;
    "Loại khách hàng"?: string;
    "Ngày thanh toán"?: string;
    "Nhân viên"?: string;
    "Biển số xe"?: string; 
    "Trạng thái hoá đơn": string;
}

export const headersDataKeys: Array<keyof DataProps> = [
    "stt",
    "Ngày",
    "Giờ",
    "Trạm",
    "Trụ bơm",
    "Mặt hàng",
    "Số lượng",
    "Đơn giá",
    "Thành tiền (VNĐ)",
    "Trạng thái thanh toán",
    "Mã khách hàng",
    "Tên khách hàng",
    "Loại khách hàng",
    "Ngày thanh toán",
    "Nhân viên",
    "Biển số xe",
    "Trạng thái hoá đơn"
];