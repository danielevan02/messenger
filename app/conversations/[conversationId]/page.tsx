import getConversationId from "@/app/actions/getConversationById"
import getMessages from "@/app/actions/getMessages"

type IParams = {
  conversationId: string
}

const ConversationId = async ({params}: {params: IParams}) => {
  const conversation = getConversationId(params.conversationId)
  const messages = getMessages(params.conversationId)
  
  if(!conversation){
    return (
      <div className="lg:pl-80 h-full">
        <div className="flex h-full flex-col">
          
        </div>
      </div>
    )
  }
}

export default ConversationId