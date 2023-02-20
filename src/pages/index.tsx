import MainBody from '@/components/Main/MainBody';
import Nav from '@/components/Nav/Nav';
import { useEffect, useState } from 'react';

type account = string | null;

export default function Home() {
  const [token, setToken] = useState<account>('');
  useEffect(() => {
    setToken(localStorage.getItem('accessToken'));
  }, []);

  //   console.log(token + '-Token');

  // console.log(token);

  return (
    <>
      <Nav />
      <MainBody />
      {/* <p>{token}</p> */}
    </>
  );
}
