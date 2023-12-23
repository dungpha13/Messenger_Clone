import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '../../libs/prismadb'
import { pusherServer } from "@/app/libs/pusher";
import getUserById from "@/app/actions/getUserById";

export async function GET(request: Request) {

    try {

        const { searchParams } = new URL(request.url);
        const term = searchParams.get('term');

        const currentUser = await getCurrentUser();

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const conversations = await prisma.conversation.findMany({
            where: {
                AND: [
                    {
                        users: {
                            some: {
                                name: {
                                    contains: term!,
                                    mode: 'insensitive'
                                }
                            }
                        }
                    },
                    {
                        userIds: {
                            has: currentUser.id
                        }
                    }
                ]
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true,
                        sender: true
                    }
                }
            }
        })

        if (conversations.length > 0) {
            return NextResponse.json(conversations);
        } else {
            return NextResponse.json([]);
        }

    } catch (error: any) {
        console.log(error, 'ERROR_GET_CONVERSATION');
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function POST(request: Request) {
    try {

        const body = await request.json();
        const {
            userId,
            isGroup,
            members,
            name
        } = body
        const currentUser = await getCurrentUser();

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid data', { status: 400 })
        }

        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value
                            })),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include: {
                    users: true
                }
            })
            newConversation.users.forEach((user) => {
                if (user.email) {
                    pusherServer.trigger(user.email, 'conversation:new', newConversation)
                }
            })

            return NextResponse.json(newConversation)
        };

        const exisitingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id]
                        }
                    },
                ]
            }
        })

        const singleConversation = exisitingConversations[0]

        if (singleConversation) {
            return NextResponse.json(singleConversation)
        }

        const otherUser = await getUserById(userId);

        if (!otherUser) {
            return new NextResponse('User not found', { status: 404 })
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        })

        newConversation.users.forEach((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, 'conversation:new', newConversation)
            }
        })

        return NextResponse.json(newConversation)

    } catch (error: any) {
        console.log(error, 'ERROR_CREATE_CONVERSATION');
        return new NextResponse('Internal Error', { status: 500 })
    }
}