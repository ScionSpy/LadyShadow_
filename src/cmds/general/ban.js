module.exports = {
    coded : "2019-04-05",
    name : "ban",
    aliases : ["hammer"],
    description : "Bans the desired cranky member.\nRequires `Admin` set role, or `BAN_MEMBERS` permission.\n\nDoes not support ID's. [yet]",
    usage : "<@user> <Reason>",
    guildOnly : true,
    args : true,

    help : "admin",

    execute(message, args){
        bot = message.client;

      //ModLog setting
        type = "Ban";

        admin = false;
        staff = false

        settings = bot.settings.g.get(message.guild.id);
        if(settings.admin) admin = true;
        if(settings.staff) staff = true;

        if(!admin && !staff && !message.member.permissions.has("BAN_MEMBERS") && message.author.id != message.guild.ownerid) return message.reply("You require either the servers `ADMIN` role, or `BAN_MEMBERS` permission to Ban members.");

        if(!message.guild.members.get(message.client.user.id).permissions.has("BAN_MEMBERS")) return message.reply("I require the `BAN_MEMBERS` permission to Ban somebody!!\nYou can by selecting the user in question and tap `Ban Member`");

        if(args.length == 0 || !message.mentions.members) return message.reply(`Please mention a user to ban.\n\`${settings.prefix}ban <@user> <reason>\``);
        if(args.length <= 1) return message.reply(`Please provide a reason for banning ${message.mentions.members.first().user.tag}`);

        member = message.mentions.members.first();
        removeMember = args.shift();
        reason = args.join(' ')
        if(!message.guild.members.get(member.id)) return message.reply(`There's no user on this server with an \`id\` of \`${member.id}\``);

        message.guild.members.get(member.id).ban(`Banned by "${message.author.tag}" for "${reason}"`)
            .then(msg => {
              message.react("👌");

                ch = message.channel;
                if(settings.modlog) ch = message.guild.channels.get(settings.modlog);

              //get modLog
                embed = bot.functions.get("modlog").execute(type, reason, member.user, message.author);

                ch.send(embed);
            })
            .catch(err => {
                message.channel.send(bot.functions.get("err").execute(message, err));
            });
    }
};
