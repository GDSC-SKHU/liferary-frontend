import useToken from "@/hooks/useToken";
import imageUpload from "@/libs/imageUpload";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import {
  BtnContainer,
  Container,
  DeleteImg,
  ImageContainer,
  ImgContainer,
  ImgInput,
  Notice,
  Notion,
  StyledInput,
  StyledInput2,
  StyledLabel,
  Submit,
} from "../S_write/S_writeForm";

const St_writeForm = () => {
  const { allToken } = useToken();
  const router = useRouter();

  const [title, setTitle] = useState<string>("");

  const [content, setContent] = useState<string>("");

  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const id = router.query.id;

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
      const data = await imageUpload(files, "study");

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
      .then(() => alert("success Image deleted"));
    let filteredData = imgUrls.filter((el) => el !== imgUrl);
    setImgUrls(filteredData);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      mainPostId: id,
      title: title,
      context: content,
      images: imgUrls,
    });

    axios
      .post(
        "/api/study/new",
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
          pathname: "/study",
          query: {
            id: id,
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
        <Container style={{ marginTop: "9vh" }}>
          <div>
            <div>
              <Notion>Please enter your</Notion>
            </div>
            <StyledInput
              type="text"
              placeholder="Title"
              value={title}
              onChange={onChangeTitle}
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
