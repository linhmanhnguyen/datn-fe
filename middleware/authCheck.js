function authCheck(req, res, next) {
    const cookies = req.cookies; 
    res.locals.isAuthenticated = !!cookies.userID; 
    res.locals.isAuthenticated = !!cookies.gioHangID; 
    next();
}

export default authCheck;
