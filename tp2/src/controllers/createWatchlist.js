const { Validator } = require("jsonschema");
const { schema_watchlist } = require("../repositories/models/watchlist");
const { generateUUID } = require("../repositories/utils/uuid");
const { updateOne, findOne, insertOne } = require("../services/db/crud");

const conf = require("../../conf.json");

const users = conf.tables.users;
const watchlists = conf.tables.watchlists;


const createWatchlist = async (req,res) => {
    try{
        let user = await findOne(users,{'nom':req.query.proprietaire});
        console.log(user);
        if (user){
            watchlist = {
                "id":generateUUID(),
                "nom":req.query.nom,
                "id-proprietaire":user['id'],
                "array-items":[]
            }
        }
        user = await findOne(users,{'prenom':req.body.proprietaire});
        console.log(user);
        if (user){
            watchlist = {
                "id":generateUUID(),
                "nom":req.body.nom,
                "id-proprietaire":user['id'],
                "array-items":[]
            } 
        }


        let v = new Validator();
        if (v.validate(watchlist,schema_watchlist).valid){
            console.log(watchlist['id']);
            const filter = {'id':watchlist['id-proprietaire']};
            console.log(filter);
            const updated = {$push:{'array-watchlists':watchlist['id']}};

            await updateOne(users,filter,updated);
            await insertOne(watchlists,watchlist);
            result = await findOne(users,{'id':watchlist['id-proprietaire']});
            return res.status(200).json(result);
        }
        return res.status(400).send("Conflits");
    }
    catch (e){
        res.status(400).send(e)
    }

}


module.exports = createWatchlist;