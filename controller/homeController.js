import axios from "axios";
import { CONSTANTS } from "../utils/constants.js";

class HomeController {

    static async getProductsByCategoryID(categoryID) {
        try {
            const url = `${CONSTANTS.LOCAL_URL}/v1/sites/products/category/?categoryID=${categoryID}`;
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

    static async danhSachSanPhamCoLuotGiamGiaCaoNhat() {
        try {
            const url = `${CONSTANTS.LOCAL_URL}/v1/sites/products/sale-highest`;
            const response = await axios.get(url);

            if (!response.data.isSuccess) {
                return {
                    success: false,
                    message: 'Dữ liệu không thành công.',
                    data: [],
                };
            }

            return {
                success: true,
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
            const categoryIDs = {
                laptops: '66d9144faf7f7d7628a1965d',
                phones: '66eae9759358dc725422687a',
                watches: '66eb18c79358dc725422688d',
            };

            const [laptopsResult, phonesResult, watchesResult, productsResult] = await Promise.all([
                HomeController.getProductsByCategoryID(categoryIDs.laptops),
                HomeController.getProductsByCategoryID(categoryIDs.phones),
                HomeController.getProductsByCategoryID(categoryIDs.watches),
                HomeController.danhSachSanPhamCoLuotGiamGiaCaoNhat()
            ]);




            res.render('home-admin', { 
                laptops: laptopsResult.success ? laptopsResult.data : [],
                phones: phonesResult.success ? phonesResult.data : [],
                watches: watchesResult.success ? watchesResult.data : [],
                products: productsResult.success ? productsResult.data : {}
            });

        } catch (error) {
            console.error("Render Error:", error);
            res.render('home-admin', { 
                laptops: [],
                phones: [],
                watches: [],
                products: [],
            });
        }
    }
}

export default HomeController;
