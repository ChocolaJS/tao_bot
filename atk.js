const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.js");

client.on("ready", () => {
  client.user.setPresence({
    game: {
      name: "攻撃用Bot",
    },
  });
});

const option = {
  playing : "",
  count: 0,
  count2: 0,
},

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
    const channel = client.channels.get(option.playing);
    message.embeds.forEach(e => {
      if( String(e.title).match("TAOを起動しました！") ){
        if( option.playing ){
          if( channel ) channel.send(`::atk`);
        }
      }
    });
    if( message.channel.id != option.playing ) return;
    option.count++;
    if( !message.content.match(`のHP:`) ) option.count2++;
    message.embeds.forEach(e => {
      const title = String(e.title),
            description = String(e.description);
      if( title.match("が待ち構えている...！") ){
        message.channel.send(`::atk`);
      }
      if( description.match(`${client.user.id}>は復活した！`) ){
        option.count2 = 0;
        setTimeout(() => message.channel.send(`::atk`), 400);
      }
      if( description.match(`エラーが起きたよ！`) ){
        option.count2 = 0;
        setTimeout(() => message.channel.send(`::atk`), 400);
      }
    });
    if( message.content.match(`${message.guild.members.get(client.user.id).displayName}のHP:`) ){
      if( !message.content.match("はやられてしまった。。。") ){
        option.count2++;
        setTimeout(() => {
          if( option.count2 ) return;
          message.channel.send(`::atk`);
        }, 2500);
      }
    }
    if( message.content.match(`おっと。データベースで`) ){
      option.count = 0;
      setTimeout(() => {
        if( option.count ) return;
        message.channel.send(`::atk`);
      }, 300);
    }
    if( message.content.match(`]のHP:`) ){
      option.count = 0;
      setTimeout(() => {
        if( option.count ) return;
        message.channel.send(`::atk`);
      }, 2500);
    }
  }
});

client.login(config.token);
