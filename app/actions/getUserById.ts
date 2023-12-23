import prisma from '../libs/prismadb'

const getUserById = async (userId: string) => {

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        return user;
    } catch (error: any) {
        return null;
    }
}

export default getUserById;