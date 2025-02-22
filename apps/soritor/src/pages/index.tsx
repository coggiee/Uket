import { Button } from "@uket/ui/components/ui/button";

import DynamicMetaTag from "@/components/DynamicMetaTag";
import Nav from "@/components/Nav";
import AuthRequiredModalButton from "@/components/AuthRequiredModalButton";

import { Link } from "@/router";

import Image from "@/components/Image";

import LandingBgImage from "/landingBg.png";

const MainPage = () => {
  return (
    <main className="relative flex h-full flex-col items-center justify-evenly">
      <DynamicMetaTag
        title="Uket"
        description="Uket을 이용해 축제/공연을 웨이팅 없이 즐겨보세요!"
        image={
          "https://res.cloudinary.com/dhn3axbhj/image/upload/f_auto,q_auto/nt7u0nxxijucwh8jjdb8"
        }
        url="https://uket.site"
      />
      <div className="absolute -z-10 flex h-full w-full items-center justify-center bg-[linear-gradient(171.65deg,_#6343E1_5.82%,_#000000_81.67%)]">
        <Image
          src={LandingBgImage}
          alt="landing image"
          width={800}
          className="bg-contain bg-center bg-no-repeat"
        />
      </div>
      <header className="sticky left-0 top-0 z-10 w-full">
        <Nav />
      </header>
      <main className="container flex h-full w-full flex-col justify-evenly">
        <section className="mt-10 flex w-full grow flex-col items-center gap-5">
          <h1 className="text-center text-3xl font-bold text-white">
            <p>당신을 위한 공연 감상,</p>
            <p>기다림 없이 UKET</p>
          </h1>
        </section>
        <section className="mb-5 flex w-full flex-col items-center justify-center gap-2">
          <Link to="/select-univ" className="block w-full text-center">
            <Button
              variant="secondary"
              className="w-full rounded-xl bg-white p-7 text-base font-bold text-black hover:bg-slate-200 sm:w-80"
            >
              공연 예매하기
            </Button>
          </Link>
          <AuthRequiredModalButton
            title="내 티켓 확인하기"
            path="/ticket-list"
            className="w-full rounded-xl border border-white bg-black p-7 text-base text-white sm:w-80"
          />
        </section>
      </main>
    </main>
  );
};

export default MainPage;
