import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import useToken from "@/hooks/useToken";
import DropDownCategory from "../Commons/DropDownCategory";
import React from "react";
import YouTube from "react-youtube";
import Image from "next/image";
import { MainCategoryProps } from "@/pages/s_write";
import imageUpload from "../../libs/imageUpload";

const S_write = ({ currentCategory }: MainCategoryProps) => {
  const { allToken } = useToken();

  const router = useRouter();

  const [title, setTitle] = useState<string>("");

  const [content, setContent] = useState<string>("");

  const [category, setCategory] = useState<string>(currentCategory ?? "");

  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const [videoUrl, setVideoUrl] = useState<string>("");

  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };
  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleInputFocus2 = () => {
    setIsFocused2(true);
  };
  const handleInputBlur2 = () => {
    setIsFocused2(false);
  };

  const handleInputFocus3 = () => {
    setIsFocused3(true);
  };
  const handleInputBlur3 = () => {
    setIsFocused3(false);
  };

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

  const onChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files;
      const data = await imageUpload(files, "main");

      setImgUrls([...imgUrls, ...data]);
    }
  };

  const handleImageDelete = async (imgUrl: string) => {
    await axios
      .delete(`/api/image?path=main`, {
        data: {
          imagePath: imgUrl,
        },
        headers: {
          Authorization: allToken,
          withCredentials: true,
        },
      })
      .then(() => alert("Success Image deleted"));
    let filteredData = imgUrls.filter((el) => el !== imgUrl);
    setImgUrls(filteredData);
  };

  const onChagneVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      title: title,
      category: category,
      context: content,
      images: imgUrls,
      video: videoUrl,
    });

    const contentReplaceNewline = () => {
      return content.replaceAll("<br>", "\r\n");
    };

    axios
      .post(
        "/api/main/new",
        {
          title: title,
          category: category,
          context: contentReplaceNewline(),
          images: imgUrls,
          video: videoUrl,
        },
        {
          headers: {
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

  const videoId = getIdFromUrl(videoUrl);

  return (
    <S_Container>
      <form onSubmit={onSubmit}>
        <StyledDiv>
          <div>
            <Notion>Category: </Notion>
            <DropDownCategory
              onChange={onChangeCategory}
              currentCategory={category}
            />
          </div>
        </StyledDiv>
        <Container>
          <div>
            <div>
              <Notion>Please enter your</Notion>
            </div>
            <StyledInput
              type="text"
              placeholder="Title"
              value={title}
              onChange={onChangeTitle}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              style={{ borderBottomWidth: isFocused ? "3px" : "1px" }}
            />
          </div>
          <div>
            <div>
              <Notion>Write your</Notion>
            </div>
            <StyledInput2
              placeholder="Tips contents"
              value={content}
              onChange={onChangeContent}
              onFocus={handleInputFocus2}
              onBlur={handleInputBlur2}
              style={{
                borderBottomWidth: isFocused2 ? "3px" : "1px",
              }}
            />
            {/* {content.split("\n").map((line) => {
              return (
                <span key={line}>
                  {line}
                  <br />
                </span>
              );
            })} */}
            {/* <StyledInput2
              placeholder="tips contents"
              value={content}
              onChange={onChangeContent}
              onFocus={handleInputFocus2}
              onBlur={handleInputBlur2}
              style={{
                borderBottomWidth: isFocused2 ? "3px" : "1px",
              }}
            /> */}
          </div>
          <div>
            <div>
              <Notion>Input youtube link</Notion>
            </div>
            <StyledInput
              type="text"
              id="youtubeUrlInput"
              placeholder="Here!"
              value={videoUrl}
              onChange={onChagneVideo}
              onFocus={handleInputFocus3}
              onBlur={handleInputBlur3}
              style={{ borderBottomWidth: isFocused3 ? "3px" : "1px" }}
            />
          </div>
          <StyledLabel className="file-label" htmlFor="chooseFile">
            Choose your file
          </StyledLabel>
          <Notice>Please wait for the photo preview to come up...</Notice>
          <ImageContainer>
            {/* c_writeBody.tsx랑 다름 */}
            {imgUrls.map((imgUrl) => {
              return (
                <ImgContainer key={imgUrl}>
                  <Image
                    key={imgUrl}
                    // src={`https://picsum.photos/200/300`}
                    src={imgUrl}
                    width={100}
                    height={70}
                    alt=""
                  />
                  <DeleteImg
                    style={{ color: "black" }}
                    onClick={() => handleImageDelete(imgUrl)}
                  >
                    x
                  </DeleteImg>
                </ImgContainer>
              );
            })}
          </ImageContainer>
          <ImgInput
            className="file"
            id="chooseFile"
            accept="image/*"
            type="file"
            placeholder="Input file here"
            onChange={onChangeImg}
            multiple
          />
          <BtnContainer>
            <Submit type="submit">Registration</Submit>
          </BtnContainer>
        </Container>
      </form>
      {videoId && (
        <YouTube
          videoId={videoId}
          opts={{
            width: "40%",
            height: "300px",
            display: "flex",
            jusifyContent: "center",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        />
      )}
    </S_Container>
  );
};

export default S_write;

export const S_Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledDiv = styled.div`
  width: 50vw;
  margin-top: 1vh;
`;

const StyledSpan = styled.span`
  margin-left: 3vw;

  color: var(--color-main);

  font-weight: 600;
  font-size: 1rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;
`;

export const Notion = styled.p`
  float: left;

  color: var(--color-main);

  font-size: small;
`;

export const StyledInput = styled.input`
  width: 50vw;
  min-height: 6vh;
  margin-bottom: 0.5rem;

  word-break: break-all;

  border: none;
  border-bottom: 1px solid var(--color-main);

  font-size: 1rem;
  outline: none;

  transition: border-bottom-width 0.3s;

  &:focus {
    border-bottom: 3px solid var(--color-main);
    border-bottom-width: 3px solid var(--color-main);
  }

  ::placeholder {
    color: #bebebe;

    font-size: 1rem;
  }
`;

export const StyledInput2 = styled.textarea`
  width: 50vw;
  height: 33vh;
  margin-bottom: 0.5rem;

  word-break: break-all;

  border: none;
  border-bottom: 1px solid var(--color-main);

  font-size: 1rem;
  outline: none;

  transition: border-bottom-width 0.3s;

  &:focus {
    border-bottom: 3px solid var(--color-main);
    border-bottom-width: 3px solid var(--color-main);
  }

  ::placeholder {
    color: #bebebe;
  }
`;

export const StyledLabel = styled.label`
  width: 50vw;
  margin-top: 1.5rem;
  padding: 4px 0;

  background-color: var(--color-main);
  color: #fff;
  border: 1px solid var(--color-main);
  border-radius: 6px;

  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: var(--color-main);
    border: 1px solid var(--color-main);
  }
`;

export const Notice = styled.p`
  color: black;
  font-size: small;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ImgContainer = styled.div`
  margin-top: 1rem;
`;

export const DeleteImg = styled.span`
  margin-left: 5px;
  margin-right: 1rem;

  font-size: large;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

export const ImgInput = styled.input`
  display: none;
`;

export const BtnContainer = styled.div`
  width: 50vw;
`;

export const Submit = styled.button`
  float: right;
  margin-top: 1vh;
  margin-bottom: 1rem;
  padding: 3px 10px;

  background-color: white;
  color: var(--color-main);
  border: 1px solid var(--color-main);

  border-radius: 5px;

  font-size: 1rem;

  cursor: pointer;

  &:hover {
    background-color: var(--color-main);
    color: white;
    border: 1px solid var(--color-main);
  }
`;
