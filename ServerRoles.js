const Discord = require('discord.js')

module.exports = {
  name: 'serverroles',
  description: 'Get the list of all server roles',
  aliases: ["rolelist"],
  run: async (bot, message, args) => {
    let rolemap = message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(r => r)
            .join(",");
            if (rolemap.length > 1024) rolemap = "To many roles to display";
            if (!rolemap) rolemap = "No roles";
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Server Role List`, message.guild.iconURL())
    .setDescription(rolemap)
    .setColor("GREEN")
    message.channel.send(embed);
  }
}
