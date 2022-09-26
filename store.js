import create from "zustand";

const useVSChatStore = create((set) => ({
  serverURL: null,
  serverKey: null,
  currentConversationId: null,
  userId: null,
  conversations: [],
  socket: null,
  status: false,
  init: (serverURL, serverKey, userId) => {
    set({ serverURL, serverKey, userId });
  },
  setCurrentConversation: (currentConversationId) => {
    set({ currentConversationId });
  },
  setConversations: (conversations) => {
    set({ conversations });
  },
  setSocket: (socket) => {
    set({ socket });
  },
  setStatus: (status) => {
    set({ status });
  },
}));

export default useVSChatStore;
