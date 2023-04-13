import {
  ActionIcon,
  Container,
  Flex,
  Header,
  useMantineColorScheme,
} from "@mantine/core";
import { IconBrandGithub, IconMoonStars, IconSun } from "@tabler/icons-react";

const AppHeader = () => {
  const colorScheme = useMantineColorScheme();

  return (
    <Header height="60" withBorder={false}>
      <Container fluid h="100%">
        <Flex align="center" justify="space-between" h="100%">
          <ActionIcon
            component="a"
            href="https://github.com/dcentrih/t3-todo-list"
            target="_blank"
            variant="subtle"
          >
            <IconBrandGithub />
          </ActionIcon>
          <ActionIcon
            variant="outline"
            color={colorScheme.colorScheme === "dark" ? "violet" : "blue"}
            onClick={() => colorScheme.toggleColorScheme()}
            title="Toggle color scheme"
          >
            {colorScheme.colorScheme === "dark" ? (
              <IconSun size="1.1rem" />
            ) : (
              <IconMoonStars size="1.1rem" />
            )}
          </ActionIcon>
        </Flex>
      </Container>
    </Header>
  );
};

export default AppHeader;
