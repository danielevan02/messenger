'use client'

import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

type ConversationBoxProps = {
  data: FullConversationType
  selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({data, selected}) => {
  const otherUser = useOtherUser(data)
  const session = useSession()
  const router = useRouter()

  const handleClick = useCallback(()=>{
    router.push(`/conversations/${data.id}`)
  }, [data.id, router])

  const lastMessage = useMemo(() => {
    const messages = data.messages || []

    return messages[messages.length-1]
  }, [data.messages])

  const userEmail = useMemo(()=>{
    return session.data?.user?.email
  }, [session.data?.user?.email])

  const hasSeen = useMemo(()=>{
    if(!lastMessage) return false

    const seenArray = lastMessage.seen || []

    if(!userEmail) return false

    return seenArray.filter((user) => user.email === userEmail).length !== 0
  }, [userEmail, lastMessage])
  return (
    <div>dsds</div>
  );
}
 
export default ConversationBox;