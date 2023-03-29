import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { UpdateProps } from "@/pages/s_edit";
import DropDownCategory from "../Commons/DropDownCategory";
import Image from "next/image";
import useToken from "../../hooks/useToken";
import imageUpload from "@/libs/imageUpload";
import {
  BtnContainer,
  DeleteImg,
  ImageContainer,
  ImgContainer,
  ImgInput,
  Notion,
  StyledInput,
  StyledInput2,
  StyledLabel,
  Submit,
} from "../S_write/S_writeForm";

const S_editForm = ({ id }: UpdateProps) => {
  const { allToken } = useToken();
  const router = useRouter();

  const [updateTitle, setUpdateTitle] = useState<string>("");

  const [updateCategory, setUpdateCategory] = useState<string>("");

  const [updateContext, setUpdateContext] = useState<string>("");

  const [updateImgUrls, setUpdateImgUrls] = useState<string[]>([]);

  const [updateVideo, setUpdateVideo] = useState<string>("");

  const errorAlert = () => {
    if (updateTitle.length == 0) {
      return alert("Please enter your title.");
    }
    if (updateCategory?.length == 0) {
      return alert("Please enter your category.");
    }
    if (updateContext.length == 0) {
      return alert("Please enter your content.");
    }
  };

  // 전에 쓴 글 get 해오기
  useEffect(() => {
    axios
      .get(`/api/main/post/?id=${id}`)
      .then((data) => {
        console.log(data.data);
        // default 값
        setUpdateTitle(data.data.title);
        setUpdateCategory(data.data.category);
        setUpdateContext(data.data.context);
        setUpdateImgUrls(data.data.images);
        setUpdateVideo(data.data.video);
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  const onChangeUpdateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(e.target.value);
  };

  const onChangeUpdateContext = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateContext(e.target.value);
  };

  const onChangeUpdateCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setUpdateCategory(e.target.value);
  };

  const onChangeUpdateImg = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files;
      const data = await imageUpload(files, "main");
      // const file = useUmage...()

      setUpdateImgUrls([...updateImgUrls, ...data]);
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
      .then(() => alert("success Image deleted"));
    let filteredData = updateImgUrls.filter((el) => el !== imgUrl);
    setUpdateImgUrls(filteredData);
  };

  const onChangeUpdateVideo = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateVideo(e.target.value);
  };

  const onClickUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("up", updateImgUrls);
    console.log(
      updateCategory,
      updateContext,
      updateTitle,
      updateVideo,
      updateImgUrls
    );
    axios
      .patch(
        `/api/main/post?id=${id}`,
        {
          title: updateTitle,
          category: updateCategory,
          context: updateContext,
          images: updateImgUrls,
          video: updateVideo,
        },
        {
          headers: {
            withCredentials: true,
            Authorization: allToken,
          },
        }
      )
      .then((res) => {
        alert("Success Update!");
        router.push({
          pathname: "/share",
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
      <form onSubmit={onClickUpdate}>
        <StyledDiv>
          <div>
            <StyledSpan>Category: </StyledSpan>
            {updateCategory && (
              <DropDownCategory
                onChange={onChangeUpdateCategory}
                currentCategory={updateCategory}
              />
            )}
          </div>
        </StyledDiv>
        <Container>
          <div>
            <div>
              <Notion>Please enter your</Notion>
            </div>
            <StyledInput
              type="text"
              placeholder="title"
              value={updateTitle}
              onChange={onChangeUpdateTitle}
            />
          </div>
          <div>
            <div>
              <Notion>Write your</Notion>
            </div>
            <StyledInput2
              placeholder="tips contents"
              value={updateContext}
              onChange={onChangeUpdateContext}
            />
          </div>
          <div>
            <div>
              <Notion>Input youtube link</Notion>
            </div>
            <StyledInput
              type="text"
              placeholder="here!"
              value={updateVideo}
              onChange={onChangeUpdateVideo}
            />
          </div>
          <StyledLabel className="file-label" htmlFor="chooseFile">
            Choose your file
          </StyledLabel>
          <ImageContainer>
            {/* c_writeBody.tsx랑 다름 */}
            {updateImgUrls.map((imgUrl) => {
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
            placeholder="Input file here!"
            onChange={onChangeUpdateImg}
            multiple
          />
          <BtnContainer>
            <Submit type="submit">edit</Submit>
          </BtnContainer>
        </Container>
      </form>
    </>
  );
};

export default S_editForm;

const StyledDiv = styled.div`
  width: 50vw;
`;

const StyledSpan = styled.span`
  margin-left: 3vw;

  color: var(--color-main);

  font-weight: 600;
  font-size: large;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
