const logout_process = (req, res) => {
    res.clearCookie('access_token');
    res.send('로그아웃 되었습니다.');
}

export const logoutHandler_JWT = {
    logout_process
}
