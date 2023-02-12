/* eslint-disable */
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { CustomError } from '../component/reactQueryExam/ReactQueryExam4';
import APIErrorPage from './APIErrorPage';

interface Props {
  children?: ReactNode;
}

interface State {
  shouldHandleError: boolean;
  shouldRetrhow?: boolean;
  error?: Error;
}

class APIErrorBoundary extends Component<Props, State> {
  public state: State = {
    shouldHandleError: false,
    shouldRetrhow: false,
  };

  public static getDerivedStateFromError(error: CustomError): State {
    if (error.code.toString() !== '100') {
      return {
        shouldHandleError: false,
        shouldRetrhow: true,
        error,
      };
    }

    return {
      shouldHandleError: true,
      shouldRetrhow: false,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  // public componentDidCatch(error: CustomError, errorInfo: ErrorInfo) {
  //   console.log('error2');
  // }

  public render() {
    if (this.state.shouldRetrhow) {
      throw this.state.error;
    }

    if (this.state.shouldHandleError) {
      return <APIErrorPage />;
    }

    return this.props.children;
  }
}

export default APIErrorBoundary;
