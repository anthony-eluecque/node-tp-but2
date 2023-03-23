const schema_watchlist = {
    "title":"Schéma Watchlist",
    "description":"Description d'une watchlist",
    "properties":{
        "array-items":{
            "type":"array",
            "items":{
                "type":"object",
                "properties":{
                    "id":{
                        "type":"string"
                    },
                    "state":{
                        "type":"string",
                        "enum":["A voir","En cours","Terminé","Abandonné"]
                    }
                }   
            }
        },
        "id":{
            "type":"string",
            "format":"uuid"
        },
        "id-proprietaire":{
            "type":"string"
        }
    },
    "required":[
        "items"
    ],
	"additionalProperties": false
};

module.exports = { schema_watchlist }