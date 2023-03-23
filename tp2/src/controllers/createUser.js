const { schema_user } = require("../repositories/models/user");
const {Schema} = require('mongodb');
const { insertOne } = require("../services/db/crud");
const { generateUUID } = require("../repositories/utils/uuid");
const { Validator, validate } = require("jsonschema");

const createUser = (req,res) => {
    user = {
        "id":generateUUID(),
        "nom":req.query.nom,
        "prenom":req.query.prenom,
        "mail":req.query.mail,
        "array-watchlists":[]
    }
    let v = new Validator();
    if (v.validate(user,schema_user).valid){
        insertOne('template',user);
        return res.status(200).json(user);
    }
    return res.status(400).send("erreur");
}

module.exports = createUser