import useUser from "@/hooks/useUser";
import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Btn, Icon } from "../Share/ShareForm";

interface LoginForm {
  password: string;
  passwordconfirm: string;
}

export default function User_infoForm() {
  const router = useRouter();
  const userInfo = useUser();

  const nickname = userInfo.user?.nickname;

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");

  const [isWithdraw, setIsWithdraw] = useState<boolean>(false);

  const [form, setForm] = useState<LoginForm>({
    password: "",
    passwordconfirm: "",
  });

  // const [passwordMatch, setPasswordMatch] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    // checkPasswordMatch();
  };
  // const checkPasswordMatch = () => {

  //   console.log(
  //     form.password === form.passwordconfirm,
  //     form.password,
  //     form.passwordconfirm
  //   );
  // };

  const handleChangePassword = async () => {
    const TOKEN = localStorage.getItem("accessToken");
    console.log(
      "handlepassword",
      nickname,
      form.password,
      form.passwordconfirm
    );
    await axios
      .patch(
        `/api/member`,
        {
          nickname: nickname,
          password: form.password,
          checkedPassword: form.passwordconfirm,
        },
        {
          headers: {
            withCredentials: true,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((res) => res.status === 200 && alert("Password changed"))
      .then(() => setIsEdit((prev) => !prev));
  };

  const handleWithdraw = async (password: string) => {
    // 회원탈퇴
    const TOKEN = localStorage.getItem("accessToken");
    let isAgree = confirm("Would you like to leave?");
    {
      isAgree &&
        (await axios.delete(`/api/member/withdraw`, {
          data: {
            withdrawPassword: password,
          },
          headers: {
            withCredentials: true,
            Authorization: `Bearer ${TOKEN}`,
          },
        }));
    }

    router.push("/login");
  };

  return (
    <UserInfoContainer>
      {!userInfo.user?.firebaseAuth && (
        <Btn
          onClick={() => setIsEdit((prev) => !prev)}
          title="Change Password"
          style={{ marginBottom: "0" }}
        >
          {!isEdit ? (
            <Icon src="/Password.svg" />
          ) : (
            <Icon src="/Prev.svg" title="Back" />
          )}
        </Btn>
      )}
      {isEdit ? (
        <>
          {!isWithdraw ? (
            <>
              <div style={{ marginTop: "1rem" }}>
                <InfoContainer>
                  <IndexContainer>
                    <Index>Password </Index>
                  </IndexContainer>
                  <StyledInput
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </InfoContainer>
                <InfoContainer>
                  <IndexContainer>
                    <Index>Repeat Password </Index>
                  </IndexContainer>
                  <StyledInput
                    type="password"
                    name="passwordconfirm"
                    value={form.passwordconfirm}
                    onChange={handleChange}
                  />
                </InfoContainer>
              </div>
              {/* <button onClick={() => setIsWithdraw((prev) => !prev)}>
                Withdraw
              </button> */}
            </>
          ) : // <>
          //   <span>Confirm password</span>
          //   <StyledInput
          //     value={password}
          //     onChange={(e: ChangeEvent<HTMLInputElement>) =>
          //       setPassword(e.target.value)
          //     }
          //   ></StyledInput>
          //   <button onClick={() => handleWithdraw(password as string)}>
          //     Withdrawal
          //   </button>
          //   <button onClick={() => setIsWithdraw((prev) => !prev)}>
          //     Withdrawal cancel
          //   </button>
          // </>
          null}
          <Btn
            onClick={handleChangePassword}
            title="Edit Password"
            type="submit"
            disabled={form.password !== form.passwordconfirm}
            style={{ marginTop: "1rem", backgroundColor: "#f0f0f0" }}
          >
            <Icon src="/Edit.svg" />
          </Btn>
        </>
      ) : (
        <div>
          <InfoContainer>
            <IndexContainer>
              <Index>E-mail </Index>
            </IndexContainer>
            <UserInfoWrapper>{userInfo.user?.email}</UserInfoWrapper>
          </InfoContainer>
          <InfoContainer>
            <IndexContainer>
              <Index>Nickname </Index>
            </IndexContainer>
            <UserInfoWrapper>{userInfo.user?.nickname}</UserInfoWrapper>
          </InfoContainer>
        </div>
      )}
    </UserInfoContainer>
  );
}

const IndexContainer = styled.div`
  display: inline-block;
  margin: 5px;
  text-align: right;
`;

const Index = styled.span`
  font-weight: 600;
  text-align: right;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  text-align: right;
`;

const UserInfoWrapper = styled.div`
  float: right;
  width: 20vw;
  margin: 5px;
  padding: 3px 5px;

  border: 1px solid #d9d9d9;
  border-radius: 4px;

  text-align: center;
`;

const InfoContainer = styled.div`
  padding: 5px;
`;

const StyledDiv = styled.div`
  padding-top: 2rem;
`;

const StyledInput = styled.input`
  width: 15vw;

  float: right;
  margin-left: 1rem;

  border: none;
  border-bottom: 1px solid var(--color-normal);

  outline: none;

  &:focus {
    border-bottom: 2px solid var(--color-normal);
  }
`;
