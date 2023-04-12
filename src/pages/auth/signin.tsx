import { Box, Button, Divider, Group, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconBrandGithub, IconMail } from "@tabler/icons-react";
import { type GetServerSidePropsContext, type NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { getServerAuthSession } from "src/server/auth";
import { VALID_EMAIL } from "src/utils/constants";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (!session) return { props: {} };

  return { redirect: { destination: "/todos", permanent: false } };
};

const SignIn: NextPage = () => {
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

  const signInWithEmail = (val: { email: string }) => void signIn("email", val);

  const { query } = useRouter();
  const { error } = query;
  const errorShown = useRef(false);

  useEffect(() => {
    if (error && !errorShown.current) {
      errorShown.current = true;
      notifications.show({
        title: "An error has occured",
        message: "There was an error while trying to sign you in.",
        color: "red",
        autoClose: false,
      });
    }
  }, [error, errorShown]);

  return (
    <Box miw={{ base: "280px", sm: "300px" }} px="sm">
      <Title
        align="center"
        variant="gradient"
        gradient={{ from: "indigo", to: "white", deg: 45 }}
      >
        Sign in
      </Title>

      <Box maw="300px" mx="auto" mb="lg">
        <Group position="right" mt="sm">
          <Button
            w="100%"
            variant="gradient"
            gradient={{ from: "violet", to: "grape.5", deg: -45 }}
            leftIcon={<IconBrandGithub />}
            onClick={() => void signIn("github")}
            sx={(theme) => ({
              ":hover": {
                backgroundImage: theme.fn.gradient({
                  from: "violet",
                  to: "grape.4",
                  deg: -45,
                }),
              },
            })}
          >
            Sign in with GitHub
          </Button>
        </Group>
        <Divider label="or sign in with" labelPosition="center" my="sm" />
        <form onSubmit={form.onSubmit((val) => signInWithEmail(val))}>
          <TextInput
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
              sx={(theme) => ({
                ":hover": {
                  backgroundImage: theme.fn.gradient({
                    from: "blue",
                    to: "cyan.4",
                    deg: 45,
                  }),
                },
              })}
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
