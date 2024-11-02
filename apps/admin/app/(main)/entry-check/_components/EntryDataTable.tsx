import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/components/ui/table";
import { Button } from "@ui/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { TICKET_STATUS } from "@/constants/ticketStatus";

import { Content } from "@/types/entryType";
import { cn } from "@ui/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "@ui/components/ui/icon";

export type Entry = Content;

export const columns: ColumnDef<Entry>[] = [
  {
    accessorKey: "enterTime",
    header: () => <div>입장 시간</div>,
  },
  {
    accessorKey: "name",
    header: "입금자명",
  },
  {
    accessorKey: "ticketDate",
    header: "티켓 날짜",
  },
  {
    accessorKey: "phoneNumber",
    header: "전화번호",
  },
  {
    accessorKey: "ticketStatus",
    header: () => <div>결과</div>,
    cell: ({ row }) => {
      const ticketStatus = TICKET_STATUS.find(
        item => item.value === row.getValue("ticketStatus"),
      );

      return (
        <div className="rounded-lg bg-[#F0EDFD] py-1 text-sm font-medium text-[#7250FD]">
          {ticketStatus!.text}
        </div>
      );
    },
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;
  pageCount: number;
}

function EntryDataTable<TData, TValue>({
  columns,
  data,
  pageIndex,
  setPageIndex,
  pageCount,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination: {
        pageIndex,
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  const [pageGroup, setPageGroup] = useState(0);
  const maxButtons = 2;

  const handleFirst = () => {
    setPageGroup(0);
    setPageIndex(1);
  };

  const handleLast = () => {
    const lastGroup = Math.floor((pageCount - 1) / maxButtons); // 마지막 그룹 번호 계산
    setPageGroup(lastGroup);
    setPageIndex(pageCount); // 마지막 페이지 그룹의 마지막 페이지 선택
  };

  const handleNextGroup = () => {
    if ((pageGroup + 1) * maxButtons < pageCount) {
      setPageGroup(prev => prev + 1);
      setPageIndex((pageGroup + 1) * maxButtons + 1); // 새로운 그룹의 첫 페이지 선택
    }
  };

  const handlePrevGroup = () => {
    if (pageGroup > 0) {
      setPageGroup(prev => prev - 1);
      setPageIndex(Math.max(pageGroup * maxButtons, 1)); // 이전 그룹의 마지막 페이지 선택
    }
  };
  // 현재 페이지 그룹에 표시할 페이지 번호 계산
  const startPage = pageGroup * maxButtons;
  const endPage = Math.min(startPage + maxButtons, pageCount);
  const pageNumbers = Array.from(
    { length: endPage - startPage },
    (_, index) => startPage + index,
  );

  return (
    <div className="relative">
      <main className="flex grow flex-col gap-8 rounded-lg bg-white shadow-sm">
        <section className="px-3 pb-6 pr-14 pt-3">
          <Table>
            <TableHeader className="[&_tr]:border-none">
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead
                        key={header.id}
                        className="text-center text-sm font-normal text-[#8989A1]"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-none"
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell
                        key={cell.id}
                        className="text-center text-base font-medium text-[#5E5E6E]"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>
      </main>
      <div className="mt-4 flex items-center justify-center space-x-6">
        {pageGroup > 0 && (
          <div className="space-x-2">
            <Button
              variant="ghost"
              onClick={handleFirst}
              className="p-0 text-sm font-light text-[#5E5E6E] hover:bg-inherit"
            >
              <ChevronsLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              onClick={handlePrevGroup}
              className="p-0 text-sm font-light text-[#5E5E6E] hover:bg-inherit"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
        {pageNumbers.map(pageNum => (
          <Button
            key={pageNum}
            variant="ghost"
            onClick={() => setPageIndex(pageNum + 1)}
            className={cn(
              "p-0 text-sm font-light text-[#5E5E6E] hover:bg-inherit",
              pageIndex === pageNum + 1 && `font-semibold text-[#17171B]`,
            )}
          >
            {pageNum + 1}
          </Button>
        ))}
        {endPage < pageCount && (
          <div className="space-x-2">
            <Button
              variant="ghost"
              onClick={handleNextGroup}
              className="p-0 text-sm font-light text-[#5E5E6E] hover:bg-inherit"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              onClick={handleLast}
              className="p-0 text-sm font-light text-[#5E5E6E]  hover:bg-inherit"
            >
              <ChevronsRightIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EntryDataTable;
