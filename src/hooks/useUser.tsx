import { useState, useEffect } from "react";
import axios from "axios";

interface IUser {
  email: string;
  nickname: string;
  firebaseAuth: boolean;
}

const useUser = () => {
  const [user, setUser] = useState<IUser | undefined>();

  useEffect(() => {
    axios
      .get(`/api/member/info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((data) => setUser(data.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return { user };
};

export default useUser;
