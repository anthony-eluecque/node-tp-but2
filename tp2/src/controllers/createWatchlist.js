const { Validator } = require("jsonschema");
const { schema_watchlist } = require("../repositories/models/watchlist");
const { generateUUID } = require("../repositories/utils/uuid");
const { updateOne, findOne, insertOne } = require("../services/db/crud");

const conf = require("../../conf.json");

const users = conf.tables.users;
const watchlists = conf.tables.watchlists;


const createWatchlist = async (req,res) => {
    try{
        watchlist = {
            "id":generateUUID(),
            "nom":req.query.nom,
            "id-proprietaire":req.query.proprietaire,
            "array-items":[]
        }

        let v = new Validator();
        if (v.validate(watchlist,schema_watchlist).valid){
            
            const filter = {'id':req.query.proprietaire};
            const updated = {$push:{'array-watchlists':watchlist.id}};

            await updateOne(users,filter,updated);
            await insertOne(watchlists,watchlist);
            result = await findOne(users,{'id':req.query.proprietaire});
            return res.status(200).json(result);
        }
        return res.status(400).send("Conflits");
    }
    catch (e){
        res.status(400).send(e)
    }

}


module.exports = createWatchlist;