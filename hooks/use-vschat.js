import { useEffect, useRef, useState } from "react";
import useVSChatStore from "../store";
import { io } from "socket.io-client";

const useVSChat = (server, key, userId) => {
  const socket = useRef();
  const [allUsers, setAllUsers] = useState([]);

  if (!server || !key) {
    throw new Error("You must provide a server and key");
  }

  if (!userId) {
    throw new Error("You must provide a userId");
  }

  const store = useVSChatStore((state) => state);

  useEffect(() => {
    store.init(server, key, userId);
    socket.current = io("ws://localhost:8900");

    store.setSocket(socket.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (socket.current) {
      store.setStatus(socket.current.connected);
    }
  }, [socket.current]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (userId) {
      socket.current.emit("addUser", userId);
      socket.current.on("getUsers", (users) => {
        setAllUsers(users);

        // Set online users
        if (allUsers) {
          const onlineUsers = users.filter((user) => user.userId !== userId);
          store.setOnlineUsers(onlineUsers);
        }
      });
    }
  }, [userId, store.conversations]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    status: store.status,
    onlineUsers: store.onlineUsers,
  };
};

export default useVSChat;
