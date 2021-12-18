const { Client, CommandInteraction } = require("discord.js");

const Discord = require('discord.js')

module.exports = {
    name: "help1",
    description: "show commands",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {


        const embed = new Discord.MessageEmbed()
            .setColor('DARK_GREEN')
            .setTitle(`${client.user.username}`)
            .addFields(
                { name: 'Commands:', value: `\`!1ping\` - سرعة استجابة البوت`, inline: false },
                { name: 'Music:', value: `
                \`/play1\` - تشغيل اغنيه \n
                \`/lyrics1\` - يطلع كلمات الاغنيه (مايظبط في كل الاغاني) \n
                \`/now-playing1\` - يظهر معلومات عن الاغنيه \n
                \`/pause1\` - يوقف الاغنى مؤقتاً \n
                \`/queue1\` - يظهر طابور الاغاني \n
                \`/resume1\` - يكمل الاغنيه بعد ما توقف الاغنية مؤقتاً \n
                \`/skip1\` - تخطي الاغنيه \n
                \`/volume1\` - قليل/رفع الصوت الاغنيه
                `, inline: false },
            )
            .setThumbnail(client.user.displayAvatarURL({ dynamic:true, format:'png',size:512 }))
            .setTimestamp()
            .setFooter('Anime Forest')


        interaction.member.send({ embeds: [embed] })
        interaction.deleteReply()

    },
};
