import axios from 'axios';
import { CONSTANTS } from '../utils/constants.js';

import HomeController from './homeController.js';
import CartController from './myCart.js'

class BuyProductController {

    static async showProductDetail(req, res) {
        try {
            const productID = req.params.id; 

            if (productID) {
                const response = await axios.get(`${CONSTANTS.LOCAL_URL}/${CONSTANTS.API_PRODUCT}/${productID}`);
                const productDetails = response.data;

                res.json({
                    success: true,
                    data: productDetails,
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Product ID is missing',
                });
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
            res.status(500).json({
                success: false,
                message: 'An error occurred while fetching product details',
            });
        }
    }

    static async buyProductRender(req, res) {
        const productID = req.query.productID;

        try {
            const response = await axios.get(`${CONSTANTS.LOCAL_URL}/v1/sites/products/detail/?productID=${productID}`);
            const productsList = await HomeController.danhSachSanPhamCoLuotGiamGiaCaoNhat();
            const soSanPhamTrongGio = await CartController.getCartByCartID(req.cookies.gioHangID)
    
            res.render('buy-product', { 
                product: response.data,
                productsList: productsList.data,
                soSanPhamTrongGio: soSanPhamTrongGio.data.totalItems
            });
        } catch (error) {

            console.error('Error fetching product details:', error);
            res.render('buy-product', { product: null });
        }
    }
    
}

export default BuyProductController;
