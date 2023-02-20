import { useEffect, useState } from 'react';

type account = string | null;

const useToken = () => {
  const [token, setToken] = useState<account>('');

  useEffect(() => {
    setToken(localStorage.getItem('accessToken'));
  }, []);

  console.log(token);

  return { token };
};

export default useToken;
