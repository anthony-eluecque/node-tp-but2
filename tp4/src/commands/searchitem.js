const { default: axios } = require('axios');
const { SlashCommandBuilder, Integration, EmbedBuilder } = require('discord.js');
const { request } = require('undici')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('searchitem')
        .setDescription('récupérer toutes les watchlists d un utilisateur')
        .addStringOption(filtreWatchlist => 
            filtreWatchlist.setName('genre')
            .setDescription('Filtre sur les items')
        ),
    
    async execute(interaction) {
        const url = "http://localhost:3000/items/filter"
        
        let filtre = ""
        if (interaction.options.getString('genre')){
            filtre = interaction.options.getString('genre')
        }
        const Embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle('Liste des items dans le registre ')

        axios.get(url,{
                params:{
                    filter : filtre
                }
            })
            .then(async (response) => {
                if (response.data.length > 0){
                    response.data.forEach((item) => {
                        Embed.addFields({name : "Nom de l'item : " +  item.title ,value : "Genre : " + item.genre,inline:false})                    
                    });
                    await interaction.reply({ embeds: [ Embed ] })
                }
                else{ 
                    await interaction.reply("** Aucun item dans la BDD **")
                }

            })
            .catch(async (error) => {
                console.log(error);
                await interaction.reply("**ERREUR**");
            })
    },
}