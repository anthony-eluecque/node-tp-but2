const { findOne, updateOne } = require("../services/db/crud");
const states = require("../repositories/models/states");


const editStateOfItem = async (req,res) => {

    try{
        if (states.includes(req.query.state)){
            const watchlist = {'id':req.query.idWatchlist,'array-items.id': req.query.idItem}
            const updated = {$set:{'array-items.$.state':req.query.state}};
            result = await updateOne('template',watchlist,updated);
            return res.status(200).json(await findOne('template',{'id':req.query.idWatchlist}));
        }
        return res.status(200).send('Conflits, l etat n existe pas');
    }
    catch(e){
        res.status(400).send(e);
        throw e;
    }
}

module.exports = editStateOfItem