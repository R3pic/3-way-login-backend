const logout_process = (req, res) => {
    console.log("세션", req.session);

    if (!req.session.user) {
        res.send("로그인 되어 있지 않습니다.");
        return;
    }

    req.session.destroy(err => {
        if (err) {
            console.log(err);
            res.send("세션 삭제 실패");
            return;
        } else {
            console.log("세션 삭제 성공");
        }
    });
    res.send("로그아웃 되었습니다.");
}

export const logoutHandler_Session = {
    logout_process
}
