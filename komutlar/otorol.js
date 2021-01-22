const Discord = require("discord.js");

const db = require("quick.db");

exports.run = async (client, message, args) =&gt; {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("ERROR")
        .setColor(message.guild.me.displayColor)
        .setDescription(`You don't have permission to do that.`)
    );

  ////// Wrong using

  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed().setTitle("Wrong Using").setDescription(`

!autorole user @userrole

!autorole bot @botrole

!autorole show

!autorole delete`)
    );

  ///// USER ROLE

  if (args[0] === "user") {
    let userrole =
      message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

    if (!userrole)
      return message.channel.send(
        new Discord.MessageEmbed()

          .setTitle("ERROR")

          .setColor(message.guild.me.displayColor)

          .setDescription(`You have to select a role.`)
      );

    if (db.has(`userrole_${message.guild.id}`)) {
      db.delete(`userrole_${message.guild.id}`);

      db.set(`userrole_${message.guild.id}`, userrole.id);

      message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Completed")
          .setColor(message.guild.me.displayColor)
          .setDescription(
            `User role changed succesfully.\n To show use **!autorole show** command.`
          )
      );
    } else {
      db.set(`userrole_${message.guild.id}`, userrole.id);

      message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Completed")
          .setColor(message.guild.me.displayColor)
          .setDescription(
            `User role set succesfully.\n To show use **!autorole show** command.`
          )
      );
    }
  }

  //// BOT ROLE

  if (args[0] === "bot") {
    let botrole =
      message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

    if (!botrole)
      return message.channel.send(
        new Discord.MessageEmbed()

          .setTitle("ERROR")

          .setColor(message.guild.me.displayColor)

          .setDescription(`You have to select a role.`)
      );

    if (db.has(`botrole_${message.guild.id}`)) {
      db.delete(`botrole_${message.guild.id}`);

      db.set(`botrole_${message.guild.id}`, botrole.id);

      message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Completed")
          .setColor(message.guild.me.displayColor)
          .setDescription(
            `Bot role changed succesfully.\n To show use **!autorole show** command.`
          )
      );
    } else {
      db.set(`botrole_${message.guild.id}`, botrole.id);

      message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Completed")
          .setColor(message.guild.me.displayColor)
          .setDescription(
            `Bot role set succesfully.\n To show use **!autorole show** command.`
          )
      );
    }
  }

  ////// Delete

  if (args[0] === "delete") {
    let which = args[1];

    if (!which)
      return message.channel.send(
        "Which do you want to delete botrole or userrole ?"
      );

    if (which === "botrole") {
      if (!db.has(`botrole_${message.guild.id}`))
        return message.channel.send(
          new Discord.MessageEmbed()

            .setTitle("ERROR")

            .setColor(message.guild.me.displayColor)

            .setDescription(`Bot role haven't set.`)
        );

      db.delete(`botrole_${message.guild.id}`);

      message.channel.send(
        new Discord.MessageEmbed()

          .setTitle("Completed")

          .setColor(message.guild.me.displayColor)

          .setDescription(`Bot role deleted succesfully.`)
      );
    }

    if (which === "userrole") {
      if (!db.has(`userrole_${message.guild.id}`))
        return message.channel.send(
          new Discord.MessageEmbed()

            .setTitle("ERROR")

            .setColor(message.guild.me.displayColor)

            .setDescription(`User role haven't set.`)
        );

      db.delete(`userrole_${message.guild.id}`);

      message.channel.send(
        new Discord.MessageEmbed()

          .setTitle("Completed")

          .setColor(message.guild.me.displayColor)

          .setDescription(`User role deleted succesfully.`)
      );
    }
  }

  ///// show

  if (args[0] === "show") {
    let userrole =
      db.fetch(`userrole_${message.guild.id}`) || "No Roles Setup:c";

    let botrole =
      db.fetch(`botrole_${message.guild.id}`) || "No Roles Setup :c";

    let userrole2 = message.guild.roles.cache.get(userrole) || "No Roles Setup :c";

    let botrole2 = message.guild.roles.cache.get(botrole) || "No Roles Setup :c";

    const embed = new Discord.MessageEmbed()

      .setTitle("Autorole Show")
      .setColor(message.guild.me.displayColor)

      .addField("User Role", userrole2, true)

      .addField("Bot Role", botrole2, true);

    message.channel.send(embed);
  }
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'autorole',
    description: 'Say',
 } 