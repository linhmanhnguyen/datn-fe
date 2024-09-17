import axios from 'axios';

import HomeController from './homeController.js';

class AuthController {

    static async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render('login', { error: 'Vui lòng nhập email và mật khẩu' });
        }

        try {
            const response = await axios.post('http://localhost:3300/v1/sites/auth/login', {
                email: req.body.email,
                password: req.body.password
            });

            console.log(response.data)

            if (response.data.isSuccess) {
                res.cookie('email', req.body.email);
                // res.redirect('/register');
                
                await HomeController.homeRender(req, res);
            } else {
                res.render('login', { error: 'Email hoặc mật khẩu không đúng' });
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi trong quá trình đăng nhập:', error.response?.data || error.message);
            res.render('login', { error: 'Đã xảy ra lỗi trong quá trình đăng nhập' });
        }
    }

    // ------- RENDER ------- //

    static async renderLogin(req, res) {
        res.render('login');
    }
}

export default AuthController;
