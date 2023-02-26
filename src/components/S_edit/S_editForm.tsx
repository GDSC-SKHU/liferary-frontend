import useUser from '@/hooks/useUser';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

interface IUpdate {
  id: string;
  title: string;
  category: string;
  context: string;
  video: string;
}

const S_editForm = () => {
  const router = useRouter();
  const { id } = router.query;
  let ready = router.isReady;
  const { user } = useUser();

  const [updateData, setUpdateData] = useState<IUpdate>();

  const [updateTitle, setUpdateTitle] = useState<string>('');

  const [updateCategory, setUpdateCategory] = useState<string>('');

  const [updateContext, setUpdateContext] = useState<string>('');

  const [updateVideo, setUpdateVideo] = useState<string>('');

  const errorAlert = () => {
    if (updateTitle.length == 0) {
      return alert('제목을 입력해 주세요');
    }
    if (updateCategory.length == 0) {
      return alert('태그를 입력해 주세요');
    }
    if (updateContext.length == 0) {
      return alert('내용을 입력해 주세요');
    }
    if (updateVideo.length == 0) {
      return alert('내용을 입력해 주세요');
    }
  };

  useEffect(() => {
    if (ready) {
      console.log(updateData?.title);

      const getUpdateData = () => {
        const TOKEN = localStorage.getItem('accessToken');
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
      getUpdateData();
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
  const onChangeUpdateVideo = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateVideo(e.currentTarget.value);
  };

  const onClickUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const TOKEN = localStorage.getItem('accessToken');
    axios
      .patch(
        `/api/main/${id}`,
        {
          id: id,
          title: updateTitle,
          category: updateCategory,
          context: updateContext,
          video: updateVideo,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then(() => {
        router.push(`/api/main/${id}`);
      })
      .catch((e) => {
        errorAlert();
      });
  };

  return (
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
        <BtnContainer>
          <Submit type="submit">registration</Submit>
        </BtnContainer>
      </Container>
    </form>
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
  border: 1px solid #4285f4;
  border-radius: 5px;

  &:focus {
    border: 2px solid #4285f4;
  }

  ::placeholder {
    color: #bebebe;
    font-weight: 600;
    font-size: large;
  }
`;

const StyledSpan = styled.span`
  margin-left: 3vw;

  color: #4285f4;
  font-weight: 600;
  font-size: large;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;
`;

const StyledInput = styled.input`
  width: 40vw;
  height: 6vh;
  margin-top: 2vh;
  padding: 0 6px;

  outline: none;
  border: 1px solid #4285f4;
  border-radius: 5px;

  &:focus {
    border: 2px solid #4285f4;
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
  border: 1px solid #4285f4;
  border-radius: 5px;

  &:focus {
    border: 2px solid #4285f4;
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

  background-color: #72a4f7;
  color: white;
  border: 1px solid #72a4f7;
  border-radius: 10px;
  font-weight: 600;
  font-size: large;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: #72a4f7;
    border: 1px solid #72a4f7;
  }
`;
function userRouter() {
  throw new Error('Function not implemented.');
}
