import create from "zustand";

const useVSChatStore = create((set) => ({
  serverURL: null,
  serverKey: null,
  currentConversationId: null,
  userId: null,
  conversations: [],
  onlineUsers: [],
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
  setOnlineUsers: (onlineUsers) => {
    set({ onlineUsers });
  },
  setSocket: (socket) => {
    set({ socket });
  },
  setStatus: (status) => {
    set({ status });
  },
}));

export default useVSChatStore;
