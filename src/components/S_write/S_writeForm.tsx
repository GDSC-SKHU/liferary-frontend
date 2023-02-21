import axios from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import CreateStudy from './CreateStudy';
import useToken from '@/hooks/useToken';

const S_write = () => {
  const { allToken } = useToken();

  const router = useRouter();

  const [title, setTitle] = useState<string>('');

  const [content, setContent] = useState<string>('');

  const [category, setCategory] = useState<string>('');

  const [name, setName] = useState<string>('');

  const [video, setVideo] = useState<string>('');

  // console.log(allToken);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const onChangeCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeVideo = (e: ChangeEvent<HTMLInputElement>) => {
    setVideo(e.target.value);
  };

  const errorAlert = () => {
    if (title.length == 0) {
      return alert('Please enter your title.');
    }
    if (name.length == 0) {
      return alert('Please enter your name.');
    }
    if (category.length == 0) {
      return alert('Please enter your category.');
    }
    if (content.length == 0) {
      return alert('Please enter your content.');
    }
    if (video.length == 0) {
      return alert('Please enter your video.');
    }
  };

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      title: title,
      author: name,
      category: category,
      context: content,
      video: video,
    });

    axios
      .post(
        'http://api-liferary.duckdns.org/api/main/new',
        {
          title: title,
          author: name,
          category: category,
          context: content,
          video: video,
        },
        {
          headers: {
            crossDomain: true,
            credentials: 'include',
            withCredentials: true,
            Authorization: allToken,
          },
        }
      )
      // post를 보냈을 때 return 값을 저장할 친구를 생성하는 코드 짜자

      .then((res) => {
        // console.log(res.data);
        // console.log(res.data.accessToken);
        alert('success write!');

        router.push({
          pathname: '/share',
          query: {
            title: title,
            content: content,
            name: name,
            category: category,
            video: video,
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
        <StyledDiv>
          <div>
            <StyledSpan>Category: </StyledSpan>
            <StyledInput3
              type="text"
              placeholder="Enter here!"
              value={category}
              onChange={onChangeCategory}
            />
          </div>
          <div>
            <StyledSpan>Name: </StyledSpan>
            <StyledInput3
              type="text"
              placeholder="Enter here!"
              value={name}
              onChange={onChangeName}
            />
          </div>
        </StyledDiv>
        <Container>
          <StyledInput
            type="text"
            placeholder="Please enter your title"
            value={title}
            onChange={onChangeTitle}
          />
          <StyledInput2
            type="text"
            placeholder="Write your tips contents"
            value={content}
            onChange={onChangeContent}
          />
          <StyledInput
            type="text"
            placeholder="Youtube link here!"
            value={video}
            onChange={onChangeVideo}
          />
          <BtnContainer>
            <CreateStudy />
            <Submit type="submit">registration</Submit>
          </BtnContainer>
        </Container>
      </form>
    </>
  );
};

export default S_write;

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

const Container = styled.form`
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
  display: flex;
  justify-content: space-between;
  width: 40vw;
  margin-top: 3vh;
`;

const Submit = styled.button`
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
