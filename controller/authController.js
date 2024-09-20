import axios from 'axios';
import HomeController from './homeController.js';

class AuthController {

    // static async login(req, res) {
    //     const { email, password } = req.body;
    
    //     if (!email || !password) {
    //         return res.status(400).json({ isSuccess: false, message: 'Vui lòng nhập email và mật khẩu' });
    //     }
    
    //     try {
    //         const response = await axios.post('http://localhost:3300/v1/sites/auth/login', {
    //             email,
    //             password
    //         });
    
    //         console.log(response);
    
    //         if (response.data.isSuccess) {
    //             res.cookie('userID', response.data.userID, { httpOnly: true });
    //             res.cookie('gioHangID', response.data.gioHangID, { httpOnly: true });
    //             res.cookie('token', response.data.token, { httpOnly: true });
    
    //             return res.status(200).render('home-admin', {
    //                 userID: response.data.userID,
    //                 gioHangID: response.data.gioHangID,
    //                 token: response.data.token
    //             });
    //         } else {
    //             return res.status(401).json({ isSuccess: false, message: 'Email hoặc mật khẩu không đúng' });
    //         }
    //     } catch (error) {
    //         console.error('Đã xảy ra lỗi trong quá trình đăng nhập:', error.response?.data || error.message);
    //         return res.status(500).json({ isSuccess: false, message: 'Đã xảy ra lỗi trong quá trình đăng nhập' });
    //     }
    // }
    

    static async renderLogin(req, res) {
        res.render('login');
    }
}

export default AuthController;