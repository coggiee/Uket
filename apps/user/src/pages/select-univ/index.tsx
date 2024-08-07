import { FallbackProps } from "react-error-boundary";
import { Suspense } from "react";
import { cn } from "@uket/ui/lib/utils";
import { Button } from "@uket/ui/components/ui/button";

import UnivListErrorFallback from "@/components/fallback/UnivListErrorFallback";
import RetryErrorBoundary from "@/components/error/RetryErrorBoundary";

import { useSelectUniversity } from "@/hooks/useSelectUniversity";

import UnivList from "./_components/UnivList";
import UnivListFallback from "./_components/fallback/UnivListFallback";

const SelectUnivPage = () => {
  const { selectedUnivId, handleSelectUniv, handleNavigate } =
    useSelectUniversity();

  return (
    <main className="relative flex h-full flex-col items-center justify-evenly bg-[#F2F2F2]">
      <main className="container mb-10 mt-7 flex h-full w-full flex-col gap-10 overflow-y-scroll">
        <header className="text-[27px] font-bold">
          <p>참여하고자 하는</p>
          <p>축제가 열리는</p>
          <p>학교를 선택해 주세요.</p>
        </header>
        <section className="grow">
          <RetryErrorBoundary
            fallbackComponent={(props: FallbackProps) => (
              <UnivListErrorFallback {...props} />
            )}
          >
            <Suspense fallback={<UnivListFallback />}>
              <UnivList
                selectedUnivId={selectedUnivId}
                onSelect={handleSelectUniv}
              />
            </Suspense>
          </RetryErrorBoundary>
        </section>
      </main>
      <footer className="container sticky bottom-5 flex w-full flex-col items-center justify-center">
        <Button
          className={cn(
            "bg-formInput text-buttonDisabled hover:bg-formInput w-full rounded-xl p-6 text-base font-black sm:w-80",
            selectedUnivId && "bg-brand hover:bg-brand/80 text-white",
          )}
          onClick={handleNavigate}
        >
          다음으로
        </Button>
      </footer>
    </main>
  );
};

export default SelectUnivPage;
