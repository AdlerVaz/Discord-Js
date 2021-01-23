bot.on('ready', () => {
  var playing = ["Songs", `on ${bot.guilds.cache.size} servers`, `[*help]`]//addmore status if you want
  var interval = setInterval(function() {
    var game = Math.floor((Math.random() * playing.length) + 0);
    bot.user.setActivity({
      name: playing[game],
      type: 'STREAMING',
      url: "https://www.twitch.tv/pewdiepie"//put the twitch streamers channel link or your account channel link
    })
  }, 5000);//set the timeinterval 
  console.log("Twitch Status!")
});
