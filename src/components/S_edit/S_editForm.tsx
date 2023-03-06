import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";

interface IUpdate {
  id: string;
  title: string;
  category: string;
  context: string;
  images: string[];
  video: string;
}

const S_editForm = () => {
  const router = useRouter();
  const [id, setId] = useState(router.query.id);
  let ready = router.isReady;

  const [updateData, setUpdateData] = useState<IUpdate>();

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

  useEffect(() => {
    if (ready) {
      console.log(updateData?.title);

      const getUpdateData = () => {
        const TOKEN = localStorage.getItem("accessToken");
        axios
          .get(`/api/main/${id}`, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          })
          .then((data) => {
            console.log(data.data);
            setUpdateData(data.data);
          })
          .catch((e) => {
            alert(e);
          });
      };
      getUpdateData;
    }
  }, []);

  const onChangeUpdateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(e.currentTarget.value);
  };
  const onChangeUpdateCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateCategory(e.currentTarget.value);
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
  const onChangeUpdateVideo = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateVideo(e.currentTarget.value);
  };

  const onClickUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let dataSet = {
      title: updateTitle,
      category: updateCategory,
      context: updateContext,
      video: updateVideo,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(dataSet));

    const TOKEN = localStorage.getItem("accessToken");
    axios
      .patch(
        `/api/main/${id}`,
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
        alert("Success patch!");
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
            <StyledInput3
              type="text"
              placeholder="Enter here!"
              value={updateCategory}
              onChange={onChangeUpdateCategory}
            />
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
            // onChange={handleChangeFile}
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