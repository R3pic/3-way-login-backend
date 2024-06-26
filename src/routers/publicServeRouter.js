import express from 'express';

const publicServeRouter = express.Router();

publicServeRouter
    .get('/signup', (req, res) => {
        res.sendFile('signup.html', { root: 'public' });
    })
    .get('/login', (req, res) => {
        res.sendFile('login.html', { root: 'public' });
    });

export default publicServeRouter;