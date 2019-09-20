const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.js");

client.on("ready", () => {
  client.user.setPresence({
    game: {
      name: "祈り用Bot",
    },
  });
});

client.on("message", message => {
  if( !message.guild ) return;
  if( message.author.id=="526620171658330112" ){
    if( message.content.match("の攻撃！") && message.content.match("はやられてしまった。。。") ){
      let split = message.content.split(/の攻撃！|\s-\s|のHP\:|\n|はやられてしまった。。。/);
      let player = message.guild.members.find(m => m.displayName == split[11]);

      if( plyaer ){
        setTimeout(() => message.channel.send(`::i i ${player.user}`), 350);
      }
    }
  }
});

client.login(config.token);
