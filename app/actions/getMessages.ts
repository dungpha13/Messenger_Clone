import prisma from '../libs/prismadb'

const getMessages = async (
    conversationId: string
) => {
    try {
        const messages = prisma.message.findMany({
            where: {
                conversationId: conversationId
            },
            include: {
                seen: true,
                sender: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return messages;
    } catch (error: any) {
        return [];
    }
}

export default getMessages;