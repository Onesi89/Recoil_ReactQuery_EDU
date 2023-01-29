import React from 'react';
import { useQuery } from 'react-query';

const ReactQueryExam1 = () => {
  const { isLoading, isError, data, error } = useQuery('repodata', () =>
    fetch('https://api.github.com/repos/tannerlinsley/react-query').then((res) => res.json())
  );
  const errorMsg: any = error;

  if (isLoading) return <>Lodading...</>;

  if (isError) return <>`An error has occureed: ${errorMsg.message}`</>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong> <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
};

export default ReactQueryExam1;
