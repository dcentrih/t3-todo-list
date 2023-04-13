import { Box, Pagination, Text } from "@mantine/core";
import { useState } from "react";
import { usePageSize, useSortTodosBy } from "src/store";
import { api } from "src/utils/api";
import TodoListItem from "./TodoListItem";
import TodoListSkeleton from "./TodoListSkeleton";

const TodoList = () => {
  const [sortBy] = useSortTodosBy();

  const { data: todos, isLoading } = api.todo.all.useQuery(
    { sort: sortBy },
    { refetchInterval: 1000 * 60 * 60 }
  );

  const [pageSize] = usePageSize();
  const total = Math.ceil((todos?.length ?? pageSize * 2) / pageSize);
  const [page, setPage] = useState(1);

  if (isLoading) {
    return <TodoListSkeleton />;
  }
  if (typeof todos === "undefined" || todos.length < 1) {
    return <Text mt="md">You don&apos;t have any todos in your agenda.</Text>;
  }

  return (
    <Box my="sm">
      {todos?.slice((page - 1) * pageSize, page * pageSize).map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
      <Pagination
        color="gray"
        total={total}
        radius="md"
        value={page}
        onChange={setPage}
      />
    </Box>
  );
};

export default TodoList;
