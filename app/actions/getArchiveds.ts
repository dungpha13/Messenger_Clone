import prisma from '../libs/prismadb'
import getCurrentUser from './getCurrentUser'

const getArchiveds = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    try {

        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc'
            },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    }
                }
            }
        });

        return conversations
            .filter((c) => c.archivedByUserIds.includes(currentUser.id));
    } catch (error: any) {
        return [];
    }
}

export default getArchiveds;