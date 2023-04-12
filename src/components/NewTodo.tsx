import { ActionIcon, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { api } from "src/utils/api";

const NewTodo = ({ refetch }: { refetch: () => Promise<any> }) => {
  const [isCreating, setIsCreating] = useState(false);

  const form = useForm({
    initialValues: {
      agenda: "",
    },
    validate: {
      agenda: (val) =>
        val !== "" ? null : "Todo mush containt at least 1 word.",
    },
  });

  const createTodoMut = api.todo.create.useMutation();
  const createTodo = ({ agenda }: { agenda: string }) => {
    setIsCreating(true);
    createTodoMut.mutate(
      { agenda },
      {
        onSettled() {
          void refetch();
          form.reset();
          setIsCreating(false);
        },
      }
    );
  };

  return (
    <form onSubmit={form.onSubmit(createTodo)}>
      <Group>
        <TextInput
          placeholder="Enter your new todo..."
          sx={{ flexGrow: 1 }}
          {...form.getInputProps("agenda")}
        />
        <ActionIcon
          variant="light"
          color="yellow"
          size="lg"
          type="submit"
          loading={isCreating}
        >
          <IconPlus />
        </ActionIcon>
      </Group>
    </form>
  );
};

export default NewTodo;
