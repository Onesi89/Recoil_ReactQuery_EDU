/* eslint-disable no-nested-ternary */
import axios from 'axios';
import React from 'react';
import { QueryFunctionContext, useQueryClient, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
}

const getPost = async ({ queryKey }: QueryFunctionContext) => {
  const { data } = await axios.get<Post>(`http://localhost:8888/all/test1/${queryKey[1]}`);
  return data;
};

const ReactQueryExam4 = () => {
  const queryClient = useQueryClient();

  const { id } = useParams();
  const { data: post, isLoading } = useQuery<Post, Error>(['post', id], getPost, {
    initialData: () => {
      const posts = queryClient.getQueryData<Post[]>('posts');
      const post1 = id ? posts?.find((list) => list.id === +id) : null;
      console.log(posts);
      if (!post1) {
        return undefined;
      }
      return post1;
    },
  });

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : post ? (
        <>
          <div>id: {post.id}</div>
          <div>제목: {post.title}</div>
          <div>작성자: {post.author}</div>
          <div>내용: {post.description}</div>
        </>
      ) : null}
    </div>
  );
};

export default ReactQueryExam4;
