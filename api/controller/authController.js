const AuthService = require("../service/AuthService")
const DataService = require("../service/DataService")
const Define = require("../utils/Define")

const CreateUserController = async (req, res) => {
    const email = req.body.email
    const name = req.body.name
    const pass = req.body.pass
    const role = req.body.role
    //create the user
    const result = await AuthService.CreateUser(email, pass, role)
    //console.log("result=", result);
    //store the user
    if (!result.error) {
        const user = result.response
        user.name = name
        const resFS = await DataService.addDocument(Define.user_collection, user)
        result.message += "," + resFS.message
        res.json(result)
    } else {
        res.json(result)
    }
}

const LoginUserController = async (req, res) => {
    const email = req.body.email
    const pass = req.body.pass
    res.json(await AuthService.LoginUser(email, pass))
}
const DeleteUserController = async (req, res) => {
    const uid = req.params.uid
    res.json(await AuthService.DeleteUser(uid))
}

module.exports = {
    CreateUserController,
    LoginUserController,
    DeleteUserController
}