import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import { type GetServerSidePropsContext } from "next";
import { signOut } from "next-auth/react";
import NewTodo from "src/components/NewTodo";
import SortMenu from "src/components/SortMenu";
import TodoList from "src/components/TodoList";
import { getServerAuthSession } from "src/server/auth";
import { useSortTodosBy } from "src/store";
import { api } from "src/utils/api";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (!session)
    return { redirect: { destination: "/auth/signin", permanent: false } };

  return { props: {} };
};

const Todos = () => {
  const [sortBy] = useSortTodosBy();
  const allTodosQuery = api.todo.all.useQuery(
    { sort: sortBy },
    { refetchInterval: 1000 * 60 * 60 }
  );
  const { data: todos, refetch, isLoading } = allTodosQuery;

  const loadingText = () => {
    if (isLoading) {
      return (
        <>
          <Skeleton radius="mb" my="sm" height={56}></Skeleton>
          <Skeleton radius="mb" my="sm" height={56}></Skeleton>
          <Skeleton radius="mb" my="sm" height={56}></Skeleton>
          <Skeleton radius="mb" my="sm" height={56}></Skeleton>
          <Skeleton radius="mb" my="sm" height={56}></Skeleton>
        </>
      );
    }
    if (typeof todos === "undefined" || todos.length < 1) {
      return <Text mt="md">You don&apos;t have any todos in your agenda.</Text>;
    }
    return null;
  };

  return (
    <Card shadow="xl" p="md" radius="md" withBorder w="100%">
      <Group>
        <Title
          size="h2"
          variant="gradient"
          // gradient={{ from: "indigo", to: "white", deg: 45 }}
          sx={({ fn, colorScheme }) => ({
            flexGrow: 1,
            backgroundImage: fn.gradient({
              from: colorScheme === "dark" ? "indigo" : "blue",
              to: colorScheme === "dark" ? "indigo.4" : "cyan.4",
              deg: 45,
            }),
          })}
        >
          What&apos;s on your agenda?
        </Title>
        <Button variant="subtle" onClick={() => void signOut()}>
          Sign out
        </Button>
        <SortMenu />
      </Group>
      <Box my="sm">
        <NewTodo refetch={refetch} />
      </Box>
      <Divider />
      {/* {typeof todos === "undefined" ||
        (todos.length < 1 && (
          <Text mt="md">You don&apos;t have any todos in your agenda.</Text>
        ))} */}
      {loadingText()}
      {todos && <TodoList todos={todos} refetch={refetch} />}
    </Card>
  );
};

export default Todos;
