import { getServerSession } from "next-auth";

import { pusherServer } from "@/app/lib/pusher";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export default async function handler(
  request: Request
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse('Internal Error', {status: 500})
  }

  const body = await request.json()

  const socketId = body.socket_id
  const channel = body.channel_name
  const data = {
    user_id: session.user.email
  };

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

  return NextResponse.json(authResponse);
}