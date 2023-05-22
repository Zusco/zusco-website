import ListToggler from "components/general/listToggler";
import { useMemo, useState } from "react";

const useListToggle = ({ disabled = false, list, maxCount = 5 }) => {
  const [fullListDisplayed, setfullListDisplayed] = useState(false);

  const handleListToggle = (e) => {
    setfullListDisplayed((prev) => !prev);
  };

  const displayedList = useMemo(
    () => (fullListDisplayed ? list : list?.slice(0, maxCount)),
    [fullListDisplayed, list]
  );
  const renderListToggler = () => (
    <ListToggler
      fullListDisplayed={fullListDisplayed}
      onToggle={handleListToggle}
      disabled={disabled}
      showToggler={list?.length > maxCount}
    />
  );
  return {
    fullListDisplayed,
    renderListToggler,
    displayedList,
  };
};

export default useListToggle;
