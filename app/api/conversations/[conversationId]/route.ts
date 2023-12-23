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
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            },
            include: {
                users: true
            }
        })

        if (!exsitingConversation) {
            return new NextResponse('Invalid ID', { status: 400 })
        }

        const userToUpdate = exsitingConversation.users

        for (const user of userToUpdate) {
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    conversations: {
                        disconnect: [{ id: conversationId }],
                    },
                },
            });
        }

        const deleteConversation = await prisma.conversation.delete({
            where: {
                id: exsitingConversation.id,
            },
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

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {

        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const exsitingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            },
            include: {
                users: true
            }
        })

        if (!exsitingConversation) {
            return new NextResponse('Invalid ID', { status: 400 })
        }

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: exsitingConversation.id
            },
            data: {
                archivedByUsers: {
                    connect: [
                        {
                            id: currentUser.id
                        }
                    ]
                }
            },
            include: {
                archivedByUsers: true
            }
        });

        return NextResponse.json(updatedConversation);

    } catch (error: any) {
        console.log(error, 'ERROR_CONVERSATION_POST');
        return new NextResponse('Internal Error', { status: 500 });
    }
}