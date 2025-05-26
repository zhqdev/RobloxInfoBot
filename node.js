require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const TOKEN = process.env.DISCORD_TOKEN;

client.once('ready', () => {
    console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const prefix = '!';
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'avatar') {
        const username = args[0];
        if (!username) return message.reply("Donne un pseudo Roblox. Exemple : `!avatar Builderman`");

        try {
            const res = await fetch(`https://api.roblox.com/users/get-by-username?username=${username}`);
            const data = await res.json();
            if (!data.Id) return message.reply("Utilisateur introuvable.");

            const avatarUrl = `https://www.roblox.com/headshot-thumbnail/image?userId=${data.Id}&width=150&height=150&format=png`;

            message.channel.send({ content: `Voici l'avatar Roblox de **${username}** :`, files: [avatarUrl] });
        } catch {
            message.reply("Erreur lors de la récupération.");
        }
    }
    else if (command === 'groupe') {
        const groupId = args[0];
        if (!groupId) return message.reply("Donne un ID de groupe Roblox. Exemple : `!groupe 1234567`");

        try {
            const res = await fetch(`https://groups.roblox.com/v1/groups/${groupId}`);
            const data = await res.json();
            if (data.errors) return message.reply("Groupe introuvable.");

            message.channel.send(`**${data.name}**\nDescription : ${data.description || "Aucune"}\nMembres : ${data.memberCount}`);
        } catch {
            message.reply("Erreur lors de la récupération.");
        }
    }
    else if (command === 'rang') {
        const username = args[0];
        const groupId = args[1];
        if (!username || !groupId) return message.reply("Usage : !rang <pseudo> <groupId>");

        try {
            const userRes = await fetch(`https://api.roblox.com/users/get-by-username?username=${username}`);
            const userData = await userRes.json();
            if (!userData.Id) return message.reply("Utilisateur introuvable.");

            const rankRes = await fetch(`https://groups.roblox.com/v1/users/${userData.Id}/groups/roles`);
            const rankData = await rankRes.json();

            const groupRank = rankData.data.find(g => g.group.id == groupId);
            if (!groupRank) return message.reply(`${username} n'est pas dans ce groupe.`);

            message.channel.send(`${username} est **${groupRank.role.name}** dans le groupe ${groupRank.group.name}.`);
        } catch {
            message.reply("Erreur lors de la récupération.");
        }
    }
});

client.login(TOKEN);
