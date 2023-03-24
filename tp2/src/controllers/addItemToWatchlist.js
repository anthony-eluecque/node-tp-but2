const { Validator } = require("jsonschema");
const { findOne, updateOne } = require("../services/db/crud");

Validator

const addItemToWatchlist = async (req,res) => {

    try{
        item = await findOne('template',{'id':req.query.idItem});
        console.log(item);
        const filter = {'id':req.query.idWatchlist};
        const update = {$push:{'array-items':{'id':item.id,'state':req.query.state}}};
        updatedResult = await updateOne('template',filter,update);
        return res.status(200).json(await findOne('template',{'id':req.query.idWatchlist}));
    }
    catch(e){
        res.status(400).send(e);
        throw e;
    }

}


module.exports = { addItemToWatchlist }