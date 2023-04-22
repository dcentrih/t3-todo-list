import { Skeleton } from "@mantine/core";
import { usePageSize } from "src/store";

const TodoListSkeleton = () => (
  <>
    {Array(usePageSize()[0])
      .fill(0)
      .map((_, index) => (
        <Skeleton key={index} radius="mb" my="sm" height={56} />
      ))}
  </>
);

export default TodoListSkeleton;
