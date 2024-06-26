import express from 'express';

const indexRouter = express.Router();

indexRouter
    .get('/', (req, res) => {
        console.log("쿠키", req.cookies);
        const { user } = req.cookies;

        const unloginedmessage = '로그인이 필요합니다.';
        const loginedmessage = `안녕하세요! ${user}님`;

        res.send(user ? loginedmessage : unloginedmessage);
    });

export default indexRouter;