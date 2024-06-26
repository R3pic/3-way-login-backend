import { UserData } from '../users/users.data.js';

const login_process = (req, res) => {
    console.log("세션 버전 로그인 핸들러");
    console.log("바디",req.body);
    console.log("세션", req.session);
    console.log("쿠키",req.cookies);

    const { username, password } = req.body;
    const user = UserData.getUser(username);

    if (req.session.user) {
        res.send("이미 로그인 되어 있습니다.");
        return;
    }

    if (!user) {
        res.send("존재하지 않는 사용자입니다.");
        return;
    }

    if (user.password !== password) {
        res.send("비밀번호가 틀렸습니다.");
        return;
    }

    req.session.user = {
        name: username,
        pw: password,
        authorized: true,
        data: "내가 원하는 데이터 넣어버리기",
    };

    res.send("로그인 되었습니다.");
}

export const loginHandler_Session = {
    login_process
}