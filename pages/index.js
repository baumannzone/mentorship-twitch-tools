import { useEffect, useRef } from 'react';
import io from 'Socket.IO-client';
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

    socket.on('playMusic', () => {
      console.log('Play sound');
      ref1.current.src =
        'https://freesound.org/data/previews/384/384188_5121236-lq.mp3';
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
