import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export const ChatContext = createContext({
  user: {},
  setuser: () => {},
  chats: [],
  setChats: () => {},
  selectedChat: {},
  setSelectedChat: () => {},
  notification: [],
  setNotification: () => {},
});

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const value = {
    user,
    setUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
