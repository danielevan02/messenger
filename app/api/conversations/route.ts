import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/lib/prismadb'
import { pusherServer } from "@/app/lib/pusher";

export async function POST (request: Request){
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const {userId, isGroup, members, name} = body

    if(!currentUser?.id || !currentUser.email) return new NextResponse('Unauthorized', {status:401})
    
    if(isGroup && (!members || members.length < 2 || !name)) return new NextResponse('Invalid Data', {status: 400})
    
    if(isGroup){
      const newConversation = await prisma.conversation.create({
        data: {
          name, 
          isGroup,
          user: {
            connect:[
              ...members.map((member: {value: string}) => ({
                id: member.value
              })),
              {id: currentUser.id}
            ]
          },
        },
        include: {
          user: true
        }
      })

      newConversation.user.map((user) => {
        if(user.email){
          pusherServer.trigger(user.email, 'conversation:new', newConversation)
        }
      })

      return NextResponse.json(newConversation) 
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {userIds: {
            equals: [userId, currentUser.id]
          }},
          {userIds: {
            equals: [currentUser.id, userId]
          }},
        ]
      }
    })

    const singleConversation = existingConversations[0]

    if(singleConversation){
      return NextResponse.json(singleConversation)
    }

    const newConversation = await prisma.conversation.create({
      data: {
        user:{
          connect: [
            {id: userId},
            {id: currentUser.id}
          ]
        },
      },
      include: {
        user: true
      }
    })

    return NextResponse.json(newConversation)
  } catch (error) {
    console.log(error, "ERROR_CREATE_CONVERSATION")
    return new NextResponse('Internal Error', {status: 500})
  }
}