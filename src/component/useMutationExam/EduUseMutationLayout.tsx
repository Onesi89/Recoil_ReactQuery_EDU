import React, { Suspense } from 'react'
import { useQueryErrorResetBoundary } from 'react-query';
import APIErrorBoundary from '../../suspense_loading/APIErrorBoundary';
import GlobalErrorBoundary from '../../suspense_loading/GlobalErrorBoundary';
import LodingPage from '../../suspense_loading/LodingPage';
import EduUseMutation from './EduUseMutation';

const EduUseMutationLayout = () => {
    const { reset } = useQueryErrorResetBoundary();
    return (
      <GlobalErrorBoundary onReset={reset}>
        <APIErrorBoundary>
          <Suspense fallback={<LodingPage />}>
            <EduUseMutation />
          </Suspense>
         </APIErrorBoundary>
       </GlobalErrorBoundary>
    );
}

export default EduUseMutationLayout