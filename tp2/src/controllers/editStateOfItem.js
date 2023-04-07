const { findOne, updateOne } = require("../services/db/crud");
const states = require("../repositories/models/states");
const conf = require("../../conf.json");

const watchlists = conf.tables.watchlists;
const items = conf.tables.items;


const editStateOfItem = async (req,res) => {

    try{

        if (states.includes(req.body.state)){
            const watchlist = {'nom':req.body.nomWatchlist,'array-items.id': req.body.idItem};
            const updated = {$set:{'array-items.$.state':req.body.state}};
            result = await updateOne(watchlists,watchlist,updated);
            return res.status(200).json(await findOne(watchlists,{'nom':req.body.nomWatchlist}));        
        }
        if (states.includes(req.query.state)){

            if (req.query.idWatchlist){
                const watchlist = {'id':req.query.idWatchlist,'array-items.id': req.query.idItem}
                const updated = {$set:{'array-items.$.state':req.query.state}};
                result = await updateOne(watchlists,watchlist,updated);
                return res.status(200).json(await findOne(watchlists,{'id':req.query.idWatchlist}));
            }
            else if(req.query.nomWatchlist){
                const item = await findOne(items,{'title':req.query.titleItem});
                const watchlist = {'nom':req.query.nomWatchlist,'array-items.id': item.id}
                const updated = {$set:{'array-items.$.state':req.query.state}};
                result = await updateOne(watchlists,watchlist,updated);
                return res.status(200).json(await findOne(watchlists,{'nom':req.query.nomWatchlist}));
            }
        }
        return res.status(200).send('Conflits, l etat n existe pas');
    }
    catch(e){
        res.status(400).send(e);
        throw e;
    }
}

module.exports = editStateOfItem