const { default: axios } = require('axios');
const { Validator } = require('jsonschema');
const { schema_item } = require('../repositories/models/item');
const { generateUUID } = require('../repositories/utils/uuid');
const { insertOne, updateOne } = require('../services/db/crud');

const conf = require("../../conf.json");
const items = conf.tables.items;
require('dotenv').config();

const createItem = async (req,res) => {
    try{
        let url = 'http://www.omdbapi.com/?t='+req.query.title+'&apikey='+ process.env.API_KEY
        if (!req.query.title){
            url = 'http://www.omdbapi.com/?t='+req.body.title+'&apikey='+ process.env.API_KEY
        }
        axios.get(url)
            .then(async (response) =>{
                const genres = response.data.Genre.split(', ')  
                item = {
                   "id" : generateUUID(),
                   "title" : response.data.Title,
                   "id-tmdb" : response.data.imdbID,
                   "genre": genres[0]
                };
                let v = new Validator();
                if (v.validate(item,schema_item).valid){
                    insertOne(items,item);
                    return res.status(200).send(item);   
                }
                return res.status(400).send('Conflits');
            })
            .catch((error) => {
                return res.status(400).send(error);
            })
    
    } catch(e){
        throw e;
    }
}

module.exports = createItem 