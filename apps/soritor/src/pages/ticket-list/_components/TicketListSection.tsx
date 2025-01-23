import { cn } from "@uket/ui/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@uket/ui/components/ui/carousel";
import { useQueryUserTicketList } from "@uket/api/queries/user";

import Ticket from "./Ticket";

const TicketListSection = () => {
  const { data: myTicketList } = useQueryUserTicketList();

  return (
    <Carousel className="w-full max-w-full" opts={{ loop: true }}>
      <CarouselContent
        className={cn(
          "-ml-1",
          myTicketList.length === 1 && "flex justify-center",
          myTicketList.length >= 2 && "mx-3 sm:ml-0",
        )}
      >
        {myTicketList.length > 0 &&
          myTicketList.map(ticket => (
            <CarouselItem
              key={ticket.ticketId}
              className="basis-11/12 justify-items-center pb-2 pl-2"
            >
              <div className="p-1">
                <Ticket ticket={ticket} />
              </div>
            </CarouselItem>
          ))}
        {myTicketList.length === 0 && (
          <div className="container flex h-60 items-center justify-center text-center">
            <div className="text-lg font-bold text-gray-500">
              예매한 티켓이 없어요.
            </div>
          </div>
        )}
      </CarouselContent>
    </Carousel>
  );
};

export default TicketListSection;
