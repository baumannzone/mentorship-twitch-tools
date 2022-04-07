import { Server } from 'Socket.IO';
const tmi = require('tmi.js');

const SocketHandler = (req, res) => {
  const client = new tmi.client({
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

  client.connect();

  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    client.on('message', (channel, tags, message, self) => {
      if (self) return;

      io.emit('chat', { channel, tags, message });
    });
  }
  res.end();
};

export default SocketHandler;
