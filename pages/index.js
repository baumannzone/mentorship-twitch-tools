import { useEffect, useRef } from 'react';
import io from 'Socket.IO-client';
let socket;

const sounds = {
  cock: 'https://freesound.org/data/previews/384/384188_5121236-lq.mp3',
  claps: 'https://cdn.freesound.org/previews/425/425663_8521965-lq.mp3',
  boo: 'https://cdn.freesound.org/previews/353/353925_4161250-lq.mp3',
};

const Home = () => {
  useEffect(() => socketInitializer(), []);
  const ref1 = useRef();

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io();

    socket.on('connect', () => {
      console.log('IO connected');
    });

    socket.on('play', ({ type }) => {
      console.log('Play sound:', type);
      ref1.current.src = sounds[type];
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
