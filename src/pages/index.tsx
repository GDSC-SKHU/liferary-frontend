import MainBody from '@/components/Main/MainBody';
import Nav from '@/components/Nav/Nav';
import useToken from '@/hooks/useToken';

export default function Home() {
  const { token } = useToken();

  return (
    <>
      <Nav />
      <MainBody />
      {/* <p>{token}</p> */}
    </>
  );
}
