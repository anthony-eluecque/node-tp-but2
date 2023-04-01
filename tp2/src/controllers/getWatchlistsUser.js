
const conf = require("../../conf.json");
const { find, findOne } = require("../services/db/crud");


const watchlists = conf.tables.watchlists;
const users = conf.tables.users;

const getWatchlistsUser = async (req,res) => {

    try{
        console.log(req.query)
        let result = {}
        if (req.query.idUser){
            result = await find(watchlists,{'id-proprietaire':req.query.idUser});
        }
        if (req.query.name){
            const user = await findOne(users,{'prenom':req.query.name});
            if (user){
                result = await find(watchlists,{'id-proprietaire':user.id});
            }
        }
        return res.status(200).json(result);
    } catch(e){
        res.status(400).send(e);
        throw e;
    }


}
module.exports = getWatchlistsUser