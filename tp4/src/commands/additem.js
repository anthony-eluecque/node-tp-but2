const { default: axios } = require('axios')
const { SlashCommandBuilder, Integration } = require('discord.js')

module.exports = {

    data : new SlashCommandBuilder()
        .setName('additem')
        .setDescription('Ajouter un item au registre')
        .addStringOption(titre => 
            titre.setName('titre')
            .setDescription('Le nom de l item')
            .setRequired(true)
        ),
        
    async execute(interaction) {

        const titre = interaction.options.getString('titre');
        const url = "http://localhost:3000/items/add"
        axios.post(url,{
                title : titre,
            })
            .then(async (response) => {
                await interaction.reply("L'item a bien été ajouté au registre");
            })
            .catch(async (error) => {
                await interaction.reply("Erreur lors de la création");
            })
    }
}