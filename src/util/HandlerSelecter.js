import { IndexHandler_Cookie } from '../index/IndexHandler_Cookie.js';
import { IndexHandler_Session } from '../index/IndexHandler_Session.js';
import { IndexHandler_JWT } from '../index/IndexHandler_JWT.js';

import { loginHandler_Cookie } from '../login/loginHandler_Cookie.js';
import { loginHandler_Session } from '../login/loginHandler_Session.js';
import { loginHandler_JWT } from '../login/loginHandler_JWT.js';

import { logoutHandler_Cookie } from '../logout/logoutHandler_Cookie.js';
import { logoutHandler_Session } from '../logout/logoutHandler_Session.js';
import { logoutHandler_JWT } from '../logout/logoutHandler_JWT.js';


// import { signupHandler_Cookie } from '../signup/signupHandler_Cookie.js';
// import { signupHandler_Session } from '../signup/signupHandler_Session.js';

const IndexHandlerSelect = () => {
    if (process.env.VERSION === 'cookie') {
        return IndexHandler_Cookie;
    }
    else if (process.env.VERSION === 'session'){
        return IndexHandler_Session;
    }
    else if (process.env.VERSION === 'jwt'){
        return IndexHandler_JWT;
    }
}

const LoginHandlerSelect = () => {
    if (process.env.VERSION === 'cookie') {
        return loginHandler_Cookie;
    }
    else if (process.env.VERSION === 'session'){
        return loginHandler_Session;
    } 
    else if (process.env.VERSION === 'jwt'){
        return loginHandler_JWT;
    }
}

const LogoutHandlerSelect = () => {
    if (process.env.VERSION === 'cookie') {
        return logoutHandler_Cookie;
    }
    else if (process.env.VERSION === 'session'){
        return logoutHandler_Session;
    }
    else if (process.env.VERSION === 'jwt'){
        return logoutHandler_JWT;
    }
}

// const SignupHandlerSelect = () => {
//     if (process.env.VERSION === 'cookie') {
//         return signupHandler_Cookie;
//     }
//     else {
//         return signupHandler_Session;
//     }
// }

export const HandlerSelecter = {
    IndexHandlerSelect,
    LoginHandlerSelect,
    LogoutHandlerSelect,
    // SignupHandlerSelect
}