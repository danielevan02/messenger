import prisma from '@/app/lib/prismadb'
import getCurrentUser from './getCurrentUser'
import { Conversation } from '@prisma/client'
import { FullConversationType } from '../types'

const getConversation = async () => {
  const currentUser = await getCurrentUser()

  if(!currentUser?.id) return []

  try {
    const conversation = await prisma.conversation.findMany({
      orderBy: {
        lastMessage: 'desc'
      },
      where: {
        userIds: {
          has: currentUser.id
        }
      },
      include: {
        user: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          }
        }
      }
    })

    return conversation
  } catch (error) {
    return []
  }
}

export default getConversation