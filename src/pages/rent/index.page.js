import React, { useEffect } from "react";
import LandingLayout from "components/layout/landing";
import apis from "services/listing";
import ListingStore from "store/listing";
import Content from "./features/mainContent";
import ExploreStore from "./store/index";

export async function getServerSideProps() {
  let metaListings;
  try {
    metaListings = await apis.getAllListings(1);
  } catch (error) {}

  return {
    props: { metaListings: metaListings || null }, // will be passed to the page component as props
  };
}

const DashboardHome = ({ metaListings }) => {
  const { handleAlllistings } = ListingStore;
  useEffect(() => {
    handleAlllistings(metaListings || null);
  }, []);
  return (
    <div>
      <LandingLayout>
        <Content store={ExploreStore} />
      </LandingLayout>
    </div>
  );
};

export default DashboardHome;
