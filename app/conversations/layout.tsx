import getConversation from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

const ConversationsLayout = async ({children}: {children: string}) => {
  const conversation = await getConversation()
  const users = await getUsers()
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversation} users={users}/>
        {children}
      </div>
    </Sidebar>
  );
}
 
export default ConversationsLayout;