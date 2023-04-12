import { Box, Pagination } from "@mantine/core";
import { type Todo } from "@prisma/client";
import { useState } from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({
  todos,
  refetch,
}: {
  todos: Todo[] | undefined;
  refetch: () => Promise<any>;
}) => {
  const pageSize = 5;
  const total = Math.ceil((todos?.length ?? pageSize * 2) / pageSize);
  const [page, setPage] = useState(1);

  return (
    <Box my="sm">
      {todos?.slice((page - 1) * pageSize, page * pageSize).map((todo) => (
        <TodoListItem key={todo.id} todo={todo} refetch={refetch} />
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
