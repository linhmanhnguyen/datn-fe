class MyCart {

    static async getCartByCartID(req) {
        try {
            const gioHangID = '66e99f6d0388654415cebef3';
            const url = `${CONSTANTS.NGROK_URL}/v1/sites/cart/?gioHangID=${gioHangID}`;
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

    // ------- RENDER ------- //

    static async myCartRender(req, res) {
        res.render('mycart');
    }
}

export default MyCart;
