const conf = require("../../conf.json");
const { find, findOne } = require("../services/db/crud");


const items = conf.tables.items;
const watchlists = conf.tables.watchlists;

const getItemsWatchlists = async(req,res) => {

    try{
        const arrayItems = []
        let results = {}
        if (req.query.idWatchlist){
            results = await findOne(watchlists,{'id':req.query.idWatchlist});
        }
        if (req.query.nameWatchlist){
            results = await findOne(watchlists,{'nom':req.query.nameWatchlist});
        }
        if (results){
            for (let i=0;i<results['array-items'].length;i++){
                let item = results['array-items'][i]
                const result = await findOne(items,{'id':item.id})
                arrayItems.push(result);
            }   
        }
        return res.status(200).json(arrayItems);

    } catch(e){
        res.status(400).send(e);
        throw e;
    }

}


module.exports = getItemsWatchlists