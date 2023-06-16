import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import AuthStore from "store/auth";
import HomePage from "./landing/home";
import DashboardHome from "./dashboard/explore/index.page";
import { getToken } from "utils/storage";

export default function Home() {
  const { isAuthenticated } = AuthStore;
  const userIsAuthenticated = !!getToken() || isAuthenticated;
  const router = useRouter();

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
      <main>{userIsAuthenticated ? <DashboardHome /> : <HomePage />}</main>
    </>
  );
}
