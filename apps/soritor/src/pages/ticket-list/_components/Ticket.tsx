import { lazy } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@uket/ui/components/ui/dialog";
import { Card, CardContent } from "@uket/ui/components/ui/card";
import { AspectRatio } from "@uket/ui/components/ui/aspect-ratio";
import { TicketItem } from "@uket/api/types/ticket";

import Indicator from "@/components/Indicator";
import Image from "@/components/Image";


import TicketHeader from "./TicketHeader";
import TicketDetail from "./TicketDetail";
import GridItem from "./GridItem";

const TicketModal = lazy(() => import("./TicketModal"));
const ConfirmModal = lazy(() => import("./ConfirmModal"));

interface TicketProps {
  ticket: TicketItem;
}

const Ticket = (props: TicketProps) => {
  const {
    ticket: {
      userName,
      showDate,
      enterStartTime,
      enterEndTime,
      showLocation,
      universityName,
      ticketStatus,
      ticketNo,
      eventName,
      ticketId,
      backgroundImageUrl,
    },
  } = props;

  const isTicketCancelAvailable =
    ticketStatus === "입금 확인중" || ticketStatus === "예매 완료";

  return (
    <Dialog>
      <DialogTrigger className="text-start">
        <Card className="border-none bg-transparent shadow-none">
          <CardContent className="flex flex-col divide-y divide-dashed p-0">
            <section className="flex basis-3/4 flex-col overflow-hidden rounded-b-3xl rounded-t-xl bg-white shadow-xl">
              <header className="relative">
                <AspectRatio ratio={16 / 9}>
                  {backgroundImageUrl ? (
                    <Image
                      className="h-full w-full object-cover"
                      src={backgroundImageUrl}
                      alt="ticket-image"
                    />
                  ) : (
                    <div className="bg-gray-100 h-full w-full"></div>
                  )}
                </AspectRatio>
                <Indicator
                  variant={ticketStatus}
                  title={ticketStatus}
                  rounded
                  className="left-3 top-3"
                />
              </header>
              <main className="container flex grow flex-col justify-around gap-3 py-5">
                <TicketHeader
                  universityName={universityName}
                  eventName={eventName}
                />
                <TicketDetail
                  userName={userName}
                  showDate={showDate}
                  enterTime={`${enterStartTime} ~ ${enterEndTime}`}
                  showLocation={showLocation}
                />
              </main>
            </section>
            <footer className="flex basis-1/4 rounded-b-xl rounded-t-3xl bg-white pb-2 pl-7 pt-5 shadow-md">
              <aside className="flex flex-col items-start justify-between">
                <div className="w-32 truncate">
                  <GridItem title="일련번호" content={ticketNo} isTicketNo />
                </div>
                {isTicketCancelAvailable ? (
                  <ConfirmModal ticketId={ticketId} />
                ) : (
                  <div className="py-5"></div>
                )}
              </aside>
            </footer>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-xs rounded-lg p-0 sm:max-w-md">
        <TicketModal ticket={props.ticket} />
      </DialogContent>
    </Dialog>
  );
};

export default Ticket;
