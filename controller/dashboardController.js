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

            console.log(response)

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
        const [tatCaHangHoa] = await Promise.all([
            await DashboardController.tatCaHangHoa()
        ]);

        res.render('dashboard-products', { 
            data: tatCaHangHoa.success ? tatCaHangHoa.data : []
        });
    }
}

export default DashboardController;
