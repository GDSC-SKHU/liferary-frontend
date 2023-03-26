import useToken from "@/hooks/useToken";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
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

const C_writeBody = ({ isEdit }: { isEdit?: boolean }) => {
  const { allToken } = useToken();

  const router = useRouter();

  const { id } = router.query;
  const { mainPostId } = router.query;
  const [title, setTitle] = useState<string>("");

  const [content, setContent] = useState<string>("");

  const [imgUrls, setImgUrls] = useState<string[]>([]);

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

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files;
      const data = await imageUpload(files, "board");

      setImgUrls([...imgUrls, ...data]);
    }
  };

  const handleImageDelete = async (imgUrl: string) => {
    await axios
      .delete(`/api/image?path=board`, {
        data: {
          imagePath: imgUrl,
        },
        headers: {
          Authorization: allToken,
          withCredentials: true,
        },
      })
      .then(() => alert("success Image deleted"));
    let filteredData = imgUrls.filter((el) => el !== imgUrl);
    console.log(filteredData);
    setImgUrls(filteredData);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    {
      isEdit
        ? //수정모드
          axios
            .patch(
              `/api/board/${mainPostId}/post?id=${id}`,
              {
                title,
                context: content,
                images: imgUrls,
              },
              {
                headers: {
                  // crossDomain: true,
                  // credentials: 'include',
                  withCredentials: true,
                  Authorization: allToken,
                },
              }
            )
            .then((res) => {
              alert("Success edit!");
              router.push({
                pathname: `/c_list/${mainPostId}`,
              });
            })
            .catch((e) => {
              console.log(e);
              errorAlert();
            })
        : //입력모드
          axios
            .post(
              "/api/board/new",
              {
                mainPostId: id,
                title: title,
                context: content,
                images: imgUrls,
              },
              {
                headers: {
                  withCredentials: true,
                  Authorization: allToken,
                },
              }
            )
            .then(() => {
              alert("Success write!");
              router.push({
                pathname: `/c_list/${id}`,
              });
            })
            .catch((e) => {
              console.log(e);
              errorAlert();
            });
    }
  };

  useEffect(() => {
    {
      isEdit &&
        axios.get(`/api/board/${mainPostId}/post/?id=${id}`).then((data) => {
          console.log("editData", data);
          setTitle(data.data.title);
          setContent(data.data.context);
          setImgUrls(data.data.images);
        });
    }
  }, []);

  return (
    <>
      {isEdit && <h3>Edit mode</h3>}
      <form onSubmit={onSubmit}>
        <Container style={{ marginTop: "6vh" }}>
          <div>
            <div>
              <Notion>Please enter your</Notion>
            </div>
            <StyledInput
              type="text"
              placeholder="title"
              value={title}
              onChange={onChangeTitle}
            />
          </div>
          <div>
            <div>
              <Notion>Write your</Notion>
            </div>
            <StyledInput2
              placeholder="tips contents"
              value={content}
              onChange={onChangeContent}
            />
          </div>
          <StyledLabel className="file-label" htmlFor="chooseFile">
            Choose your file
          </StyledLabel>
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
            placeholder="Input file here!"
            onChange={onChangeImg}
            multiple
          />
          <BtnContainer>
            {!isEdit ? (
              <Submit type="submit">registration</Submit>
            ) : (
              <Submit type="submit">Edit</Submit>
            )}
          </BtnContainer>
        </Container>
      </form>
    </>
  );
};

export default C_writeBody;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;
`;
