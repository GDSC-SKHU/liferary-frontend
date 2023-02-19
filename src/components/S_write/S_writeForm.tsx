import axios from 'axios';
import router from 'next/router';
import { ChangeEvent, FormEvent, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import CreateStudy from './CreateStudy';

const S_write = () => {
  // const [write, setWrite] = useState<string>('');

  // const handleTitle = (e: { target: { value: SetStateAction<string> } }) => {
  //   setWrite(e.target.value);
  // };

  // const handleContent = (e: { target: { value: SetStateAction<string> } }) => {
  //   setWrite(e.target.value);
  // };

  // const handleSubmit = (e: any) => {
  //   console.log(write);
  //   router.push('/share');
  // };

  const [title, setTitle] = useState<string>('merong');

  const [content, setContent] = useState<string>('merong2');

  const [category, setCategory] = useState<string>('merong');

  const [name, setName] = useState<string>('merong2');

  const [video, setVideo] = useState<string>('merong2');

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
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
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            withCredentials: true,
          },
        }
      )
      // post를 보냈을 때 return 값을 저장할 친구를 생성하는 코드 짜자

      .then((res) => {
        console.log(res.data);
        console.log(res.data.data.accessToken);
        setTitle('');
        setContent('');

        // router.push({
        //   pathname: '/share',
        //   query: {
        //     title: title,
        //     content: content,
        //     name: name,
        //     category: category,
        //     video: video,
        //   },
        // });
      })
      // const id: number = res.data.data.id;

      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <StyledForm onSubmit={onSubmit}>
        <StyledInput
          type="text"
          placeholder="Please enter your title"
          onChange={onChangeTitle}
        />
        <StyledInput2
          type="text"
          placeholder="Write your tips contents"
          onChange={onChangeContent}
        />
        <StyledInput2
          type="text"
          placeholder="Write your tips contents"
          onChange={onChangeCategory}
        />
        <StyledInput2
          type="text"
          placeholder="Write your tips contents"
          onChange={onChangeName}
        />
        <StyledInput2
          type="text"
          placeholder="Write your tips contents"
          onChange={onChangeVideo}
        />
        <ImgInput type="file" accept="image/*" />
        <BtnContainer>
          <CreateStudy />
          <Submit>youtube</Submit>
          <Submit type="submit">registration</Submit>
        </BtnContainer>
      </StyledForm>
    </>
  );
};

export default S_write;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;
`;

const StyledInput = styled.input`
  width: 40vw;
  height: 6vh;
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

const ImgInput = styled.input`
  float: right;
  margin-top: 3vh;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40vw;
  margin-top: 5vh;
`;

const Submit = styled.button`
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
