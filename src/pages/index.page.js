import Head from "next/head";
import apis from "services/listing";
import ListingStore from "store/listing";
import HomePage from "./landing/home";
import { useEffect } from "react";

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
  useEffect(() => {
    handleAlllistings(metaListings);
  }, []);
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
        <HomePage metaListings={metaListings} />
      </main>
    </>
  );
}
