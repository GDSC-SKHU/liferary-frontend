import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { UpdateProps } from "@/pages/s_edit";
import DropDownCategory from "../Commons/DropDownCategory";
import Image from "next/image";
import useToken from "../../hooks/useToken";
import imageUpload from "@/libs/imageUpload";
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
          <StyledInput
            type="text"
            placeholder="Please enter your title"
            value={updateTitle}
            onChange={onChangeUpdateTitle}
          />
          <StyledInput2
            placeholder="Write your tips contents"
            value={updateContext}
            onChange={onChangeUpdateContext}
          />
          <StyledInput
            type="text"
            placeholder="Input youtube link here!"
            value={updateVideo}
            onChange={onChangeUpdateVideo}
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
            onChange={onChangeUpdateImg}
            multiple
          />
          {updateImgUrls?.map((imgUrl) => (
            <>
              <Image key={imgUrl} src={imgUrl} width={100} height={70} alt="" />
              <span onClick={() => handleImageDelete(imgUrl)}>X</span>
            </>
          ))}
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  width: 40vw;
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
    color: var(--color-normal);
    border: 1px solid var(--color-normal);
  }
`;
