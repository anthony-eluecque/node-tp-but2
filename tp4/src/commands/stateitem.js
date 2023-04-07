const { default: axios } = require('axios')
const { SlashCommandBuilder, Integration } = require('discord.js')

module.exports = {

    data : new SlashCommandBuilder()
        .setName('stateitem')
        .setDescription('Modifier l état d un item dans une watchlist')
        .addStringOption(titre => 
            titre.setName('titre')
            .setDescription('Le nom de l item')
            .setRequired(true)
        )
        .addStringOption(nomWatchlist =>
            nomWatchlist.setName('nomwatchlist')
            .setDescription('Le nom de ma watchlist')
            .setRequired(true)
        )
        .addStringOption(state => 
            state.setName('statement')
            .setDescription("L'état de l'item")
            .setRequired(true)
        ),
        
    async execute(interaction) {

        const titre = interaction.options.getString('titre');
        const state = interaction.options.getString('statement');
        const nomWatchlist = interaction.options.getString('nomwatchlist');

        const url = "http://localhost:3000/watchlists/edit"
        axios.post(url,null,{
                params:{
                    titleItem : titre,
                    nomWatchlist : nomWatchlist,
                    state : state
                }
            })
            .then(async (response) => {
                await interaction.reply("L'item a bien été modifié !");
            })
            .catch(async (error) => {
                await interaction.reply("Erreur lors de l'ajout");
            })
    }
}