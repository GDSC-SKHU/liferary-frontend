import MainBody from "@/components/Main/MainBody";
import Nav from "@/components/Nav/Nav";
import useToken from "@/hooks/useToken";

export default function Home() {
  const { allToken } = useToken();

  // console.log(token + '-Token');
  // console.log(allToken + '-Token');

  return (
    <>
      <Nav />
      <MainBody />
      {/* <p>{allToken}</p> */}
    </>
  );
}
