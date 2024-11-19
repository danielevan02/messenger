import getConversation from "../actions/getConversations";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

const ConversationsLayout = async ({children}: {children: string}) => {
  const conversation = await getConversation()
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversation}/>
        {children}
      </div>
    </Sidebar>
  );
}
 
export default ConversationsLayout;