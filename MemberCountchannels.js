let countChannel= {
    total: "802275726249820202",
    members:"802275780658593793",
    bots:"802275875093217300",
    serverID:"801873765872173087",
}

bot.on("guildMemberAdd", member => {
    if(member.guild.id !== countChannel.serverID) return;

    bot.channels.cache.get(countChannel.total).setName(`Total Members: ${member.guild.memberCount}`)
    bot.channels.cache.get(countChannel.members).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`)
    bot.channels.cache.get(countChannel.bots).setName(`Bots: ${member.guild.members.cache.filter(m =>m.user.bot).size}`);
})

bot.on("guildMemberRemove", member => {
    if(member.guild.id !== countChannel.serverID) return;

    bot.channels.cache.get(countChannel.total).setName(`Total Members: ${member.guild.memberCount}`)
    bot.channels.cache.get(countChannel.members).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`)
    bot.channels.cache.get(countChannel.bots).setName(`Bots: ${member.guild.members.cache.filter(m =>m.user.bot).size}`);
})
