import { PrismaClient  } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    const user = await prisma.users.findUnique({
        where: {
            id: 1
        },
        include: {
            posts: true
        }
    })
    console.log(user);
}
main()