import { cn } from "@uket/ui/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@uket/ui/components/ui/carousel";

import { useQueryMyTicketList } from "@/hooks/queries/useQueryMyTicketList";

import Ticket from "./Ticket";

const TicketListSection = () => {
  const { data: myTicketList } = useQueryMyTicketList();

  return (
    <Carousel className="w-full max-w-full" opts={{ loop: true }}>
      <CarouselContent
        className={cn(
          "-ml-1",
          myTicketList.length === 1 && "flex justify-center",
          myTicketList.length >= 2 && "mx-3 sm:ml-0"
        )}
      >
        {myTicketList.length > 0 &&
          myTicketList.map(ticket => (
            <CarouselItem
              key={ticket.ticketId}
              className="basis-4/5 pb-2 pl-2"
            >
              <div className="p-1">
                <Ticket ticket={ticket} />
              </div>
            </CarouselItem>
          ))}
        {myTicketList.length === 0 && (
          <div className="container flex h-60 items-center justify-center text-center">
            <div className="text-lg font-bold text-gray-500">
              예매한 티켓이 없어요..!
            </div>
          </div>
        )}
      </CarouselContent>
    </Carousel>
  );
};

export default TicketListSection;
