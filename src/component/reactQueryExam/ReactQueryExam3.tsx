import axios from 'axios';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

type Post = {
  id: number;
  title: string;
  author: string;
  description: string;
};

type User = {
  nickname: string;
  email: string;
  postid: number;
};

const getPost = async ({ queryKey }: QueryFunctionContext) => {
  const { data } = await axios.get<Post>(`http://localhost:8888/all/test1/${queryKey[1]}`);
  return data;
};

const getUser = async ({ queryKey }: QueryFunctionContext) => {
  const { data } = await axios.get<User>(`http://localhost:8888/all/test2/${queryKey[1]}`);
  return data;
};

const ReactQueryExam3 = () => {
  const { data: user } = useQuery(['user', 'kkiri@example.com'], getUser);

  const { data: post } = useQuery(['post', user?.postid], getPost, {
    enabled: !!user?.postid,
  });

  console.log({ user });
  console.log({ post });

  return <div>ReactQueryExam3</div>;
};

export default ReactQueryExam3;
