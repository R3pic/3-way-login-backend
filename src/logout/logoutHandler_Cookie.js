const logout_process = (req, res) => {
    console.log("쿠키", req.cookies);

    if (!req.cookies.user) {
        res.send("로그인 되어 있지 않습니다.");
        return;
    }

    res.clearCookie('user');
    res.send("로그아웃 되었습니다.");
}

export const logoutHandler_Cookie = {
    logout_process
}
