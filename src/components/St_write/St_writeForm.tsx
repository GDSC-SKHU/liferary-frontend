import useToken from "@/hooks/useToken";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";

const St_writeForm = () => {
  const { allToken } = useToken();

  const router = useRouter();

  const [title, setTitle] = useState<string>("");

  const [content, setContent] = useState<string>("");

  const [imgFile, setImgFile] = useState<FileList | null>(null);

  const errorAlert = () => {
    if (title.length == 0) {
      return alert("Please enter your title.");
    }
    if (content.length == 0) {
      return alert("Please enter your content.");
    }
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const onChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files;
      setImgFile(file);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const TOKEN = localStorage.getItem('accessToken');
    // console.log(TOKEN);

    console.log({
      mainPostId: router.query.id,
      title: title,
      context: content,
      images: imgFile,
    });

    let dataSet = {
      mainPostId: router.query.id,
      title: title,
      context: content,
      images: imgFile,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(dataSet));

    axios
      .post(
        "/api/study/new",
        {
          mainPostId: router.query.id,
          title: title,
          context: content,
          images: imgFile,
        },
        {
          headers: {
            // crossDomain: true,
            // credentials: 'include',
            "Content-Type": "multipart/form-data",
            withCredentials: true,
            Authorization: allToken,
          },
        }
      )
      .then((res) => {
        alert("Success write!");
        router.push({
          pathname: "/study",
          query: {
            id: res.data.id,
          },
        });
      })
      .catch((e) => {
        console.log(e);
        errorAlert();
      });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Container>
          <StyledInput
            type="text"
            placeholder="Please enter your title"
            value={title}
            onChange={onChangeTitle}
          />
          <StyledInput2
            type="text"
            placeholder="Write your tips contents"
            value={content}
            onChange={onChangeContent}
          />
          <input
            id="input-file"
            accept="image/*"
            type="file"
            placeholder="Input file here!"
            onChange={onChangeImg}
            multiple
          />
          <BtnContainer>
            <Submit type="submit">registration</Submit>
          </BtnContainer>
        </Container>
      </form>
    </>
  );
};

export default St_writeForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* color: white; */
`;

const StyledInput = styled.input`
  width: 40vw;
  height: 6vh;
  margin-top: 2vh;
  padding: 0 6px;

  outline: none;
  border: 1px solid var(--color-main);
  border-radius: 5px;

  &:focus {
    border: 2px solid var(--color-main);
  }

  ::placeholder {
    color: #bebebe;
    font-weight: 600;
    font-size: large;
  }
`;

const StyledInput2 = styled.input`
  width: 40vw;
  height: 40vh;
  margin-top: 3vh;
  padding: 0 6px;

  outline: none;
  border: 1px solid var(--color-main);
  border-radius: 5px;

  &:focus {
    border: 2px solid var(--color-main);
  }

  ::placeholder {
    color: #bebebe;
    font-weight: 600;
    font-size: large;
  }
`;

const BtnContainer = styled.div`
  width: 40vw;
`;

const Submit = styled.button`
  float: right;
  margin-top: 3vh;
  margin-bottom: 1rem;
  padding: 3px 10px;

  background-color: var(--color-normal);
  color: white;
  border: 1px solid var(--color-normal);
  border-radius: 10px;
  font-weight: 600;
  font-size: large;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: var(--color-normal);
    border: 1px solid var(--color-normal);
  }
`;
