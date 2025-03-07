import { TicketItem } from "@uket/api/types/ticket";

import GridItem from "./GridItem";

interface TicketDetailProps
  extends Pick<TicketItem, "userName" | "showDate" | "showLocation"> {
  enterTime: string;
  createdAt?: string;
  userType?: string;
}

const TicketDetail = (props: TicketDetailProps) => {
  const { userName, showDate, enterTime, showLocation, createdAt } = props;

  return (
    <section className="grid auto-rows-auto grid-cols-2 gap-4">
      <GridItem title={"예매자"} content={userName} />
      <GridItem title={"입장 날짜"} content={showDate} />
      <GridItem title={"위치(공연장)"} content={showLocation} isPlace />
      <GridItem title={"입장 시간"} content={enterTime} />
      {createdAt && (
        <>
          <GridItem title={"구매 일시"} content={createdAt} />
        </>
      )}
    </section>
  );
};

export default TicketDetail;
