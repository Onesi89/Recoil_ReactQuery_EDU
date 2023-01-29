import axios from 'axios';
import React, { Fragment } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

type Post = {
  id: number;
  title: string;
  author: string;
  description: string;
};

const getPosts = async () => {
  const { data } = await axios.get<Post[]>('http://localhost:8888/all/test');
  return data;
};

const ReactQueryExam2 = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<Post[], Error>('posts', getPosts, {
    staleTime: 10000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div>
        <ul>
          {posts?.map((post) => {
            return (
              <li key={post.id}>
                <Link to={`/2/${post.id}`}>
                  <div>id: {post.id}</div>
                  <div>제목: {post.title}</div>
                  <div>작성자: {post.author}</div>
                  <div>내용: {post.description.slice(0, 100)}...</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ReactQueryExam2;
