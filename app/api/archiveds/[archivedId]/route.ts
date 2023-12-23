import { NextResponse } from "next/server";
import prisma from '../../../libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    archivedId?: string
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {

        const { archivedId } = params;
        const currentUser = await getCurrentUser();

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const exsitingConversation = await prisma.conversation.findUnique({
            where: {
                id: archivedId,
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
                    disconnect: [
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
        console.log(error, 'ERROR_ARCHIVED_POST');
        return new NextResponse('Internal Error', { status: 500 });
    }
}