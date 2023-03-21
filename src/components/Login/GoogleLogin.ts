import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import firebaseKey from "@/config/firebaseKey.json";

firebase.initializeApp(firebaseKey); //키로 초기화
export const auth = firebase.auth();

export const googleLogin = async () => {
  // 구글로그인 함수
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        localStorage.setItem("accessToken", token);
        await axios
          .get("/api/member/info", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            if (!!token) {
              localStorage.setItem("userInfo", JSON.stringify(res.data));
            }
          });
      }
    });
  } catch (err) {
    return alert(err);
  }
};
