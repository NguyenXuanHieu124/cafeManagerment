export const API = {
    HOST: 'http://localhost:8088',
    LOGIN: {
        GET_TOKEN: 'token',
        GET_USER: ''
    },
    TABLE: {
        GET_ALL_TABLE: 'api/table/getbans',
        GET_ALL_TABLE_BY_STATUS: 'api/table/GetBanStatus',
        GET_ALL_TABLE_ORDER: 'api/table/GetBansOrder',
        GET_TABLE_BY_ID: 'api/table/gettable',
        UPDATE_TABLE: 'api/table/updatetable'
    },
    PRODUCT: {
        GET_ALL_PRODUCT: 'api/sanpham/getsanphams',
        GET_PRODUCT_BY_ID: 'api/sanpham/getsanphambyid',
        GET_ALL_PRODUCT_BY_CATEGORYID: 'api/sanpham/getsanphambycategory'
    },
    BILLS: {
        CREATE_BILL: 'api/hoadonxuat/create',
        GET_BY_ID_TABLE: 'api/hoadonxuat/getbyidtable',
        UPDATE_BILL: 'api/hoadonxuat/update',
        GET_BILL_BY_STT: 'api/hoadonxuat/getHDXbyStt'
    },
    CTHD: {
        CREATE_CTHD: 'api/chitiethoadon/CreateCTHD',
        GET_CTHD_BY_HDX_ID: 'api/chitiethoadon/GetChiTietHoaDonByHDXId',
        GET_CTHD_BY_HDX_SP_ID: 'api/chitiethoadon/GetChiTietHoaDonByHDXIdSPId',
        UPDATE_BILL_DETAIL: 'api/chitiethoadon/UpdateCTHD',

    },
    CATEGORY: {
    	GET_ALL_CATEGORY: 'api/LoaiSanPham/getloaisp',
    	GET_CATEGORY_BY_ID: 'api/LoaiSanPham/GetLoaiSanPhamByid'
    },
    USER: {
        GET_ALL_USER: 'api/user/getusers',
        GET_USER_BY_USERNAME: 'api/user/getuserbyusername' // tham số truyền vào username
    }
};

