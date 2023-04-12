import { type GetServerSidePropsContext, type NextPage } from "next";
import { getServerAuthSession } from "src/server/auth";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (!session)
    return { redirect: { destination: "/auth/signin", permanent: false } };

  return { redirect: { destination: "/todos", permanent: false } };
};

const Home: NextPage = () => {
  return null;
};

export default Home;
