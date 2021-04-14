const { MessageEmbed } = require("discord.js");
const {
  server: { DOWNTIME_CHANNEL_ID, id: server_id },
} = require("../../config.json");
module.exports = class DownTimeDetector {
  constructor(client) {
    this.client = client;
    this.log = new Map();
    const oneMinute = 1 * 60 * 1000;
    setInterval(() => this.checkBots(), oneMinute);
  }
  async checkBots(guild) {
    const savedBots = guild.members.cache.filter(m => m.user.bot === true)
    for (const { id: botid } of savedBots) {
      const botUser = this.client.guilds.cache
        .get(server_id)
        ?.members.cache.get(botid);
      if (!botUser) continue;
      const isOffline = botUser.presence.status === "offline";
      const log = this.log.get(botid);
      if (isOffline && !log)
        this.log.set(botid, { since: new Date(), logged: false });
      else if (!isOffline) this.log.delete(botid);
      if (log && this.hasBeen15Mins(log.since) && !log.logged) {
        log.logged = true;
        await this.logLongDowntime(botUser.user.username);
      }
    }
  }
  async hasBeen15Mins(since) {
    const timeGapMs = new Date().getTime() - since.getTime();
    const fifteenMinsMs = 15 * 60 * 1000;
    return timeGapMs > fifteenMinsMs;
  }
  async logLongDownTime(botname) {
    const channelId = DOWNTIME_CHANNEL_ID;
    const channel = this.client.channels.cache.get(channelId);
    await channel?.send(
      new MessageEmbed()
        .setTitle("Bot offline")
        .setDescription(
          `Bot \`${botname}\` has been offline for over 15 minutes.`
        )
    );
  }
};
