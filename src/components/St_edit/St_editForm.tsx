import { UpdateProps } from "@/pages/s_edit";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";

const St_editForm = ({ id }: UpdateProps) => {
  const router = useRouter();
  console.log("st_edit", id);

  const [updateTitle, setUpdateTitle] = useState<string>("");

  const [updateContext, setUpdateContext] = useState<string>("");

  const [updateImg, setUpdateImg] = useState<FileList | null>(null);

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
      const TOKEN = localStorage.getItem("accessToken");
      axios
        .get(`/api/study?mainPost=${id}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((data) => {
          console.log(data.data);
          // default 값
          setUpdateTitle(data.data.title);
          setUpdateContext(data.data.context);
          setUpdateImg(data.data.images);
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

  const onChangeUpdateContext = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateContext(e.currentTarget.value);
  };

  const onChangeUpdateImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files;
      setUpdateImg(file);
    }
  };

  const onClickUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const TOKEN = localStorage.getItem("accessToken");

    console.log({
      title: updateTitle,
      context: updateContext,
      images: updateImg,
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
          images: updateImg,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            withCredentials: true,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((res) => {
        alert("Success Update!");
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
      <form onSubmit={onClickUpdate}>
        <Container>
          <StyledInput
            type="text"
            placeholder="Please enter your title"
            value={updateTitle}
            onChange={onChangeUpdateTitle}
          />
          <StyledInput2
            type="text"
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
          <BtnContainer>
            <Submit type="submit">registration</Submit>
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
  height: 6vh;
  margin-top: 2vh;
  padding: 0 6px;

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
