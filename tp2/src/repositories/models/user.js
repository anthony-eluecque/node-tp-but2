const schema_user = {
    "title":"Schéma User",
    "description":"Description d'un utilisateur ",
    "properties":{
        "id":{
            "type":"string",
            "format":"uuid"
        },
        "nom":{
            "type":"string"
        },
        "prenom":{
            "type":"string"
        },
        "mail":{
            "type":"string",
            "format":"email"
        },
        "array-watchlists":{
            "type":"array",
            "items":{
                "type":"strnig"
            }
        }
    },
    "required":[
        "nom",
        "prenom",
        "mail"
    ],
    "additionalProperties":false
};

module.exports = { schema_user }