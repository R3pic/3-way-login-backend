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
            res.status(409).send({ message: "이미 존재하는 회원입니다." });
            return;
        }

        UserData.createUser(user);
        res.status(201).send({ message: "회원가입 성공" });
    });

export default signupRouter;