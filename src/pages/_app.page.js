import "styles/globals.css";
import "styles/slideshow.css";
import "styles/style.module.css";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";

import AuthStore from "store/auth";
import Toast from "components/general/toast/toast";
import { TOKEN } from "utils/storage";

export default function App({ Component, pageProps }) {
  const { setisAuthenticated } = AuthStore;
  const router = useRouter();
  const topRef = useRef(null);
  const scrollToRef = () => {
    topRef.current.scrollIntoView();
  };

  useEffect(() => {
    setisAuthenticated(!!localStorage.getItem(TOKEN));
    scrollToRef();
  }, [router?.pathname]);
  return (
    <div>
      {router?.pathname?.includes("/listing/") && (
        <Head>
          <title>Zusco | Your online marketplace for short-let homes.</title>
          <meta
            name="description"
            content="Forget multiyear leases, tacky decor and constant moving. Zusco offers an easy, flexible option with no long term commitment!"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Zusco | Your online marketplace for short-let homes."
          />
          <meta
            property="og:description"
            content="Forget multiyear leases, tacky decor and constant moving. Zusco offers an easy, flexible option with no long term commitment!"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@zusco" />
          <meta name="twitter:creator" content="@zusco" />
          <meta
            name="twitter:title"
            content="Zusco | Your online marketplace for short-let homes."
          />
          <meta
            name="twitter:description"
            content="Forget multiyear leases, tacky decor and constant moving. Zusco offers an easy, flexible option with no long term commitment!"
          />

          <link rel="apple-touch-icon" href="%PUBLIC_URL%/favicon.ico" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preload" href="/banner-image.png" as="image" />
        </Head>
      )}
      <Toast />
      <div ref={topRef} />
      <Component {...pageProps} />
      <Script
        src="https://zusco-assets.s3.eu-west-2.amazonaws.com/static/widget/js/window.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
