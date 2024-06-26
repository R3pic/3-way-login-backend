import { IndexHandler_Cookie } from '../index/IndexHandler_Cookie.js';
import { IndexHandler_Session } from '../index/IndexHandler_Session.js';

import { loginHandler_Cookie } from '../login/loginHandler_Cookie.js';
import { loginHandler_Session } from '../login/loginHandler_Session.js';

import { logoutHandler_Cookie } from '../logout/logoutHandler_Cookie.js';
import { logoutHandler_Session } from '../logout/logoutHandler_Session.js';

// import { signupHandler_Cookie } from '../signup/signupHandler_Cookie.js';
// import { signupHandler_Session } from '../signup/signupHandler_Session.js';

const IndexHandlerSelect = () => {
    if (process.env.VERSION === 'cookie') {
        return IndexHandler_Cookie;
    }
    else {
        return IndexHandler_Session;
    }
}

const LoginHandlerSelect = () => {
    if (process.env.VERSION === 'cookie') {
        return loginHandler_Cookie;
    }
    else {
        return loginHandler_Session;
    }
}

const LogoutHandlerSelect = () => {
    if (process.env.VERSION === 'cookie') {
        return logoutHandler_Cookie;
    }
    else {
        return logoutHandler_Session;
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