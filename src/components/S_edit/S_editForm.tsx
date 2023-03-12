import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { UpdateProps } from "@/pages/s_edit";
import DropDownCategory from "../Commons/DropDownCategory";

const S_editForm = ({ id }: UpdateProps) => {
  const router = useRouter();
  console.log("s_edit", id);

  const [updateTitle, setUpdateTitle] = useState<string>("");

  const [updateCategory, setUpdateCategory] = useState<string>("");

  const [updateContext, setUpdateContext] = useState<string>("");

  const [updateImg, setUpdateImg] = useState<FileList | null>(null);

  const [updateVideo, setUpdateVideo] = useState<string>("");

  const errorAlert = () => {
    if (updateTitle.length == 0) {
      return alert("Please enter your title.");
    }
    if (updateCategory.length == 0) {
      return alert("Please enter your category.");
    }
    if (updateContext.length == 0) {
      return alert("Please enter your content.");
    }
    if (updateVideo.length == 0) {
      return alert("Please enter your video link.");
    }
  };

  // 전에 쓴 글 get 해오기
  useEffect(() => {
    const getUpdateData = () => {
      const TOKEN = localStorage.getItem("accessToken");
      axios
        .get(`/api/main/post/?id=${id}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((data) => {
          console.log(data.data);
          // default 값
          setUpdateTitle(data.data.title);
          setUpdateCategory(data.data.category);
          setUpdateContext(data.data.context);
          setUpdateImg(data.data.images);
          setUpdateVideo(data.data.video);
          console.log(updateTitle, updateContext);
        })
        .catch((e) => {
          alert(e);
        });
    };
    getUpdateData();
  }, []);

  const onChangeUpdateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(e.target.value);
  };

  const onChangeUpdateContext = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateContext(e.target.value);
  };

  const onChangeUpdateCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setUpdateCategory(e.target.value);
  };

  const onChangeUpdateImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files;
      setUpdateImg(file);
    }
  };

  const onChangeUpdateVideo = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateVideo(e.target.value);
  };

  const onClickUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const TOKEN = localStorage.getItem("accessToken");

    console.log({
      title: updateTitle,
      category: updateCategory,
      context: updateContext,
      images: updateImg,
      video: updateVideo,
    });

    let dataSet = {
      title: updateTitle,
      category: updateCategory,
      context: updateContext,
      video: updateVideo,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(dataSet));

    axios
      .post(
        `/api/main/post/?id=${id}`,
        {
          title: updateTitle,
          category: updateCategory,
          context: updateContext,
          images: updateImg,
          video: updateVideo,
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
            <DropDownCategory onChange={onChangeUpdateCategory} />
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
            type="text"
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
          <input
            id="input-file"
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

export default S_editForm;

const StyledDiv = styled.div`
  width: 50vw;
`;

const StyledInput3 = styled.input`
  height: 5vh;
  margin-top: 3vh;
  padding: 0 6px;

  outline: none;
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
  height: 6vh;
  margin-top: 2vh;
  padding: 0 6px;

  outline: none;
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

  outline: none;
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
