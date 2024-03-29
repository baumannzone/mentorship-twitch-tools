import { Server } from 'Socket.IO';
import tmi from 'tmi.js';
import { audioKeys } from '../../constants/audios';
import { events } from '../../constants/eventNames';

const twitchClient = new tmi.client({
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: 'botmannzone',
    password: `oauth:${process.env.TWITCH_OAUTH}`,
  },
  channels: ['baumannzone'],
});

twitchClient.connect();

// const commands = {
//   hello: () => {},
// };

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    twitchClient.on('message', (channel, tags, message, self) => {
      if (self) return;

      console.log(message);
      console.log(tags);

      if (message === 'aa') {
        twitchClient.say(
          'baumannzone',
          `El user ${tags.username} ha hecho una accion, y ha dicho ${message}`
        );
      }

      // if (message.startsWith('!')) {
      //   const command = message.split(' ')[0].substring(1);
      //   const args = message.split(' ').slice(1);

      //   // commands[command](channel, tags, args);
      // }

      if (message.startsWith('!')) {
        const type = message.substring(1);
        if (audioKeys.includes(type)) {
          io.emit(events.PLAY_AUDIO, { type });
        }
      }
    });
  }
  res.end();
};

export default SocketHandler;
