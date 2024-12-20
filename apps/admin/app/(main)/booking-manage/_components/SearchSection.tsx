import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";
import { Input } from "@ui/components/ui/input";

interface SearchSectionProps {
  handleTicketSearch: (type: string, value: string) => void;
}

function SearchSection(props: SearchSectionProps) {
  const { handleTicketSearch } = props;

  const [type, setType] = useState("PHONE_NUMBER");
  const [inputValue, setInputValue] = useState("");

  const handleIconClick = () => {
    handleTicketSearch(type, inputValue);
    setInputValue("");
  };

  return (
    <section
      className="flex"
      style={{
        boxShadow: "1px 1px 10px 0px #0000000F",
      }}
    >
      <Select defaultValue="PHONE_NUMBER" onValueChange={setType}>
        <SelectTrigger className="bg-formInput min-w-48 gap-2 rounded-l-lg text-black">
          <SelectValue placeholder="전화번호 뒷자리" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PHONE_NUMBER">전화번호 뒷자리</SelectItem>
          <SelectItem value="USER_NAME">입금자명</SelectItem>
          <SelectItem value="SHOW_DATE">티켓 날짜(YY.MM.DD)</SelectItem>
          <SelectItem value="RESERVATION_USER_TYPE">사용자 구분</SelectItem>
          <SelectItem value="STATUS">티켓 상태</SelectItem>
        </SelectContent>
      </Select>
      <Input
        isIcon
        iconClick={handleIconClick}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        className="w-44 rounded-none rounded-r-lg border-none ring-offset-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </section>
  );
}

export default SearchSection;
