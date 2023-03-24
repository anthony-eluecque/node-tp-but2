
const conf = require("../../conf.json");
const { find } = require("../services/db/crud");


const items = conf.tables.items;

const filterItems = async (req,res) => {

    try{
        return res.status(200).json(await find(items,{'genre':req.query.filter} ?? {}));
    } catch(e){
        throw e;
    }

}

module.exports = filterItems;