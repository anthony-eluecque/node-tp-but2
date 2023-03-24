const { Validator } = require("jsonschema");
const { schema_watchlist } = require("../repositories/models/watchlist");
const { generateUUID } = require("../repositories/utils/uuid");
const { updateOne, findOne, insertOne } = require("../services/db/crud");

// 79fd0ff2-c524-4e09-b2e1-0b2a58c3f206
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

            await updateOne('template',filter,updated);
            await insertOne('template',watchlist);
            result = await findOne('template',{'id':req.query.proprietaire});
            return res.status(200).json(result);
        }
        return res.status(400).send("Conflits");
    }
    catch (e){
        res.status(400).send(e)
    }

}


module.exports = createWatchlist;