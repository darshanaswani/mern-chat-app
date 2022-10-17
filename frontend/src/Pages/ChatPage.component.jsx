import { Box } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { ChatContext } from "../context/chat.context";
import SideDrawer from "../components/miscellaneous/SideDrawer.component";
import MyChats from "../components/miscellaneous/MyChats.component";
import ChatBox from "../components/miscellaneous/ChatBox.component";

const ChatPage = () => {
  const { user } = useContext(ChatContext);
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="91.5vh"
        padding="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
