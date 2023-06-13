import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

import ListingStore from "store/listing";
import Button from "components/general/button/button";
import Select from "components/general/input/select";

const SearchBar = observer(({ ...rest }) => {
  const router = useRouter();
  const { searchListings } = ListingStore;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const goToListing = () => {
    if (searchQuery?.value) {
      router.push(`listing/${searchQuery?.value}`);
    }
  };

  const getListings = async (value) => {
    setSearchValue(value || "");
    try {
      let listings = await searchListings({ search_query: value }, "1");
      listings = listings?.map(({ id, name, address, ...item }) => {
        return { value: id, label: `${name}, ${address}`, ...item };
      });
      return new Promise((resolve) => {
        return resolve(listings);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full sm:px-6 md:px-0 md:w-[85%] h-full rounded   ">
      <div
        className={`hidden ${
          searchValue?.length > 1 ? "search-bar-open" : "search-bar-closed"
        } w-full sm:flex flex-row gap-5 items-center justify-center`}
      >
        <Select
          async
          value={searchQuery}
          placeholder="Where would you like to stay?"
          loadOptions={getListings}
          onChange={(val) => {
            setSearchQuery(val);
          }}
          classNamePrefix="search_bar"
          showMenu={searchValue}
          searchBar
          searchType="explore"
          {...rest}
        />
        <Button
          blueBg
          icon={<BiSearch size={30} />}
          btnClass="h-[88px]  px-7 "
          className="shadow-btn"
          onClick={goToListing}
        />
      </div>

      <div
        className={`${
          searchValue?.length > 1 ? "search-bar-open" : "search-bar-closed"
        } w-full sm:hidden flex flex-col gap-5  items-center justify-center`}
      >
        <Select
          async
          value={searchQuery}
          placeholder="Where would you like to stay?"
          loadOptions={getListings}
          onChange={(val) => {
            setSearchQuery(val);
          }}
          classNamePrefix="search_bar"
          showMenu={searchValue}
          searchBar
          searchType="search"
          {...rest}
        />
        <Button
          blueBg
          icon={<BiSearch size={30} />}
          className="shadow-btn"
          onClick={goToListing}
          text="Go"
        />
      </div>
    </div>
  );
});
SearchBar.propTypes = {
  rest: PropTypes.any,
};
export default SearchBar;
