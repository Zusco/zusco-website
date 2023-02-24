import React from "react";
import ReactSelect from "react-select";
import AsyncSelect from "react-select/async";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import PropTypes from "prop-types";

import  Explore from "assets/icons/landing/explore-icon.svg";
import  Search from "assets/icons/search.svg";

const Select = ({
  label,
  options,
  name,
  onChange,
  async,
  labelControl,
  address,
  addressValue,
  addressPlaceholder,
  searchBar,
  showMenu,
  searchType,
  ...rest
}) => {
  const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  const classNames = `w-[calc(100%-2px)] h-fit mx-[1px] ${
    searchBar && searchType !== "search"
      ? "text-xl regular-font"
      : "text-base light-font"
  } border-slate-300 placeholder-slate-400 !placeholder:text-grey cursor-pointer`;
  const styles = {
    control: (base, state) => ({
      ...base,
      fontSize: searchBar && searchType !== "search" ? "20px" : "16px",
      height:
        searchType === "explore"
          ? "85px"
          : searchType === "search"
          ? "52px"
          : "44px",
      boxShadow: searchBar
        ? "5px 10px 25px 4px rgba(50, 106, 217, 0.12)"
        : "none",
      borderRadius: searchBar ? 0 : 8,
      border: searchBar ? "none" : "1px solid #E1E1E1 !important",
      borderBottom: searchBar && "1px solid #000000 !important",
      backgroundColor: "white",
      borderColor: "transparent",
      cursor: "pointer",
      paddingLeft: searchBar ? "23px" : "inherit",
      "&:hover": {
        background: "#efefef",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    placeholder: (base) => ({
      ...base,
      color: addressValue ? "#000000" : "#686B6F",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "99%",
    }),
    menu: (base) => ({
      ...base,

      display: showMenu ? "inherit" : "none !important",
      backgroundColor: "white",
      zIndex: 20,
      cursor: "pointer",
      border: "1px solid #E1E1E1",
      top:
        searchType === "explore"
          ? "85px"
          : searchType === "search"
          ? "58px"
          : "40px",
      borderRadius: searchBar ? 0 : 8,
    }),
    option: (base, state) => ({
      ...base,
      fontSize:
        searchType === "explore"
          ? "20px"
          : searchType === "search"
          ? "16px"
          : "16px",
      textAlign: "left",
      backgroundColor: (state.isFocused || state.isSelected) && "#F5F6FA",
      cursor: "pointer",
      color: "#000",
    }),
  };
  return (
    <div className="w-full searchable-select-component relative">
      {searchType === "explore" ? (
        <Explore className="absolute my-auto top-0 bottom-0 left-3 z-20" />
      ) : searchType === "search" ? (
        <Search className="absolute my-auto top-0 bottom-0 left-3 z-20" />
      ) : null}
      {label && (
        <div className="flex justify-between">
          <label className="general-input-label text-grey-label text-sm">
            {label}
          </label>
          {labelControl || null}
        </div>
      )}
      {async ? (
        <AsyncSelect
          cacheOptions
          options={options}
          onChange={(selected) => onChange(selected, { name, value: selected })}
          styles={styles}
          className={classNames}
          {...rest}
        ></AsyncSelect>
      ) : address ? (
        <GooglePlacesAutocomplete
          apiKey={GOOGLE_MAP_API_KEY}
          selectProps={{
            address: addressValue,
            onChange: onChange,

            styles: styles,
            options: options,
            placeholder: addressPlaceholder,
            componentRestrictions: {
              country: "ng",
            },
          }}
        />
      ) : (
        <ReactSelect
          options={options}
          onChange={(selected) => onChange(selected, { name, value: selected })}
          styles={styles}
          className={classNames}
          {...rest}
        ></ReactSelect>
      )}
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  async: PropTypes.bool,
  labelControl: PropTypes.any,
  address: PropTypes.bool,
  addressValue: PropTypes.any,
  addressPlaceholder: PropTypes.string,
  searchBar: PropTypes.bool,
  showMenu: PropTypes.bool,
  searchType: PropTypes.string,
};

export default Select;
