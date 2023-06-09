import {
  ActionIcon,
  Card,
  Group,
  LoadingOverlay,
  Overlay,
  Text,
  TextInput,
  Tooltip,
  type CSSObject,
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

const listSx = ({ colorScheme, colors }: MantineTheme): CSSObject => ({
  backgroundColor: colorScheme === "dark" ? colors.dark[5] : colors.gray[1],
});

const agendaEditStyles = (theme: MantineTheme) => ({
  root: { flexGrow: 1 },
  wrapper: {
    borderRadius: theme.radius.sm,
    paddingInline: theme.spacing.xs,
    ":focus-within": {
      outline: `1px solid ${
        theme.colorScheme === "dark" ? "whitesmoke" : "gray"
      }`,
    },
  },
  input: {
    fontSize: theme.fontSizes.md,
  },
});

const TodoListItem = ({ todo }: { todo: Todo }) => {
  const [itemState, setItemState] = useState<"view" | "edit">("view");
  const [updatedAgenda, setUpdatedAgenda] = useState("");
  const [actionPending, setActionPending] = useState(false);
  const updateInputRef = useRef<HTMLInputElement>(null);
  const utils = api.useContext();

  const setToEdit = () => setItemState("edit");
  const setToView = () => setItemState("view");

  useEffect(() => {
    if (itemState === "edit") {
      updateInputRef.current?.focus();
    }
  }, [itemState]);

  // Mutations
  const updateTodoMut = api.todo.update.useMutation({
    onSettled() {
      setToView();
      void utils.todo.all.invalidate();
      setActionPending(false);
    },
  });
  const completeTodoMut = api.todo.complete.useMutation({
    onSettled() {
      void utils.todo.all.invalidate();
      setActionPending(false);
    },
  });
  const deleteTodoMut = api.todo.delete.useMutation({
    onSettled() {
      void utils.todo.all.invalidate();
    },
  });

  // User actions to mutate
  const updateTodo = () => {
    setActionPending(true);
    updateTodoMut.mutate({ id: todo.id, agenda: updatedAgenda });
  };
  const completeTodo = () => {
    setActionPending(true);
    completeTodoMut.mutate({ id: todo.id });
  };
  const deleteTodo = () => {
    setActionPending(true);
    deleteTodoMut.mutate({ id: todo.id });
  };

  return (
    <Card sx={listSx} radius="md" p="xs" my="sm" pb="none">
      <LoadingOverlay visible={actionPending} />
      <Group position="apart">
        {itemState === "view" && (
          <>
            <Text strikethrough={todo.complete}>{todo.agenda}</Text>
            {todo.complete && <Overlay />}

            <Group spacing="xs" p=".25rem" sx={{ zIndex: 201 }}>
              {!todo.complete && (
                <>
                  <Tooltip label="Complete" position="left">
                    <ActionIcon
                      variant="light"
                      color="lime"
                      onClick={completeTodo}
                    >
                      <IconCheck />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Edit" position="left">
                    <ActionIcon
                      variant="light"
                      color="orange"
                      onClick={setToEdit}
                    >
                      <IconEdit />
                    </ActionIcon>
                  </Tooltip>
                </>
              )}
              <Tooltip label="Delete" position="left">
                <ActionIcon variant="light" color="red" onClick={deleteTodo}>
                  <IconTrash />
                </ActionIcon>
              </Tooltip>
            </Group>
          </>
        )}
        {itemState === "edit" && (
          <>
            <TextInput
              variant="unstyled"
              defaultValue={todo.agenda}
              onChange={(evt) => setUpdatedAgenda(evt.currentTarget.value)}
              ref={updateInputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") updateTodo();
              }}
              styles={agendaEditStyles}
            />
            <Group spacing="xs" p=".25rem">
              <Tooltip label="Save changes" position="left">
                <ActionIcon variant="light" color="lime" onClick={updateTodo}>
                  <IconDeviceFloppy />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Cancel" position="left">
                <ActionIcon variant="light" color="orange" onClick={setToView}>
                  <IconX />
                </ActionIcon>
              </Tooltip>
            </Group>
          </>
        )}
      </Group>
    </Card>
  );
};

export default TodoListItem;
