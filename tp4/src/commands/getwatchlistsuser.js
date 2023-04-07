const { default: axios } = require('axios');
const { SlashCommandBuilder, Integration, EmbedBuilder } = require('discord.js');
const { request } = require('undici')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getwatchlistuser')
        .setDescription('récupérer toutes les watchlists d un utilisateur')
        .addStringOption(nomWatchlist => 
            nomWatchlist.setName('prenom')
            .setDescription('le prénom du user')
            .setRequired(true)
        ),
    
    async execute(interaction) {
        const url = "http://localhost:3000/users/user/watchlists"
        const prenomUser = interaction.options.getString('prenom');
        const Embed = new EmbedBuilder()
        .setColor('Purple')
        .setTitle('Les watchlists de l utilisateur : ')

        axios.get(url,{
            params:{
                name : prenomUser
            }
        })
            .then(async (response) => {
                if (response.data.length > 0){
                    response.data.forEach((watchlist) => {
                        Embed.addFields({name : "Nom de la watchlist : " +  watchlist.nom ,value : JSON.stringify(watchlist['array-items']),inline:false})                    
                    });
                    await interaction.reply({ embeds: [ Embed ] })
                }
                else{ 
                    await interaction.reply("** L'utilisateur ne possède pas de watchlist **")
                }

            })
            .catch(async (error) => {
                console.log(error);
                await interaction.reply("**ERREUR**");
            })
    },
}