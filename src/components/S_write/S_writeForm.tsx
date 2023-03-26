import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import useToken from "@/hooks/useToken";
import DropDownCategory from "../Commons/DropDownCategory";
import React from "react";
import YouTube from "react-youtube";
import Image from "next/image";
const S_write = () => {
  const { allToken } = useToken();

  const router = useRouter();

  const [title, setTitle] = useState<string>("");

  const [content, setContent] = useState<string>("");

  const [category, setCategory] = useState<string>("");

  const [imgFile, setImgFile] = useState<FileList | null>(null);

  const [url, setUrl] = React.useState("");

  const [previewImgUrl, setPreviewImgUrl] = useState<string[]>([]);

  const errorAlert = () => {
    if (title.length == 0) {
      return alert("Please enter your title.");
    }
    if (category.length == 0) {
      return alert("Please enter your category.");
    }
    if (content.length == 0) {
      return alert("Please enter your content.");
    }
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  // const onChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const file = e.target.files;
  //     console.log("t", e.target.files);
  //     setImgFile(file);
  //   }
  // };

  const onChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImgFile(files);
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        // urls.push(url.split("blob:")[1]);
        urls.push(url);
      }
      setPreviewImgUrl((prevUrls) => [...prevUrls, ...urls]);
    }
  };

  const onChagneVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const TOKEN = localStorage.getItem('accessToken');
    // console.log(TOKEN);

    console.log({
      title: title,
      category: category,
      context: content,
      images: imgFile,
      video: url,
    });

    // let dataSet = {
    //   title: title,
    //   category: category,
    //   context: content,
    //   video: url,
    // };

    // const formData = new FormData();
    // formData.append("data", JSON.stringify(dataSet));

    axios
      .post(
        "/api/main/new",
        {
          title: title,
          category: category,
          context: content,
          images: imgFile,
          video: url,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            withCredentials: true,
            Authorization: allToken,
          },
        }
      )
      // post를 보냈을 때 return 값(id)을 저장할 친구를 생성하는 코드 짜자
      .then((res) => {
        alert("Success write!");
        router.push({
          pathname: "/share",
          query: {
            id: res.data.id,
            // video: res.data.video,
            // url: res.data.url,
          },
        });
      })
      .catch((e) => {
        console.log(e);
        errorAlert();
      });
  };

  const getIdFromUrl = (url: string) => {
    const match = url.match(/[?&]v=([^&]*)/);
    return match ? match[1] : null;
  };

  const videoId = getIdFromUrl(url);

  return (
    <>
      <form onSubmit={onSubmit}>
        <StyledDiv>
          <div>
            <StyledSpan>Category: </StyledSpan>
            <DropDownCategory onChange={onChangeCategory} />
          </div>
        </StyledDiv>
        <Container>
          <StyledInput
            type="text"
            placeholder="Please enter your title"
            value={title}
            onChange={onChangeTitle}
          />
          <StyledInput2
            placeholder="Write your tips contents"
            value={content}
            onChange={onChangeContent}
          />
          <StyledInput
            type="text"
            id="youtubeUrlInput"
            placeholder="Input youtube link here!"
            value={url}
            onChange={onChagneVideo}
          />
          <StyledLabel className="file-label" htmlFor="chooseFile">
            Choose your file
          </StyledLabel>
          <ImgInput
            className="file"
            id="chooseFile"
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
      {previewImgUrl.map((imgUrl) => {
        return (
          <Image
            key={imgUrl}
            // src={`https://picsum.photos/200/300`}
            src={imgUrl}
            width={100}
            height={70}
            alt=""
          />
        );
      })}
      {videoId && (
        <YouTube videoId={videoId} opts={{ width: "100%", height: "500px" }} />
      )}
    </>
  );
};

export default S_write;

const StyledDiv = styled.div`
  width: 50vw;
`;

const StyledSpan = styled.span`
  margin-left: 3vw;

  color: var(--color-main);

  font-weight: 600;
  font-size: large;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;
`;

const StyledInput = styled.input`
  width: 40vw;
  min-height: 6vh;
  /* height: auto; */
  margin-top: 2vh;
  padding: 0 6px;

  word-break: break-all;

  border: 1px solid var(--color-main);
  border-radius: 5px;

  outline: none;

  &:focus {
    border: 2px solid var(--color-main);
  }

  ::placeholder {
    color: #bebebe;

    font-weight: 600;
    font-size: large;
  }
`;

const StyledInput2 = styled.textarea`
  width: 40vw;
  height: 40vh;
  margin-top: 3vh;
  padding: 0 6px;

  border: 1px solid var(--color-main);
  border-radius: 5px;

  outline: none;

  &:focus {
    border: 2px solid var(--color-main);
  }

  ::placeholder {
    color: #bebebe;

    font-weight: 600;
    font-size: large;
  }
`;

const StyledLabel = styled.label`
  width: 40%;
  margin-top: 30px;
  padding: 10px 0;

  background-color: var(--color-main);
  color: #fff;
  border-radius: 6px;

  text-align: center;
  cursor: pointer;
`;

const ImgInput = styled.input`
  display: none;
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
    color: var(—color-normal);
    border: 1px solid var(—color-normal);
  }
`;
