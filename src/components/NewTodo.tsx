import { ActionIcon, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

import { api } from "src/utils/api";

const NewTodo = () => {
  const [isCreating, setIsCreating] = useState(false);
  const utils = api.useContext();

  const form = useForm({
    initialValues: {
      agenda: "",
    },
    validate: {
      agenda: (val) =>
        val !== "" ? null : "Todo mush contain at least 1 word.",
    },
  });

  const createTodoMut = api.todo.create.useMutation({
    onSettled() {
      void utils.todo.all.invalidate();
      form.reset();
      setIsCreating(false);
    },
  });
  const createTodo = ({ agenda }: { agenda: string }) => {
    setIsCreating(true);
    createTodoMut.mutate({ agenda });
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
