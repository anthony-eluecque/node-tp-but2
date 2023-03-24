const { Validator } = require("jsonschema");
const { findOne, updateOne } = require("../services/db/crud");
const states = require("../repositories/models/states");

const addItemToWatchlist = async (req,res) => {

    try{
        if (states.includes(req.query.state)){
            console.log(states);
            item = await findOne('template',{'id':req.query.idItem});
            console.log(item);
            const filter = {'id':req.query.idWatchlist};
            watchlist = await findOne('template',filter);
            const update = {$push:{'array-items':{'id':item.id,'state':req.query.state}}};
            updatedResult = await updateOne('template',watchlist,update);
    
            return res.status(200).json(await findOne('template',{'id':req.query.idWatchlist}));
        }
        return res.status(200).send('L etat n existe pas, conflits');
    }
    catch(e){
        res.status(400).send(e);
        throw e;
    }

}


module.exports = { addItemToWatchlist }