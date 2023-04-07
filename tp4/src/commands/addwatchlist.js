const { default: axios } = require('axios')
const { SlashCommandBuilder, Integration } = require('discord.js')

module.exports = {

    data : new SlashCommandBuilder()
        .setName('addwatchlist')
        .setDescription('Ajouter une watchlist à un utilisateur')
        .addStringOption(username => 
            username.setName('username')
            .setDescription('Le nom du user')
            .setRequired(true)
        )  
        .addStringOption(nomWatchlist => 
            nomWatchlist.setName('nomwatchlist')
            .setDescription('Le nom du user')
            .setRequired(true)
        ),
        
    async execute(interaction) {

        const nomOwner = interaction.options.getString('username');
        const nomWatchlist = interaction.options.getString('nomwatchlist');


        const url = "http://localhost:3000/watchlists/create"
        axios.post(url,{
                proprietaire : nomOwner,
                nom : nomWatchlist
            })
            .then(async (response) => {
                await interaction.reply("La watchlist a bien été ajouté à l'utilisateur et a été crée");
            })
            .catch(async (error) => {
                await interaction.reply("Erreur lors de la création");
            })
    }
}