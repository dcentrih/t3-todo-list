import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";

export const userRouter = createTRPCRouter({
  update: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          name: input.name,
        },
      });
    }),
});
