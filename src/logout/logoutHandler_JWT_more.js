const logout_process = (req, res) => {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.send('로그아웃 되었습니다.');
}

export const logoutHandler_JWT_more = {
    logout_process
}
