const Discord = require("discord.js")

module.exports = {
    name: "listemoji",
    description: "View all emojis in the guild",
    aliases: ['emoji'],
    run: async (bot, message, args) => {
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
        return bot.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.forEach((emoji) => {
        OverallEmojis++;
        if (emoji.animated) {
            Animated++;
            EmojisAnimated += Emoji(emoji.id);
        } else {
            EmojiCount++;
            Emojis += Emoji(emoji.id);
        }
    });
    let Embed = new Discord.MessageEmbed()
        .setAuthor(`Emojis in ${message.guild.name}.`, message.guild.iconURL())
        .setDescription(
            `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n**Over all emojis [${OverallEmojis}]**`
        )
        .setColor('GREY')
    message.channel.send(Embed);
},};
