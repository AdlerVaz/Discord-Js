const moment = require('moment');
const tz = require('moment-timezone');
const chalk = require('chalk');
const Discord = require('discord.js');

const { timezone, format, clockchannel, updateinterval} = require('../config.js');// dont forget about this please

bot.once('ready', () => {
    //init time
    const timeNow = moment().tz(timezone).format(format);
    //define clockChannel
    const clockChannel = bot.channels.cache.get(clockchannel);
    //initial update
    clockChannel.edit({ name: `${timeNow}` }, 'Clock update')
      .catch(console.error);
    //set the interval
    setInterval(() => {
      const timeNowUpdate = moment().tz(timezone).format(format);
      clockChannel.edit({ name: `${timeNowUpdate}` }, 'Clock update')
        .catch(console.error);
    }, updateinterval);
    //tells if it is ready
      console.log(chalk.greenBright("[READY]"), `Logged in as ${bot.user.tag} (${bot.user.id}) at ${moment().format("DD MMMM YYYY, HH:mm:ss")}`);
  });
