const item = {
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
        "tmdb":{
            "type":"string"
        }
    },
    "required":[
        "title",
        "id-tmdb"
    ]
    
}
module.exports = { item }