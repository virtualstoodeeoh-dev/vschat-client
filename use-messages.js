import axios from "axios";
import { useEffect, useState } from "react";
import useVSChatStore from "./store";

const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const store = useVSChatStore((state) => state);
  const socket = store.socket;

  const currentChat =
    store.conversations &&
    store.conversations.filter(
      (con) => con._id === store.currentConversationId
    )[0];

  const getMessages = () => {
    axios
      .get(`${store.serverURL}/vschat/messages/${store.currentConversationId}`)
      .then((res) => setMessages(res.data));
  };

  useEffect(() => {
    if (
      store.serverURL &&
      store.serverKey &&
      store.currentConversationId &&
      store.userId
    ) {
      getMessages();
    }
  }, [
    store.serverURL,
    store.serverKey,
    store.currentConversationId,
    store.userId,
    store.socket,
  ]);

  useEffect(() => {
    socket &&
      socket.on("getMessage", (data) => {
        console.log(data);
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
  }, [socket]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.participants.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]); // eslint-disable-line react-hooks/exhaustive-deps

  const sendMessage = (message) => {
    if (
      (store.serverURL &&
        store.serverKey &&
        store.currentConversationId &&
        store.userId,
      store.socket)
    ) {
      const receiverId =
        store.conversations &&
        currentChat.participants.filter((m) => {
          return m !== store.userId;
        })[0];

      socket.emit("sendMessage", {
        senderId: store.userId,
        receiverId: receiverId,
        text: message,
      });

      axios
        .post(`${store.serverURL}/vschat/messages/`, {
          conversationId: store.currentConversationId,
          sender: store.userId,
          text: message,
        })
        .then(() => getMessages());
    }
  };

  return {
    texts: messages,
    sendMessage,
  };
};

export default useMessages;
