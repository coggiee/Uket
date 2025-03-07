import { useLocation } from "react-router-dom";
import { cn } from "@uket/ui/lib/utils";
import { Button } from "@uket/ui/components/ui/button";
import { useQueryUserInfo } from "@uket/api/queries/user";

import { useNavigate } from "@/router";

import Image from "./Image";


const Profile = () => {
  const { data: userInfo } = useQueryUserInfo();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const ladingPageTextColor = pathname === "/" && "text-white";

  return (
    <>
      {userInfo && (
        <Button
          variant="link"
          className={cn("p-0 pt-1 font-bold", ladingPageTextColor)}
          onClick={() => {
            navigate("/myinfo");
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative h-6 w-6">
              <Image
                src={userInfo.profileImage}
                alt="프로필 이미지"
                width={100}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <p className="font-bold">{userInfo.depositorName}</p>
          </div>
        </Button>
      )}
      {!userInfo && (
        <Button
          variant="link"
          className={cn("p-0 pt-1 font-bold", ladingPageTextColor)}
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인
        </Button>
      )}
    </>
  );
};

export default Profile;
