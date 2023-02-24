import React from "react";

import { ZuscoIcon } from "assets/icons";
import CircleLoader from "components/general/circleLoader/circleLoader";
import Modal from "../modal/modal/modal";
const Loader = () => {
  return (
    <Modal noPadding bodyClass="" size="md" active={true}>
      <div className="w-full flex justify-center items-center h-[100px]">
        <CircleLoader blue icon={<ZuscoIcon />} />
      </div>
    </Modal>
  );
};

export default Loader;
