import { useState } from "react";
import { Sheet, SheetContent, SheetHeader } from "@uket/ui/components/ui/sheet";
import { Input } from "@uket/ui/components/ui/input";
import { CircleX, Search } from "@uket/ui/components/ui/icon";

interface PerformerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  performers: string[];
  onSelectPerformer: (performer: string) => void;
}

const PerformerSheet = (props: PerformerSheetProps) => {
  const { isOpen, onClose, performers, onSelectPerformer } = props;

  const [inputValue, setInputValue] = useState("");

  const filteredPerformers = [...performers]
    .filter(name =>
      inputValue.trim()
        ? name.toLowerCase().includes(inputValue.toLowerCase())
        : true,
    )
    .sort((a, b) => a.localeCompare(b));

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side={"bottom"}
        className="mx-auto max-w-[500px] rounded-t-2xl pt-5"
      >
        <SheetHeader className="w-full">
          <p className="px-8 text-start text-xs text-slate-500">공연자명</p>
          <div className="border-brand flex w-full items-center justify-between border-b-[1px] px-1 pb-1">
            <Search className="h-5 w-5 text-gray-500" />
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="공연자명을 입력하세요."
              className="border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <CircleX
              className="h-5 w-5 text-gray-500"
              onClick={() => {
                setInputValue("");
                onClose();
              }}
            />
          </div>
        </SheetHeader>
        <section className="h-40 overflow-y-auto py-4">
          {filteredPerformers.length > 0 ? (
            <ul>
              {filteredPerformers.map((performer, index) => (
                <li
                  key={index}
                  className="mb-1 rounded-lg px-8 py-2 text-sm hover:cursor-pointer hover:bg-slate-100"
                  onClick={() => onSelectPerformer(performer)}
                >
                  {performer}
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-8 text-sm text-gray-500">검색 결과가 없습니다.</p>
          )}
        </section>
      </SheetContent>
    </Sheet>
  );
};

export default PerformerSheet;
