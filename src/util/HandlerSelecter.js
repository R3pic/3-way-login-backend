import { IndexHandler_Cookie } from '../index/IndexHandler_Cookie.js';
import { IndexHandler_Session } from '../index/IndexHandler_Session.js';
import { IndexHandler_JWT } from '../index/IndexHandler_JWT.js';
import { IndexHandler_JWT_more } from '../index/indexHandler_JWT_more.js';

import { loginHandler_Cookie } from '../login/loginHandler_Cookie.js';
import { loginHandler_Session } from '../login/loginHandler_Session.js';
import { loginHandler_JWT } from '../login/loginHandler_JWT.js';
import { loginHandler_JWT_more } from '../login/loginHandler_JWT_more.js';


import { logoutHandler_Cookie } from '../logout/logoutHandler_Cookie.js';
import { logoutHandler_Session } from '../logout/logoutHandler_Session.js';
import { logoutHandler_JWT } from '../logout/logoutHandler_JWT.js';
import { logoutHandler_JWT_more } from '../logout/logoutHandler_JWT_more.js';


// import { signupHandler_Cookie } from '../signup/signupHandler_Cookie.js';
// import { signupHandler_Session } from '../signup/signupHandler_Session.js';

const IndexHandlerSelect = () => {
    switch (process.env.VERSION) {
        case 'cookie':
            return IndexHandler_Cookie;
        case 'session':
            return IndexHandler_Session;
        case 'jwt':
            return IndexHandler_JWT;
        case 'jwt-refresh':
            return IndexHandler_JWT_more;
    }
}

const LoginHandlerSelect = () => {
    switch (process.env.VERSION) {
        case 'cookie':
            return loginHandler_Cookie;
        case 'session':
            return loginHandler_Session;
        case 'jwt':
            return loginHandler_JWT;
        case 'jwt-refresh':
            return loginHandler_JWT_more;
    }
}

const LogoutHandlerSelect = () => {
    switch (process.env.VERSION) {
        case 'cookie':
            return logoutHandler_Cookie;
        case 'session':
            return logoutHandler_Session;
        case 'jwt':
            return logoutHandler_JWT;
        case 'jwt-refresh':
            return logoutHandler_JWT_more;
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