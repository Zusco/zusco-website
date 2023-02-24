import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Input from "components/general/input/input";
import  SearchIcon from "assets/icons/search.svg";
import Overview from "./overview";
import ChatSection from "./chatSection";

const MessagesHome = observer(() => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex flex-col justify-start items-start h-full w-full">
      <div className="flex flex-col lg:flex-row justify-start items-start h-full w-full mb-24 relative">
        {/* Left column */}

        <div className="hidden md:flex flex-col basis-[100%] md:basis-[40%] justify-start items-start h-full w-full space-y-7">
          <div className="flex flex-row justify-start items-center h-fit  w-full space-x-4 bg-white p-4 border-b-1/2 border-grey-border">
            <h3 className="text-lg text-black regular-font">Messages</h3>
            <Input
              onChangeFunc={(e) => setSearchQuery(e)}
              placeholder="Search Messages"
              name="search"
              value={searchQuery}
              icon={<SearchIcon />}
              leftIcon
            />
          </div>
          <div className="flex flex-col justify-start items-start pl-3 w-full">
            <Overview />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col basis-[100%] w-full md:basis-[60%] md:w-[50%] fixed right-0 h-[calc(100%-120px)] bg-white justify-start items-center space-y-7 border-l-1/2 border-grey-border">
          <ChatSection />
        </div>
      </div>
    </div>
  );
});

export default MessagesHome;
