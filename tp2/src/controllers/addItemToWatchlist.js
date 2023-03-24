const { Validator } = require("jsonschema");
const { findOne, updateOne } = require("../services/db/crud");
const states = require("../repositories/models/states");

const conf = require("../../conf.json");

const items = conf.tables.items;
const watchlists = conf.tables.watchlists;

const addItemToWatchlist = async (req,res) => {

    try{
        if (states.includes(req.query.state)){
            item = await findOne(items,{'id':req.query.idItem});
            const filter = {'id':req.query.idWatchlist};
            watchlist = await findOne(watchlists,filter);
            const update = {$push:{'array-items':{'id':item.id,'state':req.query.state}}};
            updatedResult = await updateOne(watchlists,watchlist,update);
            return res.status(200).json(await findOne(watchlists,{'id':req.query.idWatchlist}));
        }
        return res.status(200).send('L etat n existe pas, conflits');
    }
    catch(e){
        res.status(400).send(e);
        throw e;
    }

}


module.exports = { addItemToWatchlist }