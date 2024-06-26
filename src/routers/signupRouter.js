import express from 'express';

import { UserData } from '../users/users.data.js';
import { User } from '../model/UserModel.js';

const signupRouter = express.Router();

signupRouter
    .get('/', (req, res) => {
        res.sendFile('signup.html', { root: 'public' });
    })
    .post('/', (req, res) => {
        console.log("바디",req.body);
        console.log("쿠키",req.cookies);

        const { username, password } = req.body;
        const user = new User(username, password);

        if (UserData.hasUser(username)) {
            res.send("이미 존재하는 회원입니다.");
            return;
        }
        else {
            UserData.createUser(user);
            // res.cookie('user', username); 회원가입 후 자동 로그인 되지 않도록 주석처리
            res.redirect('/login');
        }
    });

export default signupRouter;