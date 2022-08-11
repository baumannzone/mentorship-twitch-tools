import { useEffect, useRef } from 'react';
import io from 'Socket.IO-client';

import { audios } from '../constants/audios';
import { events } from '../constants/eventNames';

let socket;

const Home = () => {
  useEffect(() => socketInitializer(), []);
  const ref1 = useRef();

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io();

    socket.on('connect', () => {
      console.log('IO connected');
    });

    socket.on(events.PLAY_AUDIO, ({ type }) => {
      console.log('Play sound:', type);
      ref1.current.src = audios[type];
      ref1.current.play();
    });
  };

  return (
    <div>
      <audio src="" ref={ref1} />
    </div>
  );
};

export default Home;
