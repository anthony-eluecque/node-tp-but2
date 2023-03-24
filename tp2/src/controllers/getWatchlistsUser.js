
const conf = require("../../conf.json");
const { find } = require("../services/db/crud");


const watchlists = conf.tables.watchlists;

const getWatchlistsUser = async (req,res) => {

    try{
        const result = await find(watchlists,{'id-proprietaire':req.query.idUser});
        return res.status(200).json(result);
    } catch(e){
        res.status(400).send(e);
        throw e;
    }


}
module.exports = getWatchlistsUser