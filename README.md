## Arkaans Copilot

Arkaans Copilot is a Discord bot designed to streamline the management of temporary voice channels within your Discord server. Developed using Node.js, this bot provides a reliable solution for server administrators to create and manage temporary voice channels effortlessly.

### Features
- **Temporary Voice Channels**: Easily create temporary voice channels on-the-fly, enhancing user experience and organization within your Discord server.
- **Customization**: Define specific voice channels as targets for creating temporary channels, with randomly generated names for added variety.
- **Administrative Commands**: Access a range of administrative commands to configure and manage the bot effectively.
- **User Commands**: Enjoy user-friendly commands for common tasks like playing songs from YouTube or accessing the official Arkaans Discord server.

### Installation

To add Arkaans Copilot to your Discord server, follow these steps:

1. [Invite Arkaans Copilot](https://discord.com/oauth2/authorize?client_id=927699980985192449&permissions=8&scope=bot) to your Discord server.
2. Grant the necessary permissions for the bot to function effectively within your server.
3. Configure the bot's settings as desired using the provided administrative commands.

### .env Configuration

To configure Arkaans Copilot as your own, create a `.env` file in the root directory of your project with the following variables:

```env
clientid=<discord bot client id>
token=<discord bot token>
database=<mongodb database connection string>
```
### Commands

#### Admin Commands:

```/setchannel```  
└ Defines a voice channel as the target to create temporary channels when the user accesses it. The names for the temporary channels you have defined are displayed randomly.

```/resetchannel```  
└ Clears the existing list for a selected channel.

```/resetallchannel```  
└ Clears all existing lists on the server; caution, this command resets everything.

```/stats```  
└ Display stats about Arkaans Copilot.
  
  
#### User Commands:

```/song```  
└ Plays a song from a YouTube link.

```/arkaans```  
└ Returns an invitation link to the official Arkaans Discord server.

### Usage

1. **Setting up Temporary Channels**: Use `/setchannel` to define a voice channel as the target for creating temporary channels. Defined names will be assigned to these temporary channels randomly.
2. **Managing Channels**: Utilize `/resetchannel` to clear the existing list for a selected channel, or `/resetallchannel` to clear all existing lists on the server.
3. **Viewing Stats**: Get insights into Arkaans Copilot's performance and usage statistics with `/stats`.
4. **User Interactions**: Users can play songs from YouTube by using the `/song` command and access the official Arkaans Discord server with `/arkaans`.

### Support

For assistance or inquiries, join the [official Arkaans Discord server](https://discord.gg/BgRwHfK) or reach out to our support team directly.

### Contribution

Contributions to Arkaans Copilot are welcome! Feel free to submit bug reports, feature requests, or contribute directly to the development of the bot.

### License

This project is licensed under the [MIT License](#).
