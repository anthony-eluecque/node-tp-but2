
const conf = require("../../conf.json");
const { find, findOne } = require("../services/db/crud");

const users = conf.tables.users;

const getAllUsers = async (req,res) => {

    try{
        return res.status(200).json(await find(users,{}))
    } catch(e){
        res.status(400).send(e);
        throw e;
    }

}

module.exports = getAllUsers


