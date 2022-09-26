import axios from "axios";
import { useEffect } from "react";
import useVSChatStore from "./store";

const useConversations = () => {
  const store = useVSChatStore((state) => state);
  const conversations = store.conversations;

  const setConversation = (currentConversationId) => {
    store.setCurrentConversation(currentConversationId);
  };

  useEffect(() => {
    store.setCurrentConversation(store.conversations[0]?._id);
  }, [store.conversations]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (store.serverURL || !store.serverKey || !store.userId) {
      axios
        .get(`${store.serverURL}/vschat/conversations/${store.userId}`)
        .then((res) => store.setConversations(res.data));
    }
  }, [store.serverURL, store.serverKey, store.userId]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    conversations,
    setConversation,
  };
};

export default useConversations;
