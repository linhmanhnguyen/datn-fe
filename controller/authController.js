import axios from 'axios';
import HomeController from './homeController.js';
import DashboardController from './dashboardController.js';

class AuthController {
    static async renderLogin(req, res) {
        res.render('login');
    }

    static async renderRegister(req, res) {
        res.render('register');
    }
}

export default AuthController;