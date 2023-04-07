const { default: axios } = require('axios');
const { SlashCommandBuilder, Integration, EmbedBuilder } = require('discord.js');
const { request } = require('undici')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getitemswatchlist')
        .setDescription('récupérer tous les items d une watchlist')
        .addStringOption(nomWatchlist => 
            nomWatchlist.setName('nomwatchlist')
            .setDescription('le nom de la watchlist')
            .setRequired(true)
        ),
    
    async execute(interaction) {
        const url = "http://localhost:3000/watchlists/watchlist/items"
        const nomWatchlist = interaction.options.getString('nomwatchlist');

        axios.get(url,{
            params:{
                nameWatchlist : nomWatchlist
            }
        })
            .then(async (response) => {
                if (response.data.length > 0){
                    response.data.forEach(async (item) => {
                        const Embed = new EmbedBuilder()
                        .setColor('Yellow')
                        .setTitle('Carte Item : ')
                        .addFields(
                            {name : item.title ,value : item["id-tmdb"]}
                        )
                        await interaction.channel.send({embeds:[Embed]})
                    }); 
                    await interaction.reply("**Les items de votre watchlist : **");

                }
                else{ 
                    await interaction.reply("** Votre watchlist est vide ou n'existe pas ! **")
                }

            })
            .catch(async (error) => {
                console.log("ERREUR");
                await interaction.reply("**ERREUR , la watchlist que vous recherchez n'existe pas**");
            })
    },
}