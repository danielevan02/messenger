import getConversationId from "@/app/actions/getConversationById"
import getMessages from "@/app/actions/getMessages"
import EmptyState from "@/app/components/EmptyState"
import Header from "./components/Header"
import Body from "./components/Body"
import Form from "./components/Form"

type IParams = {
  conversationId: string
}

const ConversationId = async ({params}: {params: IParams}) => {
  const {conversationId} = await params
  const conversation = await getConversationId(conversationId)
  const messages = await getMessages(conversationId)
  
  if(!conversation){
    return (
      <div className="lg:pl-80 h-full">
        <div className="flex h-full flex-col">
          <EmptyState/>
        </div>
      </div>
    )
  }

  return(
    <div className="lg:pl-80 h-full">
      <div className="flex flex-col h-full">
        <Header conversation={conversation}/>
        <Body initialMessages={messages} />
        <Form/>
      </div>
    </div>
  )
}

export default ConversationId