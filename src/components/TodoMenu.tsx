import { ActionIcon, Menu, Select } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { useState } from "react";

import { usePageSize, useSortTodosBy } from "src/store";

const TodoMenu = () => {
  const [opened, setOpened] = useState(false);
  const [sortBy, setSortBy] = useSortTodosBy();
  const [pageSize, setPageSize] = usePageSize();

  const sortData = [
    { value: "desc", label: "Newest" },
    { value: "asc", label: "Oldest" },
  ];

  const pageSizes = [
    { value: "5", label: "5" },
    { value: "7", label: "7" },
    { value: "9", label: "9" },
  ];

  return (
    <Menu width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <ActionIcon>
          <IconSettings />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Sort by</Menu.Label>
        <Select
          data={sortData}
          defaultValue={sortBy}
          pb="sm"
          px="xs"
          onChange={(val) => (val ? setSortBy(val as "asc" | "desc") : null)}
        />
        <Menu.Divider></Menu.Divider>
        <Menu.Label>Items on page</Menu.Label>
        <Select
          data={pageSizes}
          defaultValue={pageSize.toString()}
          pb="sm"
          px="sm"
          onChange={(val) => (val ? setPageSize(parseInt(val)) : 5)}
        />
      </Menu.Dropdown>
    </Menu>
  );
};

export default TodoMenu;
