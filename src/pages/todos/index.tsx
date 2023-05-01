import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  Title,
  type CSSObject,
  type MantineTheme,
} from "@mantine/core";
import { type GetServerSidePropsContext } from "next";
import { signOut } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";

import NewTodo from "src/components/NewTodo";
import TodoList from "src/components/TodoList";
import TodoMenu from "src/components/TodoMenu";
import { getServerAuthSession } from "src/server/auth";

const titleSx = ({ fn, colorScheme }: MantineTheme): CSSObject => ({
  flexGrow: 1,
  backgroundImage: fn.gradient({
    from: colorScheme === "dark" ? "indigo" : "blue",
    to: colorScheme === "dark" ? "indigo.4" : "cyan.4",
    deg: 45,
  }),
  [fn.smallerThan("xs")]: {
    flexBasis: "50%",
  },
});

const buttonGroupSx = ({ fn }: MantineTheme): CSSObject => ({
  flexGrow: 1,
  [fn.smallerThan("xs")]: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
});

const Todos = () => {
  const [signOutLoad, setSignOutLoad] = useState(false);

  const handleSignOut = () => {
    setSignOutLoad(true);
    void signOut();
  };

  return (
    <Card shadow="xl" p="md" radius="md" withBorder w="100%">
      <Head>
        <title>T3 Todo List - My Todos</title>
      </Head>
      <Group>
        <Title size="h2" variant="gradient" sx={titleSx}>
          What&apos;s on your agenda?
        </Title>
        <Group position="right" sx={buttonGroupSx}>
          <Button
            variant="subtle"
            onClick={handleSignOut}
            loading={signOutLoad}
          >
            Sign out
          </Button>
          <TodoMenu />
        </Group>
      </Group>
      <Box my="sm">
        <NewTodo />
      </Box>
      <Divider />
      <TodoList />
    </Card>
  );
};

export default Todos;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (!session)
    return { redirect: { destination: "/auth/signin", permanent: false } };

  return { props: {} };
};
