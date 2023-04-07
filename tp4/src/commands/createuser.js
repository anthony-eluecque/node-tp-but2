const { default: axios } = require('axios')
const { SlashCommandBuilder, Integration } = require('discord.js')

module.exports = {

    data : new SlashCommandBuilder()
        .setName('createuser')
        .setDescription('Je crée un nouveau User dans ma bdd mongodb')
        .addStringOption(nom => 
            nom.setName('nom')
            .setDescription('Le nom du user')
            .setRequired(true)
        )
        .addStringOption(prenom => 
            prenom.setName('prenom')
            .setDescription('Le prénom du user')
            .setRequired(true)
        )
        .addStringOption(mail => 
            mail.setName('mail')
            .setDescription('Le mail du user')
            .setRequired(true)
        ),
        
    async execute(interaction) {

        const nom = interaction.options.getString('nom');
        const prenom = interaction.options.getString('prenom');
        const mail = interaction.options.getString('mail');

        const url = "http://localhost:3000/users/create"
        axios.post(url,{
                nom : nom,
                prenom : prenom,
                mail : mail
            })
            .then(async (response) => {
                await interaction.reply("Le user a bien été crée");
            })
            .catch(async (error) => {
                await interaction.reply("Erreur lors de la création");
            })
    }
}