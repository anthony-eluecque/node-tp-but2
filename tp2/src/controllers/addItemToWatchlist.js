const { Validator } = require("jsonschema");
const { findOne, updateOne } = require("../services/db/crud");
const states = require("../repositories/models/states");

const conf = require("../../conf.json");

const items = conf.tables.items;
const watchlists = conf.tables.watchlists;

const addItemToWatchlist = async (req,res) => {

    try{
        console.log(req.query);
        if (states.includes(req.query.state)){
            if (req.query.idItem && req.query.idWatchlist){
                item = await findOne(items,{'id':req.query.idItem});
                const filter = {'id':req.query.idWatchlist};
                watchlist = await findOne(watchlists,filter);
                const update = {$push:{'array-items':{'id':item.id,'state':req.query.state}}};
                updatedResult = await updateOne(watchlists,watchlist,update);
                return res.status(200).json(await findOne(watchlists,{'id':req.query.idWatchlist}));
            }
            else if (req.query.titleItem && req.query.nomWatchlist){
                item = await findOne(items,{'title':req.query.titleItem});
                const filter = {'nom':req.query.nomWatchlist}
                // console.log(filter);
                watchlist = await findOne(watchlists,filter);
                const update = {$push:{'array-items':{'id':item.id,'state':req.query.state}}};
                updatedResult = await updateOne(watchlists,watchlist,update);
                // console.log(updatedResult)
                return res.status(200).json(await findOne(watchlists,{'id':watchlist.id}));
            }
        }
        return res.status(200).send('L etat n existe pas, conflits');
    }
    catch(e){
        res.status(400).send(e);
        throw e;
    }

}


module.exports = { addItemToWatchlist }