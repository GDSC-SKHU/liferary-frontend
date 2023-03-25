import MainBody from "@/components/Main/MainBody";
import Nav from "@/components/Nav/Nav";
import useToken from "@/hooks/useToken";

const Home = () => {
  // const { allToken } = useToken();

  // console.log(token + '-Token');
  // console.log(allToken + '-Token');

  return (
    <>
      <Nav />
      <MainBody />
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
