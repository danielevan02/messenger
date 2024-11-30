import { pusherServer } from '@/app/lib/pusher'; 
import { getServerSession } from 'next-auth';

async function streamToString(stream: any) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString('utf8');
}

const handler = async (req: Request, res: Response) => {
    try {

        const session = await getServerSession()

        const bodyAsString = await streamToString(req.body)
        const body = {
            'socket_id': bodyAsString.split('&')[0].split('=')[1],
            'channel_name': `presence-mesengger`
        }

        if (!session?.user?.email) {
            return Response.json({ 'error': 'You have to be authenticated' }, { status: 401 })
        }

        const socketId = body.socket_id;
        const channel = body.channel_name;
        const data = {
            user_id: session.user.email,
        }

        console.log(data)

        const authResponse = pusherServer.authorizeChannel(socketId, channel, data)

        return Response.json(authResponse)
    } catch (err) {
        console.error(err)
        return Response.json({ 'error': 'internal error' }, { status: 500 })
    }
}

export { handler as POST }