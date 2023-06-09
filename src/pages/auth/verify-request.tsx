import { Box, Group, Text, Title } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import { type NextPage } from "next";
import Head from "next/head";

const VerifyRequest: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>T3 Todo List - Check email</title>
      </Head>
      <Group mb="sm">
        <IconMail size="3rem" />
        <Title order={3}>Check your email</Title>
      </Group>
      <Text>We&apos;ve sent you a sign-in link to your email address.</Text>
    </Box>
  );
};

export default VerifyRequest;
