import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";

export const todoRouter = createTRPCRouter({
  all: protectedProcedure
    .input(z.object({ sort: z.enum(["asc", "desc"]).default("desc") }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.todo.findMany({
        orderBy: {
          createdAt: input.sort,
        },
      });
    }),
  create: protectedProcedure
    .input(z.object({ agenda: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.todo.create({
        data: {
          agenda: input.agenda,
          userId: ctx.session.user.id,
        },
      });
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), agenda: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.todo.update({
        data: {
          agenda: input.agenda,
        },
        where: { id: input.id },
      });
    }),
  complete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.todo.update({
        data: {
          complete: true,
        },
        where: { id: input.id },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.todo.delete({
        where: { id: input.id },
      });
    }),
});
