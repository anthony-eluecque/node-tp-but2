const { default: axios } = require('axios');
const { SlashCommandBuilder, Integration, EmbedBuilder } = require('discord.js');
const { request } = require('undici')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getusers')
        .setDescription('récupérer tous les utilisateurs'),
    async execute(interaction) {
        const url = "http://localhost:3000/users/"

        axios.get(url)
            .then(async (response) => {
                response.data.forEach(async (user) => {
                    const Embed = new EmbedBuilder()
                    .setColor('Yellow')
                    .setTitle('Carte Utilisateur : ')
                    .addFields(
                        {name : user.nom + " - " + user.prenom,value : user.mail}
                    )
                    await interaction.channel.send({embeds:[Embed]})
                }); 
            })
            .catch(async (error) => {
                console.log("ERREUR");
                await interaction.reply("**ERREUR**");
            })
    },
}