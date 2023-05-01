import {
  Box,
  Button,
  Divider,
  Group,
  TextInput,
  Title,
  type CSSObject,
  type MantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconBrandGithub, IconMail } from "@tabler/icons-react";
import { type GetServerSidePropsContext, type NextPage } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { getServerAuthSession } from "src/server/auth";
import { VALID_EMAIL } from "src/utils/constants";

const titleSx = ({ fn, colorScheme }: MantineTheme): CSSObject => ({
  backgroundImage: fn.gradient({
    from: colorScheme === "dark" ? "indigo" : "blue",
    to: colorScheme === "dark" ? "indigo.4" : "cyan.4",
    deg: 45,
  }),
});

const githubBtnSx = ({ fn }: MantineTheme): CSSObject => ({
  ":hover": {
    backgroundImage: fn.gradient({
      from: "violet",
      to: "grape.4",
      deg: -45,
    }),
  },
});
const emailBtnSx = ({ fn }: MantineTheme): CSSObject => ({
  ":hover": {
    backgroundImage: fn.gradient({
      from: "blue.4",
      to: "cyan.4",
      deg: 45,
    }),
  },
});

const SignIn: NextPage = () => {
  const [signInLoad, setSignInLoad] = useState<null | "github" | "email">(null);
  const { query } = useRouter();
  const { error } = query;
  const errorShown = useRef(false);

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (val) =>
        VALID_EMAIL.test(val) ? null : val === "" ? null : "Invalid email",
    },
    transformValues: (val) => ({ email: val.email.toLowerCase() }),
    validateInputOnBlur: true,
    clearInputErrorOnChange: true,
  });

  const signInWithEmail = (val: { email: string }) => {
    setSignInLoad("github");
    void signIn("email", val);
  };

  useEffect(() => {
    if (error && !errorShown.current) {
      errorShown.current = true;
      notifications.show({
        title: "An error has occured",
        message: "There was an error while trying to sign you in.",
        color: "red",
        autoClose: 10000,
      });
    }
  }, [error, errorShown]);

  return (
    <Box miw={{ base: "280px", sm: "300px" }} px="sm">
      <Head>
        <title>T3 Todo List - Sign In</title>
      </Head>
      <Title align="center" variant="gradient" sx={titleSx}>
        Sign in
      </Title>

      <Box maw="300px" mx="auto" mb="lg">
        <Group position="right" mt="sm">
          <Button
            w="100%"
            variant="gradient"
            gradient={{ from: "violet", to: "grape.5", deg: -45 }}
            leftIcon={<IconBrandGithub />}
            onClick={() => {
              setSignInLoad("github");
              void signIn("github");
            }}
            loading={signInLoad === "github"}
            sx={githubBtnSx}
          >
            Sign in with GitHub
          </Button>
        </Group>
        <Divider label="or continue with" labelPosition="center" my="sm" />
        <form onSubmit={form.onSubmit((val) => signInWithEmail(val))}>
          <TextInput
            required
            type="email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <Group position="right" mt="sm">
            <Button
              type="submit"
              w="100%"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan.5", deg: 45 }}
              leftIcon={<IconMail />}
              loading={signInLoad === "email"}
              sx={emailBtnSx}
            >
              Sign in with your Email
            </Button>
          </Group>
        </form>
      </Box>
    </Box>
  );
};

export default SignIn;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (!session) return { props: {} };

  return { redirect: { destination: "/todos", permanent: false } };
};
