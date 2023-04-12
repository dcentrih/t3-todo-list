import { ActionIcon, Menu, Select } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { useState } from "react";
import { useSortTodosBy } from "src/store";

const SortMenu = () => {
  const [opened, setOpened] = useState(false);
  const [sortBy, setSortBy] = useSortTodosBy();

  const sortData = [
    { value: "desc", label: "Newest" },
    { value: "asc", label: "Oldest" },
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
        ></Select>
      </Menu.Dropdown>
    </Menu>
  );
};

export default SortMenu;
