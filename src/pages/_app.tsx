import {
  ColorSchemeProvider,
  MantineProvider,
  type ColorScheme,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import "src/styles/globals.css";
import AppLayout from "./_layout";

import { Notifications } from "@mantine/notifications";
import { api } from "src/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (color?: ColorScheme) =>
    setColorScheme((val) => (color || val === "dark" ? "light" : "dark"));

  return (
    <SessionProvider session={session}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Notifications position="bottom-center" />
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
