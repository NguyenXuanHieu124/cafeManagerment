import { CTHD } from "./billdetail.interface";

export interface Bill {
    HoaDonXuatID?: number;
    NgayGio?: Date;
    HinhThucThanhToan?: string;
    TongTien?: number;
    DaThanhToan?: boolean;
    ChiNhanhID?: number;
    BanID?: number;
    TenBan?: string;
    TenKhachHang: string;
    SoLuongOrdered?: number;
    CTHDs?: CTHD[];
}