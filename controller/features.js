import axios from "axios";
import { CONSTANTS } from "../utils/constants.js";

class Features {

    static async getProductsByCategoryID(categoryID, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const url = `${CONSTANTS.LOCAL_URL}/v1/sites/products/category/?categoryID=${categoryID}&skip=${skip}&limit=${limit}`;
            const response = await axios.get(url);

            if (!response.data.isSuccess) {
                return {
                    success: false,
                    message: 'Dữ liệu không thành công.',
                    data: [],
                };
            }

            const products = response.data.data || [];
            const sortedProducts = products.sort((a, b) => b.luotBan - a.luotBan);

            return {
                success: true,
                data: sortedProducts,
                total: response.data.total || 0,  // assuming total count is provided
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

    static async featuresRender(req, res) {
        const { categoryID } = req.query;
        const page = parseInt(req.query.page, 10) || 1;
        const limit = 10;

        try {
            if (!categoryID) {
                return res.render('features', { products: [], totalPages: 0, currentPage: page, categoryID });
            }

            const productsResult = await Features.getProductsByCategoryID(categoryID, page, limit);
            const totalPages = Math.ceil(productsResult.total / limit);

            res.render('features', { 
                products: productsResult.success ? productsResult.data : [],
                totalPages: totalPages,
                currentPage: page,
                categoryID
            });

        } catch (error) {
            console.error("Render Error:", error);
            res.render('features', { 
                products: [],
                totalPages: 0,
                currentPage: page,
                categoryID
            });
        }
    }
}

export default Features;
