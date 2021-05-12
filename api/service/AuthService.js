const firebase = require('../utils/DBConfig');
const Define = require('../utils/Define');
const Response = require('../utils/Response');
const DataService = require('./DataService');

const admin = require('../utils/fbs/admin')

const auth = firebase.auth();


const AuthService = {
    //create account
    CreateUser: async (email, pass, role) => {
        try {
            //create the user
            const raw_user = await auth.createUserWithEmailAndPassword(email, pass)
            //console.log('raw user ', raw_user.user.uid);
            //store info into db
            const user = {
                id: raw_user.user.uid,
                email: email,
                pass: pass,
                role: role//user,admin,s-admin
            }
            return new Response(false, "User Created Successfully", user)
        }
        catch (e) {
            return new Response(true, `User Creation Faild , ${e.message}`, e)
        }
    },
    LoginUser: async (email, pass) => {
        try {
            //create the user
            const raw_user = await auth.signInWithEmailAndPassword(email, pass)
            //store info into db
            const user = await DataService.getDocument(Define.user_collection, raw_user.user.uid)
            user.response.pass = "****"
            return new Response(false, "User Login Successfully", user.response)
        }
        catch (e) {
            return new Response(true, `User Login Faild , ${e.message}`, e)
        }
    },
     
}

module.exports = AuthService