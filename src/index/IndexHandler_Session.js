const getMessage = (req) => {
    console.log("세션", req.session);
    const user = req.session.user;
    console.log("유저", user);

    const unloginedmessage = '로그인이 필요합니다.';
    const loginedmessage = `안녕하세요! ${JSON.stringify(user)}님`;

    return user ? loginedmessage : unloginedmessage;
}

export const IndexHandler_Session = {
    getMessage,
}