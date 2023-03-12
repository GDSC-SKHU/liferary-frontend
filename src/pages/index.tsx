import MainBody from "@/components/Main/MainBody";
import Nav from "@/components/Nav/Nav";
import useToken from "@/hooks/useToken";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import router from "next/router";

export interface PageProps {
  page: string;
}

const Home = ({ page }: PageProps) => {
  const { allToken } = useToken();

  // console.log(token + '-Token');
  // console.log(allToken + '-Token');

  return (
    <>
      <Nav />
      <MainBody page={page} />
      {/* <p>{allToken}</p> */}
    </>
  );
};

export default Home;

// export const getServerSideProps: GetServerSideProps<PageProps> = async (
//   context: GetServerSidePropsContext
// ) => {
//   const { query } = context;
//   const page = query.page as string;
//   return {
//     props: {
//       page,
//     },
//   };
// };
