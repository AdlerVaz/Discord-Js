const { MessageEmbed } = require('discord.js');
const permissions = require('../permissions.json');

module.exports = {
    name: 'permissions',
    description: `
      Displays all current permissions for the specified user. 
      If no user is given, your own permissions will be displayed.
    `,
    run: async(client, message, args) => {
        const member =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
          message.guild.members.cache.get(args[0]) || 
          message.member;
    
        const memberPermissions = member.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
          if (memberPermissions.includes(permission)) finalPermissions.push(`+ | ${permissions[permission]}`);
          else finalPermissions.push(`- | ${permissions[permission]}`);
        }
    
        const embed = new MessageEmbed()
        .setAuthor(`${member.displayName}'s Permissions`, member.user.displayAvatarURL({ dynamic: true }))
          .setDescription(`\`\`\`diff\n${finalPermissions.join('\n')}\`\`\``)
          .setColor("#2F3136")
        message.channel.send(embed);
      }
    };
