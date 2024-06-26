const getMessage = (req) => {
    console.log("쿠키", req.cookies);
    const { user } = req.cookies;

    const unloginedmessage = '로그인이 필요합니다.';
    const loginedmessage = `안녕하세요! ${user}님`;

    return user ? loginedmessage : unloginedmessage;
}

export const IndexHandler_Cookie = {
    getMessage,
}