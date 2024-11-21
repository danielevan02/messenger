import prisma from '@/app/lib/prismadb'
import getCurrentUser from './getCurrentUser'

const getConversationId = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser()

    if(!currentUser?.email) return null

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        user: true
      }
    })

    return conversation
  } catch (error) {
    return null
  }
}

export default getConversationId