import { useState, useEffect } from 'react';
import axios from 'axios';

interface IUser {
  id: string;
  email: string;
  nickname: string;
}

const useUser = () => {
  const [user, setUser] = useState<IUser | undefined>();

  useEffect(() => {
    axios
      .get(`/api/info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((data) => setUser(data.data))
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return { user };
};

export default useUser;
