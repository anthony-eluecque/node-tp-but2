const { default: axios } = require('axios');
const { Validator } = require('jsonschema');
const { schema_item } = require('../repositories/models/item');
const { generateUUID } = require('../repositories/utils/uuid');
const { insertOne } = require('../services/db/crud');

require('dotenv').config();

const createItem = (req,res) => {
    const url = 'http://www.omdbapi.com/?t='+req.query.title+'&apikey='+ process.env.API_KEY
    axios.get(url)
        .then((response) =>{
            item = {
               "id" : generateUUID(),
               "title" : response.data.Title,
               "id-tmdb" : response.data.imdbID
            };
            let v = new Validator();
            if (v.validate(item,schema_item).valid){
                insertOne('template',item);
                return res.status(200).send(item);   
            }
            return res.status(400).send('Conflits');
        })
        .catch((error) => {
            return res.status(400).send(error);
        })

}

module.exports = createItem 