import { createCanvas, loadImage } from "canvas";
import { getNewMemberWelcome } from "../../database/dynamo";
const sharp = require("sharp");
const axios = require("axios");

interface GuildMemberAdd {
  guildId: string;
  activated: boolean;
  backgroundImage?: string;
  color?: string;
  quote?: string;
}

module.exports = {
  name: "guildMemberAdd",
  async execute(member: any) {
    const guildWelcomeConfig = await getNewMemberWelcome(member.guild.id);
    if (!guildWelcomeConfig || !guildWelcomeConfig.activated) return;
    const newMember = member.user.displayName;

    const messageBody = getRandomMessage(newMember, member);

    const welcomeChannelId = member.guild.systemChannelId;
    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);

    if (welcomeChannel) {
      const attachment = await generateCanvas(guildWelcomeConfig, member, newMember, messageBody);

      await welcomeChannel.send({ files: [{ attachment, name: "welcome-image.png" }] });
    } else {
      console.error("Le canal de bienvenue n'a pas été trouvé.");
    }
  },
};

async function generateCanvas(guildWelcomeConfig: GuildMemberAdd, member: any, newMember: string, messageBody: string) {
  let backgroundURL: string = guildWelcomeConfig.backgroundImage;
  if (backgroundURL === "default" || backgroundURL === "Default" || backgroundURL === "DEFAULT") {
    backgroundURL = "https://img.freepik.com/free-photo/digital-art-beautiful-mountains_23-2151123688.jpg";
  } else {
    backgroundURL = guildWelcomeConfig.backgroundImage;
  }
  const background = await resizeBackground(backgroundURL);

  const guildIconConverted = await convertWEBPToPNG(member.guild.iconURL({ dynamic: true }));
  const avatarConverted = await convertWEBPToPNG(member.user.displayAvatarURL({ format: "webp" }));

  const avatar = await loadImage(avatarConverted);
  const guildIcon = await loadImage(guildIconConverted);
  const canvas = createCanvas(background.width, background.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  ctx.textAlign = "center";

  ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;

  const textTitle = "WELCOME";
  ctx.font = "bold 35px sans-serif";
  ctx.fillStyle = "white";
  ctx.fillText(textTitle, centerX, centerY + 40);
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "black";
  ctx.strokeText(textTitle, centerX, centerY + 40);

  // Dessiner l'avatar arrondi
  const avatarSize = 160;
  const avatarX = centerX - avatarSize / 2;
  const avatarY = 30;

  const outlineWidth = 6; // Épaisseur du contour
  ctx.save(); // Sauvegarder l'état actuel
  ctx.beginPath();
  ctx.arc(
    centerX, // Centre X du cercle
    avatarY + avatarSize / 2, // Centre Y du cercle
    avatarSize / 2 + outlineWidth, // Rayon (ajout de l'épaisseur du contour)
    0, // Début de l'arc (0 radians)
    Math.PI * 2 // Fin de l'arc (cercle complet)
  );
  ctx.fillStyle = "white"; // Couleur du contour
  ctx.fill();
  ctx.closePath();
  ctx.restore(); // Restaurer l'état après le dessin du contour

  ctx.save(); // Sauvegarder l'état actuel
  ctx.beginPath();
  ctx.arc(
    centerX, // Centre X du cercle
    avatarY + avatarSize / 2, // Centre Y du cercle
    avatarSize / 2, // Rayon
    0, // Début de l'arc (0 radians)
    Math.PI * 2 // Fin de l'arc (cercle complet)
  );
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
  ctx.restore(); // Restaurer l'état après avoir dessiné l'avatar

  const textMember = `${newMember.toUpperCase()}`;
  ctx.font = "bold 70px sans-serif";
  ctx.fillStyle = guildWelcomeConfig.color || "white";
  ctx.fillText(textMember, centerX, centerY + 105);
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "black";
  ctx.strokeText(textMember, centerX, centerY + 105);

  let textQuote = `${guildWelcomeConfig.quote}`;
  textQuote === "random" || textQuote === "Random" || textQuote === "RANDOM" ? (textQuote = messageBody) : textQuote;
  ctx.font = "bold 25px sans-serif";
  ctx.fillStyle = "white";
  ctx.fillText(textQuote, centerX, centerY + 140);

  ctx.beginPath();

  const guildIconSize = 30;
  const guildIconX = 15;
  const guildIconY = canvas.height - 45;

  ctx.textAlign = "left";
  const textGuild = member.guild.name;
  ctx.font = "20px sans-serif";
  ctx.fillStyle = "white";
  ctx.fillText(textGuild, guildIconX + 45, guildIconY + 22);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "black";

  // Dessiner le logo de la guilde arrondi
  ctx.arc(
    guildIconX + guildIconSize / 2, // Centre X
    guildIconY + guildIconSize / 2, // Centre Y
    guildIconSize / 2, // Rayon
    0, // Départ de l'arc (en radians)
    Math.PI * 2 // Fin de l'arc (cercle complet)
  );
  ctx.clip();
  ctx.drawImage(guildIcon, guildIconX, guildIconY, guildIconSize, guildIconSize);
  ctx.closePath();
  const attachment = canvas.toBuffer();
  return attachment;
}

async function convertWEBPToPNG(image: Buffer) {
  const response = await axios({
    url: image,
    responseType: "arraybuffer",
  });
  const buffer = Buffer.from(response.data, "binary");
  const pngImage = await sharp(buffer).toFormat("png").toBuffer();
  // fs.writeFileSync("debug-avatar.png", pngAvatar);
  return pngImage;
}

async function resizeBackground(backgroundImageUrl: string) {
  const response = await axios({
    url: backgroundImageUrl,
    responseType: "arraybuffer",
  });

  const imageBuffer = Buffer.from(response.data, "binary");

  const resizedImageBuffer = await sharp(imageBuffer).resize(800, 400, { fit: "cover" }).toBuffer();

  const resizedBackground = await loadImage(resizedImageBuffer);
  return resizedBackground;
}

function getRandomMessage(newMember: string, member: any) {
  const messages = [
    `Brace yourselves, everyone! ${newMember} has entered the server! 🛡️⚔️`,
    `Looks like ${newMember} found the secret entrance! Welcome aboard! 🕵️‍♂️`,
    `Hey ${newMember}, we’ve been waiting for you! 🎯`,
    `Did someone order extra awesomeness? Oh wait, it's just ${newMember}! 🌟`,
    `Attention, everyone: ${newMember} just leveled up by joining **${member.guild.name}**! 🚀`,
    `Pizza party in ${member.guild.name} now that ${newMember} is here! 🍕🎉`,
    `Everyone, please welcome ${newMember}! Don't forget to show them where the snacks are. 🍪`,
    `Woohoo! ${newMember} just joined! Let the memes begin! 🎭`,
    `The server just got cooler because ${newMember} arrived. ❄️`,
    `A wild ${newMember} appeared! Quick, someone throw a Poké Ball! ⚡`,
    `${newMember}, we're 99% sure you'll love it here! 😄`,
    `Watch out! ${newMember} is here to steal the spotlight! 💃`,
    `Grab your party hats, everyone! ${newMember} has joined the fun! 🥳`,
    `We heard ${newMember} likes servers. So we put ${newMember} in this server. Enjoy! 😎`,
    `Hold up, everyone! ${newMember} has just entered the chat! 🕺`,
    `Welcome ${newMember}, you just upgraded the server! ⚡🎮`,
    `${newMember} has arrived, and the vibe just went up! 🎧🎶`,
    `Alert! ${newMember} has entered the world of **${member.guild.name}**! 🌍`,
    `${newMember}, the journey begins now! 🏞️`,
    `Shh... ${newMember} is here! Time to make the magic happen. ✨`,
    `The wait is over! ${newMember} has arrived, and the server is officially epic. 🏆`,
    `Hold your applause for ${newMember}, the newest hero of the server! 🦸‍♀️🦸‍♂️`,
    `Welcome to the squad, ${newMember}! Ready for some legendary adventures? 🌟`,
    `Congrats, ${newMember}, you've officially joined the cool crew! 😎`,
    `It’s official: ${newMember} has arrived and already made the server 10x cooler! ✨`,
    `Guess what? ${newMember} just made their grand entrance! 🎤`,
    `Welcome aboard, ${newMember}! It’s going to be one epic ride! 🎢`,
    `Let’s give a big round of applause to ${newMember} for joining the squad! 👏`,
    `The server just got a whole lot better with ${newMember} here! 🙌`,
    `Wow, ${newMember} just showed up and the fun started! 🚀`,
    `${newMember} has joined! Let’s make some memories! 📸`,
    `Alert! ${newMember} has entered the server. Everyone, get ready for greatness! 💥`,
    `${newMember}, you just earned your VIP access to the coolest community! 🎟️`,
    `The team just got stronger! Welcome, ${newMember}! 🦸‍♀️🦸‍♂️`,
    `Yay! ${newMember} just joined! Let’s break out the confetti! 🎉`,
    `The server has officially leveled up with ${newMember} here! 🎮`,
    `Welcome ${newMember}! We’re ready to have some fun together! 🕺💃`,
    `Let’s give a big warm welcome to ${newMember}, our newest member! 🌟`,
    `Welcome, ${newMember}! You’ve officially joined the coolest squad in the universe. 🚀`,
    `Game on! ${newMember} has joined and brought their A-game! 🎮`,
    `All hands on deck, ${newMember} just joined! Let’s make it awesome. ⚓`,
    `Welcome ${newMember}! Get ready to be part of something legendary. 🌟`,
    `${newMember} just stepped into the spotlight! Let’s welcome them with a round of applause! 👏`,
    `We’re all excited to have ${newMember} join! Let’s make them feel at home! 🏡`,
    `Big things are about to happen because ${newMember} just joined! 🎉`,
    `Welcome, ${newMember}! We know you're going to add something special to this place. ✨`,
    `${newMember} has just entered, and the adventure begins! 🌍`,
    `Welcome to the squad, ${newMember}! Let’s make it a great journey. 🚀`,
    `Everyone, say hello to ${newMember}—our newest server legend! 👑`,
    `Let’s give a royal welcome to ${newMember}—the newest member of the crew! 👑`,
    `New player detected: ${newMember}! Ready to join the game? 🎮`,
    `Step aside, world! ${newMember} has arrived, and everything just got cooler! 😎`,
    `${newMember} just leveled up by joining the best server ever! 🎮`,
    `It’s a bird, it’s a plane, no—it’s ${newMember} joining the server! 🦸‍♀️🦸‍♂️`,
    `Hold onto your hats! ${newMember} is here to make things epic! 🎩`,
    `A warm welcome to ${newMember}, the newest member of our awesome crew! 🤗`,
    `We’ve been waiting for you, ${newMember}! Let’s make some memories! 🎉`,
    `Look out, everyone! ${newMember} is here to steal the show! 🎭`,
    `Congrats ${newMember}, you just unlocked the cool club! 🏆`,
    `Ready to have some fun, ${newMember}? Let’s go! 🎮`,
    `The server is officially better now that ${newMember} has arrived! 🚀`,
    `${newMember} has joined the party! Let’s start the celebration! 🎉`,
    `The squad just got stronger with ${newMember} on board! 💪`,
    `Everything’s better with ${newMember} here! Welcome! 🌟`,
    `Alert: ${newMember} has entered the server and the fun begins now! 🎮`,
    `Welcome to the club, ${newMember}! Let’s make it legendary! ✨`,
    `${newMember} has arrived! Get ready for awesomeness to unfold! 🌟`,
    `Stop what you’re doing! ${newMember} just joined the server! 🔥`,
    `Look who just showed up—${newMember} is here! 🌟`,
    `${newMember}, get ready to make the server even more amazing! 🌟`,
    `Who’s ready for some fun? ${newMember} just joined! 🎉`,
    `Welcome to the server, ${newMember}! Time to make some great memories! 📸`,
    `The server is officially 100% cooler with ${newMember} here! ❄️`,
    `Welcome ${newMember}, the adventure just got a lot more exciting! 🏞️`,
    `Everyone, let’s welcome ${newMember} and show them how it’s done! 👏`,
    `Say hello to ${newMember}, the newest legend in our community! 🌟`,
    `🎉 The party just got started with ${newMember} joining the server! 🎉`,
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}
