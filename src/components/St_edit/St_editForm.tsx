import { UpdateProps } from "@/pages/s_edit";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import imageUpload from "@/libs/imageUpload";
import useToken from "@/hooks/useToken";

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

export default St_editForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 40vw;
  min-height: 6vh;
  margin-top: 2vh;
  padding: 0 6px;

  border: 1px solid var(--color-main);
  border-radius: 5px;

  word-break: break-all;
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
