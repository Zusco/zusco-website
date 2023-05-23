import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import apis from "services/listing";
import ListingStore from "store/listing";
import AuthStore from "store/auth";
import HomePage from "./landing/home";
import DashboardHome from "./dashboard/explore/index.page";
import { getToken } from "utils/storage";

export async function getServerSideProps() {
  let metaListings;
  try {
    metaListings = await apis.getAllListings(1);
  } catch (error) {}

  return {
    props: { metaListings }, // will be passed to the page component as props
  };
}
export default function Home({ metaListings }) {
  const { handleAlllistings } = ListingStore;
  const { isAuthenticated } = AuthStore;
  const userIsAuthenticated = !!getToken() || isAuthenticated;
  const router = useRouter();
  useEffect(() => {
    handleAlllistings(metaListings);
  }, []);
  useEffect(() => {
    userIsAuthenticated && router.push("/dashboard/explore");
  }, [userIsAuthenticated]);

  return (
    <>
      <Head>
        <title>Zusco</title>
        <meta
          name="description"
          content=" Your online marketplace for short-let homes."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {userIsAuthenticated ? (
          <DashboardHome />
        ) : (
          <HomePage metaListings={metaListings} />
        )}
      </main>
    </>
  );
}
