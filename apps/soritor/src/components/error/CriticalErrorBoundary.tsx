import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@uket/ui/components/ui/button";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import { useNavigate } from "@/router";

import {
  ErrorContainer,
  ErrorDescription,
  ErrorHeader,
  ErrorTitle,
} from "./CustomError";

const CriticalErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const { reset } = useQueryErrorResetBoundary();
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const home = (callback: (...args: any[]) => void) => {
    navigate("/");
    callback();
  };

  return (
    <ErrorBoundary
      onReset={reset}
      FallbackComponent={({ resetErrorBoundary }) => (
        <ErrorContainer className="container h-dvh max-w-[500px] flex-col gap-10">
          <ErrorHeader className="mt-16 flex grow flex-col justify-center space-y-3 text-center">
            <ErrorTitle className="text-2xl font-black">
              <span>잠시 후 다시 시도해 주세요!</span>
            </ErrorTitle>
            <ErrorDescription className="container flex flex-col text-center">
              <span>이용에 불편을 드려 죄송합니다.</span>
              <span>
                네트워크 또는 데이터 오류로 페이지를 불러오지 못하였습니다.
              </span>
            </ErrorDescription>
          </ErrorHeader>
          <footer className="mb-10 flex w-full flex-col justify-end gap-2">
            <Button
              onClick={() => home(resetErrorBoundary)}
              className="rounded-xl border border-[#5E5E6E] bg-[#5E5E6E] py-6 text-sm font-bold hover:bg-[#757583]"
            >
              홈 화면으로
            </Button>
            <Button
              onClick={back}
              className="rounded-xl border border-[#5E5E6E] bg-white py-6 text-sm font-bold text-[#5E5E6E] hover:bg-slate-100"
            >
              이전 페이지로
            </Button>
          </footer>
        </ErrorContainer>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default CriticalErrorBoundary;
