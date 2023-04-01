const conf = require("../../conf.json");
const { deleteOne, findOne } = require("../services/db/crud");


const watchlists = conf.tables.watchlists

const deleteItem = async(req,res) => {

    try{
        const query = await findOne(watchlists,{"id":req.query.idWatchlist});
        
        

        const result = deleteOne();
        res.status(200).send("Item bien supprimé ! ");

    }  catch(e){
        res.render(400).send(e);
        throw e;
    }     

};


module.exports = deleteItem;