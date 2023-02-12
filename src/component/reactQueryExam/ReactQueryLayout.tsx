import React, { Suspense } from 'react';
import { useQueryErrorResetBoundary } from 'react-query';
import APIErrorBoundary from '../../suspense_loading/APIErrorBoundary';
import GlobalErrorBoundary from '../../suspense_loading/GlobalErrorBoundary';
import LodingPage from '../../suspense_loading/LodingPage';
import ReactQueryExam4 from './ReactQueryExam4';

const ReactQueryLayout = () => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <GlobalErrorBoundary onReset={reset}>
      <APIErrorBoundary>
        <Suspense fallback={<LodingPage />}>
          <ReactQueryExam4 />
        </Suspense>
      </APIErrorBoundary>
    </GlobalErrorBoundary>
  );
};

export default ReactQueryLayout;
