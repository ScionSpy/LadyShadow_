function clean(text){
  if (typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
};

module.exports = {
  coded : "2019-02-26",
  name : "eval",
  description : "....",
  usage : "<code>",

  args : true,
  owner : true,

  help : "dev",

  execute (message, args){

    //Define eval phrases

      const bot = message.client;
      const discord = require('discord.js');
      const fs = require('fs');
      const e = new discord.RichEmbed();

      var owners = []; bot.support.owners.forEach(owner => owners.push(owner+" | "+bot.users.get(owner).tag));
      var support = []; bot.support.users.forEach(user => support.push(user+" | "+bot.users.get(user).tag));

      var settings = bot.settings.g.get(message.guild.id);
      var prefixes = bot.prefix
      if(settings) var prefix = settings.prefix;
      if(!settings) var prefix = "No Prefix Found.\n`(Lack of SETTINGS file)`"


    //----------
    //----------


    try{
      const code = args.join(" ");
      let evaled = eval(code);
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      message.channel.send(clean(evaled), {code:"xl", split:true});
    }catch(err){
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  },
};
