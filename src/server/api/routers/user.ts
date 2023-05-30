import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";


export const usersRouter = createTRPCRouter({
  getUsers: publicProcedure.query(async ({ ctx }) => {
    //const user = ctx.session.user;

    const users = await prisma.user.findMany();

    return users;
  }),
  getUserById: publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }) => {
    const { userId } = input;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return user;
  }),

});
