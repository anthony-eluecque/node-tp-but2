const conf = require("../../conf.json");
const { find, findOne } = require("../services/db/crud");


const items = conf.tables.items;
const watchlists = conf.tables.watchlists;

const getItemsWatchlists = async(req,res) => {

    try{

        const results = await find(watchlists,{'id':req.query.idWatchlist});
        const arrayItems = []

        for (let i=0;i<results[0]['array-items'].length;i++){
            let item = results[0]['array-items'][i]
            const result = await findOne(items,{'id':item.id})
            arrayItems.push(result);
        }
        return res.status(200).json(arrayItems);

    } catch(e){
        res.status(400).send(e);
        throw e;
    }

}


module.exports = getItemsWatchlists