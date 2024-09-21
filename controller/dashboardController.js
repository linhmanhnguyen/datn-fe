import axios from 'axios';
import { CONSTANTS } from '../utils/constants.js';

class DashboardController {

    static async danhSachDonHang(req, res) {
        try {
            const response = await axios.get(`http://localhost:3300/v1/sites/order/`);

            return {
                success: response.data.success,
                data: response.data.data || {},
            };
        } catch (error) {
            console.error('Error fetching product details:', error);
            return {
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại!',
                data: {},
            };
        }
    }

    static async danhSachTrangThai(req, res) {
        try {
            const response = await axios.get(`http://localhost:3300/v1/sites/order/status`);

            return {
                success: response.data.success,
                data: response.data.data || {},
            };
        } catch (error) {
            console.error('Error fetching product details:', error);
            return {
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại!',
                data: {},
            };
        }
    }

    static async tatCaHangHoa(req, res) {
        try {
            const response = await axios.get(`http://localhost:3300/v1/sites/products`);
            return {
                success: response.data.success,
                data: response.data.data || {},
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại!',
                data: {},
            };
        }
    }

    static async tinhTrangHang(req, res){
        try {
            const tinhTrangHang = {
                success: true,
                data: [
                    { _id: '66ee5e8a7617f1a6b126feaf', tenTrangThai: 'Còn hàng' },
                    { _id: '66ee5e9c7617f1a6b126feb0', tenTrangThai: 'Đã hết hàng' }
                ]
            };

            return {
                success: tinhTrangHang.success,
                data: tinhTrangHang.data || {},
            };

        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại!',
                data: {},
            };
        }
    }

    static async dashboardRender(req, res) {

        const [result, trangThai] = await Promise.all([
            await DashboardController.danhSachDonHang(),
            await DashboardController.danhSachTrangThai(),
        ]);

        res.render('dashboard-orders', { 
            data: result.success ? result.data : [],
            status: trangThai.success ? trangThai.data : []
        });
    }
    
    static async productRender(req, res) {
        const [tatCaHangHoa, tinhTrangHang] = await Promise.all([
            await DashboardController.tatCaHangHoa(),
            await DashboardController.tinhTrangHang()
        ]);
        
        res.render('dashboard-products', { 
            data: tatCaHangHoa.success ? tatCaHangHoa.data : [],
            tinhTrangHang: tinhTrangHang
        });
    }
}

export default DashboardController;
