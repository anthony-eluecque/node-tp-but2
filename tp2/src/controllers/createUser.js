const { schema_user } = require("../repositories/models/user");
const {Schema} = require('mongodb');
const { insertOne } = require("../services/db/crud");
const { generateUUID } = require("../repositories/utils/uuid");
const { Validator, validate } = require("jsonschema");

const conf = require("../../conf.json");
const users = conf.tables.users;

const createUser = (req,res) => {
    console.log(req.query);
    console.log(req.body);

    if (req.query){
        user = {
            "id":generateUUID(),
            "nom":req.query.nom,
            "prenom":req.query.prenom,
            "mail":req.query.mail,
            "array-watchlists":[]
        }
    }
    if (req.body){
        user = {
            "id":generateUUID(),
            "nom":req.body.nom,
            "prenom":req.body.prenom,
            "mail":req.body.mail,
            "array-watchlists":[]
        }     
    }
    // console.log(user);
    let v = new Validator();
    if (v.validate(user,schema_user).valid){
        insertOne(users,user);
        return res.status(200).json(user);
    }
    return res.status(400).send("erreur");
}

module.exports = createUser