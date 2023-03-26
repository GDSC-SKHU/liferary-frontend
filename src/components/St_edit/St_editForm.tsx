import { UpdateProps } from "@/pages/s_edit";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import imageUpload from "@/libs/imageUpload";
import useToken from "@/hooks/useToken";
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

const St_editForm = ({ id }: UpdateProps) => {
  console.log(id);

  const { allToken } = useToken();
  const router = useRouter();

  const [updateTitle, setUpdateTitle] = useState<string>("");

  const [updateContext, setUpdateContext] = useState<string>("");

  const [updateImgUrls, setUpdateImgUrls] = useState<string[]>([]);

  const errorAlert = () => {
    if (updateTitle.length == 0) {
      return alert("Please enter your title.");
    }
    if (updateContext.length == 0) {
      return alert("Please enter your content.");
    }
  };

  useEffect(() => {
    const getUpdateData = () => {
      axios
        .get(`/api/study?mainPost=${id}`)
        .then((data) => {
          console.log(data.data);
          // default 값
          setUpdateTitle(data.data.title);
          setUpdateContext(data.data.context);
          setUpdateImgUrls(data.data.images);
          console.log(updateTitle, updateContext);
        })
        .catch((e) => {
          alert(e);
        });
    };
    getUpdateData();
  }, []);

  const onChangeUpdateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(e.currentTarget.value);
  };

  const onChangeUpdateContext = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateContext(e.currentTarget.value);
  };

  const onChangeUpdateImg = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files;
      const data = await imageUpload(files, "study");
      // const file = useUmage...()

      setUpdateImgUrls([...updateImgUrls, ...data]);
    }
  };

  const handleImageDelete = async (imgUrl: string) => {
    await axios
      .delete(`/api/image?path=study`, {
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
    console.log(filteredData);
    setUpdateImgUrls(filteredData);
  };

  const onClickUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      title: updateTitle,
      context: updateContext,
      images: updateImgUrls,
    });

    let dataSet = {
      title: updateTitle,
      context: updateContext,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(dataSet));

    axios
      .patch(
        `/api/study?mainPost=${id}`,
        {
          title: updateTitle,
          context: updateContext,
          images: updateImgUrls,
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
          pathname: "/study",
          query: {
            id,
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
        <Container style={{ marginTop: "9vh" }}>
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

export default St_editForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
