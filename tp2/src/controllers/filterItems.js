
const { Validator } = require("jsonschema");
const conf = require("../../conf.json");
const { find } = require("../services/db/crud");


const items = conf.tables.items;

const filterItems = async (req,res) => {

    try{
        if (!req.query.filter){
            return res.status(200).json(await find(items,{}));
        }
        result = await find(items,{'genre':req.query.filter})
        if (result.length===0){
            return res.status(200).json(await find(items,{}));
        }
        return res.status(200).json(result);
    } catch(e){
        throw e;
    }

}

module.exports = filterItems;