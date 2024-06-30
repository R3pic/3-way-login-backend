const getMessage = (req) => {
    console.log("현재 세션 정보 : ", req.session);
    const user = req.session.user;
    console.log("유저", user);

    const username = user ? user.name : null;
    const content = user ? user.data : null;

    const unloginedmessage = '로그인이 필요합니다.';
    const loginedmessage = `안녕하세요! ${username}님! 세션에 저장된 데이터 : ${content}`;

    if (!user) {
        return unloginedmessage;
    }


    return user.authorized ? loginedmessage : unloginedmessage;
}

export const IndexHandler_Session = {
    getMessage,
}