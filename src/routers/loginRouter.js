import express from 'express';

import { UserData, User } from '../users/users.data.js';

const loginRouter = express.Router();

loginRouter
    .get('/', (req, res) => {
        res.sendFile('login.html', { root: 'public' });
    });