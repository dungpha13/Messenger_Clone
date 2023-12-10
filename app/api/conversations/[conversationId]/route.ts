import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '../../../libs/prismadb'
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
    conversationId?: string
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const { conversationId } = params
        const currentUser = await getCurrentUser();

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const exsitingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        })

        if (!exsitingConversation) {
            return new NextResponse('Invalid ID', { status: 400 })
        }

        const deleteConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        })

        exsitingConversation.users.forEach((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, 'conversation:remove', exsitingConversation);
            }
        })

        return NextResponse.json(deleteConversation)
    } catch (error: any) {
        console.log(error, 'ERROR_CONVERSATION_DELETE');
        return new NextResponse('Internal Error', { status: 500 });
    }
}