const schema_item = {
    "title":"Schéma film",
    "description":"Description d'un film",
    "properties":{
        "id":{
            "type":"string",
            "format":"uuid"
        },
        "title":{
            "type":"string"
        },
        "id-tmdb":{
            "type":"string"
        },
        "genre":{
            "type":"string"
        }
    },
    "required":[
        "title",
        "id-tmdb"
    ]
    
}
module.exports = { schema_item }