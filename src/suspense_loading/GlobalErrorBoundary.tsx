import React, { Component, ErrorInfo, ReactNode } from 'react';
import ModalRecoil from '../common/modal/ModalRecoil';
import { CustomError } from '../component/reactQueryExam/ReactQueryExam4';
import ServerErrorPage from './ServerErrorPage';

/**
 * 서버 점검, 유지보수 등 사용되는 Error boundary
 */
interface Props {
  children?: ReactNode;
  onReset?: () => void;
}

interface State {
  shouldHandleError: boolean;
  onReset?: () => void;
}

class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    shouldHandleError: false,
    onReset: this.props.onReset,
  };

  public static getDerivedStateFromError(error: CustomError): State {
    return {
      shouldHandleError: true,
    };
  }

  resetErrorBoundary = () => {
    // ErrorBoundary state를 초기화
    this.setState({ shouldHandleError: false });

    // useQuery reset
    if (this.state.onReset) {
      this.state?.onReset();
    }
  };

  // // eslint-disable-next-line class-methods-use-this
  // public componentDidCatch(error: CustomError, errorInfo: ErrorInfo) {}

  public render() {
    if (this.state.shouldHandleError) {
      return (
        <>
          <ServerErrorPage onClickRetry={this.resetErrorBoundary} />
        </>
      );
    }
    console.log('shouldHandleError', this.state.shouldHandleError);
    return this.props.children;
  }
}

export default GlobalErrorBoundary;
