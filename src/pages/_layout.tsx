import { AppShell, Box, Container } from "@mantine/core";
import { type ReactNode } from "react";

import AppHeader from "src/components/AppHeader";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AppShell
      header={<AppHeader />}
      styles={{
        main: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Container size="xs" w="100%" px={0}>
        <Box w="100%">{children}</Box>
      </Container>
    </AppShell>
  );
};

export default AppLayout;
