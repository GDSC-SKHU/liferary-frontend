import { auth } from "@/components/Login/GoogleLogin";
import axios from "axios";

const handleLogout = () => {
  // console.log(localStorage.getItem("userInfo"));
  if (
    JSON.parse(localStorage.getItem("userInfo") || "").firebaseAuth === true
  ) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    auth.signOut();
  } else {
    axios
      .post(
        "/api/member/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            RefreshToken: localStorage.getItem("refreshToken"),
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userInfo");
        }
      });
  }
  alert("Success Logout!");
};

export { handleLogout };
