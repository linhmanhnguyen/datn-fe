import axios from "axios";
import { CONSTANTS } from "../utils/constants.js";

class HomeController {

    static async getProductsByCategoryID(req) {
        try {
            const categoryID = '66d9144faf7f7d7628a1965d';
            const url = `${CONSTANTS.NGROK_URL}/v1/sites/products/category/?categoryID=${categoryID}`;
            const response = await axios.get(url);
            
            return {
                success: response.data.isSuccess,
                data: response.data.data || [],
            };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại!',
                data: [],
            };
        }
    }

    static async homeRender(req, res) {
        try {
            const result = await HomeController.getProductsByCategoryID(req);
            if (result.success) {
                res.render('home-admin', { products: result.data });
            } else {
                res.render('home-admin', { products: [] });
            }
        } catch (error) {
            console.error("Render Error:", error);
            res.render('home-admin', { products: [] });
        }
    }
}

export default HomeController;
