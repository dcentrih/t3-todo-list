import {
  ActionIcon,
  Card,
  Group,
  LoadingOverlay,
  Overlay,
  Text,
  TextInput,
  Tooltip,
  type MantineTheme,
} from "@mantine/core";
import { type Todo } from "@prisma/client";
import {
  IconCheck,
  IconDeviceFloppy,
  IconEdit,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { api } from "src/utils/api";

const listStyles = ({ colorScheme, colors }: MantineTheme) => ({
  backgroundColor: colorScheme === "dark" ? colors.dark[5] : colors.gray[1],
});

const TodoListItem = ({
  todo,
  refetch,
}: {
  todo: Todo;
  refetch: () => Promise<any>;
}) => {
  const [itemState, setItemState] = useState<"view" | "edit">("view");
  const [updatedAgenda, setUpdatedAgenda] = useState("");
  const updateInputRef = useRef<HTMLInputElement>(null);
  const [actionPending, setActionPending] = useState(false);

  const setToEdit = () => setItemState("edit");
  const setToView = () => setItemState("view");

  useEffect(() => {
    if (itemState === "edit") {
      updateInputRef.current?.focus();
    }
  }, [itemState]);

  const updateTodoMut = api.todo.update.useMutation();
  const completeTodoMut = api.todo.complete.useMutation();
  const deleteTodoMut = api.todo.delete.useMutation();
  const updateTodo = () => {
    setActionPending(true);
    updateTodoMut.mutate(
      { id: todo.id, agenda: updatedAgenda },
      {
        onSettled() {
          setToView();
          void refetch();
          setActionPending(false);
        },
      }
    );
  };
  const completeTodo = () => {
    setActionPending(true);
    completeTodoMut.mutate(
      { id: todo.id },
      {
        onSettled() {
          void refetch();
          setActionPending(false);
        },
      }
    );
  };
  const deleteTodo = () => {
    setActionPending(true);
    deleteTodoMut.mutate(
      { id: todo.id },
      {
        onSettled() {
          void refetch();
        },
      }
    );
  };

  return (
    <Tooltip
      label={`Created on: ${todo.createdAt.toLocaleString("sl-SI", {
        dateStyle: "short",
        timeStyle: "short",
      })}`}
      position="bottom-start"
    >
      <Card sx={listStyles} radius="md" p="xs" my="sm" pb="none">
        <LoadingOverlay visible={actionPending} />
        <Group position="apart">
          {itemState === "view" && (
            <>
              <Text strikethrough={todo.complete}>{todo.agenda}</Text>
              {todo.complete && <Overlay />}

              <Group spacing="xs" p=".25rem" sx={{ zIndex: 201 }}>
                {!todo.complete && (
                  <>
                    <ActionIcon
                      variant="light"
                      color="lime"
                      onClick={completeTodo}
                    >
                      <IconCheck />
                    </ActionIcon>
                    <ActionIcon
                      variant="light"
                      color="orange"
                      onClick={setToEdit}
                    >
                      <IconEdit />
                    </ActionIcon>
                  </>
                )}
                <ActionIcon variant="light" color="red" onClick={deleteTodo}>
                  <IconTrash />
                </ActionIcon>
              </Group>
            </>
          )}
          {itemState === "edit" && (
            <>
              <TextInput
                sx={{ flexGrow: 1 }}
                variant="unstyled"
                defaultValue={todo.agenda}
                onChange={(evt) => setUpdatedAgenda(evt.currentTarget.value)}
                ref={updateInputRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") updateTodo();
                }}
                styles={(theme) => ({
                  wrapper: {
                    borderRadius: theme.radius.sm,
                    paddingInline: theme.spacing.xs,
                    ":focus-within": { outline: "1px solid whitesmoke" },
                  },
                  input: {
                    fontSize: theme.fontSizes.md,
                  },
                })}
              />
              <Group spacing="xs" p=".25rem">
                <ActionIcon variant="light" color="lime" onClick={updateTodo}>
                  <IconDeviceFloppy />
                </ActionIcon>
                <ActionIcon variant="light" color="orange" onClick={setToView}>
                  <IconX />
                </ActionIcon>
              </Group>
            </>
          )}
        </Group>
      </Card>
    </Tooltip>
  );
};

export default TodoListItem;
