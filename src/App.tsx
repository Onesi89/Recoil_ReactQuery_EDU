/* eslint-disable import/no-extraneous-dependencies */
import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import TodoList from './component/todoList/TodoList';
import ReactQueryExam1 from './component/reactQueryExam/reactQueryExam1';
import ReactQueryExam2 from './component/reactQueryExam/ReactQueryExam2';
import ReactQueryExam3 from './component/reactQueryExam/ReactQueryExam3';
import ReactQueryExam4 from './component/reactQueryExam/ReactQueryExam4';
import ReactQueryLayout from './component/reactQueryExam/ReactQueryLayout';
import ModalProvider from './common/modal/ModalProvider';
import ModalRecoil from './common/modal/ModalRecoil';
import EduUseMutation from './component/useMutationExam/EduUseMutation';
import EduUseMutationLayout from './component/useMutationExam/EduUseMutationLayout';


declare module 'react-query/types/react/QueryClientProvider' {
  interface QueryClientProviderProps {
    children?: React.ReactNode;
  }
}
function App() {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      {/* useUseContext  */}
      {/* <ModalProvider> */}
      {/*  useUseRecoil  */}
      <ModalRecoil>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              {/* <TodoList /> */}
              {/* <Route path="/" element={<ReactQueryExam2 />}></Route>
              <Route path="/1" element={<ReactQueryExam3 />}></Route> */}
              <Route path="/:id" element={<ReactQueryLayout />}></Route>
              <Route path="/" element={<EduUseMutationLayout />}></Route>
            </Routes>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
        </QueryClientProvider>
      </ModalRecoil>
      {/* </ModalProvider> */}
    </RecoilRoot>
  );
}

export default App;
