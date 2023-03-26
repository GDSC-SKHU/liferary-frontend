import useToken from "@/hooks/useToken";
import imageUpload from "@/libs/imageUpload";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

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

    // const TOKEN = localStorage.getItem('accessToken');
    // console.log(TOKEN);

    console.log({
      mainPostId: id,
      title: title,
      context: content,
      images: imgUrls,
    });

    let dataSet = {
      mainPostId: id,
      title: title,
      context: content,
      images: imgUrls,
    };

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
            // crossDomain: true,
            // credentials: 'include',

            withCredentials: true,
            Authorization: allToken,
          },
        }
      )
      .then(() => {
        alert("Success write!");
        router.push({
          pathname: `/study`,
          // pathname: `/study?id=${id}`,
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
      {imgUrls?.map((imgUrl) => {
        return (
          <>
            <Image
              key={imgUrl}
              // src={`https://picsum.photos/200/300`}
              src={imgUrl}
              width={100}
              height={70}
              alt=""
            />
            <span onClick={() => handleImageDelete(imgUrl)}>x</span>
          </>
        );
      })}
    </>
  );
};

export default St_writeForm;

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
