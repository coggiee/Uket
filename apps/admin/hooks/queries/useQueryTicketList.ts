import { formatDate } from "@uket/util/time";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getTicketList } from "@/api/ticket";

export const useQueryTicketList = (page: number = 1, options = {}) => {
  const { data, error, refetch } = useQuery({
    queryKey: ["ticket-list", page],
    queryFn: () => getTicketList(page),
    placeholderData: keepPreviousData,
    ...options,
    select: data => {
      const timeData = data.content.map(item => {
        return {
          ...item,
          showTime: formatDate(item.showTime, "fullCompact"),
          updatedDate: formatDate(item.updatedDate, "fullCompact"),
          orderDate: formatDate(item.orderDate, "fullCompact"),
        };
      });

      return {
        ...data,
        timezoneData: timeData,
      };
    },
  });

  if (error) {
    throw error;
  }
  return { data, refetch };
};
