import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import CircleLoader from "components/general/circleLoader/circleLoader";
import BookingsStore from "pages/dashboard/bookings/store/index";
import Card1 from "components/layout/cards/Card1";
import { toJS } from "mobx";

const Content = observer(({ store }) => {
  const { loading, bookings, getBookings } = BookingsStore;

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <section className="flex flex-col gap-10 mmd:gap-5 md:max-h-[100vh] md:overflow-y-auto">
      <h3 className="text-[#211D31] text-[20px]">Previous Stays</h3>

      {!loading && (
        <div className=" flex flex-wrap gap-6 w-full justify-center">
          {bookings
            ?.filter(({ shortlet }) => !shortlet.blocked)
            .slice(0, 6)
            ?.map((data) => {
              return <Card1 key={data?.id} listing={data.shortlet} />;
            })}
        </div>
      )}

      {loading && (
        <div className="w-full md:px-[3rem] sm:px-[2rem] px-[1rem]">
          <div className="w-full flex justify-center items-center h-[100px]">
            <CircleLoader blue />
          </div>
        </div>
      )}
    </section>
  );
});

export default Content;
