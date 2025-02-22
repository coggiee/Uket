import { ActivityComponentType } from "@stackflow/react";
import { AppScreen } from "@stackflow/plugin-basic-ui";

import NextStepButton from "./NextStepButton";
import {
  Activity,
  ActivityContent,
  ActivityFooter,
  ActivityHeader,
} from "./Activity";

import WelecomeImage from "/signupComplete.png";

import Image from "@/components/Image";

const CompleteActivity: ActivityComponentType = () => {
  return (
    <AppScreen
      appBar={{
        border: false,
        backButton: {
          renderIcon: () => <div className="hidden"></div>,
          onClick: e => e.preventDefault(),
        },
      }}
    >
      <Activity>
        <ActivityContent>
          <ActivityHeader className="relative grow items-center justify-center">
            <h1 className="text-lg text-[#5E5E6E]">
              회원가입이 완료되었습니다.
            </h1>
            <h2 className="text-center text-2xl font-black">
              <p>이제 공연 티켓을</p>
              <p>예매하러 가볼까요?</p>
            </h2>
            <Image
              src={WelecomeImage}
              alt="가입 완료 이미지"
              className="animate-ping-dealy absolute h-full"
            />
          </ActivityHeader>
          <ActivityFooter className="z-10">
            <NextStepButton
              activityName={"MainActivity" as never}
              disabled={false}
            />
          </ActivityFooter>
        </ActivityContent>
      </Activity>
    </AppScreen>
  );
};

export default CompleteActivity;
