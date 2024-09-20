import axios from 'axios';
import { CONSTANTS } from '../utils/constants.js';

import CartController from './myCart.js'

function formatPrice(price) {
    const formatter = new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
    });
    return formatter.format(price);
}

class MyCart {
    static async getCartByCartID(gioHangID) {
        try {
            if (!gioHangID) {
                throw new Error('gioHangID không được định nghĩa');
            }
            const url = `${CONSTANTS.LOCAL_URL}/v1/sites/cart/?gioHangID=${gioHangID}`;
            const response = await axios.get(url);
            
            return {
                success: response.data.isSuccess,
                data: response.data.data || {},
            };
        } catch (error) {
            console.log(error); 
            return {
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại!',
                data: {},
            };
        }
    }

    // ------- RENDER ------- //

    static async myCartRender(req, res) {
        try {
            const gioHangID = req.cookies.gioHangID; 
            
            const result = await MyCart.getCartByCartID(gioHangID);
            const soSanPhamTrongGio = await CartController.getCartByCartID(req.cookies.gioHangID)
    
            if (result.success) {
                const formattedTotalAmount = formatPrice(result.data.totalAmount);
                const formattedProducts = result.data.products.map(product => ({
                    ...product,
                    gia: formatPrice(product.gia),
                }));

                res.render('mycart', {
                    totalAmount: formattedTotalAmount,
                    totalItems: result.data.totalItems,
                    cartItems: formattedProducts,
                    gioHangID: gioHangID,
                    soSanPhamTrongGio: soSanPhamTrongGio.data.totalItems
                });
            } else {
                res.render('mycart', {
                    totalAmount: '0',
                    totalItems: 0,
                    cartItems: [],
                    gioHangID: '0',
                    soSanPhamTrongGio: 0
                });
            }
        } catch (error) {
            console.log(error);
            res.render('mycart', {
                totalAmount: '0',
                totalItems: 0,
                cartItems: [],
                gioHangID: '0',
                soSanPhamTrongGio: 0
            });
        }
    }
    
}

export default MyCart;
