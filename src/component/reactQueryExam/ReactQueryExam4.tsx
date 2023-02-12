/* eslint-disable no-nested-ternary */
import axios from 'axios';
import React, { useEffect } from 'react';
import { QueryFunctionContext, useQueryClient, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
}

interface CustomError extends Error {
  code: string;
}

export type { CustomError };

const getPost = async ({ queryKey }: QueryFunctionContext) => {
  const { data } = await axios.get<Post>(`http://localhost:8888/all/test1/${queryKey[1]}`);
  return data;
};

const ReactQueryExam4 = () => {
  console.log('랜더시작');
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data: post } = useQuery<Post, CustomError>(['post', id], getPost, {
    // initialData: () => {
    //   const posts = queryClient.getQueryData<Post[]>('posts');
    //   const post1 = id ? posts?.find((list) => list.id === +id) : null;
    //   if (!post1) {
    //     return undefined;
    //   }
    //   return post1;
    // },
    suspense: true,
    retry: false,
    staleTime: 0,
    refetchOnWindowFocus: false,
    useErrorBoundary: true,
    refetchOnReconnect: 'always',
    refetchOnMount: 'always',
  });

  // suspense로 넘어가게 되면 background에서 실행하게 된다.
  // 이 때 콘솔 출력 한번되고.
  // 그후에는 state가 바뀌어서 다시 랜더링된다.
  // 이 때 다시 콘솔 출력이 된다.
  // console.log('양');

  if (post?.id === 1) {
    throw Object.assign(new Error(), { code: 100 });
  }

  return (
    <div>
      {post ? (
        <>
          <div>id: {post.id}</div>
          <div>제목: {post.title}</div>
          <div>작성자: {post.author}</div>
          <div>내용: {post.description}</div>
        </>
      ) : (
        <div>결과가 없습니다.</div>
      )}
    </div>
  );
};

export default ReactQueryExam4;
