import {
  ActionIcon,
  AppShell,
  Box,
  Container,
  Flex,
  Header,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { type ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const colorScheme = useMantineColorScheme();

  return (
    <AppShell
      header={
        <Header height="60" withBorder={false}>
          <Container fluid h="100%">
            <Flex align="center" justify="right" h="100%">
              {" "}
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
      }
      styles={{
        main: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Container size="xs" w="100%">
        <Box w="100%" mt={-60}>
          {children}
        </Box>
      </Container>
    </AppShell>
  );
};

export default AppLayout;
