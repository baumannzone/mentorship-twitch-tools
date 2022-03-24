import { useEffect } from "react";
import io from "Socket.IO-client";
let socket;

const Home = () => {
  useEffect(() => socketInitializer(), []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("chat", (data) => {
      console.log("ha llegado un mensaje: ", data);
    });
  };

  return null;
};

export default Home;
