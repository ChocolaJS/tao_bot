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

const option = {
  playing : "",
}

client.on("message", message => {
  if( !message.guild ) return;
  if( message.content.startsWith(config.prefix) ){
    const key = message.content.slice(config.prefix.length).split(" ");
    switch(key[0]){
      case "setchannel":
        const channel = message.mentions.channels.first() || client.channels.find(c => c.type=="text" && (c.id==key[1]||c.name==key[1]));
        if( channel ){
          option.playing = channel.id;
          message.channel.send(`戦闘チャンネルを「${channel}」に変更しました！`);
        }else{
          message.channel.send(`そのチャンネルはありません！`);
        }
        break;
      case "stop":
        option.playing = "";
        message.channel.send(`停止します！`);
        break;
      default:
        message.channel.send(`::${key.join(" ")}`);
    }
  }
  if( message.author.id=="526620171658330112" ){
    if( message.channel.id != option.playing ) return;
    if( message.content.match("の攻撃！") && message.content.match("はやられてしまった。。。") ){
      let split = message.content.split(/の攻撃！|\s-\s|のHP\:|\n|はやられてしまった。。。/);
      let player = message.guild.members.find(m => m.displayName == split[11]);

      if( player ){
        setTimeout(() => message.channel.send(`::i i ${player.user}`), 350);
      }
    }
  }
});

client.login(config.token);
