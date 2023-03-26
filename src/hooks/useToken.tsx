import axios from "axios";
import { useEffect, useState } from "react";
import { handleLogout } from "@/utils/logout";
import { useRouter } from "next/router";

type approval = string | null;
type account = string | null;

const useToken = () => {
  const router = useRouter();

  const [approval, setApproval] = useState<approval>("Bearer");

  const [token, setToken] = useState<account>("");

  useEffect(() => {
    // setApproval(localStorage.getItem('approvalType'));
    const refreshToken = Object.keys(localStorage).includes("refreshToken")
      ? localStorage.getItem("refreshToken")
      : null;
    setToken(localStorage.getItem("accessToken"));

    let accessToken = localStorage.getItem("accessToken");

    axios
      .get(`/api/member/info`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => console.log(res))
      .catch((res) => {
        if (res.response.status === 403) {
          alert("logged out");
          handleLogout();
          router.push(`/login`);
        }
      });
  }, []);

  const Tokens = [approval + " " + token];
  const allToken = Tokens.join();

  return { allToken };
};

export default useToken;
